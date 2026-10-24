import { useState } from 'react';
import { useT } from '../i18n/index.js';
import { EXERCISES, GROUPS } from '../data/exercises.js';
import ExerciseRow from '../components/ExerciseRow.jsx';

export default function Library({ onExercise }) {
  const { t } = useT();
  const [group, setGroup] = useState('all');
  const list = EXERCISES.filter((e) => group === 'all' || e.group === group);
  return (
    <main className="screen with-nav">
      <h1 className="title">{t('lib.title')}</h1>
      <div className="chips">
        {['all', ...GROUPS].map((g) => (
          <button key={g} className={'chip' + (group === g ? ' on' : '')} onClick={() => setGroup(g)}>
            {g === 'all' ? t('lib.all') : t('group.' + g)}
          </button>
        ))}
      </div>
      <div className="stack">
        {list.map((e) => <ExerciseRow key={e.id} exId={e.id} onClick={() => onExercise(e.id)} />)}
      </div>
    </main>
  );
}
