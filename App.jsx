import { useEffect, useMemo, useState, useCallback } from 'react';
import { I18nContext, makeT, detectLang } from './i18n/index.js';
import { get, put, getSetting, setSetting, requestPersistence } from './db/db.js';
import { STEPS } from './data/surveySteps.js';
import { generatePlan } from './lib/planner.js';
import Welcome from './screens/Welcome.jsx';
import Survey from './screens/Survey.jsx';
import Review from './screens/Review.jsx';
import Home from './screens/Home.jsx';
import Week from './screens/Week.jsx';
import Library from './screens/Library.jsx';
import Settings from './screens/Settings.jsx';
import SessionDetail from './screens/SessionDetail.jsx';
import ExerciseDetail from './screens/ExerciseDetail.jsx';
import BottomNav from './components/BottomNav.jsx';

const TABS = ['home', 'week', 'library', 'settings'];

export default function App() {
  const [ready, setReady] = useState(false);
  const [lang, setLangState] = useState(detectLang());
  const [screen, setScreen] = useState('welcome'); // welcome | survey | review | main
  const [route, setRoute] = useState({ name: 'home' });
  const [answers, setAnswers] = useState({});
  const [profile, setProfile] = useState(null);
  const [plan, setPlan] = useState(null);
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
          let pl = await get('plans', 'current');
          if (!pl) {
            pl = generatePlan(p.answers);
            await put('plans', pl);
          }
          setPlan(pl);
          setScreen('main');
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
    const pl = generatePlan(answers);
    try {
      await put('profile', p);
      await put('plans', pl);
      setProfile(p);
      setPlan(pl);
      setRoute({ name: 'home' });
      setScreen('main');
    } catch (e) {
      console.error('Save failed', e);
    }
  };

  // Detail navigation: remember where we came from.
  const open = (r) => setRoute({ ...r, prev: route });
  const goBack = () => setRoute(route.prev || { name: 'home' });

  if (!ready) return null;

  const isTab = TABS.includes(route.name);
  let main = null;
  if (screen === 'main') {
    if (route.name === 'home') main = <Home plan={plan} onExercise={(id) => open({ name: 'exercise', id })} />;
    else if (route.name === 'week') main = <Week plan={plan} onSession={(id) => open({ name: 'session', id })} />;
    else if (route.name === 'library') main = <Library onExercise={(id) => open({ name: 'exercise', id })} />;
    else if (route.name === 'settings') {
      main = <Settings answers={answers} onEdit={() => { setSurveyStart(0); setScreen('survey'); }} />;
    } else if (route.name === 'session') {
      const s = plan.sessions.find((x) => x.id === route.id);
      main = <SessionDetail session={s} plan={plan} onBack={goBack} onExercise={(id) => open({ name: 'exercise', id })} />;
    } else if (route.name === 'exercise') {
      main = <ExerciseDetail exId={route.id} onBack={goBack} />;
    }
  }

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
          onExit={() => {
            if (profile) { setAnswers(profile.answers); setScreen('main'); } else setScreen('welcome');
          }}
        />
      )}
      {screen === 'review' && (
        <Review
          answers={answers}
          onConfirm={confirm}
          onEdit={() => { setSurveyStart(STEPS.length - 1); setScreen('survey'); }}
        />
      )}
      {screen === 'main' && (
        <>
          {main}
          {isTab && <BottomNav active={route.name} onChange={(name) => setRoute({ name })} />}
        </>
      )}
    </I18nContext.Provider>
  );
}
