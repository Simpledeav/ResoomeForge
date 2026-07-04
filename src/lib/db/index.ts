import { openDB, type IDBPDatabase } from "idb";
import type { Resume } from "@/lib/schema";
import type { CoverLetter } from "@/lib/schema/cover-letter";

const DB_NAME = "resumeforge";
const DB_VERSION = 3;
const RESUMES_STORE = "resumes";
const COVER_LETTERS_STORE = "coverLetters";

let dbInstance: IDBPDatabase<unknown> | null = null;

async function getDb(): Promise<IDBPDatabase<unknown>> {
  if (dbInstance) return dbInstance;

  dbInstance = await openDB(DB_NAME, DB_VERSION, {
    upgrade(db, oldVersion) {
      // ---- RESUMES STORE ----
      if (oldVersion < 1) {
        // Fresh install v1: create with WRONG keypath (will be fixed in v2)
        const store = db.createObjectStore(RESUMES_STORE, {
          keyPath: "id",
          autoIncrement: false,
        });
        store.createIndex("name", "meta.name", { unique: false });
        store.createIndex("updatedAt", "meta.updatedAt", { unique: false });
        store.createIndex("createdAt", "meta.createdAt", { unique: false });
      }

      if (oldVersion < 2) {
        // Upgrade to v2: fix keyPath from "id" to "meta.id"
        if (db.objectStoreNames.contains(RESUMES_STORE)) {
          db.deleteObjectStore(RESUMES_STORE);
        }
        const store = db.createObjectStore(RESUMES_STORE, {
          keyPath: "meta.id",
          autoIncrement: false,
        });
        store.createIndex("name", "meta.name", { unique: false });
        store.createIndex("updatedAt", "meta.updatedAt", { unique: false });
        store.createIndex("createdAt", "meta.createdAt", { unique: false });
      }

      if (oldVersion < 3) {
        // Upgrade to v3: add coverLetters store
        if (!db.objectStoreNames.contains(COVER_LETTERS_STORE)) {
          const store = db.createObjectStore(COVER_LETTERS_STORE, {
            keyPath: "meta.id",
            autoIncrement: false,
          });
          store.createIndex("name", "meta.name", { unique: false });
          store.createIndex("updatedAt", "meta.updatedAt", { unique: false });
          store.createIndex("createdAt", "meta.createdAt", { unique: false });
          store.createIndex("linkedResumeId", "meta.linkedResumeId", { unique: false });
        }
      }
    },
  });

  return dbInstance;
}

// ============================================================
// RESUME CRUD
// ============================================================

export async function getAllResumes(): Promise<Resume[]> {
  const db = await getDb();
  return (await db.getAll(RESUMES_STORE)) as Resume[];
}

export async function getResume(id: string): Promise<Resume | undefined> {
  const db = await getDb();
  return (await db.get(RESUMES_STORE, id)) as Resume | undefined;
}

export async function saveResume(resume: Resume): Promise<void> {
  const db = await getDb();
  const data = {
    ...resume,
    meta: { ...resume.meta, updatedAt: Date.now() },
  };
  await db.put(RESUMES_STORE, data);
}

export async function deleteResume(id: string): Promise<void> {
  const db = await getDb();
  await db.delete(RESUMES_STORE, id);
}

export async function duplicateResume(
  id: string,
  newId: string,
): Promise<Resume | undefined> {
  const original = await getResume(id);
  if (!original) return undefined;
  const duplicate: Resume = {
    ...JSON.parse(JSON.stringify(original)),
    meta: {
      ...original.meta,
      id: newId,
      name: `${original.meta.name} (Copy)`,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    },
  };
  await saveResume(duplicate);
  return duplicate;
}

export async function renameResume(
  id: string,
  newName: string,
): Promise<void> {
  const db = await getDb();
  const resume = await db.get(RESUMES_STORE, id);
  if (!resume) return;
  await db.put(RESUMES_STORE, {
    ...resume,
    meta: { ...(resume as Resume).meta, name: newName, updatedAt: Date.now() },
  });
}

export async function getResumeCount(): Promise<number> {
  const db = await getDb();
  return db.count(RESUMES_STORE);
}

export async function clearAllResumes(): Promise<void> {
  const db = await getDb();
  await db.clear(RESUMES_STORE);
}

// ============================================================
// COVER LETTER CRUD
// ============================================================

export async function getAllCoverLetters(): Promise<CoverLetter[]> {
  const db = await getDb();
  return (await db.getAll(COVER_LETTERS_STORE)) as CoverLetter[];
}

export async function getCoverLetter(id: string): Promise<CoverLetter | undefined> {
  const db = await getDb();
  return (await db.get(COVER_LETTERS_STORE, id)) as CoverLetter | undefined;
}

export async function saveCoverLetter(letter: CoverLetter): Promise<void> {
  const db = await getDb();
  const data = {
    ...letter,
    meta: { ...letter.meta, updatedAt: Date.now() },
  };
  await db.put(COVER_LETTERS_STORE, data);
}

export async function deleteCoverLetter(id: string): Promise<void> {
  const db = await getDb();
  await db.delete(COVER_LETTERS_STORE, id);
}

export async function duplicateCoverLetter(
  id: string,
  newId: string,
): Promise<CoverLetter | undefined> {
  const original = await getCoverLetter(id);
  if (!original) return undefined;
  const duplicate: CoverLetter = {
    ...JSON.parse(JSON.stringify(original)),
    meta: {
      ...original.meta,
      id: newId,
      name: `${original.meta.name} (Copy)`,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    },
  };
  await saveCoverLetter(duplicate);
  return duplicate;
}

export async function getCoverLettersByResumeId(
  resumeId: string,
): Promise<CoverLetter[]> {
  const db = await getDb();
  const items = await db.getAllFromIndex(
    COVER_LETTERS_STORE,
    "linkedResumeId",
    resumeId,
  );
  return items as CoverLetter[];
}

// ============================================================
// AUTO-SAVE DEBOUNCE UTILITY
// ============================================================

const saveQueue = new Map<string, NodeJS.Timeout>();

export function debouncedSave(
  resume: Resume,
  delayMs = 1000,
): Promise<void> {
  return new Promise((resolve) => {
    const existing = saveQueue.get(resume.meta.id);
    if (existing) clearTimeout(existing);
    const timeout = setTimeout(async () => {
      saveQueue.delete(resume.meta.id);
      await saveResume(resume);
      resolve();
    }, delayMs);
    saveQueue.set(resume.meta.id, timeout);
  });
}

export function cancelPendingSave(id: string): void {
  const existing = saveQueue.get(id);
  if (existing) {
    clearTimeout(existing);
    saveQueue.delete(id);
  }
}
