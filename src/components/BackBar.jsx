import { useT } from '../i18n/index.js';

export default function BackBar({ onBack, title }) {
  const { t } = useT();
  return (
    <div className="topbar">
      <button className="icon-btn" onClick={onBack} aria-label={t('common.back')}>
        <svg className="flip" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M15 5l-7 7 7 7" />
        </svg>
      </button>
      {title && <h2 className="title" style={{ fontSize: 20 }}>{title}</h2>}
    </div>
  );
}
