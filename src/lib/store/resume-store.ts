"use client";

import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import type {
  Resume,
  PersonalInfo,
  Experience,
  Education,
  Skill,
  Certification,
  Project,
  Language,
  Reference,
  CustomSection,
} from "@/lib/schema";
import { createEmptyResume } from "@/lib/schema";
import {
  saveResume as dbSave,
  getAllResumes as dbGetAll,
  getResume as dbGet,
  deleteResume as dbDelete,
  duplicateResume as dbDuplicate,
} from "@/lib/db";

// ============================================================
// HISTORY (UNDO/REDO)
// ============================================================

const MAX_HISTORY = 50;

interface HistoryEntry {
  state: Resume;
  timestamp: number;
}

// ============================================================
// STORE TYPES
// ============================================================

export interface ResumeState {
  // Current state
  currentResume: Resume;
  savedResumeId: string | null;

  // History
  past: HistoryEntry[];
  future: HistoryEntry[];

  // UI state
  isDirty: boolean;
  isSaving: boolean;
  lastSavedAt: number | null;

  // Section visibility
  sectionVisibility: Record<string, boolean>;

  // Resume list
  resumeList: Resume[];
  isLoadingList: boolean;
}

export interface ResumeActions {
  // Resume lifecycle
  newResume: () => void;
  loadResume: (id: string) => Promise<void>;
  loadResumeList: () => Promise<void>;
  saveCurrentResume: () => Promise<void>;
  deleteResume: (id: string) => Promise<void>;
  duplicateResume: (id: string) => Promise<void>;

  // Undo/Redo
  undo: () => void;
  redo: () => void;
  canUndo: () => boolean;
  canRedo: () => boolean;

  // Personal Info
  updatePersonalInfo: (info: Partial<PersonalInfo>) => void;

  // Summary
  updateSummary: (summary: string) => void;

  // Experience
  addExperience: () => void;
  updateExperience: (id: string, data: Partial<Experience>) => void;
  removeExperience: (id: string) => void;
  reorderExperiences: (fromIndex: number, toIndex: number) => void;

  // Education
  addEducation: () => void;
  updateEducation: (id: string, data: Partial<Education>) => void;
  removeEducation: (id: string) => void;
  reorderEducation: (fromIndex: number, toIndex: number) => void;

  // Skills
  addSkill: () => void;
  updateSkill: (id: string, data: Partial<Skill>) => void;
  removeSkill: (id: string) => void;
  reorderSkills: (fromIndex: number, toIndex: number) => void;

  // Certifications
  addCertification: () => void;
  updateCertification: (id: string, data: Partial<Certification>) => void;
  removeCertification: (id: string) => void;

  // Projects
  addProject: () => void;
  updateProject: (id: string, data: Partial<Project>) => void;
  removeProject: (id: string) => void;
  reorderProjects: (fromIndex: number, toIndex: number) => void;

  // Languages
  addLanguage: () => void;
  updateLanguage: (id: string, data: Partial<Language>) => void;
  removeLanguage: (id: string) => void;

  // References
  addReference: () => void;
  updateReference: (id: string, data: Partial<Reference>) => void;
  removeReference: (id: string) => void;

  // Custom Sections
  addCustomSection: () => void;
  updateCustomSection: (id: string, data: Partial<CustomSection>) => void;
  removeCustomSection: (id: string) => void;
  addCustomSectionItem: (sectionId: string) => void;
  updateCustomSectionItem: (
    sectionId: string,
    itemId: string,
    data: Record<string, unknown>,
  ) => void;
  removeCustomSectionItem: (sectionId: string, itemId: string) => void;

  // Meta
  updateMeta: (data: Partial<Resume["meta"]>) => void;

  // Section visibility
  setSectionVisibility: (section: string, visible: boolean) => void;
  setSectionOrder: (order: string[]) => void;

  // Bulk operations
  importResume: (resume: Resume) => void;
  resetResume: () => void;
}

export type ResumeStore = ResumeState & ResumeActions;

// ============================================================
// HELPERS
// ============================================================

const generateId = (): string =>
  crypto.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;

