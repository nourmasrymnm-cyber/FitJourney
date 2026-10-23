// Survey definition. To add a question, add a step here + its texts in i18n.
export const STEPS = [
  {
    id: 'basics', type: 'fields',
    fields: [
      { k: 'age', kind: 'number', min: 18, max: 80 },
      { k: 'heightCm', kind: 'number', min: 120, max: 230 },
      { k: 'weightKg', kind: 'number', min: 30, max: 250 },
      { k: 'targetKg', kind: 'number', min: 30, max: 250, optional: true },
    ],
  },
  { id: 'activity', type: 'choice', k: 'activity', options: ['low', 'light', 'moderate', 'high'] },
  { id: 'experience', type: 'choice', k: 'experience', options: ['none', 'returning', 'intermediate', 'regular'] },
  { id: 'goal', type: 'choice', k: 'goal', options: ['muscle', 'bulk', 'cut', 'recomp', 'strength', 'maintain'] },
  { id: 'minutes', type: 'choice', k: 'minutes', options: [10, 20, 30, 45] },
  { id: 'days', type: 'choice', k: 'days', options: [2, 3, 4, 5, 6] },
  { id: 'limits', type: 'multi', k: 'limits', options: ['none', 'back', 'knee', 'shoulder', 'wrist', 'other'] },
  { id: 'diet', type: 'choice', k: 'diet', options: ['omnivore', 'vegetarian', 'pescatarian'] },
  { id: 'meals', type: 'choice', k: 'meals', options: [3, 4, 5] },
  {
    id: 'foodNotes', type: 'fields',
    fields: [
      { k: 'dislikes', kind: 'text', optional: true },
      { k: 'allergies', kind: 'text', optional: true },
    ],
  },
];

// Review screen order
export const REVIEW_KEYS = [
  'age', 'heightCm', 'weightKg', 'targetKg', 'activity', 'experience', 'goal',
  'minutes', 'days', 'limits', 'diet', 'meals', 'dislikes', 'allergies',
];

// Accept Arabic-Indic digits and comma decimals from the keyboard.
export function cleanNumber(s) {
  return String(s)
    .replace(/[٠-٩]/g, (d) => '٠١٢٣٤٥٦٧٨٩'.indexOf(d))
    .replace(/[٫,]/g, '.')
    .replace(/[^0-9.]/g, '');
}

// Returns { fieldKey: errorCode }. Empty object = valid.
export function validateStep(step, a) {
  const errors = {};
  if (step.type === 'fields') {
    for (const f of step.fields) {
      const v = a[f.k];
      const empty = v === undefined || v === '';
      if (empty) {
        if (!f.optional) errors[f.k] = 'required';
        continue;
      }
      if (f.kind === 'number') {
        const n = Number(v);
        if (!isFinite(n) || n < f.min || n > f.max) errors[f.k] = 'range';
      }
    }
  } else if (step.type === 'choice') {
    if (a[step.k] === undefined) errors[step.k] = 'required';
  } else if (step.type === 'multi') {
    if (!a[step.k] || a[step.k].length === 0) errors[step.k] = 'pick';
  }
  return errors;
}
