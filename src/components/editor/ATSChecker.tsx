"use client";

import { useResumeStore } from "@/lib/store";
import { cn } from "@/lib/utils";
import { CheckCircle2, XCircle, HelpCircle, ArrowRight } from "lucide-react";
import { useMemo, useState } from "react";

interface ATSRule {
  id: string;
  label: string;
  description: string;
  check: () => { passed: boolean; message: string };
  section?: string;
}

export function ATSChecker() {
  const currentResume = useResumeStore((s) => s.currentResume);
  const [jobDescription, setJobDescription] = useState("");

  const rules: ATSRule[] = useMemo(
    () => [
      {
        id: "contact-email",
        label: "Email Address",
        description: "ATS systems need a valid email to identify you.",
        check: () => ({
          passed: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(currentResume.personalInfo.email),
          message: currentResume.personalInfo.email || "No email address provided",
        }),
        section: "personalInfo",
      },
      {
        id: "contact-phone",
        label: "Phone Number",
        description: "Most recruiters expect a phone number for quick contact.",
        check: () => ({
          passed: currentResume.personalInfo.phone.length >= 7,
          message: currentResume.personalInfo.phone || "No phone number provided",
        }),
        section: "personalInfo",
      },
      {
        id: "contact-name",
        label: "Full Name",
        description: "Your full name is critical for ATS matching.",
        check: () => ({
          passed:
            currentResume.personalInfo.firstName.trim().length > 0 &&
            currentResume.personalInfo.lastName.trim().length > 0,
          message:
            currentResume.personalInfo.firstName && currentResume.personalInfo.lastName
              ? `${currentResume.personalInfo.firstName} ${currentResume.personalInfo.lastName}`
              : "Missing first or last name",
        }),
        section: "personalInfo",
      },
      {
        id: "summary",
        label: "Professional Summary",
        description: "A strong summary helps ATS and recruiters understand your profile quickly.",
        check: () => ({
          passed: currentResume.summary.trim().length > 50,
          message:
            currentResume.summary.trim().length > 0
              ? `${currentResume.summary.trim().length} characters — aim for 80–200`
              : "No summary written",
        }),
        section: "summary",
      },
      {
        id: "experience-count",
        label: "Experience Entries",
        description: "Most competitive resumes have 2–4 experience entries.",
        check: () => {
          const count = currentResume.experience.length;
          return {
            passed: count >= 1,
            message: count === 0 ? "No experience entries" : `${count} entries`,
          };
        },
        section: "experience",
      },
      {
        id: "experience-bullets",
        label: "Bullet Points with Action Verbs",
        description: "Bullets starting with strong action verbs improve ATS scoring.",
        check: () => {
          const actionVerbs =
            /^(Achieved|Built|Created|Delivered|Designed|Developed|Drove|Implemented|Improved|Increased|Launched|Led|Managed|Optimized|Reduced|Spearheaded)/i;
          const allBullets = currentResume.experience.flatMap((e) => e.bullets);
          const actionBullets = allBullets.filter((b) => actionVerbs.test(b.trim()));
          const total = allBullets.filter((b) => b.trim().length > 0).length;
          const ratio = total > 0 ? (actionBullets.length / total) * 100 : 0;
          return {
            passed: ratio >= 50,
            message:
              total === 0
                ? "No bullet points"
                : `${actionBullets.length}/${total} start with action verbs (${Math.round(ratio)}%)`,
          };
        },
        section: "experience",
      },
      {
        id: "skills",
        label: "Skills Listed",
        description: "Skills sections are heavily weighted by ATS systems.",
        check: () => {
          const allSkills = currentResume.skills.flatMap((s) => s.skills);
          const count = allSkills.filter((s) => s.trim().length > 0).length;
          return {
            passed: count >= 5,
            message: count === 0 ? "No skills listed" : `${count} skills across ${currentResume.skills.length} categories`,
          };
        },
        section: "skills",
      },
      {
        id: "education",
        label: "Education Listed",
        description: "Most ATS filters require at least one education entry.",
        check: () => ({
          passed: currentResume.education.length > 0,
          message:
            currentResume.education.length > 0
              ? `${currentResume.education.length} entries`
              : "No education listed",
        }),
        section: "education",
      },
      {
        id: "length",
        label: "Resume Length (1–2 pages)",
        description: "ATS and recruiters prefer 1–2 page resumes.",
        check: () => {
          const totalBullets = currentResume.experience.flatMap((e) => e.bullets).filter(
            (b) => b.trim().length > 0,
          ).length;
          const hasManyJobs = currentResume.experience.length > 5;
          const hasManyBullets = totalBullets > 20;
          return {
            passed: !hasManyJobs && !hasManyBullets,
            message:
              hasManyJobs && hasManyBullets
                ? "Many entries — may exceed 2 pages"
                : "Looks reasonable for 1–2 pages",
          };
        },
        section: undefined,
      },
    ],
    [currentResume],
  );

  const results = useMemo(
    () =>
      rules.map((rule) => ({
        ...rule,
        result: rule.check(),
      })),
    [rules],
  );

  const score = useMemo(() => {
    const passed = results.filter((r) => r.result.passed).length;
    return Math.round((passed / results.length) * 100);
  }, [results]);

  const getScoreColor = (s: number) => {
    if (s >= 80) return "text-success";
    if (s >= 50) return "text-warning";
    return "text-error";
  };

  const getStatusIcon = (passed: boolean) => {
    if (passed) return <CheckCircle2 className="size-3.5 text-success shrink-0" />;
    return <XCircle className="size-3.5 text-error shrink-0" />;
  };

  return (
    <div className="flex flex-col gap-3">
      {/* Score */}
      <div className="flex items-center gap-3 rounded-lg border border-border bg-background p-3">
        <div className={cn("text-2xl font-bold tabular-nums", getScoreColor(score))}>
          {score}
        </div>
        <div className="flex flex-col gap-0.5">
          <span className="text-xs font-medium text-foreground">ATS Score</span>
          <span className="text-[10px] text-muted-foreground">
            {score >= 80
              ? "Great — your resume is well-optimized!"
              : score >= 50
                ? "Good — a few improvements recommended"
                : "Needs work — review the suggestions below"}
          </span>
        </div>
      </div>

      {/* Checklist */}
      <div className="flex flex-col gap-1">
        {results.map((rule) => (
          <div
            key={rule.id}
            className="flex items-start gap-2 rounded-md p-2 hover:bg-muted/50 transition-colors"
          >
            {getStatusIcon(rule.result.passed)}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-medium text-foreground">
                  {rule.label}
                </span>
                {rule.section && (
                  <span className="text-[9px] text-muted-foreground capitalize">
                    · {rule.section}
                  </span>
                )}
              </div>
              <p className="text-[10px] text-muted-foreground mt-0.5">
                {rule.result.message}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Job Description Match */}
      <div className="mt-2">
        <details className="group">
          <summary className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground cursor-pointer hover:text-foreground transition-colors">
            <HelpCircle className="size-3" />
            Match against job description
          </summary>
          <textarea
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            placeholder="Paste a job description to check keyword match..."
            rows={4}
            className="mt-2 w-full resize-y rounded-lg border border-input bg-transparent px-3 py-2 text-xs placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
          />
          {jobDescription.trim().length > 50 && (
            <div className="mt-1.5 flex items-center gap-1.5 text-[10px] text-muted-foreground">
              <ArrowRight className="size-3" />
              <span>Keyword matching coming soon</span>
            </div>
          )}
        </details>
      </div>
    </div>
  );
}
