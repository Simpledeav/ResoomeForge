"use client";

import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import type { CoverLetter } from "@/lib/schema/cover-letter";
import { createEmptyCoverLetter } from "@/lib/schema/cover-letter";
import {
  saveCoverLetter as dbSave,
  getAllCoverLetters as dbGetAll,
  getCoverLetter as dbGet,
  deleteCoverLetter as dbDelete,
  duplicateCoverLetter as dbDuplicate,
} from "@/lib/db";

// ============================================================
// STORE TYPES
// ============================================================

export interface CoverLetterState {
  currentLetter: CoverLetter;
  savedLetterId: string | null;
  isDirty: boolean;
  isSaving: boolean;
  lastSavedAt: number | null;
  letterList: CoverLetter[];
  isLoadingList: boolean;
}

export interface CoverLetterActions {
  newLetter: () => void;
  loadLetter: (id: string) => Promise<void>;
  loadLetterList: () => Promise<void>;
  saveCurrentLetter: () => Promise<void>;
  deleteLetter: (id: string) => Promise<void>;
  duplicateLetter: (id: string) => Promise<void>;
  linkToResume: (resumeId: string) => void;

  // Content updates
  updateMeta: (data: Partial<CoverLetter["meta"]>) => void;
  updateRecipient: (data: { recipientName?: string; recipientTitle?: string; company?: string; companyAddress?: string }) => void;
  updateGreeting: (greeting: string) => void;
  updateBodyParagraph: (index: number, text: string) => void;
  addBodyParagraph: () => void;
  removeBodyParagraph: (index: number) => void;
  updateSignOff: (signOff: string) => void;
  updateSender: (data: { senderName?: string; senderTitle?: string; senderEmail?: string; senderPhone?: string }) => void;

  // Bulk
  importLetter: (letter: CoverLetter) => void;
  resetLetter: () => void;
}

export type CoverLetterStore = CoverLetterState & CoverLetterActions;

// ============================================================
// STORE
// ============================================================

export const useCoverLetterStore = create<CoverLetterStore>()(
  immer((set, get) => ({
    currentLetter: createEmptyCoverLetter(),
    savedLetterId: null,
    isDirty: false,
    isSaving: false,
    lastSavedAt: null,
    letterList: [],
    isLoadingList: false,

    // ============================================================
    // LIFECYCLE
    // ============================================================

    newLetter: () => {
      set((state) => {
        state.currentLetter = createEmptyCoverLetter();
        state.savedLetterId = null;
        state.isDirty = false;
      });
    },

    loadLetter: async (id: string) => {
      const letter = await dbGet(id);
      if (letter) {
        set((state) => {
          state.currentLetter = letter;
          state.savedLetterId = id;
          state.isDirty = false;
        });
      }
    },

    loadLetterList: async () => {
      set((state) => { state.isLoadingList = true; });
      try {
        const list = await dbGetAll();
        set((state) => {
          state.letterList = list;
          state.isLoadingList = false;
        });
      } catch (err) {
        console.error("Failed to load cover letter list:", err);
        set((state) => { state.isLoadingList = false; });
      }
    },

    saveCurrentLetter: async () => {
      const { currentLetter } = get();
      set((state) => { state.isSaving = true; });
      try {
        await dbSave(currentLetter);
        set((state) => {
          state.isSaving = false;
          state.isDirty = false;
          state.savedLetterId = currentLetter.meta.id;
          state.lastSavedAt = Date.now();
        });
      } catch (err) {
        console.error("Failed to save cover letter:", err);
        set((state) => { state.isSaving = false; });
      }
    },

    deleteLetter: async (id: string) => {
      await dbDelete(id);
      set((state) => {
        state.letterList = state.letterList.filter((l) => l.meta.id !== id);
        if (state.savedLetterId === id) state.savedLetterId = null;
      });
    },

    duplicateLetter: async (id: string) => {
      const newId = crypto.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(36).slice(2)}`;
      await dbDuplicate(id, newId);
      await get().loadLetterList();
    },

    linkToResume: (resumeId: string) => {
      set((state) => {
        state.currentLetter.meta.linkedResumeId = resumeId;
        state.isDirty = true;
      });
    },

    // ============================================================
    // CONTENT UPDATES
    // ============================================================

    updateMeta: (data) => {
      set((state) => {
        Object.assign(state.currentLetter.meta, data);
        state.isDirty = true;
      });
    },

    updateRecipient: (data) => {
      set((state) => {
        if (data.recipientName !== undefined) state.currentLetter.recipientName = data.recipientName;
        if (data.recipientTitle !== undefined) state.currentLetter.recipientTitle = data.recipientTitle;
        if (data.company !== undefined) state.currentLetter.company = data.company;
        if (data.companyAddress !== undefined) state.currentLetter.companyAddress = data.companyAddress;
        state.isDirty = true;
      });
    },

    updateGreeting: (greeting) => {
      set((state) => {
        state.currentLetter.greeting = greeting;
        state.isDirty = true;
      });
    },

    updateBodyParagraph: (index, text) => {
      set((state) => {
        if (state.currentLetter.bodyParagraphs[index] !== undefined) {
          state.currentLetter.bodyParagraphs[index] = text;
          state.isDirty = true;
        }
      });
    },

    addBodyParagraph: () => {
      set((state) => {
        state.currentLetter.bodyParagraphs.push("");
        state.isDirty = true;
      });
    },

    removeBodyParagraph: (index) => {
      set((state) => {
        if (state.currentLetter.bodyParagraphs.length > 1) {
          state.currentLetter.bodyParagraphs.splice(index, 1);
          state.isDirty = true;
        }
      });
    },

    updateSignOff: (signOff) => {
      set((state) => {
        state.currentLetter.signOff = signOff;
        state.isDirty = true;
      });
    },

    updateSender: (data) => {
      set((state) => {
        if (data.senderName !== undefined) state.currentLetter.senderName = data.senderName;
        if (data.senderTitle !== undefined) state.currentLetter.senderTitle = data.senderTitle;
        if (data.senderEmail !== undefined) state.currentLetter.senderEmail = data.senderEmail;
        if (data.senderPhone !== undefined) state.currentLetter.senderPhone = data.senderPhone;
        state.isDirty = true;
      });
    },

    // ============================================================
    // BULK
    // ============================================================

    importLetter: (letter) => {
      set((state) => {
        state.currentLetter = letter;
        state.savedLetterId = null;
        state.isDirty = true;
      });
    },

    resetLetter: () => {
      set((state) => {
        state.currentLetter = createEmptyCoverLetter();
        state.savedLetterId = null;
        state.isDirty = false;
      });
    },
  })),
);
