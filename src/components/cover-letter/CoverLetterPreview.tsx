import type { CoverLetter } from "@/lib/schema/cover-letter";

interface CoverLetterPreviewProps {
  letter: CoverLetter;
  className?: string;
}

function getFontFamily(font: string): string {
  const fonts: Record<string, string> = {
    geist: "var(--font-geist-sans)",
    inter: "var(--font-geist-sans)",
    mono: "var(--font-geist-mono)",
  };
  return fonts[font] || fonts.geist;
}

const spacingValues = {
  compact: { section: "mb-3", paragraph: "mb-2" },
  normal: { section: "mb-5", paragraph: "mb-3" },
  spacious: { section: "mb-7", paragraph: "mb-5" },
};

const fontSizeValues = {
  small: { body: "text-[9px]", sender: "text-[11px]", heading: "text-sm", senderSize: 11 },
  medium: { body: "text-[10px]", sender: "text-xs", heading: "text-base", senderSize: 12 },
  large: { body: "text-[11px]", sender: "text-sm", heading: "text-lg", senderSize: 14 },
};

export function CoverLetterPreview({ letter, className = "" }: CoverLetterPreviewProps) {
  const date = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const spacing = spacingValues[letter.meta.spacing] || spacingValues.normal;
  const sizes = fontSizeValues[letter.meta.fontSize] || fontSizeValues.medium;

  const greetingText =
    letter.greeting +
    (letter.recipientName
      ? ` ${letter.recipientName},`
      : letter.company
        ? ` ${letter.company} Team,`
        : " Hiring Manager,");

  const style: React.CSSProperties = {
    fontFamily: getFontFamily(letter.meta.font),
    padding: letter.meta.margin === "small" ? "24px" : letter.meta.margin === "large" ? "48px" : "36px",
  };

  return (
    <div
      className={`bg-background text-foreground ${className}`}
      style={style}
    >
      {/* Accent line */}
      <div
        className="h-1 w-12 rounded-full mb-6"
        style={{ backgroundColor: letter.meta.color }}
      />

      {/* Sender */}
      <div className={spacing.section}>
        {letter.senderName && (
          <p className={`font-bold text-foreground ${sizes.sender}`}>
            {letter.senderName}
          </p>
        )}
        {letter.senderTitle && (
          <p className={`text-muted-foreground ${sizes.body} mt-0.5`}>
            {letter.senderTitle}
          </p>
        )}
        {(letter.senderEmail || letter.senderPhone) && (
          <div className="flex gap-3 mt-1">
            {letter.senderEmail && (
              <p className={`text-muted-foreground ${sizes.body}`}>
                {letter.senderEmail}
              </p>
            )}
            {letter.senderPhone && (
              <p className={`text-muted-foreground ${sizes.body}`}>
                {letter.senderPhone}
              </p>
            )}
          </div>
        )}
      </div>

      {/* Date */}
      <p className={`text-muted-foreground ${sizes.body} ${spacing.paragraph}`}>
        {date}
      </p>

      {/* Recipient */}
      <div className={spacing.section}>
        {letter.recipientName && (
          <p className={`text-foreground ${sizes.body}`}>{letter.recipientName}</p>
        )}
        {letter.recipientTitle && (
          <p className={`text-muted-foreground ${sizes.body}`}>
            {letter.recipientTitle}
          </p>
        )}
        {letter.company && (
          <p className={`text-foreground ${sizes.body}`}>{letter.company}</p>
        )}
        {letter.companyAddress && (
          <p className={`text-muted-foreground ${sizes.body}`}>
            {letter.companyAddress}
          </p>
        )}
      </div>

      {/* Greeting */}
      <p className={`font-medium text-foreground ${spacing.paragraph} ${sizes.body}`}>
        {greetingText}
      </p>

      {/* Body */}
      {letter.bodyParagraphs.filter(Boolean).map((p, i) => (
        <p
          key={i}
          className={`leading-[1.7] text-justify text-foreground/90 ${sizes.body} ${
            i < letter.bodyParagraphs.filter(Boolean).length - 1 ? spacing.paragraph : ""
          }`}
        >
          {p}
        </p>
      ))}

      {/* Sign off */}
      <div className="mt-8 pt-4 border-t border-border/50">
        <p className={`text-foreground ${sizes.body}`}>{letter.signOff},</p>
        <p
          className="font-bold mt-1.5"
          style={{ fontSize: `${(sizes as { senderSize: number }).senderSize * 1.2}px`, color: letter.meta.color }}
        >
          {letter.senderName || "Your Name"}
        </p>
      </div>
    </div>
  );
}
