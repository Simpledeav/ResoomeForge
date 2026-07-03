import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function TermsPage() {
  return (
    <div className="px-6 py-16 md:py-24">
      <div className="mx-auto max-w-3xl">
        <h1 className="h1 text-foreground">Terms of Service</h1>
        <p className="body-lg text-muted-foreground mt-4">
          Last updated: July 2026
        </p>

        <div className="mt-8 flex flex-col gap-6 text-sm text-muted-foreground leading-relaxed">
          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">
              1. Acceptance
            </h2>
            <p>
              By using ResumeForge, you agree to these terms. If you don&apos;t
              agree, don&apos;t use the service.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">
              2. Free forever
            </h2>
            <p>
              ResumeForge is and will remain free to use. No hidden charges. No
              premium features. No upsells. We mean it.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">
              3. Your data
            </h2>
            <p>
              You own your resume data. We don&apos;t claim any ownership. We
              don&apos;t sell it. We don&apos;t use it for training AI models.
              Your data is yours.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">
              4. No warranty
            </h2>
            <p>
              ResumeForge is provided &quot;as is&quot; without warranty of any
              kind. We do our best but can&apos;t guarantee your resume will
              land you a job.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">
              5. Contact
            </h2>
            <p>
              Questions?{" "}
              <a
                href="mailto:hi@resumeforge.com"
                className="text-foreground underline underline-offset-2 decoration-border"
              >
                hi@resumeforge.com
              </a>
            </p>
          </section>
        </div>

        <div className="mt-12">
          <Link
            href="/"
            className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowRight className="size-3 rotate-180" />
            Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}
