import { useState } from 'react';
import { useT } from '../i18n/index.js';
import { STEPS, validateStep, cleanNumber } from '../data/surveySteps.js';

function Chevron() {
  return (
    <svg className="flip" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 5l-7 7 7 7" />
    </svg>
  );
}

export default function Survey({ answers, setAnswers, startAt = 0, onDone, onExit }) {
  const { t } = useT();
  const [i, setI] = useState(startAt);
  const [showErr, setShowErr] = useState(false);

  const step = STEPS[i];
  const errors = validateStep(step, answers);
  const hasErr = Object.keys(errors).length > 0;
  const last = i === STEPS.length - 1;

  const set = (k, v) => setAnswers((a) => ({ ...a, [k]: v }));

  const next = () => {
    if (hasErr) { setShowErr(true); return; }
    setShowErr(false);
    if (last) onDone(); else setI(i + 1);
  };
  const back = () => {
    setShowErr(false);
    if (i === 0) onExit(); else setI(i - 1);
  };

  const toggleMulti = (k, v) => {
    const cur = answers[k] || [];
    let nextVal;
    if (v === 'none') nextVal = cur.includes('none') ? [] : ['none'];
    else {
      const without = cur.filter((x) => x !== 'none');
      nextVal = without.includes(v) ? without.filter((x) => x !== v) : [...without, v];
    }
    set(k, nextVal);
  };

  const errText = (code, f) =>
    code === 'range' ? t('err.range', { min: f.min, max: f.max }) : t('err.' + code);

  const limitsHasIssue = step.type === 'multi' && (answers[step.k] || []).some((x) => x !== 'none');

  return (
    <main className="screen">
      <div className="topbar">
        <button className="icon-btn" onClick={back} aria-label={t('common.back')}><Chevron /></button>
        <div className="progress">
          <div className="bar"><i style={{ width: ((i + 1) / STEPS.length) * 100 + '%' }} /></div>
          <small>{t('survey.progress', { i: i + 1, n: STEPS.length })}</small>
        </div>
      </div>

      <div className="stack grow">
        <h1 className="title">{t(`survey.${step.id}.title`)}</h1>
        <p className="hint">{t(`survey.${step.id}.hint`)}</p>

        {step.type === 'fields' && step.fields.map((f) => {
          const bad = showErr && errors[f.k];
          return (
            <div key={f.k} className={'field' + (bad ? ' bad' : '')}>
              <label htmlFor={f.k}>
                {t('field.' + f.k)} {f.optional && <em>({t('common.optional')})</em>}
              </label>
              <input
                id={f.k}
                value={answers[f.k] ?? ''}
                inputMode={f.kind === 'number' ? 'decimal' : 'text'}
                autoComplete="off"
                onChange={(e) => set(f.k, f.kind === 'number' ? cleanNumber(e.target.value) : e.target.value)}
              />
              {bad && <span className="error">{errText(errors[f.k], f)}</span>}
            </div>
          );
        })}

        {step.type === 'choice' && (
          <div className="options">
            {step.options.map((o) => (
              <button
                key={o}
                className={'opt' + (answers[step.k] === o ? ' on' : '')}
                onClick={() => set(step.k, o)}
              >
                <span>{t(`opt.${step.k}.${o}`)}</span><i className="dot" />
              </button>
            ))}
          </div>
        )}

        {step.type === 'multi' && (
          <div className="options">
            {step.options.map((o) => (
              <button
                key={o}
                className={'opt' + ((answers[step.k] || []).includes(o) ? ' on' : '')}
                onClick={() => toggleMulti(step.k, o)}
              >
                <span>{t(`opt.${step.k}.${o}`)}</span><i className="dot" />
              </button>
            ))}
          </div>
        )}

        {step.type !== 'fields' && showErr && hasErr && (
          <span className="error">{t('err.' + errors[step.k])}</span>
        )}
        {limitsHasIssue && <p className="note">{t('survey.limits.note')}</p>}
      </div>

      <button className="btn btn-primary" onClick={next}>
        {last ? t('common.finish') : t('common.next')}
      </button>
    </main>
  );
}
