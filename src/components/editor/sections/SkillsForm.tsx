"use client";

import { useResumeStore } from "@/lib/store";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Trash2, Plus, X } from "lucide-react";
import { useState } from "react";

export function SkillsForm() {
  const skills = useResumeStore((s) => s.currentResume.skills);
  const addSkill = useResumeStore((s) => s.addSkill);
  const updateSkill = useResumeStore((s) => s.updateSkill);
  const removeSkill = useResumeStore((s) => s.removeSkill);

  const addTag = (skillId: string) => {
    const skill = skills.find((s) => s.id === skillId);
    if (skill) {
      updateSkill(skillId, { skills: [...skill.skills, ""] });
    }
  };

  const updateTag = (skillId: string, index: number, value: string) => {
    const skill = skills.find((s) => s.id === skillId);
    if (skill) {
      const newSkills = [...skill.skills];
      newSkills[index] = value;
      updateSkill(skillId, { skills: newSkills });
    }
  };

  const removeTag = (skillId: string, index: number) => {
    const skill = skills.find((s) => s.id === skillId);
    if (skill && skill.skills.length > 1) {
      const newSkills = skill.skills.filter((_, i) => i !== index);
      updateSkill(skillId, { skills: newSkills });
    }
  };

  return (
    <div className="flex flex-col gap-3">
      {skills.length === 0 && (
        <p className="text-xs text-muted-foreground py-4 text-center">
          No skills yet. Add your first skill category below.
        </p>
      )}

      {skills.map((skill) => (
        <div
          key={skill.id}
          className="rounded-lg border border-border bg-background p-3"
        >
          <div className="flex items-center justify-between mb-2">
            <Input
              value={skill.category}
              onChange={(e) => updateSkill(skill.id, { category: e.target.value })}
              placeholder="Category (e.g. Design, Tools, Languages)"
              className="text-xs font-medium h-7"
            />
            <Button
              variant="ghost"
              size="icon-xs"
              onClick={() => removeSkill(skill.id)}
              className="ml-2 text-muted-foreground hover:text-destructive shrink-0"
            >
              <Trash2 className="size-3" />
            </Button>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {skill.skills.map((tag, tIdx) => (
              <div
                key={tIdx}
                className="flex items-center gap-1 rounded-md bg-muted px-2 py-1"
              >
                <input
                  value={tag}
                  onChange={(e) => updateTag(skill.id, tIdx, e.target.value)}
                  placeholder="Skill"
                  className="w-20 bg-transparent text-xs outline-none"
                />
                {skill.skills.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeTag(skill.id, tIdx)}
                    className="text-muted-foreground hover:text-destructive"
                  >
                    <X className="size-3" />
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={() => addTag(skill.id)}
              className="inline-flex items-center gap-0.5 rounded-md border border-dashed border-border px-2 py-1 text-xs text-muted-foreground hover:border-foreground hover:text-foreground transition-colors"
            >
              <Plus className="size-3" />
              Add
            </button>
          </div>
        </div>
      ))}

      <Button variant="outline" onClick={addSkill} className="w-full">
        <Plus className="size-3.5 mr-1.5" />
        Add Skill Category
      </Button>
    </div>
  );
}
