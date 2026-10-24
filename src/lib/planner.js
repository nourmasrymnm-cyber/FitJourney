// Builds a weekly plan from the survey answers. Pure logic, no UI.
import { EXERCISES } from '../data/exercises.js';

const LEVEL_CAP = { none: 1, returning: 1, intermediate: 2, regular: 3 };
const DAY_CAP = { none: 3, returning: 3, intermediate: 5, regular: 6 };
// weekday numbers: 0 = Sunday ... 6 = Saturday
const TRAIN_DAYS = { 2: [1, 4], 3: [1, 3, 5], 4: [1, 2, 4, 5], 5: [1, 2, 3, 5, 6], 6: [1, 2, 3, 4, 5, 6] };
const COUNTS = { 10: { warm: 1, main: 3, cool: 0 }, 20: { warm: 2, main: 4, cool: 0 }, 30: { warm: 2, main: 5, cool: 1 }, 45: { warm: 2, main: 7, cool: 1 } };

const MAX_MAIN = 10;

const TEMPLATES = {
  fullA: ['legs', 'chest', 'back', 'core', 'glutes', 'shoulders', 'triceps'],
  fullB: ['glutes', 'shoulders', 'back', 'core', 'legs', 'chest', 'biceps'],
  fullC: ['legs', 'chest', 'back', 'core', 'full', 'glutes', 'triceps'],
  upper: ['chest', 'back', 'shoulders', 'triceps', 'biceps', 'core', 'chest'],
  lower: ['legs', 'glutes', 'legs', 'core', 'glutes', 'legs', 'core'],
};

function sequenceFor(split, days) {
  if (split === 'fullbody') return ['fullA', 'fullB', 'fullC'].slice(0, days);
  return ['upper', 'lower', 'fullA', 'upper', 'lower', 'fullB'].slice(0, days === 4 ? 4 : days);
}

function eligible(ex, ctx) {
  if (ex.level > ctx.levelCap) return false;
  if (ex.avoid.some((a) => ctx.limits.includes(a))) return false;
  if (ctx.limits.includes('other') && ex.intense) return false;
  return true;
}

function pick(group, ctx, used, rot) {
  const list = EXERCISES.filter((e) => e.group === group && eligible(e, ctx) && !used.has(e.id))
    .sort((a, b) => b.level - a.level);
  return list.length ? list[rot % list.length] : null;
}

function workSeconds(item) {
  return item.mode === 'time' ? item.amount : item.amount * 3;
}

export function estimateMinutes(items) {
  const secs = items.reduce((sum, it) => {
    if (it.phase !== 'main') return sum + it.sets * workSeconds(it) + 10;
    return sum + it.sets * (workSeconds(it) + it.rest);
  }, 0);
  return Math.max(5, Math.round(secs / 60));
}

function makeItem(ex, phase, sets, restCap) {
  return {
    exId: ex.id, phase, sets, mode: ex.mode, amount: ex.amount,
    rest: phase === 'main' ? Math.min(ex.rest, restCap) : 0,
  };
}

export function makeCtx(a) {
  const limits = a.limits && a.limits.length ? a.limits : ['none'];
  let levelCap = LEVEL_CAP[a.experience];
  if (limits.includes('other')) levelCap = Math.min(levelCap, 2);
  return { levelCap, limits };
}

// Safe replacements for an exercise: same muscle group, respects limits and level.
export function alternatives(exId, answers, excludeIds = []) {
  const ex = EXERCISES.find((e) => e.id === exId);
  const ctx = makeCtx(answers);
  return EXERCISES
    .filter((e) => e.group === ex.group && e.id !== exId && !excludeIds.includes(e.id) && eligible(e, ctx))
    .sort((x, y) => Math.abs(x.level - ex.level) - Math.abs(y.level - ex.level));
}

export function generatePlan(a) {
  const exp = a.experience;
  const days = Math.min(Number(a.days), DAY_CAP[exp]);
  const split = days >= 4 && (exp === 'intermediate' || exp === 'regular') ? 'upperlower' : 'fullbody';
  const ctx = makeCtx(a);
  const levelCap = ctx.levelCap;

  const minutes = Number(a.minutes);
  const counts = COUNTS[minutes];
  const beginner = exp === 'none' || exp === 'returning';
  const mainSets = beginner || a.goal === 'maintain' ? 2 : 3;
  const restCap = minutes <= 10 ? 45 : 90;

  const names = sequenceFor(split, days);
  const dayNumbers = TRAIN_DAYS[days];

  const sessions = names.map((key, idx) => {
    const used = new Set();
    const warm = [];
    const cool = [];

    // warm-up and cool-down are chosen first so their time is counted
    for (let i = 0; i < counts.warm; i++) {
      const ex = pick('warmup', ctx, used, idx + i);
      if (ex) { used.add(ex.id); warm.push(makeItem(ex, 'warmup', 1, 0)); }
    }
    for (let i = 0; i < counts.cool; i++) {
      const ex = pick('stretch', ctx, used, idx + i);
      if (ex) { used.add(ex.id); cool.push(makeItem(ex, 'cooldown', 1, 0)); }
    }

    // main work: the template first, then extra slots until the session
    // is close to the time the user asked for (limits can remove exercises)
    const slots = [...TEMPLATES[key]];
    if (a.goal === 'cut' && minutes >= 20) slots[counts.main - 1] = 'cardio';
    const extended = [...slots, ...TEMPLATES[key], 'core', 'legs', 'glutes', 'back', 'cardio', 'chest', 'shoulders'];
    const mainItems = [];
    for (let si = 0; si < extended.length && mainItems.length < MAX_MAIN; si++) {
      const enough = mainItems.length >= counts.main &&
        estimateMinutes([...warm, ...mainItems, ...cool]) >= minutes * 0.9;
      if (enough) break;
      const group = extended[si];
      const ex = pick(group, ctx, used, idx);
      if (!ex) continue;
      used.add(ex.id);
      mainItems.push(makeItem(ex, 'main', group === 'cardio' ? 2 : mainSets, restCap));
    }

    const items = [...warm, ...mainItems, ...cool];
    const groups = [...new Set(mainItems.map((it) => EXERCISES.find((e) => e.id === it.exId).group))];
    return {
      id: 's' + (idx + 1), templateKey: key, dayOfWeek: dayNumbers[idx],
      groups, items, estMin: estimateMinutes(items),
    };
  });

  return {
    id: 'current', schemaVersion: 1, createdAt: new Date().toISOString(),
    split, daysRequested: Number(a.days), daysEffective: days,
    capped: days < Number(a.days), levelCap, sessions,
  };
}
