import { useT } from '../i18n/index.js';

const ICONS = {
  home: <path d="M3 11l9-8 9 8v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z" />,
  week: <><rect x="3" y="5" width="18" height="16" rx="3" /><path d="M8 3v4M16 3v4M3 10h18" /></>,
  library: <><path d="M4 6h16M4 12h16M4 18h10" /></>,
  settings: <><circle cx="12" cy="12" r="3" /><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M19.1 4.9L17 7M7 17l-2.1 2.1" /></>,
};
const TABS = ['home', 'week', 'library', 'settings'];

export default function BottomNav({ active, onChange }) {
  const { t } = useT();
  return (
    <nav className="tabs">
      <div className="tabs-in">
        {TABS.map((k) => (
          <button key={k} className={'tab' + (active === k ? ' on' : '')} onClick={() => onChange(k)}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              {ICONS[k]}
            </svg>
            <span>{t('nav.' + k)}</span>
          </button>
        ))}
      </div>
    </nav>
  );
}
