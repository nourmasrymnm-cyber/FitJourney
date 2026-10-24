import { useT } from '../i18n/index.js';
import { fmtDuration } from '../lib/progress.js';
import { pickMessage } from '../data/messages.js';

export default function Success({ result, onHome }) {
  const { t, lang } = useT();
  const { rec, before, after } = result;
  const completed = rec.status === 'completed';
  const levelUp = after.level.index > before.level.index;

  let kind = 'complete';
  if (!completed) kind = 'partial';
  else if (rec.counted && before.sessionsCount === 0) kind = 'first';
  else if (rec.counted && after.streak >= 3 && after.streak > before.streak) kind = 'streak';
  const message = pickMessage(kind, lang, after.sessionsCount);

  return (
    <main className="screen">
      <div className="stack grow">
        <span style={{ fontSize: 56 }}>{completed ? '🎉' : '👏'}</span>
        <h1 className="title">{completed ? t('success.title') : t('success.titlePartial')}</h1>
        <p className="hint">{t('plan.session.' + rec.templateKey)}</p>

        <div className="stats-grid">
          <div className="stat"><small>{t('success.duration')}</small><strong>{fmtDuration(rec.activeSeconds)}</strong></div>
          <div className="stat"><small>{t('success.exercises')}</small><strong>{rec.exercisesDone}/{rec.exercisesPlanned}</strong></div>
          <div className="stat"><small>{t('success.xp')}</small><strong>+{rec.xp}</strong></div>
          <div className="stat"><small>{t('success.streak')}</small><strong>{t('success.days', { n: after.streak })}</strong></div>
        </div>

        {levelUp && <p className="note">{t('success.levelUp', { name: t('lvl.' + after.level.number) })}</p>}
        <p className="message">{message}</p>
        {!completed && <p className="note">{t('success.partialNote')}</p>}
        {completed && !rec.counted && <p className="note">{t('success.already')}</p>}
      </div>
      <button className="btn btn-primary" onClick={onHome}>{t('success.home')}</button>
    </main>
  );
}
