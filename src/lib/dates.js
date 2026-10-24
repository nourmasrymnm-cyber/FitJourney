// Weekday helpers. dow: 0 = Sunday ... 6 = Saturday.
export function weekdayName(lang, dow, style = 'long') {
  const locale = lang === 'ar' ? 'ar-u-nu-latn' : 'en';
  // 2024-01-07 was a Sunday
  return new Intl.DateTimeFormat(locale, { weekday: style }).format(new Date(2024, 0, 7 + dow));
}

// Arabic weeks start on Saturday, English on Monday.
export const weekOrder = (lang) => (lang === 'ar' ? [6, 0, 1, 2, 3, 4, 5] : [1, 2, 3, 4, 5, 6, 0]);
