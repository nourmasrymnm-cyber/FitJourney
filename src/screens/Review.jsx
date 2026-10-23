import { useT } from '../i18n/index.js';
import { REVIEW_KEYS } from '../data/surveySteps.js';

const UNIT = { age: 'unit.years', heightCm: 'unit.cm', weightKg: 'unit.kg', targetKg: 'unit.kg' };

export function formatAnswer(t, k, v) {
  if (v === undefined || v === '' || (Array.isArray(v) && v.length === 0)) return t('common.none');
  if (UNIT[k]) return t(UNIT[k], { n: v });
  if (Array.isArray(v)) return v.map((x) => t(`opt.${k}.${x}`)).join('، ');
  if (k === 'dislikes' || k === 'allergies') return v;
  return t(`opt.${k}.${v}`);
}

export function AnswerList({ answers }) {
  const { t } = useT();
  return (
    <div className="card">
      {REVIEW_KEYS.map((k) => (
        <div className="row" key={k}>
          <span>{t('field.' + k)}</span>
          <span>{formatAnswer(t, k, answers[k])}</span>
        </div>
      ))}
    </div>
  );
}

export default function Review({ answers, onConfirm, onEdit }) {
  const { t } = useT();
  return (
    <main className="screen">
      <div className="stack grow">
        <h1 className="title">{t('review.title')}</h1>
        <p className="hint">{t('review.hint')}</p>
        <AnswerList answers={answers} />
      </div>
      <div className="stack">
        <button className="btn btn-primary" onClick={onConfirm}>{t('common.confirm')}</button>
        <button className="btn btn-ghost" onClick={onEdit}>{t('common.edit')}</button>
      </div>
    </main>
  );
}
