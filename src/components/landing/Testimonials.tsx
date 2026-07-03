"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    quote:
      "I spent $60 on other resume builders before finding this. ResumeForge does everything they do for free. Actually insane.",
    author: "Alex Chen",
    role: "Software Engineer at Stripe",
    rating: 5,
  },
  {
    quote:
      "The ATS optimization is real. I started getting callbacks after switching to one of their templates. Night and day difference.",
    author: "Sarah Mitchell",
    role: "Product Manager at Figma",
    rating: 5,
  },
  {
    quote:
      "No account, no watermark, no nonsense. I exported my resume as PDF in about 5 minutes. This is how software should work.",
    author: "James Wilson",
    role: "Design Lead at Airbnb",
    rating: 5,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export function Testimonials() {
  return (
    <section className="border-t border-border px-6 py-20 md:py-28">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-12">
        {/* Section header */}
        <div className="flex max-w-2xl flex-col items-center gap-3 text-center">
          <span className="caption text-muted-foreground">Testimonials</span>
          <h2 className="h1 text-foreground">
            Loved by professionals worldwide
          </h2>
          <p className="body-lg text-muted-foreground">
            See why thousands choose ResumeForge over paid alternatives.
          </p>
        </div>

        {/* Testimonials grid */}
        <motion.div
          className="grid gap-4 md:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {testimonials.map((t) => (
            <motion.div
              key={t.author}
              variants={itemVariants}
              className="flex flex-col gap-4 rounded-xl border border-border bg-background p-6 transition-all hover:shadow-md hover:-translate-y-0.5"
            >
              {/* Stars */}
              <div className="flex items-center gap-0.5">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="size-3.5 fill-amber-400 text-amber-400"
                  />
                ))}
              </div>

              {/* Quote */}
              <p className="text-sm text-foreground leading-relaxed">
                &ldquo;{t.quote}&rdquo;
              </p>

              {/* Author */}
              <div className="mt-auto flex items-center gap-3 border-t border-border pt-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-[10px] font-semibold text-muted-foreground uppercase">
                  {t.author
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-medium text-foreground">
                    {t.author}
                  </span>
                  <span className="text-[10px] text-muted-foreground">
                    {t.role}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
