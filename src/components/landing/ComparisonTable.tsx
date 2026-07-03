"use client";

import { motion } from "framer-motion";
import { Check, X } from "lucide-react";

const competitors = [
  { name: "ResumeForge", pricing: "100% Free", exports: "Unlimited", watermark: false, account: false, templates: "12", ats: true },
  { name: "Novoresume", pricing: "$24.99/mo", exports: "Limited / paywalled", watermark: true, account: true, templates: "15", ats: true },
  { name: "Zety", pricing: "$23.99/mo", exports: "PDF only / paywalled", watermark: true, account: true, templates: "18", ats: true },
  { name: "Canva", pricing: "$12.99/mo", exports: "Limited free", watermark: false, account: true, templates: "50+", ats: false },
  { name: "Rezi", pricing: "$29/mo", exports: "Unlimited paid", watermark: false, account: true, templates: "6", ats: true },
];

export function ComparisonTable() {
  return (
    <section className="border-t border-border px-6 py-24 md:py-32">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-12">
        {/* Section header */}
        <div className="flex max-w-2xl flex-col items-center gap-3 text-center">
          <span className="caption text-muted-foreground">Comparison</span>
          <h2 className="h1 text-foreground">
            No hidden fees. No locked features. No upsells.
          </h2>
          <p className="body-lg text-muted-foreground">
            Every other resume builder has catches. We don&apos;t. See for
            yourself.
          </p>
        </div>

        {/* Table */}
        <div className="w-full overflow-x-auto">
          <motion.table
            className="w-full border-collapse"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
          >
            <thead>
              <tr>
                <th className="p-4 text-left text-sm font-semibold text-foreground">
                  Feature
                </th>
                {competitors.map((c) => (
                  <th
                    key={c.name}
                    className={`p-4 text-center text-sm font-semibold ${
                      c.name === "ResumeForge"
                        ? "text-accent"
                        : "text-foreground"
                    }`}
                  >
                    {c.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                {
                  label: "Pricing",
                  values: competitors.map((c) => c.pricing),
                },
                {
                  label: "Free Exports",
                  values: competitors.map((c) => c.exports),
                },
                {
                  label: "No Watermark",
                  values: competitors.map((c) => c.watermark),
                },
                {
                  label: "No Account Required",
                  values: competitors.map((c) => c.account),
                },
                {
                  label: "Templates",
                  values: competitors.map((c) => c.templates),
                },
                {
                  label: "ATS-Optimized",
                  values: competitors.map((c) => c.ats),
                },
              ].map((row, i) => (
                <tr
                  key={row.label}
                  className={`border-t border-border transition-colors hover:bg-muted/50 ${
                    i % 2 === 0 ? "bg-muted/20" : "bg-background"
                  }`}
                >
                  <td className="p-4 text-sm text-foreground">
                    {row.label}
                  </td>
                  {row.values.map((val, j) => (
                    <td
                      key={j}
                      className={`p-4 text-center text-sm ${
                        typeof val === "boolean"
                          ? ""
                          : "text-muted-foreground"
                      } ${
                        competitors[j].name === "ResumeForge"
                          ? "font-medium"
                          : ""
                      }`}
                    >
                      {typeof val === "boolean" ? (
                        val ? (
                          <Check className="mx-auto size-4 text-success" />
                        ) : (
                          <X className="mx-auto size-4 text-error" />
                        )
                      ) : (
                        val
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </motion.table>
        </div>

        <p className="text-xs text-muted-foreground text-center max-w-md">
          Data sourced from official websites as of July 2026. Plans and
          features may change. We&apos;ll always keep this table honest.
        </p>
      </div>
    </section>
  );
}
