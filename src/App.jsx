import { useEffect, useMemo, useState, useCallback } from 'react';
import { I18nContext, makeT, detectLang } from './i18n/index.js';
import { get, put, getSetting, setSetting, requestPersistence } from './db/db.js';
import { STEPS } from './data/surveySteps.js';
import Welcome from './screens/Welcome.jsx';
import Survey from './screens/Survey.jsx';
import Review from './screens/Review.jsx';
import Saved from './screens/Saved.jsx';

export default function App() {
  const [ready, setReady] = useState(false);
  const [lang, setLangState] = useState(detectLang());
  const [screen, setScreen] = useState('welcome');
  const [answers, setAnswers] = useState({});
  const [profile, setProfile] = useState(null);
  const [surveyStart, setSurveyStart] = useState(0);

  // Load saved data once.
  useEffect(() => {
    (async () => {
      try {
        requestPersistence();
        const savedLang = await getSetting('lang');
        if (savedLang) setLangState(savedLang);
        const p = await get('profile', 'me');
        if (p) {
          setProfile(p);
          setAnswers(p.answers);
          setScreen('saved');
        }
      } catch (e) {
        console.error('Storage error', e);
      }
      setReady(true);
    })();
  }, []);

  // Keep language + direction in sync with the page.
  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }, [lang]);

  const setLang = useCallback((l) => {
    setLangState(l);
    setSetting('lang', l).catch(() => {});
  }, []);

  const i18n = useMemo(() => ({ lang, setLang, t: makeT(lang) }), [lang, setLang]);

  const confirm = async () => {
    const now = new Date().toISOString();
    const p = { id: 'me', schemaVersion: 1, answers, createdAt: profile ? profile.createdAt : now, updatedAt: now };
    try {
      await put('profile', p);
      setProfile(p);
      setScreen('saved');
    } catch (e) {
      console.error('Save failed', e);
    }
  };

  if (!ready) return null;

  return (
    <I18nContext.Provider value={i18n}>
      {screen === 'welcome' && (
        <Welcome onStart={() => { setSurveyStart(0); setScreen('survey'); }} />
      )}
      {screen === 'survey' && (
        <Survey
          answers={answers}
          setAnswers={setAnswers}
          startAt={surveyStart}
          onDone={() => setScreen('review')}
          onExit={() => setScreen(profile ? 'saved' : 'welcome')}
        />
      )}
      {screen === 'review' && (
        <Review
          answers={answers}
          onConfirm={confirm}
          onEdit={() => { setSurveyStart(STEPS.length - 1); setScreen('survey'); }}
        />
      )}
      {screen === 'saved' && (
        <Saved answers={answers} onEdit={() => { setSurveyStart(0); setScreen('survey'); }} />
      )}
    </I18nContext.Provider>
  );
}
