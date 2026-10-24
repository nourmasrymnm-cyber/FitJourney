import { useT } from '../i18n/index.js';
import { weekdayName, weekOrder } from '../lib/dates.js';
import ItemList from '../components/ItemList.jsx';
import ProgressCard from '../components/ProgressCard.jsx';

export default function Home({ plan, stats, onExercise, onStart }) {
  const { t, lang } = useT();
  if (!plan) {
    return <main className="screen with-nav"><p className="hint">{t('plan.noPlan')}</p></main>;
  }

  const today = new Date().getDay();
  const session = plan.sessions.find((s) => s.dayOfWeek === today);
  let next = null;
  for (let d = 1; d <= 7 && !next; d++) {
    next = plan.sessions.find((s) => s.dayOfWeek === (today + d) % 7);
  }
  const mainCount = session ? session.items.filter((i) => i.phase === 'main').length : 0;

  return (
    <main className="screen with-nav">
      <div className="day-strip">
        {weekOrder(lang).map((dow) => {
          const train = plan.sessions.some((s) => s.dayOfWeek === dow);
          return (
            <div key={dow} className={'day' + (train ? ' train' : '') + (dow === today ? ' today' : '')}>
              <span>{weekdayName(lang, dow, 'short')}</span><i />
            </div>
          );
        })}
      </div>

      <ProgressCard stats={stats} />

      {session ? (
        <>
          <div className="hero-card">
            <span className="pill accent" style={{ alignSelf: 'flex-start' }}>{t('plan.today')}</span>
            <h2>{t('plan.session.' + session.templateKey)}</h2>
            <div className="meta">
              <span className="pill">{t('plan.minutes', { n: session.estMin })}</span>
              <span className="pill">{t('plan.exercises', { n: mainCount })}</span>
              <span className="pill">{t('level.' + plan.levelCap)}</span>
            </div>
            <p className="hint">{t('plan.targets')}: {session.groups.map((g) => t('group.' + g)).join('، ')}</p>
            {stats.doneToday ? (
              <p className="note">✅ {t('run.doneToday')}. {t('run.doneTodayText')}</p>
            ) : (
              <button className="btn btn-primary" onClick={() => onStart(session.id)}>{t('run.start')}</button>
            )}
          </div>
          <ItemList items={session.items} onExercise={onExercise} />
        </>
      ) : (
        <div className="hero-card">
          <span className="pill accent" style={{ alignSelf: 'flex-start' }}>{t('plan.today')}</span>
          <h2>{t('plan.rest.title')}</h2>
          <p className="hint">{t('plan.rest.text')}</p>
          {next && <p>{t('plan.next', { day: weekdayName(lang, next.dayOfWeek) })}</p>}
        </div>
      )}
    </main>
  );
}
