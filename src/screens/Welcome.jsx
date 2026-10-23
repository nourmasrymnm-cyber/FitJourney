import { useT } from '../i18n/index.js';
import Logo from '../components/Logo.jsx';
import LangSwitch from '../components/LangSwitch.jsx';

export default function Welcome({ onStart }) {
  const { t } = useT();
  return (
    <main className="screen">
      <div className="hero grow">
        <Logo />
        <h1>{t('app.name')}</h1>
        <p className="tagline">{t('app.tagline')}</p>
        <p className="phrase">{t('welcome.phrase')}</p>
      </div>
      <div className="stack">
        <LangSwitch />
        <button className="btn btn-primary" onClick={onStart}>{t('welcome.start')}</button>
      </div>
    </main>
  );
}
