"use client";

import { useResumeStore } from "@/lib/store";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Trash2, GripVertical, Plus, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

export function ProjectsForm() {
  const projects = useResumeStore((s) => s.currentResume.projects);
  const addProject = useResumeStore((s) => s.addProject);
  const updateProject = useResumeStore((s) => s.updateProject);
  const removeProject = useResumeStore((s) => s.removeProject);
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
      {projects.length === 0 && (
        <p className="text-xs text-muted-foreground py-4 text-center">
          No projects yet. Add your first project below.
        </p>
      )}

      {projects.map((proj, idx) => (
        <div key={proj.id} className="rounded-lg border border-border bg-background overflow-hidden">
          <div className="flex items-center gap-2 px-3 py-2 border-b border-border bg-muted/30">
            <GripVertical className="size-3.5 text-muted-foreground shrink-0 cursor-grab" />
            <span className="flex-1 text-xs font-medium text-foreground truncate">
              {proj.name || `Project #${idx + 1}`}
            </span>
            <Button variant="ghost" size="icon-xs" onClick={() => toggleExpanded(proj.id)}>
              {expandedIds.has(proj.id) ? <ChevronUp className="size-3" /> : <ChevronDown className="size-3" />}
            </Button>
            <Button
              variant="ghost" size="icon-xs"
              onClick={() => removeProject(proj.id)}
              className="text-muted-foreground hover:text-destructive"
            >
              <Trash2 className="size-3" />
            </Button>
          </div>

          {expandedIds.has(proj.id) && (
            <div className="p-3 flex flex-col gap-3">
              <div className="flex flex-col gap-1.5">
                <Label>Project Name</Label>
                <Input
                  value={proj.name}
                  onChange={(e) => updateProject(proj.id, { name: e.target.value })}
                  placeholder="DesignOps Dashboard"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <Label>Description</Label>
                <textarea
                  value={proj.description}
                  onChange={(e) => updateProject(proj.id, { description: e.target.value })}
                  placeholder="Describe the project, your role, and the impact..."
                  rows={2}
                  className="w-full resize-y rounded-lg border border-input bg-transparent px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <Label>Technologies</Label>
                <Input
                  value={proj.technologies.filter(Boolean).join(", ")}
                  onChange={(e) => updateProject(proj.id, { technologies: e.target.value.split(",").map((t) => t.trim()) })}
                  placeholder="React, TypeScript, Supabase"
                />
                <span className="text-[10px] text-muted-foreground">Separate with commas</span>
              </div>

              <div className="flex flex-col gap-1.5">
                <Label>URL (optional)</Label>
                <Input
                  value={proj.url}
                  onChange={(e) => updateProject(proj.id, { url: e.target.value })}
                  placeholder="https://github.com/..."
                />
              </div>

              <div className="flex items-center gap-2">
                <Switch
                  checked={proj.current}
                  onCheckedChange={(checked) => updateProject(proj.id, { current: checked })}
                />
                <span className="text-xs text-muted-foreground">Ongoing project</span>
              </div>
            </div>
          )}
        </div>
      ))}

      <Button variant="outline" onClick={addProject} className="w-full">
        <Plus className="size-3.5 mr-1.5" />
        Add Project
      </Button>
    </div>
  );
}
