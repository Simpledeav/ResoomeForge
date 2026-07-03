"use client";

import { motion } from "framer-motion";
import {
  FileText,
  Download,
  Palette,
  ShieldCheck,
  Zap,
  Globe,
  BarChart3,
  Sparkles,
} from "lucide-react";

const features = [
  {
    icon: FileText,
    title: "12 ATS-Optimized Templates",
    description:
      "Every template is built to pass automated resume parsers. Clean semantic structure, standard section headers, no fancy graphics that break parsers.",
    gradient: "from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20",
    iconColor: "text-blue-600 dark:text-blue-400",
    borderColor: "border-blue-200/50 dark:border-blue-800/30",
  },
  {
    icon: Download,
    title: "Unlimited Exports, Every Format",
    description:
      "PDF, DOCX (Word), PNG, and JPG — download as many times as you need. No limits. No upgrade paths. No watermarks. Ever.",
    gradient: "from-emerald-50 to-teal-50 dark:from-emerald-950/20 dark:to-teal-950/20",
    iconColor: "text-emerald-600 dark:text-emerald-400",
    borderColor: "border-emerald-200/50 dark:border-emerald-800/30",
  },
  {
    icon: Palette,
    title: "Full Creative Control",
    description:
      "Customize colors, fonts, spacing, margins, section order, and visibility. Changes reflect instantly in a live preview. Make it yours.",
    gradient: "from-violet-50 to-purple-50 dark:from-violet-950/20 dark:to-purple-950/20",
    iconColor: "text-violet-600 dark:text-violet-400",
    borderColor: "border-violet-200/50 dark:border-violet-800/30",
  },
  {
    icon: ShieldCheck,
    title: "100% Private. No Account.",
    description:
      "Everything runs in your browser. Your data never touches a server. No sign-up. No tracking. No data selling. Your resume is yours.",
    gradient: "from-rose-50 to-pink-50 dark:from-rose-950/20 dark:to-pink-950/20",
    iconColor: "text-rose-600 dark:text-rose-400",
    borderColor: "border-rose-200/50 dark:border-rose-800/30",
  },
  {
    icon: Zap,
    title: "Smart Content Suggestions",
    description:
      "AI-powered bullet points, action verbs, and impact metrics tailored to your role and industry. Write better, faster.",
    gradient: "from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20",
    iconColor: "text-amber-600 dark:text-amber-400",
    borderColor: "border-amber-200/50 dark:border-amber-800/30",
  },
  {
    icon: Globe,
    title: "Cover Letters & More",
    description:
      "Generate matching cover letters from your resume data in one click. Tailor your entire application for every job in seconds.",
    gradient: "from-cyan-50 to-sky-50 dark:from-cyan-950/20 dark:to-sky-950/20",
    iconColor: "text-cyan-600 dark:text-cyan-400",
    borderColor: "border-cyan-200/50 dark:border-cyan-800/30",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06 },
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

export function Features() {
  return (
    <section className="border-t border-border px-6 py-20 md:py-28">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-12">
        {/* Section header */}
        <div className="flex max-w-2xl flex-col items-center gap-3 text-center">
          <span className="caption text-muted-foreground">Features</span>
          <h2 className="h1 text-foreground">
            Everything you need to land the role
          </h2>
          <p className="body-lg text-muted-foreground">
            Built by engineers who&apos;ve reviewed thousands of resumes. We
            know what works — and what doesn&apos;t.
          </p>
        </div>

        {/* Feature grid */}
        <motion.div
          className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={itemVariants}
              className={`group flex flex-col gap-4 rounded-xl border ${feature.borderColor} bg-gradient-to-br ${feature.gradient} p-6 transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 md:p-7`}
            >
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-lg border ${feature.borderColor} bg-background/80 backdrop-blur-sm`}
              >
                <feature.icon className={`size-4 ${feature.iconColor}`} />
              </div>
              <h3 className="text-sm font-semibold text-foreground">
                {feature.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats bar */}
        <motion.div
          className="grid w-full max-w-3xl grid-cols-2 gap-px overflow-hidden rounded-xl border border-border bg-border md:grid-cols-4"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] as const }}
        >
          {[
            { value: "10K+", label: "Resumes built" },
            { value: "12", label: "Templates" },
            { value: "4", label: "Export formats" },
            { value: "100%", label: "Free forever" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center gap-0.5 bg-background py-5"
            >
              <span className="text-lg font-bold text-foreground">
                {stat.value}
              </span>
              <span className="text-[11px] text-muted-foreground uppercase tracking-wider">
                {stat.label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
