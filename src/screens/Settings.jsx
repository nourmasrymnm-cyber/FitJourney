import { useT } from '../i18n/index.js';
import LangSwitch from '../components/LangSwitch.jsx';
import { AnswerList } from './Review.jsx';

export default function Settings({ answers, onEdit }) {
  const { t } = useT();
  return (
    <main className="screen with-nav">
      <h1 className="title">{t('settings.title')}</h1>
      <div className="stack">
        <p className="section-title">{t('saved.language')}</p>
        <LangSwitch />
      </div>
      <div className="stack">
        <p className="section-title">{t('settings.profile')}</p>
        <AnswerList answers={answers} />
        <p className="hint">{t('settings.noteEdit')}</p>
        <button className="btn btn-ghost" onClick={onEdit}>{t('common.edit')}</button>
      </div>
    </main>
  );
}
