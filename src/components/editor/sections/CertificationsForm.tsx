"use client";

import { useResumeStore } from "@/lib/store";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Trash2, Plus } from "lucide-react";

export function CertificationsForm() {
  const certifications = useResumeStore((s) => s.currentResume.certifications);
  const addCertification = useResumeStore((s) => s.addCertification);
  const updateCertification = useResumeStore((s) => s.updateCertification);
  const removeCertification = useResumeStore((s) => s.removeCertification);

  return (
    <div className="flex flex-col gap-3">
      {certifications.length === 0 && (
        <p className="text-xs text-muted-foreground py-4 text-center">
          No certifications yet. Add your first one below.
        </p>
      )}

      {certifications.map((cert, idx) => (
        <div key={cert.id} className="rounded-lg border border-border bg-background p-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-foreground">
              Certification #{idx + 1}
            </span>
            <Button
              variant="ghost" size="icon-xs"
              onClick={() => removeCertification(cert.id)}
              className="text-muted-foreground hover:text-destructive"
            >
              <Trash2 className="size-3" />
            </Button>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex flex-col gap-1.5">
              <Label>Name</Label>
              <Input
                value={cert.name}
                onChange={(e) => updateCertification(cert.id, { name: e.target.value })}
                placeholder="Google UX Design Certificate"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1.5">
                <Label>Issuer</Label>
                <Input
                  value={cert.issuer}
                  onChange={(e) => updateCertification(cert.id, { issuer: e.target.value })}
                  placeholder="Google / Coursera"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label>Date (optional)</Label>
                <div className="grid grid-cols-2 gap-1.5">
                  <select
                    value={cert.date?.month ?? 1}
                    onChange={(e) => updateCertification(cert.id, { date: { month: parseInt(e.target.value), year: cert.date?.year ?? 2024 } })}
                    className="h-8 rounded-lg border border-input bg-transparent px-2 text-sm"
                  >
                    {["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"].map((m, i) => (
                      <option key={i+1} value={i+1}>{m}</option>
                    ))}
                  </select>
                  <Input
                    type="number" min={1950} max={2100}
                    value={cert.date?.year ?? 2024}
                    onChange={(e) => updateCertification(cert.id, { date: { month: cert.date?.month ?? 1, year: parseInt(e.target.value) || 2024 } })}
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <Label>URL (optional)</Label>
              <Input
                value={cert.url}
                onChange={(e) => updateCertification(cert.id, { url: e.target.value })}
                placeholder="https://coursera.org/verify/..."
              />
            </div>
          </div>
        </div>
      ))}

      <Button variant="outline" onClick={addCertification} className="w-full">
        <Plus className="size-3.5 mr-1.5" />
        Add Certification
      </Button>
    </div>
  );
}
