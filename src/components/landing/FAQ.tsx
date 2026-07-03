"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "Is ResumeForge really 100% free?",
    a: "Yes. ResumeForge is completely free. No hidden charges, no credit card required, no 'premium' features locked behind a paywall. Unlimited downloads in every format. We believe resume building should cost exactly $0.",
  },
  {
    q: "Do I need to create an account?",
    a: "No account or sign-up is required. Your resume data is stored locally in your browser using IndexedDB. It never touches our servers. If you want cloud sync, you can optionally create an account — but it's never required.",
  },
  {
    q: "Are the templates ATS-friendly?",
    a: "Every template is designed to pass automated resume parsers (ATS). We follow strict formatting rules: standard section headers, no text-in-images, proper font embedding, simple tables, and clean semantic structure. We test every template against popular ATS systems.",
  },
  {
    q: "Can I export to PDF, DOCX, and other formats?",
    a: "Yes! Export to PDF, DOCX (Microsoft Word), PNG, and JPG — all unlimited. PDF uses @react-pdf/renderer for perfect client-side rendering. DOCX uses the docx library for native Word-compatible files. Everything runs in your browser — no server uploads.",
  },
  {
    q: "Is my data private and secure?",
    a: "Absolutely. Everything runs client-side in your browser. Your resume data is stored in IndexedDB (local storage). No data is sent to our servers unless you explicitly choose to create an account for cloud sync. We don't track, sell, or monetize your data.",
  },
  {
    q: "Can I customize colors, fonts, and layout?",
    a: "Yes. Every template supports full customization: colors (with a color picker), fonts (8 Google Fonts pairings), spacing, margins, section order, and visibility. Changes reflect instantly in a live preview. You can also toggle light/dark mode per template.",
  },
  {
    q: "What is the maximum number of pages?",
    a: "There is no hard limit, but we recommend 1 page for < 10 years of experience and 2 pages for senior roles. Each template handles page breaks intelligently and scales content appropriately.",
  },
  {
    q: "Do you offer cover letter templates too?",
    a: "Yes! You can generate a matching cover letter from your resume data in one click. It uses the same template styling so your application looks cohesive. Cover letters are also free and exportable in all formats.",
  },
];

function FAQItem({
  question,
  answer,
  isOpen,
  onToggle,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border-b border-border last:border-b-0">
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 px-0 py-5 text-left text-sm text-foreground transition-colors hover:text-accent"
        aria-expanded={isOpen}
      >
        <span className="font-medium">{question}</span>
        <ChevronDown
          className={`size-4 shrink-0 text-muted-foreground transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] as const }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-sm text-muted-foreground leading-relaxed">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="border-t border-border px-6 py-24 md:py-32">
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-12">
        {/* Section header */}
        <div className="flex max-w-2xl flex-col items-center gap-3 text-center">
          <span className="caption text-muted-foreground">FAQ</span>
          <h2 className="h1 text-foreground">Frequently asked questions</h2>
          <p className="body-lg text-muted-foreground">
            Everything you need to know about ResumeForge. Still have questions?{" "}
            <a
              href="mailto:hi@resumeforge.com"
              className="text-foreground underline underline-offset-2 decoration-border decoration-1 transition-colors hover:text-accent"
            >
              hi@resumeforge.com
            </a>
          </p>
        </div>

        {/* FAQ accordion */}
        <motion.div
          className="w-full"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
        >
          {faqs.map((faq, i) => (
            <FAQItem
              key={i}
              question={faq.q}
              answer={faq.a}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
