"use client";

import { useResumeStore } from "@/lib/store";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Trash2, GripVertical, Plus, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

export function EducationForm() {
  const education = useResumeStore((s) => s.currentResume.education);
  const addEducation = useResumeStore((s) => s.addEducation);
  const updateEducation = useResumeStore((s) => s.updateEducation);
  const removeEducation = useResumeStore((s) => s.removeEducation);
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());

  const toggleExpanded = (id: string) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div className="flex flex-col gap-3">
      {education.length === 0 && (
        <p className="text-xs text-muted-foreground py-4 text-center">
          No education entries yet. Add your first one below.
        </p>
      )}

      {education.map((edu, idx) => (
        <div
          key={edu.id}
          className="rounded-lg border border-border bg-background overflow-hidden"
        >
          <div className="flex items-center gap-2 px-3 py-2 border-b border-border bg-muted/30">
            <GripVertical className="size-3.5 text-muted-foreground shrink-0 cursor-grab" />
            <span className="flex-1 text-xs font-medium text-foreground truncate">
              {edu.school || edu.degree || `Education #${idx + 1}`}
            </span>
            <Button variant="ghost" size="icon-xs" onClick={() => toggleExpanded(edu.id)}>
              {expandedIds.has(edu.id) ? <ChevronUp className="size-3" /> : <ChevronDown className="size-3" />}
            </Button>
            <Button
              variant="ghost" size="icon-xs"
              onClick={() => removeEducation(edu.id)}
              className="text-muted-foreground hover:text-destructive"
            >
              <Trash2 className="size-3" />
            </Button>
          </div>

          {expandedIds.has(edu.id) && (
            <div className="p-3 flex flex-col gap-3">
              <div className="flex flex-col gap-1.5">
                <Label>School</Label>
                <Input
                  value={edu.school}
                  onChange={(e) => updateEducation(edu.id, { school: e.target.value })}
                  placeholder="Stanford University"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1.5">
                  <Label>Degree</Label>
                  <Input
                    value={edu.degree}
                    onChange={(e) => updateEducation(edu.id, { degree: e.target.value })}
                    placeholder="Bachelor of Science"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label>Field of Study</Label>
                  <Input
                    value={edu.field}
                    onChange={(e) => updateEducation(edu.id, { field: e.target.value })}
                    placeholder="Computer Science"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <Label>Location</Label>
                <Input
                  value={edu.location}
                  onChange={(e) => updateEducation(edu.id, { location: e.target.value })}
                  placeholder="Stanford, CA"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1.5">
                  <Label>Start Date</Label>
                  <div className="grid grid-cols-2 gap-1.5">
                    <select
                      value={edu.startDate.month}
                      onChange={(e) => updateEducation(edu.id, { startDate: { ...edu.startDate, month: parseInt(e.target.value) } })}
                      className="h-8 rounded-lg border border-input bg-transparent px-2 text-sm"
                    >
                      {["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"].map((m, i) => (
                        <option key={i+1} value={i+1}>{m}</option>
                      ))}
                    </select>
                    <Input
                      type="number" min={1950} max={2100}
                      value={edu.startDate.year}
                      onChange={(e) => updateEducation(edu.id, { startDate: { ...edu.startDate, year: parseInt(e.target.value) || 2024 } })}
                    />
                  </div>
                </div>
                {!edu.current && (
                  <div className="flex flex-col gap-1.5">
                    <Label>End Date</Label>
                    <div className="grid grid-cols-2 gap-1.5">
                      <select
                        value={edu.endDate?.month ?? 1}
                        onChange={(e) => updateEducation(edu.id, { endDate: { month: parseInt(e.target.value), year: edu.endDate?.year ?? 2024 } })}
                        className="h-8 rounded-lg border border-input bg-transparent px-2 text-sm"
                      >
                        {["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"].map((m, i) => (
                          <option key={i+1} value={i+1}>{m}</option>
                        ))}
                      </select>
                      <Input
                        type="number" min={1950} max={2100}
                        value={edu.endDate?.year ?? 2024}
                        onChange={(e) => updateEducation(edu.id, { endDate: { month: edu.endDate?.month ?? 1, year: parseInt(e.target.value) || 2024 } })}
                      />
                    </div>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2">
                <Switch
                  checked={edu.current}
                  onCheckedChange={(checked) => updateEducation(edu.id, { current: checked })}
                />
                <span className="text-xs text-muted-foreground">Currently enrolled</span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1.5">
                  <Label>GPA</Label>
                  <Input
                    value={edu.gpa}
                    onChange={(e) => updateEducation(edu.id, { gpa: e.target.value })}
                    placeholder="3.8"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label>Honors</Label>
                  <Input
                    value={edu.honors}
                    onChange={(e) => updateEducation(edu.id, { honors: e.target.value })}
                    placeholder="Dean's List"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      ))}

      <Button variant="outline" onClick={addEducation} className="w-full">
        <Plus className="size-3.5 mr-1.5" />
        Add Education
      </Button>
    </div>
  );
}
