"use client";

import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function BlogPage() {
  return (
    <div className="px-6 py-16 md:py-24">
      <div className="mx-auto max-w-4xl">
        <div className="flex flex-col items-center gap-6 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-border bg-muted">
            <BookOpen className="size-6 text-muted-foreground" />
          </div>
          <h1 className="h1 text-foreground">Blog</h1>
          <p className="body-lg text-muted-foreground max-w-md">
            Career advice, resume tips, and industry insights to help you land your next role.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {[
            { title: "10 ATS Keywords That Get Your Resume Read", date: "Jul 1, 2026" },
            { title: "The One-Page Resume Myth: What Recruiters Actually Want", date: "Jun 25, 2026" },
            { title: "How to Quantify Impact in Your Bullet Points", date: "Jun 18, 2026" },
            { title: "Resume Design Trends: Less is Still More", date: "Jun 10, 2026" },
          ].map((post) => (
            <div
              key={post.title}
              className="group cursor-pointer rounded-xl border border-border p-6 transition-all hover:shadow-md hover:-translate-y-0.5"
            >
              <span className="text-xs text-muted-foreground">{post.date}</span>
              <h3 className="mt-2 text-sm font-semibold text-foreground group-hover:text-accent transition-colors">
                {post.title}
              </h3>
              <div className="mt-4 flex items-center gap-1 text-xs text-muted-foreground group-hover:text-accent transition-colors">
                Read more <ArrowRight className="size-3" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
