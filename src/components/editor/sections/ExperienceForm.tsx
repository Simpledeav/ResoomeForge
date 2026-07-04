"use client";

import { useResumeStore } from "@/lib/store";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  Trash2,
  GripVertical,
  Plus,
  Sparkles,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { useState } from "react";

interface ExperienceFormProps {
  sectionId?: string;
}

export function ExperienceForm({}: ExperienceFormProps) {
  const experience = useResumeStore((s) => s.currentResume.experience);
  const addExperience = useResumeStore((s) => s.addExperience);
  const updateExperience = useResumeStore((s) => s.updateExperience);
  const removeExperience = useResumeStore((s) => s.removeExperience);
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());

  const toggleExpanded = (id: string) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const addBullet = (expId: string) => {
    const exp = experience.find((e) => e.id === expId);
    if (exp) {
      updateExperience(expId, { bullets: [...exp.bullets, ""] });
    }
  };

  const updateBullet = (expId: string, index: number, value: string) => {
    const exp = experience.find((e) => e.id === expId);
    if (exp) {
      const newBullets = [...exp.bullets];
      newBullets[index] = value;
      updateExperience(expId, { bullets: newBullets });
    }
  };

  const removeBullet = (expId: string, index: number) => {
    const exp = experience.find((e) => e.id === expId);
    if (exp && exp.bullets.length > 1) {
      const newBullets = exp.bullets.filter((_, i) => i !== index);
      updateExperience(expId, { bullets: newBullets });
    }
  };

  const actionVerbs = [
    "Achieved", "Built", "Created", "Delivered", "Designed",
    "Developed", "Drove", "Implemented", "Improved", "Increased",
    "Launched", "Led", "Managed", "Optimized", "Reduced",
  ];

  return (
    <div className="flex flex-col gap-3">
      {experience.length === 0 && (
        <p className="text-xs text-muted-foreground py-4 text-center">
          No experience entries yet. Add your first one below.
        </p>
      )}

      {experience.map((exp, idx) => (
        <div
          key={exp.id}
          className="rounded-lg border border-border bg-background overflow-hidden"
        >
          {/* Card header */}
          <div className="flex items-center gap-2 px-3 py-2 border-b border-border bg-muted/30">
            <GripVertical className="size-3.5 text-muted-foreground shrink-0 cursor-grab" />
            <span className="flex-1 text-xs font-medium text-foreground truncate">
              {exp.position || exp.company || `Experience #${idx + 1}`}
            </span>
            <Button
              variant="ghost"
              size="icon-xs"
              onClick={() => toggleExpanded(exp.id)}
            >
              {expandedIds.has(exp.id) ? (
                <ChevronUp className="size-3" />
              ) : (
                <ChevronDown className="size-3" />
              )}
            </Button>
            <Button
              variant="ghost"
              size="icon-xs"
              onClick={() => removeExperience(exp.id)}
              className="text-muted-foreground hover:text-destructive"
            >
              <Trash2 className="size-3" />
            </Button>
          </div>

          {/* Card body */}
          {expandedIds.has(exp.id) && (
            <div className="p-3 flex flex-col gap-3">
              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1.5">
                  <Label>Position</Label>
                  <Input
                    value={exp.position}
                    onChange={(e) =>
                      updateExperience(exp.id, { position: e.target.value })
                    }
                    placeholder="Senior Product Designer"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label>Company</Label>
                  <Input
                    value={exp.company}
                    onChange={(e) =>
                      updateExperience(exp.id, { company: e.target.value })
                    }
                    placeholder="Figma Inc."
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1.5">
                  <Label>Location</Label>
                  <Input
                    value={exp.location}
                    onChange={(e) =>
                      updateExperience(exp.id, { location: e.target.value })
                    }
                    placeholder="San Francisco, CA"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label>Start Date</Label>
                  <div className="grid grid-cols-2 gap-1.5">
                    <select
                      value={exp.startDate.month}
                      onChange={(e) =>
                        updateExperience(exp.id, {
                          startDate: {
                            ...exp.startDate,
                            month: parseInt(e.target.value),
                          },
                        })
                      }
                      className="h-8 rounded-lg border border-input bg-transparent px-2 text-sm"
                    >
                      {[
                        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
                        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
                      ].map((m, i) => (
                        <option key={i + 1} value={i + 1}>
                          {m}
                        </option>
                      ))}
                    </select>
                    <Input
                      type="number"
                      min={1950}
                      max={2100}
                      value={exp.startDate.year}
                      onChange={(e) =>
                        updateExperience(exp.id, {
                          startDate: {
                            ...exp.startDate,
                            year: parseInt(e.target.value) || 2024,
                          },
                        })
                      }
                      placeholder="2024"
                    />
                  </div>
                </div>
              </div>

              {!exp.current && (
                <div className="flex flex-col gap-1.5">
                  <Label>End Date</Label>
                  <div className="grid grid-cols-2 gap-1.5">
                    <select
                      value={exp.endDate?.month ?? 1}
                      onChange={(e) =>
                        updateExperience(exp.id, {
                          endDate: {
                            month: parseInt(e.target.value),
                            year: exp.endDate?.year ?? 2024,
                          },
                        })
                      }
                      className="h-8 rounded-lg border border-input bg-transparent px-2 text-sm"
                    >
                      {[
                        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
                        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
                      ].map((m, i) => (
                        <option key={i + 1} value={i + 1}>
                          {m}
                        </option>
                      ))}
                    </select>
                    <Input
                      type="number"
                      min={1950}
                      max={2100}
                      value={exp.endDate?.year ?? 2024}
                      onChange={(e) =>
                        updateExperience(exp.id, {
                          endDate: {
                            month: exp.endDate?.month ?? 1,
                            year: parseInt(e.target.value) || 2024,
                          },
                        })
                      }
                      placeholder="2024"
                    />
                  </div>
                </div>
              )}

              <div className="flex items-center gap-2">
                <Switch
                  checked={exp.current}
                  onCheckedChange={(checked) =>
                    updateExperience(exp.id, { current: checked })
                  }
                />
                <span className="text-xs text-muted-foreground">
                  I currently work here
                </span>
              </div>

              {/* Bullets */}
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <Label>Bullet Points</Label>
                  <Button
                    variant="ghost"
                    size="xs"
                    onClick={() => addBullet(exp.id)}
                  >
                    <Plus className="size-3 mr-1" />
                    Add bullet
                  </Button>
                </div>
                {exp.bullets.map((bullet, bIdx) => (
                  <div key={bIdx} className="flex items-start gap-1.5">
                    <span className="text-xs text-muted-foreground mt-2.5">
                      •
                    </span>
                    <div className="flex-1 flex items-start gap-1">
                      <textarea
                        value={bullet}
                        onChange={(e) =>
                          updateBullet(exp.id, bIdx, e.target.value)
                        }
                        placeholder="Describe your responsibility or achievement..."
                        rows={1}
                        className="flex-1 resize-none rounded-md border border-input bg-transparent px-2 py-1.5 text-xs transition-colors placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
                      />
                      <div className="flex gap-0.5">
                        <button
                          type="button"
                          className="p-1 text-muted-foreground hover:text-accent transition-colors"
                          title="Suggest action verb"
                        >
                          <Sparkles className="size-3" />
                        </button>
                        {exp.bullets.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeBullet(exp.id, bIdx)}
                            className="p-1 text-muted-foreground hover:text-destructive transition-colors"
                          >
                            <Trash2 className="size-3" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Quick action verbs */}
              <div className="flex flex-wrap gap-1">
                <span className="text-[9px] text-muted-foreground mr-1 self-center">
                  Verbs:
                </span>
                {actionVerbs.map((verb) => (
                  <button
                    key={verb}
                    type="button"
                    onClick={() => {
                      const expData = experience.find((e) => e.id === exp.id);
                      if (expData) {
                        const lastIdx = expData.bullets.length - 1;
                        const lastBullet = expData.bullets[lastIdx];
                        const prefix = lastBullet.trim() ? `${verb} ` : verb;
                        const newBullets = [...expData.bullets];
                        if (lastBullet.trim()) {
                          newBullets[lastIdx] = lastBullet + prefix;
                        } else {
                          newBullets[lastIdx] = prefix;
                        }
                        updateExperience(exp.id, { bullets: newBullets });
                      }
                    }}
                    className="rounded-md bg-muted px-1.5 py-0.5 text-[9px] text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
                  >
                    {verb}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}

      <Button variant="outline" onClick={addExperience} className="w-full">
        <Plus className="size-3.5 mr-1.5" />
        Add Experience
      </Button>
    </div>
  );
}
