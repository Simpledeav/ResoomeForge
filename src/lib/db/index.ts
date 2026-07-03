import { openDB, type IDBPDatabase } from "idb";
import type { Resume } from "@/lib/schema";

const DB_NAME = "resumeforge";
const DB_VERSION = 1;
const STORE_NAME = "resumes";

let dbInstance: IDBPDatabase<unknown> | null = null;

async function getDb(): Promise<IDBPDatabase<unknown>> {
  if (dbInstance) return dbInstance;

  dbInstance = await openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        const store = db.createObjectStore(STORE_NAME, {
          keyPath: "id",
          autoIncrement: false,
        });
        store.createIndex("name", "meta.name", { unique: false });
        store.createIndex("updatedAt", "meta.updatedAt", { unique: false });
        store.createIndex("createdAt", "meta.createdAt", { unique: false });
      }
    },
  });

  return dbInstance;
}

// ============================================================
// CRUD OPERATIONS
// ============================================================

export async function getAllResumes(): Promise<Resume[]> {
  const db = await getDb();
  const resumes = await db.getAll(STORE_NAME);
  return resumes as Resume[];
}

export async function getResume(id: string): Promise<Resume | undefined> {
  const db = await getDb();
  const resume = await db.get(STORE_NAME, id);
  return resume as Resume | undefined;
}

export async function saveResume(resume: Resume): Promise<void> {
  const db = await getDb();
  const data = {
    ...resume,
    meta: {
      ...resume.meta,
      updatedAt: Date.now(),
    },
  };
  await db.put(STORE_NAME, data);
}

export async function deleteResume(id: string): Promise<void> {
  const db = await getDb();
  await db.delete(STORE_NAME, id);
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
  const resume = await db.get(STORE_NAME, id);
  if (!resume) return;

  await db.put(STORE_NAME, {
    ...resume,
    meta: { ...(resume as Resume).meta, name: newName, updatedAt: Date.now() },
  });
}

export async function getResumeCount(): Promise<number> {
  const db = await getDb();
  return db.count(STORE_NAME);
}

export async function clearAllResumes(): Promise<void> {
  const db = await getDb();
  await db.clear(STORE_NAME);
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
