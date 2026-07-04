"use client";

import { forwardRef, useState } from "react";
import { TemplateRenderer } from "@/components/templates/TemplateRenderer";
import { useResumeStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { ZoomIn, ZoomOut, Maximize2, Minimize2 } from "lucide-react";
import { cn } from "@/lib/utils";

export const PreviewPane = forwardRef<HTMLDivElement, object>(function PreviewPane(_props, ref) {
  const currentResume = useResumeStore((s) => s.currentResume);
  const [zoom, setZoom] = useState(75);
  const [fitToWidth, setFitToWidth] = useState(true);

  const zoomIn = () => setZoom((z) => Math.min(z + 10, 150));
  const zoomOut = () => setZoom((z) => Math.max(z - 10, 50));

  return (
    <div className="flex-1 flex flex-col bg-muted/30 overflow-hidden" ref={ref}>
      {/* Zoom controls */}
      <div className="flex items-center justify-between border-b border-border px-2 sm:px-4 py-1 sm:py-1.5 bg-background/80">
        <div className="flex items-center gap-1.5">
          <span className="text-[9px] sm:text-[10px] text-muted-foreground font-medium uppercase tracking-wider">
            Preview
          </span>
          {currentResume.meta.template && (
            <span className="text-[9px] sm:text-[10px] text-muted-foreground capitalize hidden sm:inline">
              · {currentResume.meta.template}
            </span>
          )}
        </div>
        <div className="flex items-center gap-0.5 sm:gap-1">
          <Button variant="ghost" size="icon-xs" onClick={zoomOut} disabled={zoom <= 50}>
            <ZoomOut className="size-3" />
          </Button>
          <span className="text-[10px] sm:text-[11px] text-muted-foreground tabular-nums w-6 sm:w-8 text-center hidden sm:inline">
            {zoom}%
          </span>
          <Button variant="ghost" size="icon-xs" onClick={zoomIn} disabled={zoom >= 150}>
            <ZoomIn className="size-3" />
          </Button>
          <div className="h-3 w-px bg-border mx-0.5 sm:mx-1" />
          <Button
            variant="ghost"
            size="icon-xs"
            onClick={() => setFitToWidth(!fitToWidth)}
            className={fitToWidth ? "text-foreground" : "text-muted-foreground"}
          >
            {fitToWidth ? <Maximize2 className="size-3" /> : <Minimize2 className="size-3" />}
          </Button>
        </div>
      </div>

      {/* Preview content */}
      <div className="flex-1 overflow-auto flex items-start justify-center p-3 sm:p-6">
        <div
          className={cn(
            "bg-background shadow-lg ring-1 ring-foreground/5 transition-all",
            fitToWidth ? "w-full max-w-[816px]" : "",
          )}
          style={
            !fitToWidth
              ? {
                  width: 816,
                  transform: `scale(${zoom / 100})`,
                  transformOrigin: "top center",
                }
              : { transform: `scale(${zoom / 100})`, transformOrigin: "top center" }
          }
        >
          <TemplateRenderer />
        </div>
      </div>
    </div>
  );
});
