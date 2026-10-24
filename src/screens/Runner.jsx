import { useEffect, useMemo, useRef, useState } from 'react';
import { useT } from '../i18n/index.js';
import { byId, GROUP_EMOJI } from '../data/exercises.js';
import { alternatives } from '../lib/planner.js';
import { useTimer } from '../lib/useTimer.js';
import { localDate } from '../lib/progress.js';
import { MIN_COMPLETION } from '../data/gamification.js';

// One step = one set (main) or one timed move (warm-up / cool-down).
function buildSteps(items) {
  const steps = [];
  items.forEach((it, itemIdx) => {
    const n = it.phase === 'main' ? it.sets : 1;
    for (let s = 1; s <= n; s++) steps.push({ itemIdx, setNo: s, setsTotal: n });
  });
  return steps;
}

export default function Runner({ session, answers, onFinish, onExit }) {
  const { t, lang } = useT();
  const [items, setItems] = useState(() => session.items.map((i) => ({ ...i })));
  const steps = useMemo(() => buildSteps(items), [items]);
  const [stepIdx, setStepIdx] = useState(0);
  const [stage, setStage] = useState('ready'); // ready | work | rest
  const [reps, setReps] = useState(null);
  const [log, setLog] = useState([]);
  const [skipped, setSkipped] = useState([]);
  const [paused, setPaused] = useState(false);
  const [dialog, setDialog] = useState(null); // 'end' | 'swap' | null
  const [restTotal, setRestTotal] = useState(1);
  const startedAt = useRef(Date.now());
  const activeMs = useRef(0);
  const wasRunning = useRef(false);

  const timer = useTimer(() => {
    if (stage === 'work') complete(item.amount);
    else if (stage === 'rest') setStage('ready');
  });

  // Active training time (excludes pauses).
  useEffect(() => {
    if (paused) return undefined;
    let last = Date.now();
    const id = setInterval(() => {
      const n = Date.now();
      activeMs.current += n - last;
      last = n;
    }, 500);
    return () => {
      activeMs.current += Date.now() - last;
      clearInterval(id);
    };
  }, [paused]);

  // Android back button opens / closes the "end session" dialog.
  useEffect(() => {
    const h = () => setDialog((d) => (d ? null : 'end'));
    window.addEventListener('fj-back', h);
    return () => window.removeEventListener('fj-back', h);
  }, []);

  const step = steps[stepIdx];
  const item = items[step.itemIdx];
  const ex = byId(item.exId);
  const x = ex[lang];
  const isMain = item.phase === 'main';
  const repsVal = reps === null ? item.amount : reps;
  const secsLeft = Math.ceil(timer.left / 1000);

  const finish = (finalLog, sk) => {
    timer.stop();
    if (finalLog.length === 0) { onExit(); return; }
    const mainItems = items.filter((i) => i.phase === 'main');
    const planned = mainItems.reduce((a, i) => a + i.sets, 0);
    const done = finalLog.filter((l) => l.phase === 'main' && l.done > 0).length;
    const exercisesDone = items.reduce((a, it, idx) => (
      a + (it.phase === 'main' && finalLog.filter((l) => l.itemIdx === idx && l.done > 0).length >= it.sets ? 1 : 0)
    ), 0);
    const now = new Date();
    onFinish({
      id: 'sess-' + startedAt.current,
      date: localDate(now),
      startedAt: new Date(startedAt.current).toISOString(),
      endedAt: now.toISOString(),
      activeSeconds: Math.round(activeMs.current / 1000),
      planSessionId: session.id,
      templateKey: session.templateKey,
      status: planned > 0 && done / planned >= MIN_COMPLETION ? 'completed' : 'partial',
      log: finalLog,
      skipped: sk,
      mainSetsPlanned: planned,
      mainSetsDone: done,
      exercisesDone,
      exercisesPlanned: mainItems.length,
      counted: false,
      xp: 0,
    });
  };

  const goNext = (newLog) => {
    const nextIdx = stepIdx + 1;
    if (nextIdx >= steps.length) { finish(newLog, skipped); return; }
    const nxt = items[steps[nextIdx].itemIdx];
    setStepIdx(nextIdx);
    setReps(null);
    if (isMain && nxt.phase === 'main' && item.rest > 0) {
      setStage('rest');
      setRestTotal(item.rest);
      timer.start(item.rest);
    } else {
      setStage('ready');
    }
  };

  function complete(done) {
    const entry = {
      itemIdx: step.itemIdx, exId: item.exId, phase: item.phase,
      setNo: step.setNo, mode: item.mode, target: item.amount, done,
    };
    const newLog = [...log, entry];
    setLog(newLog);
    goNext(newLog);
  }

  const startWork = () => { setStage('work'); timer.start(item.amount); };
  const doneEarly = () => {
    const elapsed = item.amount - secsLeft;
    timer.stop();
    complete(Math.max(1, elapsed));
  };
  const skipRest = () => { timer.stop(); setStage('ready'); };
  const addRest = () => { timer.add(15); setRestTotal((r) => r + 15); };

  const skipExercise = () => {
    timer.stop();
    const sk = [...skipped, item.exId];
    setSkipped(sk);
    const nextIdx = steps.findIndex((s, i) => i > stepIdx && s.itemIdx !== step.itemIdx);
    if (nextIdx === -1) { finish(log, sk); return; }
    setStepIdx(nextIdx);
    setStage('ready');
    setReps(null);
  };

  const doSwap = (alt) => {
    timer.stop();
    setItems((its) => its.map((it, i) => (
      i === step.itemIdx ? { ...it, exId: alt.id, mode: alt.mode, amount: alt.amount } : it
    )));
    setStage('ready');
    setReps(null);
    setDialog(null);
  };

  const pause = () => { wasRunning.current = timer.running; timer.pause(); setPaused(true); };
  const resume = () => { if (wasRunning.current) timer.resume(); setPaused(false); };

  const swapList = dialog === 'swap' ? alternatives(item.exId, answers, items.map((i) => i.exId)) : [];

  if (paused) {
    return (
      <main className="screen">
        <div className="stack grow" style={{ justifyContent: 'center', textAlign: 'center' }}>
          <h1 className="title">{t('run.paused')}</h1>
          <p className="hint">{x.name}</p>
        </div>
        <div className="stack">
          <button className="btn btn-primary" onClick={resume}>{t('run.resume')}</button>
          <button className="btn btn-ghost" onClick={() => { resume(); setDialog('end'); }}>{t('run.end')}</button>
        </div>
      </main>
    );
  }

  const nextPreview = stage === 'rest' ? ex : null;

  return (
    <main className="screen">
      <div className="topbar">
        <button className="icon-btn" onClick={() => setDialog('end')} aria-label={t('run.end')}>✕</button>
        <div className="progress">
          <div className="bar"><i style={{ width: (stepIdx / steps.length) * 100 + '%' }} /></div>
          <small>{t('plan.' + item.phase)}</small>
        </div>
      </div>

      {stage === 'rest' ? (
        <div className="stack grow" style={{ justifyContent: 'center', textAlign: 'center' }}>
          <span className="pill accent" style={{ alignSelf: 'center' }}>{t('run.rest')}</span>
          <div className="big">{secsLeft}</div>
          <div className="bar"><i style={{ width: Math.min(100, (timer.left / 1000 / restTotal) * 100) + '%' }} /></div>
          <p className="hint">
            {t('run.next', { name: nextPreview[lang].name })}
            {items[step.itemIdx].phase === 'main' ? ' · ' + t('run.set', { i: step.setNo, n: step.setsTotal }) : ''}
          </p>
        </div>
      ) : (
        <div className="stack grow">
          <div className="detail-hero">
            <span className="badge-lg">{GROUP_EMOJI[ex.group]}</span>
            <div className="stack" style={{ gap: 4 }}>
              <h1 className="title">{x.name}</h1>
              {isMain && <span className="pill" style={{ alignSelf: 'flex-start' }}>{t('run.set', { i: step.setNo, n: step.setsTotal })}</span>}
            </div>
          </div>

          <div className="target-box">
            <span className="hint">{t('run.target')}</span>
            <div className="big">
              {stage === 'work' ? secsLeft : item.mode === 'time' ? t('plan.time', { r: item.amount }) : t('run.repsUnit', { n: item.amount })}
            </div>
          </div>

          {stage === 'ready' && item.mode === 'reps' && (
            <div className="stack">
              <p className="section-title">{t('run.repsDone')}</p>
              <div className="stepper">
                <button className="icon-btn" onClick={() => setReps(Math.max(0, repsVal - 1))} aria-label="-">−</button>
                <strong>{repsVal}</strong>
                <button className="icon-btn" onClick={() => setReps(Math.min(99, repsVal + 1))} aria-label="+">+</button>
              </div>
            </div>
          )}

          <details className="how">
            <summary>{t('run.howTo')}</summary>
            <ol className="steps">{x.steps.map((s, i) => <li key={i}>{s}</li>)}</ol>
            <p className="hint" style={{ marginTop: 8 }}>{x.breath}</p>
          </details>
        </div>
      )}

      <div className="stack">
        {stage === 'ready' && item.mode === 'time' && (
          <button className="btn btn-primary" onClick={startWork}>{t('run.startTimer')}</button>
        )}
        {stage === 'ready' && item.mode === 'reps' && (
          <button className="btn btn-primary" onClick={() => complete(repsVal)}>{t('run.setDone')}</button>
        )}
        {stage === 'work' && <button className="btn btn-primary" onClick={doneEarly}>{t('run.done')}</button>}
        {stage === 'rest' && (
          <div className="row2">
            <button className="btn btn-ghost" onClick={addRest}>{t('run.addTime')}</button>
            <button className="btn btn-primary" onClick={skipRest}>{t('run.skipRest')}</button>
          </div>
        )}
        {stage !== 'rest' && (
          <div className="row2 small">
            <button className="btn btn-ghost" onClick={pause}>{t('run.pause')}</button>
            {isMain && <button className="btn btn-ghost" onClick={() => setDialog('swap')}>{t('run.swap')}</button>}
            <button className="btn btn-ghost" onClick={skipExercise}>{t('run.skip')}</button>
          </div>
        )}
        {stage === 'rest' && (
          <button className="btn btn-ghost" onClick={pause}>{t('run.pause')}</button>
        )}
      </div>

      {dialog === 'end' && (
        <div className="sheet" role="dialog">
          <div className="sheet-card stack">
            <h2 className="title" style={{ fontSize: 20 }}>{t('run.endTitle')}</h2>
            <p className="hint">{t('run.endText')}</p>
            <button className="btn btn-ghost" onClick={() => setDialog(null)}>{t('run.keepGoing')}</button>
            <button className="btn btn-primary" onClick={() => { setDialog(null); finish(log, skipped); }}>{t('run.endNow')}</button>
          </div>
        </div>
      )}

      {dialog === 'swap' && (
        <div className="sheet" role="dialog">
          <div className="sheet-card stack">
            <h2 className="title" style={{ fontSize: 20 }}>{t('run.swap')}</h2>
            {swapList.length === 0 && <p className="hint">{t('run.noSwap')}</p>}
            {swapList.map((alt) => (
              <button key={alt.id} className="item" onClick={() => doSwap(alt)}>
                <span className="badge">{GROUP_EMOJI[alt.group]}</span>
                <span className="txt"><span>{alt[lang].name}</span><small>{t('level.' + alt.level)}</small></span>
              </button>
            ))}
            <button className="btn btn-ghost" onClick={() => setDialog(null)}>{t('common.back')}</button>
          </div>
        </div>
      )}
    </main>
  );
}
