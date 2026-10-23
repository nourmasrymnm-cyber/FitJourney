import { useT } from '../i18n/index.js';
import { byId, GROUP_EMOJI } from '../data/exercises.js';

// Shows one exercise. With `item` it shows the planned amount; without it, the level.
export default function ExerciseRow({ exId, item, onClick }) {
  const { t, lang } = useT();
  const ex = byId(exId);
  let amount = null;
  let sub = t('group.' + ex.group);
  if (item) {
    if (item.phase === 'main') {
      amount = t(item.mode === 'time' ? 'plan.setsTime' : 'plan.setsReps', { s: item.sets, r: item.amount });
      sub = t('plan.restSec', { n: item.rest });
    } else {
      amount = t('plan.time', { r: item.amount });
    }
  } else {
    sub = t('group.' + ex.group) + ' · ' + t('level.' + ex.level);
  }
  return (
    <button className="item" onClick={onClick}>
      <span className="badge">{GROUP_EMOJI[ex.group]}</span>
      <span className="txt"><span>{ex[lang].name}</span><small>{sub}</small></span>
      {amount && <span className="amt">{amount}</span>}
    </button>
  );
}
