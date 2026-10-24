import { useT } from '../i18n/index.js';

export default function ProgressCard({ stats }) {
  const { t } = useT();
  const lv = stats.level;
  return (
    <div className="card" style={{ padding: 16 }}>
      <div className="stats-grid three">
        <div className="stat"><small>{t('stats.streak')}</small><strong>🔥 {stats.streak}</strong></div>
        <div className="stat"><small>{t('stats.week')}</small><strong>{stats.weekDone}/{stats.weekPlanned}</strong></div>
        <div className="stat"><small>{t('stats.xpLabel')}</small><strong>{stats.xpTotal}</strong></div>
      </div>
      <div className="stack" style={{ gap: 6, marginTop: 12 }}>
        <div className="row-between">
          <span>{t('stats.level', { n: lv.number, name: t('lvl.' + lv.number) })}</span>
          <small className="hint">{lv.next ? t('stats.toNext', { n: lv.toNext }) : t('stats.maxLevel')}</small>
        </div>
        <div className="bar"><i style={{ width: Math.round(lv.progress * 100) + '%' }} /></div>
      </div>
    </div>
  );
}
