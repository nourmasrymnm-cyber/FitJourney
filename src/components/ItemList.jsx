import { useT } from '../i18n/index.js';
import ExerciseRow from './ExerciseRow.jsx';

// Lists a session's items grouped by phase.
export default function ItemList({ items, onExercise }) {
  const { t } = useT();
  return (
    <>
      {['warmup', 'main', 'cooldown'].map((phase) => {
        const list = items.filter((i) => i.phase === phase);
        if (!list.length) return null;
        return (
          <div className="stack" key={phase}>
            <p className="section-title">{t('plan.' + phase)}</p>
            {list.map((it) => (
              <ExerciseRow key={it.exId} exId={it.exId} item={it} onClick={() => onExercise(it.exId)} />
            ))}
          </div>
        );
      })}
    </>
  );
}