function pushHistory(
  past: HistoryEntry[],
  state: Resume,
): HistoryEntry[] {
  const entry: HistoryEntry = { state: JSON.parse(JSON.stringify(state)), timestamp: Date.now() };
  return [...past.slice(-(MAX_HISTORY - 1)), entry];
}

// ============================================================
// STORE
// ============================================================

export const useResumeStore = create<ResumeStore>()(
  immer((set, get) => ({
    // Initial state
    currentResume: createEmptyResume(),
    savedResumeId: null,
    past: [],
    future: [],
    isDirty: false,
    isSaving: false,
    lastSavedAt: null,
    sectionVisibility: {
      personalInfo: true,
      summary: true,
      experience: true,
      education: true,
      skills: true,
      certifications: true,
      projects: true,
      languages: true,
      references: false,
      customSections: true,
    },
    resumeList: [],
    isLoadingList: false,

    // ============================================================
    // RESUME LIFECYCLE
    // ============================================================

    newResume: () => {
      set((state) => {
        state.past = pushHistory(state.past, state.currentResume);
        state.future = [];
        state.currentResume = createEmptyResume();
        state.savedResumeId = null;
        state.isDirty = false;
      });
    },

    loadResume: async (id: string) => {
      const resume = await dbGet(id);
      if (resume) {
        set((state) => {
          state.past = pushHistory(state.past, state.currentResume);
          state.future = [];
          state.currentResume = resume;
          state.savedResumeId = id;
          state.isDirty = false;
        });
      }
    },

    loadResumeList: async () => {
      set((state) => {
        state.isLoadingList = true;
      });
      const list = await dbGetAll();
      set((state) => {
        state.resumeList = list;
        state.isLoadingList = false;
      });
    },

    saveCurrentResume: async () => {
      const { currentResume } = get();
      set((state) => {
        state.isSaving = true;
      });
      await dbSave(currentResume);
      set((state) => {
        state.isSaving = false;
        state.isDirty = false;
        state.savedResumeId = currentResume.meta.id;
        state.lastSavedAt = Date.now();
      });
    },

    deleteResume: async (id: string) => {
      await dbDelete(id);
      set((state) => {
        state.resumeList = state.resumeList.filter((r) => r.meta.id !== id);
        if (state.savedResumeId === id) {
          state.savedResumeId = null;
        }
      });
    },

    duplicateResume: async (id: string) => {
      const { loadResumeList } = get();
      await dbDuplicate(id, generateId());
      await loadResumeList();
    },

    // ============================================================
    // UNDO / REDO
    // ============================================================

    undo: () => {
      set((state) => {
        if (state.past.length === 0) return;
        const previous = state.past[state.past.length - 1];
        state.future = [
          {
            state: JSON.parse(JSON.stringify(state.currentResume)),
            timestamp: Date.now(),
          },
          ...state.future,
        ];
        state.past = state.past.slice(0, -1);
        state.currentResume = previous.state;
        state.isDirty = true;
      });
    },

    redo: () => {
      set((state) => {
        if (state.future.length === 0) return;
        const next = state.future[0];
        state.past = pushHistory(state.past, state.currentResume);
        state.future = state.future.slice(1);
        state.currentResume = next.state;
        state.isDirty = true;
      });
    },

    canUndo: () => get().past.length > 0,
    canRedo: () => get().future.length > 0,

    // ============================================================
    // PERSONAL INFO
    // ============================================================

    updatePersonalInfo: (info) => {
      set((state) => {
        state.past = pushHistory(state.past, state.currentResume);
        state.future = [];
        Object.assign(state.currentResume.personalInfo, info);
        state.isDirty = true;
      });
    },

    // ============================================================
    // SUMMARY
    // ============================================================

    updateSummary: (summary) => {
      set((state) => {
        state.past = pushHistory(state.past, state.currentResume);
        state.future = [];
        state.currentResume.summary = summary;
        state.isDirty = true;
      });
    },

    // ============================================================
    // EXPERIENCE
    // ============================================================

    addExperience: () => {
      const newExp: Experience = {
        id: generateId(),
        company: "",
        position: "",
        location: "",
        startDate: { month: 1, year: new Date().getFullYear() },
        current: false,
        description: "",
        bullets: [""],
      };
      set((state) => {
        state.past = pushHistory(state.past, state.currentResume);
        state.future = [];
        state.currentResume.experience.push(newExp);
        state.isDirty = true;
      });
    },

    updateExperience: (id, data) => {
      set((state) => {
        state.past = pushHistory(state.past, state.currentResume);
        state.future = [];
        const idx = state.currentResume.experience.findIndex((e) => e.id === id);
        if (idx !== -1) {
          Object.assign(state.currentResume.experience[idx], data);
        }
        state.isDirty = true;
      });
    },

    removeExperience: (id) => {
      set((state) => {
        state.past = pushHistory(state.past, state.currentResume);
        state.future = [];
        state.currentResume.experience = state.currentResume.experience.filter(
          (e) => e.id !== id,
        );
        state.isDirty = true;
      });
    },

    reorderExperiences: (fromIndex, toIndex) => {
      set((state) => {
        state.past = pushHistory(state.past, state.currentResume);
        state.future = [];
        const items = [...state.currentResume.experience];
        const [moved] = items.splice(fromIndex, 1);
        items.splice(toIndex, 0, moved);
        state.currentResume.experience = items;
        state.isDirty = true;
      });
    },

    // ============================================================
    // EDUCATION
    // ============================================================

    addEducation: () => {
      const newEdu: Education = {
        id: generateId(),
        school: "",
        degree: "",
        field: "",
        location: "",
        startDate: { month: 1, year: new Date().getFullYear() },
        current: false,
        gpa: "",
        honors: "",
      };
      set((state) => {
        state.past = pushHistory(state.past, state.currentResume);
        state.future = [];
        state.currentResume.education.push(newEdu);
        state.isDirty = true;
      });
    },

    updateEducation: (id, data) => {
      set((state) => {
        state.past = pushHistory(state.past, state.currentResume);
        state.future = [];
        const idx = state.currentResume.education.findIndex((e) => e.id === id);
        if (idx !== -1) {
          Object.assign(state.currentResume.education[idx], data);
        }
        state.isDirty = true;
      });
    },

    removeEducation: (id) => {
      set((state) => {
        state.past = pushHistory(state.past, state.currentResume);
        state.future = [];
        state.currentResume.education = state.currentResume.education.filter(
          (e) => e.id !== id,
        );
        state.isDirty = true;
      });
    },

    reorderEducation: (fromIndex, toIndex) => {
      set((state) => {
        state.past = pushHistory(state.past, state.currentResume);
        state.future = [];
        const items = [...state.currentResume.education];
        const [moved] = items.splice(fromIndex, 1);
        items.splice(toIndex, 0, moved);
        state.currentResume.education = items;
        state.isDirty = true;
      });
    },

    // ============================================================
    // SKILLS
    // ============================================================

    addSkill: () => {
      const newSkill: Skill = {
        id: generateId(),
        category: "",
        skills: [""],
      };
      set((state) => {
        state.past = pushHistory(state.past, state.currentResume);
        state.future = [];
        state.currentResume.skills.push(newSkill);
        state.isDirty = true;
      });
    },

    updateSkill: (id, data) => {
      set((state) => {
        state.past = pushHistory(state.past, state.currentResume);
        state.future = [];
        const idx = state.currentResume.skills.findIndex((s) => s.id === id);
        if (idx !== -1) {
          Object.assign(state.currentResume.skills[idx], data);
        }
        state.isDirty = true;
      });
    },

    removeSkill: (id) => {
      set((state) => {
        state.past = pushHistory(state.past, state.currentResume);
        state.future = [];
        state.currentResume.skills = state.currentResume.skills.filter(
          (s) => s.id !== id,
        );
        state.isDirty = true;
      });
    },

    reorderSkills: (fromIndex, toIndex) => {
      set((state) => {
        state.past = pushHistory(state.past, state.currentResume);
        state.future = [];
        const items = [...state.currentResume.skills];
        const [moved] = items.splice(fromIndex, 1);
        items.splice(toIndex, 0, moved);
        state.currentResume.skills = items;
        state.isDirty = true;
      });
    },

    // ============================================================
    // CERTIFICATIONS
    // ============================================================

    addCertification: () => {
      const newCert: Certification = {
        id: generateId(),
        name: "",
        issuer: "",
        url: "",
        description: "",
      };
      set((state) => {
        state.past = pushHistory(state.past, state.currentResume);
        state.future = [];
        state.currentResume.certifications.push(newCert);
        state.isDirty = true;
      });
    },

    updateCertification: (id, data) => {
      set((state) => {
        state.past = pushHistory(state.past, state.currentResume);
        state.future = [];
        const idx = state.currentResume.certifications.findIndex(
          (c) => c.id === id,
        );
        if (idx !== -1) {
          Object.assign(state.currentResume.certifications[idx], data);
        }
        state.isDirty = true;
      });
    },

    removeCertification: (id) => {
      set((state) => {
        state.past = pushHistory(state.past, state.currentResume);
        state.future = [];
        state.currentResume.certifications =
          state.currentResume.certifications.filter((c) => c.id !== id);
        state.isDirty = true;
      });
    },

    // ============================================================
    // PROJECTS
    // ============================================================

    addProject: () => {
      const newProject: Project = {
        id: generateId(),
        name: "",
        description: "",
        url: "",
        technologies: [""],
        current: false,
      };
      set((state) => {
        state.past = pushHistory(state.past, state.currentResume);
        state.future = [];
        state.currentResume.projects.push(newProject);
        state.isDirty = true;
      });
    },

    updateProject: (id, data) => {
      set((state) => {
        state.past = pushHistory(state.past, state.currentResume);
        state.future = [];
        const idx = state.currentResume.projects.findIndex((p) => p.id === id);
        if (idx !== -1) {
          Object.assign(state.currentResume.projects[idx], data);
        }
        state.isDirty = true;
      });
    },

    removeProject: (id) => {
      set((state) => {
        state.past = pushHistory(state.past, state.currentResume);
        state.future = [];
        state.currentResume.projects = state.currentResume.projects.filter(
          (p) => p.id !== id,
        );
        state.isDirty = true;
      });
    },

    reorderProjects: (fromIndex, toIndex) => {
      set((state) => {
        state.past = pushHistory(state.past, state.currentResume);
        state.future = [];
        const items = [...state.currentResume.projects];
        const [moved] = items.splice(fromIndex, 1);
        items.splice(toIndex, 0, moved);
        state.currentResume.projects = items;
        state.isDirty = true;
      });
    },

    // ============================================================
    // LANGUAGES
    // ============================================================

    addLanguage: () => {
      const newLang: Language = {
        id: generateId(),
        name: "",
        proficiency: "intermediate",
      };
      set((state) => {
        state.past = pushHistory(state.past, state.currentResume);
        state.future = [];
        state.currentResume.languages.push(newLang);
        state.isDirty = true;
      });
    },

    updateLanguage: (id, data) => {
      set((state) => {
        state.past = pushHistory(state.past, state.currentResume);
        state.future = [];
        const idx = state.currentResume.languages.findIndex((l) => l.id === id);
        if (idx !== -1) {
          Object.assign(state.currentResume.languages[idx], data);
        }
        state.isDirty = true;
      });
    },

    removeLanguage: (id) => {
      set((state) => {
        state.past = pushHistory(state.past, state.currentResume);
        state.future = [];
        state.currentResume.languages = state.currentResume.languages.filter(
          (l) => l.id !== id,
        );
        state.isDirty = true;
      });
    },

    // ============================================================
    // REFERENCES
    // ============================================================

    addReference: () => {
      const newRef: Reference = {
        id: generateId(),
        name: "",
        company: "",
        email: "",
        phone: "",
      };
      set((state) => {
        state.past = pushHistory(state.past, state.currentResume);
        state.future = [];
        state.currentResume.references.push(newRef);
        state.isDirty = true;
      });
    },

    updateReference: (id, data) => {
      set((state) => {
        state.past = pushHistory(state.past, state.currentResume);
        state.future = [];
        const idx = state.currentResume.references.findIndex(
          (r) => r.id === id,
        );
        if (idx !== -1) {
          Object.assign(state.currentResume.references[idx], data);
        }
        state.isDirty = true;
      });
    },

    removeReference: (id) => {
      set((state) => {
        state.past = pushHistory(state.past, state.currentResume);
        state.future = [];
        state.currentResume.references = state.currentResume.references.filter(
          (r) => r.id !== id,
        );
        state.isDirty = true;
      });
    },

    // ============================================================
    // CUSTOM SECTIONS
    // ============================================================

    addCustomSection: () => {
      const newSection: CustomSection = {
        id: generateId(),
        title: "",
        items: [],
      };
      set((state) => {
        state.past = pushHistory(state.past, state.currentResume);
        state.future = [];
        state.currentResume.customSections.push(newSection);
        state.isDirty = true;
      });
    },

    updateCustomSection: (id, data) => {
      set((state) => {
        state.past = pushHistory(state.past, state.currentResume);
        state.future = [];
        const idx = state.currentResume.customSections.findIndex(
          (cs) => cs.id === id,
        );
        if (idx !== -1) {
          Object.assign(state.currentResume.customSections[idx], data);
        }
        state.isDirty = true;
      });
    },

    removeCustomSection: (id) => {
      set((state) => {
        state.past = pushHistory(state.past, state.currentResume);
        state.future = [];
        state.currentResume.customSections =
          state.currentResume.customSections.filter((cs) => cs.id !== id);
        state.isDirty = true;
      });
    },

    addCustomSectionItem: (sectionId) => {
      set((state) => {
        state.past = pushHistory(state.past, state.currentResume);
        state.future = [];
        const section = state.currentResume.customSections.find(
          (cs) => cs.id === sectionId,
        );
        if (section) {
          section.items.push({
            id: generateId(),
            title: "",
            subtitle: "",
            date: "",
            description: "",
          });
        }
        state.isDirty = true;
      });
    },

    updateCustomSectionItem: (sectionId, itemId, data) => {
      set((state) => {
        state.past = pushHistory(state.past, state.currentResume);
        state.future = [];
        const section = state.currentResume.customSections.find(
          (cs) => cs.id === sectionId,
        );
        if (section) {
          const item = section.items.find((i) => i.id === itemId);
          if (item) {
            Object.assign(item, data);
          }
        }
        state.isDirty = true;
      });
    },

    removeCustomSectionItem: (sectionId, itemId) => {
      set((state) => {
        state.past = pushHistory(state.past, state.currentResume);
        state.future = [];
        const section = state.currentResume.customSections.find(
          (cs) => cs.id === sectionId,
        );
        if (section) {
          section.items = section.items.filter((i) => i.id !== itemId);
        }
        state.isDirty = true;
      });
    },

    // ============================================================
    // META
    // ============================================================

    updateMeta: (data) => {
      set((state) => {
        state.past = pushHistory(state.past, state.currentResume);
        state.future = [];
        Object.assign(state.currentResume.meta, data);
        state.isDirty = true;
      });
    },

    // ============================================================
    // SECTION VISIBILITY & ORDER
    // ============================================================

    setSectionVisibility: (section, visible) => {
      set((state) => {
        state.past = pushHistory(state.past, state.currentResume);
        state.future = [];
        state.sectionVisibility[section] = visible;
        state.isDirty = true;
      });
    },

    setSectionOrder: (order) => {
      set((state) => {
        state.past = pushHistory(state.past, state.currentResume);
        state.future = [];
        state.currentResume.meta.sectionOrder = order;
        state.isDirty = true;
      });
    },

    // ============================================================
    // BULK OPERATIONS
    // ============================================================

    importResume: (resume) => {
      set((state) => {
        state.past = pushHistory(state.past, state.currentResume);
        state.future = [];
        state.currentResume = resume;
        state.savedResumeId = null;
        state.isDirty = true;
      });
    },

    resetResume: () => {
      set((state) => {
        state.past = pushHistory(state.past, state.currentResume);
        state.future = [];
        state.currentResume = createEmptyResume();
        state.savedResumeId = null;
        state.isDirty = false;
      });
    },
  })),
);
