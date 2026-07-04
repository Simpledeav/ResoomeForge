import { Suspense } from "react";
import CoverLetterEditorPage from "./CoverLetterEditor";

export default function CoverLetterPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center h-[calc(100vh-3.5rem)]">
        <div className="flex flex-col items-center gap-2">
          <div className="size-6 animate-spin rounded-full border-2 border-foreground border-t-transparent" />
          <p className="text-sm text-muted-foreground">Loading editor...</p>
        </div>
      </div>
    }>
      <CoverLetterEditorPage />
    </Suspense>
  );
}
