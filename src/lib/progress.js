// Dates, levels, streak and weekly stats. Pure functions, easy to test.
import { LEVELS } from '../data/gamification.js';

const pad = (n) => String(n).padStart(2, '0');
export const localDate = (d = new Date()) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
export const parseDate = (s) => { const [y, m, d] = s.split('-').map(Number); return new Date(y, m - 1, d); };
export const fmtDuration = (sec) => `${Math.floor(sec / 60)}:${pad(sec % 60)}`;

// Week key = the Monday of that week (local time).
export function weekStartKey(d) {
  const x = new Date(d.getFullYear(), d.getMonth(), d.getDate());
  x.setDate(x.getDate() - ((x.getDay() + 6) % 7));
  return localDate(x);
}

export function levelFor(xp) {
  let i = 0;
  for (let k = 0; k < LEVELS.length; k++) if (xp >= LEVELS[k].min) i = k;
  const min = LEVELS[i].min;
  const next = LEVELS[i + 1] ? LEVELS[i + 1].min : null;
  return { index: i, number: i + 1, next, toNext: next ? next - xp : 0, progress: next ? (xp - min) / (next - min) : 1 };
}

// Streak rules:
//  - a day with a counted session adds 1
//  - a planned rest day neither adds nor breaks
//  - today does not break the streak while it is still open
//  - a past planned training day with no counted session resets it to 0
export function computeStats(sessions, ledger, plan, today = new Date()) {
  const todayKey = localDate(today);
  const counted = sessions.filter((s) => s.counted && s.date <= todayKey);
  const dates = new Set(counted.map((s) => s.date));
  const planned = new Set(plan ? plan.sessions.map((s) => s.dayOfWeek) : []);
  const xpTotal = ledger.reduce((a, e) => a + e.amount, 0);

  let streak = 0;
  let best = 0;
  if (dates.size) {
    const first = parseDate([...dates].sort()[0]);
    for (let i = 0; ; i++) {
      const d = new Date(first.getFullYear(), first.getMonth(), first.getDate() + i);
      const key = localDate(d);
      if (key > todayKey) break;
      if (dates.has(key)) { streak++; best = Math.max(best, streak); }
      else if (!planned.has(d.getDay())) { /* rest day */ }
      else if (key === todayKey) { /* still open */ }
      else streak = 0;
    }
  }

  const wk = weekStartKey(today);
  const weekDone = new Set([...dates].filter((k) => weekStartKey(parseDate(k)) === wk)).size;
  return {
    xpTotal, level: levelFor(xpTotal), streak, best,
    weekDone, weekPlanned: plan ? plan.daysEffective : 0,
    doneToday: dates.has(todayKey), sessionsCount: counted.length,
  };
}
