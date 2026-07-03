import type { ReactNode } from "react";

interface SectionProps {
  title: string;
  children: ReactNode;
  titleColor?: string;
  titleSize?: string;
  borderColor?: string;
  last?: boolean;
  className?: string;
}

export function Section({
  title,
  children,
  titleColor = "text-foreground",
  titleSize = "text-xs",
  borderColor = "border-border",
  last = false,
  className = "",
}: SectionProps) {
  return (
    <div className={className}>
      <div className={`flex items-center gap-2 mb-2 ${!last ? "" : ""}`}>
        <h3
          className={`${titleSize} font-bold uppercase tracking-[0.08em] ${titleColor}`}
        >
          {title}
        </h3>
        <div className={`flex-1 border-t ${borderColor}`} />
      </div>
      {children}
    </div>
  );
}

export function Divider({ borderColor = "border-border" }: { borderColor?: string }) {
  return <div className={`border-t ${borderColor} my-3`} />;
}
