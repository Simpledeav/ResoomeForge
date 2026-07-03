import { Hero } from "@/components/landing/Hero";
import { Features } from "@/components/landing/Features";
import { TemplatesShowcase } from "@/components/landing/TemplatesShowcase";
import { Testimonials } from "@/components/landing/Testimonials";
import { ComparisonTable } from "@/components/landing/ComparisonTable";
import { FAQ } from "@/components/landing/FAQ";
import { CTA } from "@/components/landing/CTA";

export default function Home() {
  return (
    <>
      <Hero />
      <Features />
      <TemplatesShowcase />
      <Testimonials />
      <ComparisonTable />
      <FAQ />
      <CTA />
    </>
  );
}
