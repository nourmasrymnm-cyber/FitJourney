// Motivational messages by situation. No guilt, no comparison.
export const MESSAGES = {
  complete: {
    ar: ['أحسنت، خطوة جديدة في رحلتك.', 'التقدم البسيط المتكرر يصنع فرقاً كبيراً.', 'أنجزت ما تستطيع اليوم، وتبني قوتك تدريجياً.', 'جلسة مكتملة، وجسمك يشكرك.'],
    en: ['Well done, another step on your journey.', 'Small progress, repeated, makes a big difference.', 'You did what you could today and you are building strength step by step.', 'Session complete. Your body says thanks.'],
  },
  first: {
    ar: ['بداية رائعة! أصعب خطوة هي الأولى، وقد أنجزتها.', 'أول جلسة في رحلتك، والبقية تُبنى فوقها.'],
    en: ['What a start! The first step is the hardest and you took it.', 'Your first session is done. Everything else builds on it.'],
  },
  streak: {
    ar: ['التزامك يتحول إلى عادة، استمر.', 'سلسلتك تنمو. لا تحتاج إلى يوم مثالي، بل إلى خطوة جيدة.'],
    en: ['Your consistency is turning into a habit. Keep going.', 'Your streak is growing. You do not need a perfect day, just one good step.'],
  },
  partial: {
    ar: ['ما أنجزته اليوم يُحسب، وغداً فرصة جديدة.', 'لا بأس، المهم أنك بدأت. أنجز ما تستطيع وابنِ قوتك تدريجياً.'],
    en: ['What you did today counts, and tomorrow is a fresh chance.', 'That is okay. You showed up. Do what you can and build gradually.'],
  },
};

export const pickMessage = (kind, lang, seed) => {
  const list = MESSAGES[kind][lang];
  return list[Math.abs(seed) % list.length];
};
