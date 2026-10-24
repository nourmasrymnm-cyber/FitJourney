import { useT } from '../i18n/index.js';
import BackBar from '../components/BackBar.jsx';
import ItemList from '../components/ItemList.jsx';

export default function SessionDetail({ session, plan, onBack, onExercise }) {
  const { t } = useT();
  const mainCount = session.items.filter((i) => i.phase === 'main').length;
  return (
    <main className="screen">
      <BackBar onBack={onBack} title={t('plan.session.' + session.templateKey)} />
      <div className="meta">
        <span className="pill">{t('plan.minutes', { n: session.estMin })}</span>
        <span className="pill">{t('plan.exercises', { n: mainCount })}</span>
        <span className="pill">{t('level.' + plan.levelCap)}</span>
      </div>
      <p className="hint">{t('plan.targets')}: {session.groups.map((g) => t('group.' + g)).join('، ')}</p>
      <ItemList items={session.items} onExercise={onExercise} />
    </main>
  );
}
