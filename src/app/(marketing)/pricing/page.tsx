"use client";

import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Everything you need to build a great resume.",
    features: [
      "12 ATS-friendly templates",
      "Unlimited PDF, DOCX, PNG, JPG exports",
      "Full customization (colors, fonts, layout)",
      "Live preview editor",
      "Cover letter generator",
      "Import existing resumes",
      "100% private — no account needed",
    ],
    cta: "Start building free",
    href: "/dashboard",
    featured: true,
  },
  {
    name: "Coming Soon: Pro",
    price: "—",
    period: "",
    description: "Advanced features for power users.",
    features: [
      "Everything in Free",
      "Cloud sync across devices",
      "AI bullet-point suggestions",
      "Bulk apply tailoring",
      "LinkedIn profile import",
      "Priority support",
    ],
    cta: "Get notified",
    href: "#",
    featured: false,
  },
];

export default function PricingPage() {
  return (
    <div className="px-6 py-16 md:py-24">
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-col items-center gap-4 text-center">
          <h1 className="h1 text-foreground">Free. Forever.</h1>
          <p className="body-lg text-muted-foreground max-w-xl">
            No hidden fees. No credit card required. No premium features locked
            behind a paywall. Just a damn good resume builder.
          </p>
        </div>

        <div className="mt-12 mx-auto max-w-md">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={plan.featured ? "border-foreground" : ""}
            >
              <CardHeader>
                <CardTitle>{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-6">
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-foreground">
                    {plan.price}
                  </span>
                  {plan.period && (
                    <span className="text-sm text-muted-foreground">
                      /{plan.period}
                    </span>
                  )}
                </div>
                <div className="flex flex-col gap-2">
                  {plan.features.map((f) => (
                    <div key={f} className="flex items-start gap-2">
                      <Check className="mt-0.5 size-4 shrink-0 text-success" />
                      <span className="text-sm text-muted-foreground">{f}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Link href={plan.href} className="w-full">
                  <Button className="w-full group" variant={plan.featured ? "default" : "outline"}>
                    {plan.cta}
                    {plan.featured && (
                      <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-0.5" />
                    )}
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
