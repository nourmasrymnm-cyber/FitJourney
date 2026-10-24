// All point and level rules live here, so they can be tuned in one place.
export const XP = { session: 50, first: 25, week: 100 };

// A session counts (XP + streak) when at least this share of the main sets is done.
export const MIN_COMPLETION = 0.7;

// Level n starts at LEVELS[n-1].min XP. Names are in i18n as lvl.1, lvl.2, ...
export const LEVELS = [{ min: 0 }, { min: 100 }, { min: 300 }, { min: 600 }, { min: 1000 }, { min: 1600 }];
