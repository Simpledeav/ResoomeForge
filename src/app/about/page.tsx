"use client";

import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AboutPage() {
  return (
    <div className="px-6 py-16 md:py-24">
      <div className="mx-auto max-w-3xl">
        <div className="flex flex-col gap-4 text-center">
          <h1 className="h1 text-foreground">About ResumeForge</h1>
          <p className="body-lg text-muted-foreground">
            We believe building a resume should be free, fast, and private. No
            tricks. No upsells. No data harvesting.
          </p>
        </div>

        <div className="mt-12 flex flex-col gap-8">
          <div className="flex flex-col gap-4 rounded-xl border border-border p-6 md:p-8">
            <h2 className="text-lg font-semibold text-foreground">
              Why we built this
            </h2>
            <div className="flex flex-col gap-3 text-sm text-muted-foreground leading-relaxed">
              <p>
                Every other resume builder has a catch. "Free" means exporting
                costs $9.99. "Unlimited" means 3 downloads per month. "No
                watermark" actually means "watermark until you pay."
              </p>
              <p>
                We got tired of it. So we built ResumeForge — the only resume
                builder that is actually, genuinely, 100% free. No account. No
                watermark. No paywall. Unlimited exports. Forever.
              </p>
              <p>
                Your data stays in your browser. Your resume is yours, not ours.
                We don't track you, sell your data, or lock features behind
                payments. Simple.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-4 rounded-xl border border-border p-6 md:p-8">
            <h2 className="text-lg font-semibold text-foreground">
              What makes us different
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                { label: "Founded", value: "2024" },
                { label: "Team", value: "2 engineers" },
                { label: "Users", value: "10,000+" },
                { label: "Price", value: "$0 forever" },
              ].map((stat) => (
                <div key={stat.label} className="flex flex-col gap-0.5">
                  <span className="caption text-muted-foreground">
                    {stat.label}
                  </span>
                  <span className="text-sm font-semibold text-foreground">
                    {stat.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 flex justify-center">
          <Link href="/dashboard">
            <Button size="lg" className="group">
              <Sparkles className="mr-2 size-4" />
              Build your resume free
              <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-0.5" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
