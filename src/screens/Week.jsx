import { useT } from '../i18n/index.js';
import { weekdayName, weekOrder } from '../lib/dates.js';

export default function Week({ plan, onSession }) {
  const { t, lang } = useT();
  if (!plan) {
    return <main className="screen with-nav"><p className="hint">{t('plan.noPlan')}</p></main>;
  }
  const today = new Date().getDay();
  return (
    <main className="screen with-nav">
      <h1 className="title">{t('plan.week.title')}</h1>
      {plan.capped && (
        <p className="note">{t('plan.capped', { asked: plan.daysRequested, days: plan.daysEffective })}</p>
      )}
      <div className="stack">
        {weekOrder(lang).map((dow) => {
          const s = plan.sessions.find((x) => x.dayOfWeek === dow);
          return (
            <div key={dow} className={'week-row' + (dow === today ? ' today' : '')}>
              <span className="dname">{weekdayName(lang, dow)}</span>
              {s ? (
                <button className="item" onClick={() => onSession(s.id)}>
                  <span className="txt">
                    <span>{t('plan.session.' + s.templateKey)}</span>
                    <small>{s.groups.map((g) => t('group.' + g)).join('، ')}</small>
                  </span>
                  <span className="amt">{t('plan.minutes', { n: s.estMin })}</span>
                </button>
              ) : (
                <div className="rest-row">{t('plan.week.rest')}</div>
              )}
            </div>
          );
        })}
      </div>
    </main>
  );
}
