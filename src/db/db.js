// Local storage layer (IndexedDB). All user data stays on the phone.
// Every store uses { id } as key. Add new stores by raising DB_VERSION.
const DB_NAME = 'fitjourney';
const DB_VERSION = 1;
const STORES = [
  'profile', 'settings', 'plans', 'sessions', 'weights',
  'measurements', 'foodLog', 'xp', 'achievements', 'challenges',
];

let dbPromise;

function open() {
  if (!dbPromise) {
    dbPromise = new Promise((resolve, reject) => {
      const req = indexedDB.open(DB_NAME, DB_VERSION);
      req.onupgradeneeded = () => {
        const db = req.result;
        STORES.forEach((s) => {
          if (!db.objectStoreNames.contains(s)) db.createObjectStore(s, { keyPath: 'id' });
        });
      };
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject(req.error);
    });
  }
  return dbPromise;
}

function run(store, mode, fn) {
  return open().then(
    (db) =>
      new Promise((resolve, reject) => {
        const t = db.transaction(store, mode);
        const req = fn(t.objectStore(store));
        t.oncomplete = () => resolve(req ? req.result : undefined);
        t.onerror = () => reject(t.error);
        t.onabort = () => reject(t.error);
      })
  );
}

export const get = (store, id) => run(store, 'readonly', (o) => o.get(id));
export const put = (store, value) => run(store, 'readwrite', (o) => o.put(value));
export const all = (store) => run(store, 'readonly', (o) => o.getAll());
export const remove = (store, id) => run(store, 'readwrite', (o) => o.delete(id));

export async function getSetting(key) {
  const r = await get('settings', key);
  return r ? r.value : undefined;
}
export const setSetting = (key, value) => put('settings', { id: key, value });

// Ask Android to keep our data (best effort).
export function requestPersistence() {
  if (navigator.storage && navigator.storage.persist) navigator.storage.persist().catch(() => {});
}

// Used later for backup/export.
export async function exportAll() {
  const out = {};
  for (const s of STORES) out[s] = await all(s);
  return out;
}
