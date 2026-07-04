"use client";

import { useResumeStore } from "@/lib/store";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Trash2, Plus } from "lucide-react";

const PROFICIENCIES = [
  { value: "native", label: "Native" },
  { value: "fluent", label: "Fluent" },
  { value: "advanced", label: "Advanced" },
  { value: "intermediate", label: "Intermediate" },
  { value: "basic", label: "Basic" },
] as const;

export function LanguagesForm() {
  const languages = useResumeStore((s) => s.currentResume.languages);
  const addLanguage = useResumeStore((s) => s.addLanguage);
  const updateLanguage = useResumeStore((s) => s.updateLanguage);
  const removeLanguage = useResumeStore((s) => s.removeLanguage);

  return (
    <div className="flex flex-col gap-3">
      {languages.length === 0 && (
        <p className="text-xs text-muted-foreground py-4 text-center">
          No languages added yet.
        </p>
      )}

      {languages.map((lang, idx) => (
        <div
          key={lang.id}
          className="flex items-center gap-3 rounded-lg border border-border bg-background p-3"
        >
          <span className="text-xs text-muted-foreground w-5">{idx + 1}.</span>
          <div className="flex-1">
            <Input
              value={lang.name}
              onChange={(e) => updateLanguage(lang.id, { name: e.target.value })}
              placeholder="Language"
              className="text-sm h-8"
            />
          </div>
          <div className="flex-1">
            <select
              value={lang.proficiency}
              onChange={(e) => updateLanguage(lang.id, { proficiency: e.target.value as any })}
              className="h-8 w-full rounded-lg border border-input bg-transparent px-2 text-sm"
            >
              {PROFICIENCIES.map((p) => (
                <option key={p.value} value={p.value}>
                  {p.label}
                </option>
              ))}
            </select>
          </div>
          <div className="flex gap-1">
            {["native", "fluent", "advanced", "intermediate", "basic"].map((level, lIdx) => (
              <button
                key={level}
                type="button"
                onClick={() => updateLanguage(lang.id, { proficiency: level as any })}
                className={`w-2 h-2 rounded-full transition-colors ${
                  ["native", "fluent", "advanced", "intermediate", "basic"].indexOf(lang.proficiency) >= lIdx
                    ? "bg-foreground"
                    : "bg-border"
                }`}
                title={level}
              />
            ))}
          </div>
          <Button
            variant="ghost"
            size="icon-xs"
            onClick={() => removeLanguage(lang.id)}
            className="text-muted-foreground hover:text-destructive shrink-0"
          >
            <Trash2 className="size-3" />
          </Button>
        </div>
      ))}

      <Button variant="outline" onClick={addLanguage} className="w-full">
        <Plus className="size-3.5 mr-1.5" />
        Add Language
      </Button>
    </div>
  );
}
