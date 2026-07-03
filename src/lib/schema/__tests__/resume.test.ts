import { describe, it, expect } from "vitest";
import {
  PersonalInfoSchema,
  ExperienceSchema,
  EducationSchema,
  SkillSchema,
  ResumeSchema,
  createEmptyResume,
  MonthYear,
} from "../resume";

describe("PersonalInfoSchema", () => {
  it("parses default values", () => {
    const result = PersonalInfoSchema.parse({});
    expect(result.firstName).toBe("");
    expect(result.email).toBe("");
    expect(result.linkedin).toBe("");
  });

  it("accepts valid data", () => {
    const result = PersonalInfoSchema.parse({
      firstName: "John",
      lastName: "Doe",
      email: "john@example.com",
      phone: "+1-555-1234",
    });
    expect(result.firstName).toBe("John");
    expect(result.email).toBe("john@example.com");
  });

  it("rejects invalid email", () => {
    expect(() =>
      PersonalInfoSchema.parse({ email: "not-an-email" }),
    ).toThrow();
  });

  it("rejects fields over max length", () => {
    expect(() =>
      PersonalInfoSchema.parse({ firstName: "a".repeat(101) }),
    ).toThrow();
  });
});

describe("MonthYear", () => {
  it("parses valid month/year", () => {
    const result = MonthYear.parse({ month: 3, year: 2024 });
    expect(result.month).toBe(3);
    expect(result.year).toBe(2024);
  });

  it("rejects invalid month", () => {
    expect(() => MonthYear.parse({ month: 13, year: 2024 })).toThrow();
  });

  it("rejects out-of-range year", () => {
    expect(() => MonthYear.parse({ month: 1, year: 1900 })).toThrow();
  });
});

describe("ExperienceSchema", () => {
  it("parses with defaults", () => {
    const result = ExperienceSchema.parse({
      id: "exp-1",
      startDate: { month: 1, year: 2020 },
    });
    expect(result.company).toBe("");
    expect(result.position).toBe("");
    expect(result.current).toBe(false);
    expect(result.bullets).toEqual([""]);
  });

  it("accepts full experience", () => {
    const result = ExperienceSchema.parse({
      id: "exp-1",
      company: "Acme Corp",
      position: "Engineer",
      startDate: { month: 1, year: 2020 },
      endDate: { month: 12, year: 2023 },
      current: false,
      bullets: ["Built X", "Shipped Y"],
    });
    expect(result.company).toBe("Acme Corp");
    expect(result.bullets).toHaveLength(2);
  });

  it("allows current without endDate", () => {
    const result = ExperienceSchema.parse({
      id: "exp-1",
      company: "Acme Corp",
      startDate: { month: 1, year: 2020 },
      current: true,
    });
    expect(result.current).toBe(true);
    expect(result.endDate).toBeUndefined();
  });
});

describe("EducationSchema", () => {
  it("parses with defaults", () => {
    const result = EducationSchema.parse({
      id: "edu-1",
      startDate: { month: 9, year: 2016 },
    });
    expect(result.school).toBe("");
    expect(result.degree).toBe("");
  });
});

describe("SkillSchema", () => {
  it("parses with defaults", () => {
    const result = SkillSchema.parse({ id: "skill-1" });
    expect(result.category).toBe("");
    expect(result.skills).toEqual([""]);
  });

  it("accepts level", () => {
    const result = SkillSchema.parse({
      id: "skill-1",
      category: "Frontend",
      skills: ["React", "TypeScript"],
      level: 4,
    });
    expect(result.level).toBe(4);
  });
});

describe("ResumeSchema", () => {
  it("creates valid empty resume via createEmptyResume", () => {
    const resume = createEmptyResume();
    const result = ResumeSchema.safeParse(resume);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.meta.name).toBe("Untitled Resume");
      expect(result.data.experience).toEqual([]);
      expect(result.data.education).toEqual([]);
      expect(result.data.skills).toEqual([]);
      expect(result.data.personalInfo.firstName).toBe("");
    }
  });

  it("validates full resume", () => {
    const resume = createEmptyResume();
    resume.meta.name = "My Resume";
    resume.meta.template = "minimal";
    resume.personalInfo.firstName = "Jane";
    resume.experience.push({
      id: "exp-1",
      company: "Tech Co",
      position: "Developer",
      location: "Remote",
      startDate: { month: 1, year: 2021 },
      current: true,
      description: "Built cool stuff",
      bullets: ["Feature A", "Feature B"],
    });

    const result = ResumeSchema.safeParse(resume);
    expect(result.success).toBe(true);
  });

  it("generates unique IDs for empty resumes", () => {
    const r1 = createEmptyResume();
    const r2 = createEmptyResume();
    expect(r1.meta.id).not.toBe(r2.meta.id);
  });
});
