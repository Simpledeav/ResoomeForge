import Link from "next/link";
import { FileText } from "lucide-react";

const footerLinks = [
  {
    title: "Product",
    links: [
      { href: "/templates", label: "Templates" },
      { href: "/examples", label: "Examples" },
      { href: "/pricing", label: "Pricing" },
      { href: "/dashboard", label: "Start Building" },
    ],
  },
  {
    title: "Resources",
    links: [
      { href: "/examples", label: "Example Resumes" },
      { href: "/faq", label: "FAQ" },
      { href: "/blog", label: "Blog" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/about", label: "About" },
      { href: "/privacy", label: "Privacy" },
      { href: "/terms", label: "Terms" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-(--resume-content-max-w) px-6 py-16">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {/* Brand column */}
          <div className="col-span-2 flex flex-col gap-4 md:col-span-1">
            <Link
              href="/"
              className="flex items-center gap-2 text-sm font-semibold text-foreground"
            >
              <FileText className="size-4" />
              ResumeForge
            </Link>
            <p className="text-sm text-muted-foreground">
              The only 100% free resume builder. No account. No watermark. No
              paywall. Ever.
            </p>
          </div>

          {/* Link columns */}
          {footerLinks.map((group) => (
            <div key={group.title} className="flex flex-col gap-3">
              <span className="caption text-muted-foreground">
                {group.title}
              </span>
              <div className="flex flex-col gap-2">
                {group.links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 border-t border-border pt-6">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} ResumeForge. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
