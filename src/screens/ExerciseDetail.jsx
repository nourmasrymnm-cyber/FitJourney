import { useT } from '../i18n/index.js';
import { byId, GROUP_EMOJI } from '../data/exercises.js';
import BackBar from '../components/BackBar.jsx';

export default function ExerciseDetail({ exId, onBack }) {
  const { t, lang } = useT();
  const ex = byId(exId);
  const x = ex[lang];
  const suggested = t(ex.mode === 'time' ? 'plan.setsTime' : 'plan.setsReps', { s: ex.sets, r: ex.amount });
  return (
    <main className="screen">
      <BackBar onBack={onBack} />
      <div className="detail-hero">
        <span className="badge-lg">{GROUP_EMOJI[ex.group]}</span>
        <div className="stack" style={{ gap: 4 }}>
          <h1 className="title">{x.name}</h1>
          <div className="meta">
            <span className="pill">{t('group.' + ex.group)}</span>
            <span className="pill">{t('level.' + ex.level)}</span>
          </div>
        </div>
      </div>

      <p>{x.desc}</p>

      <div className="block">
        <h2>{t('ex.suggested')}</h2>
        <p>{suggested}{ex.rest ? ' · ' + t('plan.restSec', { n: ex.rest }) : ''}</p>
      </div>

      <div className="block">
        <h2>{t('ex.muscles')}</h2>
        <div className="meta">{ex.muscles.map((m) => <span key={m} className="pill">{t('muscle.' + m)}</span>)}</div>
      </div>

      <div className="block">
        <h2>{t('ex.steps')}</h2>
        <ol className="steps">{x.steps.map((s, i) => <li key={i}>{s}</li>)}</ol>
      </div>

      <div className="block">
        <h2>{t('ex.mistakes')}</h2>
        <ul className="plain">{x.mistakes.map((s, i) => <li key={i}>{s}</li>)}</ul>
      </div>

      <div className="block"><h2>{t('ex.breathing')}</h2><p>{x.breath}</p></div>
      {x.easier && <div className="block"><h2>{t('ex.easier')}</h2><p>{x.easier}</p></div>}
      {x.harder && <div className="block"><h2>{t('ex.harder')}</h2><p>{x.harder}</p></div>}
      {x.safety && <p className="note warn">{x.safety}</p>}
    </main>
  );
}
