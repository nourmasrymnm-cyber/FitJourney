import { useEffect, useMemo, useRef, useState, useCallback } from 'react';
import { App as CapApp } from '@capacitor/app';
import { I18nContext, makeT, detectLang } from './i18n/index.js';
import { get, put, all, getSetting, setSetting, requestPersistence } from './db/db.js';
import { STEPS } from './data/surveySteps.js';
import { XP } from './data/gamification.js';
import { generatePlan } from './lib/planner.js';
import { computeStats, weekStartKey, parseDate } from './lib/progress.js';
import Welcome from './screens/Welcome.jsx';
import Survey from './screens/Survey.jsx';
import Review from './screens/Review.jsx';
import Home from './screens/Home.jsx';
import Week from './screens/Week.jsx';
import Library from './screens/Library.jsx';
import Settings from './screens/Settings.jsx';
import SessionDetail from './screens/SessionDetail.jsx';
import ExerciseDetail from './screens/ExerciseDetail.jsx';
import Runner from './screens/Runner.jsx';
import Success from './screens/Success.jsx';
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
  const [history, setHistory] = useState({ sessions: [], ledger: [] });
  const [result, setResult] = useState(null);
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
          setHistory({ sessions: await all('sessions'), ledger: await all('xp') });
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

  const stats = useMemo(
    () => computeStats(history.sessions, history.ledger, plan),
    [history, plan, route]
  );

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

  // Save a finished session and award XP (once per day, never twice).
  const handleFinish = async (rec) => {
    const { sessions, ledger } = history;
    const before = computeStats(sessions, ledger, plan);
    const alreadyToday = sessions.some((s) => s.counted && s.date === rec.date);
    const entries = [];
    rec.counted = rec.status === 'completed' && !alreadyToday;
    if (rec.counted) {
      entries.push({ id: 'session:' + rec.date, amount: XP.session, reason: 'session', date: rec.date });
      if (!sessions.some((s) => s.counted)) {
        entries.push({ id: 'bonus:first', amount: XP.first, reason: 'first', date: rec.date });
      }
      const wk = weekStartKey(parseDate(rec.date));
      const dates = new Set(sessions.filter((s) => s.counted).map((s) => s.date));
      dates.add(rec.date);
      const doneThisWeek = [...dates].filter((d) => weekStartKey(parseDate(d)) === wk).length;
      if (doneThisWeek >= plan.daysEffective) {
        entries.push({ id: 'bonus:week:' + wk, amount: XP.week, reason: 'week', date: rec.date });
      }
    }
    const fresh = entries.filter((e) => !ledger.some((l) => l.id === e.id));
    rec.xp = fresh.reduce((a, e) => a + e.amount, 0);

    try {
      await put('sessions', rec);
      for (const e of fresh) await put('xp', e);
    } catch (e) {
      console.error('Could not save session', e);
    }
    const nextHistory = { sessions: [...sessions, rec], ledger: [...ledger, ...fresh] };
    setHistory(nextHistory);
    setResult({ rec, before, after: computeStats(nextHistory.sessions, nextHistory.ledger, plan) });
    setRoute({ name: 'success' });
  };

  // Android back button.
  const nav = useRef({});
  nav.current = { screen, route, goBack };
  useEffect(() => {
    const sub = CapApp.addListener('backButton', () => {
      const { screen: sc, route: r, goBack: back } = nav.current;
      if (sc !== 'main') return;
      if (r.name === 'run') window.dispatchEvent(new Event('fj-back'));
      else if (r.name === 'success') setRoute({ name: 'home' });
      else if (r.name === 'session' || r.name === 'exercise') back();
      else if (r.name !== 'home') setRoute({ name: 'home' });
      else CapApp.exitApp();
    });
    return () => { sub.then((h) => h.remove()); };
  }, []);

  if (!ready) return null;

  const startSession = (id) => open({ name: 'run', id });
  const isTab = TABS.includes(route.name);
  let main = null;
  if (screen === 'main') {
    if (route.name === 'home') {
      main = <Home plan={plan} stats={stats} onExercise={(id) => open({ name: 'exercise', id })} onStart={startSession} />;
    } else if (route.name === 'week') {
      main = <Week plan={plan} onSession={(id) => open({ name: 'session', id })} />;
    } else if (route.name === 'library') {
      main = <Library onExercise={(id) => open({ name: 'exercise', id })} />;
    } else if (route.name === 'settings') {
      main = <Settings answers={answers} onEdit={() => { setSurveyStart(0); setScreen('survey'); }} />;
    } else if (route.name === 'session') {
      const s = plan.sessions.find((x) => x.id === route.id);
      main = (
        <SessionDetail
          session={s} plan={plan} canStart={!stats.doneToday} onStart={startSession}
          onBack={goBack} onExercise={(id) => open({ name: 'exercise', id })}
        />
      );
    } else if (route.name === 'exercise') {
      main = <ExerciseDetail exId={route.id} onBack={goBack} />;
    } else if (route.name === 'run') {
      const s = plan.sessions.find((x) => x.id === route.id);
      main = <Runner key={route.id} session={s} answers={answers} onFinish={handleFinish} onExit={goBack} />;
    } else if (route.name === 'success' && result) {
      main = <Success result={result} onHome={() => setRoute({ name: 'home' })} />;
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
