import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function PrivacyPage() {
  return (
    <div className="px-6 py-16 md:py-24">
      <div className="prose mx-auto max-w-3xl">
        <h1 className="h1 text-foreground">Privacy Policy</h1>
        <p className="body-lg text-muted-foreground mt-4">
          Last updated: July 2026
        </p>

        <div className="mt-8 flex flex-col gap-6 text-sm text-muted-foreground leading-relaxed">
          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">
              Our promise
            </h2>
            <p>
              ResumeForge is designed to be private by default. Your resume data
              never touches our servers unless you explicitly choose to create
              an account for optional cloud sync. We don&apos;t track you. We
              don&apos;t sell your data. We don&apos;t show ads.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">
              Data we collect (when not signed in)
            </h2>
            <p>
              When using ResumeForge without an account, all data is stored
              locally in your browser using IndexedDB. We collect nothing. No
              analytics. No cookies. No tracking.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">
              Data we collect (when signed in)
            </h2>
            <p>
              If you create an account for cloud sync, we store your email
              address and encrypted resume data to sync across devices. We use
              Supabase as our backend. Your data is encrypted in transit and at
              rest.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">
              Contact
            </h2>
            <p>
              Questions about privacy? Email us at{" "}
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
