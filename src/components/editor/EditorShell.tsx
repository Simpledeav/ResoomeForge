"use client";

import { useState, useEffect, useRef } from "react";
import { TopBar } from "./TopBar";
import { SectionNav } from "./SectionNav";
import { FormPanel } from "./FormPanel";
import { PreviewPane } from "./PreviewPane";
import { DesignPanel } from "./DesignPanel";
import { ATSChecker } from "./ATSChecker";
import { useResumeStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import {
  Edit3,
  Eye,
  Palette,
  X,
} from "lucide-react";

export function EditorShell() {
  const [activeSection, setActiveSection] = useState("personalInfo");
  const [designOpen, setDesignOpen] = useState(false);
  const [previewMode, setPreviewMode] = useState<"split" | "preview" | "ats">("split");
  const [mobileTab, setMobileTab] = useState<"edit" | "preview" | "ats">("edit");
  const [isMobile, setIsMobile] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);
  const isDirty = useResumeStore((s) => s.isDirty);
  const isDirtyRef = useRef(isDirty);
  isDirtyRef.current = isDirty;

  // Unsaved changes warning
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isDirtyRef.current) {
        e.preventDefault();
        e.returnValue = "You have unsaved changes. Are you sure you want to leave?";
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, []);

  // Load resume on mount
  const loadResumeList = useResumeStore((s) => s.loadResumeList);

  useEffect(() => {
    loadResumeList();
  }, [loadResumeList]);

  // Check for mobile
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Desktop: 3-pane layout
  if (!isMobile) {
    return (
      <div className="flex flex-col h-[calc(100vh-3.5rem)]">
        <TopBar
          onToggleDesign={() => setDesignOpen(!designOpen)}
          onTogglePreview={() =>
            setPreviewMode(previewMode === "preview" ? "split" : "preview")
          }
          designOpen={designOpen}
          previewMode={previewMode}
          onToggleAts={() =>
            setPreviewMode(previewMode === "ats" ? "split" : "ats")
          }
          previewRef={previewRef}
        />

        <div className="flex flex-1 overflow-hidden">
          <SectionNav
            activeSection={activeSection}
            onSectionChange={setActiveSection}
          />

          <FormPanel activeSection={activeSection} />

          {previewMode === "ats" ? (
            <div className="flex-1 flex overflow-hidden">
              <PreviewPane ref={previewRef} />
              <div className="w-72 shrink-0 border-l border-border bg-background overflow-y-auto p-4">
                <ATSChecker />
              </div>
            </div>
          ) : previewMode === "preview" ? (
            <PreviewPane ref={previewRef} />
          ) : (
            <PreviewPane ref={previewRef} />
          )}

          {designOpen && (
            <div className="w-72 shrink-0 border-l border-border bg-background flex flex-col overflow-hidden">
              <div className="flex items-center justify-between border-b border-border px-4 py-3">
                <h2 className="text-sm font-semibold text-foreground">Design</h2>
                <Button variant="ghost" size="icon-xs" onClick={() => setDesignOpen(false)}>
                  <X className="size-3.5" />
                </Button>
              </div>
              <div className="flex-1 overflow-y-auto px-4 py-4">
                <DesignPanel />
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Mobile: tab-switcher layout
  return (
    <div className="flex flex-col h-[calc(100vh-3.5rem)] pb-[env(safe-area-inset-bottom)]">
      <TopBar
        onToggleDesign={() => setDesignOpen(!designOpen)}
        onTogglePreview={() => {}}
        designOpen={designOpen}
        previewMode={previewMode}
        onToggleAts={() => {}}
        previewRef={previewRef}
      />

      {/* Tab switcher */}
      <div className="flex border-b border-border bg-background/95 backdrop-blur-sm shrink-0">
        <button
          onClick={() => setMobileTab("edit")}
          className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 text-xs font-medium transition-colors relative ${
            mobileTab === "edit"
              ? "text-foreground"
              : "text-muted-foreground"
          }`}
        >
          <Edit3 className="size-3.5" />
          Edit
          {mobileTab === "edit" && (
            <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-foreground rounded-full" />
          )}
        </button>
        <button
          onClick={() => setMobileTab("preview")}
          className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 text-xs font-medium transition-colors relative ${
            mobileTab === "preview"
              ? "text-foreground"
              : "text-muted-foreground"
          }`}
        >
          <Eye className="size-3.5" />
          Preview
          {mobileTab === "preview" && (
            <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-foreground rounded-full" />
          )}
        
        </button>
        <button
          onClick={() => setMobileTab("ats")}
          className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 text-xs font-medium transition-colors relative ${
            mobileTab === "ats"
              ? "text-foreground"
              : "text-muted-foreground"
          }`}
        >
          <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 11l3 3L22 4" />
            <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
          </svg>
          ATS
          {mobileTab === "ats" && (
            <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-foreground rounded-full" />
          )}
        </button>
      </div>

      {mobileTab === "edit" && (
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Mobile section nav as horizontal tabs */}
          <div className="flex gap-1 overflow-x-auto border-b border-border px-2 py-2 bg-muted/30 shrink-0 scrollbar-none">
            {["personalInfo", "summary", "experience", "education", "skills", "certifications", "projects", "languages"].map((key) => (
              <button
                key={key}
                onClick={() => setActiveSection(key)}
                className={`px-2.5 py-1.5 rounded-md text-[10px] whitespace-nowrap transition-colors font-medium leading-none ${
                  activeSection === key
                    ? "bg-foreground text-background shadow-sm"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                {key === "personalInfo" ? "Info" :
                 key === "experience" ? "Work" :
                 key === "certifications" ? "Certs" :
                 key.charAt(0).toUpperCase() + key.slice(1)}
              </button>
            ))}
          </div>
          {/* Full-width form */}
          <div className="flex-1 overflow-y-auto">
            <FormPanel activeSection={activeSection} />
          </div>
        </div>
      )}

      {mobileTab === "preview" && (
        <div className="flex-1 flex overflow-hidden">
          <PreviewPane ref={previewRef} />
        </div>
      )}

      {mobileTab === "ats" && (
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="flex-1 flex overflow-hidden">
            <PreviewPane ref={previewRef} />
            <div className="w-72 shrink-0 border-l border-border bg-background overflow-y-auto p-4">
              <ATSChecker />
            </div>
          </div>
        </div>
      )}

      {/* Mobile design panel as a simple overlay (not Dialog, to avoid portal issues) */}
      {designOpen && (
        <div className="fixed inset-0 z-50 flex flex-col bg-background/98 backdrop-blur-xl">
          <div className="flex items-center justify-between border-b border-border px-4 py-3 shrink-0">
            <div className="flex items-center gap-2">
              <Palette className="size-4" />
              <h2 className="text-sm font-semibold text-foreground">Design</h2>
            </div>
            <Button variant="ghost" size="icon-sm" onClick={() => setDesignOpen(false)}>
              <X className="size-4" />
            </Button>
          </div>
          <div className="flex-1 overflow-y-auto px-4 py-4 pb-[calc(1rem+env(safe-area-inset-bottom))]">
            <DesignPanel />
          </div>
        </div>
      )}
    </div>
  );
}
