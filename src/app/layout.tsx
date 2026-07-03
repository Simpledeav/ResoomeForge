import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/shared/ThemeProvider";
import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/Footer";
import "./globals.css";
import "@/styles/tokens.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "ResumeForge — Build a resume that gets you hired. Free. Forever.",
    template: "%s | ResumeForge",
  },
  description:
    "The only 100% free resume builder with unlimited PDF, DOCX, PNG & JPG downloads. No account required. No watermark. No paywall. Ever.",
  keywords: [
    "resume builder",
    "free resume builder",
    "CV builder",
    "ATS-friendly resume",
    "resume templates",
    "no sign-up resume",
  ],
  openGraph: {
    title: "ResumeForge — Free Resume Builder",
    description:
      "Build a professional resume for free. Unlimited downloads. No account needed.",
    type: "website",
    siteName: "ResumeForge",
  },
  twitter: {
    card: "summary_large_image",
    title: "ResumeForge — Free Resume Builder",
    description:
      "Build a professional resume for free. Unlimited downloads. No account needed.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-background text-foreground antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <TooltipProvider>
            <Navbar />
            <main>{children}</main>
            <Footer />
            <Toaster />
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
