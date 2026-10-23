import { useT } from '../i18n/index.js';

export default function LangSwitch() {
  const { lang, setLang } = useT();
  return (
    <div className="seg" role="group">
      <button className={lang === 'ar' ? 'on' : ''} onClick={() => setLang('ar')}>العربية</button>
      <button className={lang === 'en' ? 'on' : ''} onClick={() => setLang('en')}>English</button>
    </div>
  );
}
