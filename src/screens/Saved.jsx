import { useT } from '../i18n/index.js';
import Logo from '../components/Logo.jsx';
import LangSwitch from '../components/LangSwitch.jsx';
import { AnswerList } from './Review.jsx';

export default function Saved({ answers, onEdit }) {
  const { t } = useT();
  return (
    <main className="screen">
      <div className="stack grow">
        <Logo size={64} />
        <h1 className="title">{t('saved.title')}</h1>
        <p className="hint">{t('saved.hint')}</p>
        <AnswerList answers={answers} />
        <p className="hint">{t('saved.language')}</p>
        <LangSwitch />
      </div>
      <button className="btn btn-ghost" onClick={onEdit}>{t('common.edit')}</button>
    </main>
  );
}
