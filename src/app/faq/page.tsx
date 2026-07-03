"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

const faqs = [
  {
    q: "Is ResumeForge really 100% free?",
    a: "Yes. No hidden charges, no credit card required, no premium features locked behind a paywall. Unlimited downloads in every format. We believe resume building should cost exactly $0.",
  },
  {
    q: "Do I need to create an account?",
    a: "No. Your resume data is stored locally in your browser using IndexedDB and never touches our servers. If you want optional cloud sync, you can create an account — but it's never required.",
  },
  {
    q: "Are the templates ATS-friendly?",
    a: "Every template is designed to pass automated resume parsers. We follow strict formatting rules: standard section headers, no text-in-images, proper font embedding, simple tables, and clean semantic structure. We test every template against popular ATS systems.",
  },
  {
    q: "Can I export to multiple formats?",
    a: "Yes — PDF, DOCX (Microsoft Word), PNG, and JPG. All unlimited. Everything runs in your browser — no server uploads required.",
  },
  {
    q: "Is my data private?",
    a: "Absolutely. Everything runs client-side. Your resume data is stored in IndexedDB (local storage). No data is sent to our servers unless you explicitly create an account for cloud sync. We don't track, sell, or monetize your data.",
  },
  {
    q: "Can I customize templates?",
    a: "Yes. Every template supports full customization: colors (with a color picker), fonts (8 Google Font pairings), spacing, margins, section order, and visibility. Changes reflect instantly in a live preview.",
  },
];

export default function FAQPage() {
  return (
    <div className="px-6 py-16 md:py-24">
      <div className="mx-auto max-w-3xl">
        <div className="flex flex-col gap-4 text-center">
          <h1 className="h1 text-foreground">Frequently asked questions</h1>
          <p className="body-lg text-muted-foreground max-w-xl mx-auto">
            Everything you need to know about ResumeForge.
          </p>
        </div>

        <div className="mt-12 flex flex-col gap-4">
          {faqs.map((faq) => (
            <Card key={faq.q}>
              <CardHeader>
                <CardTitle className="text-sm">{faq.q}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm leading-relaxed">
                  {faq.a}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center gap-4 text-center">
          <p className="text-sm text-muted-foreground">
            Still have questions? We&apos;d love to help.
          </p>
          <Link href="mailto:hi@resumeforge.com">
            <Button variant="outline" className="group">
              Email us
              <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-0.5" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
