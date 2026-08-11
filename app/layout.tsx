import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Aura — Ambient gradient backgrounds",
  description:
    "A small, growing set of ambient gradients built from layered blend modes — soft, atmospheric, and easy to drop behind any interface.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} antialiased`}>
      <body className="min-h-full flex flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[200] focus:px-4 focus:py-2 focus:squircle-element focus:bg-accent focus:text-accent-fg focus:font-medium"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
