import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { NextIntlClientProvider } from "next-intl";
import { getLocale } from "next-intl/server";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import QueryProviders from "@/wrapper/QueryProviders";
import LenisWrapper from "@/wrapper/LenisWrapper";

// import { unstable_ViewTransition as ViewTransition } from "react";

export const metadata = {
  title: "Wilson's Portfolio",
  description: "Hello this is my personal porfolio!",
};

import { Inter, Outfit } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();
  return (
    // <ViewTransition>
    <html
      lang={locale}
      suppressHydrationWarning
      className={`${inter.variable} ${outfit.variable}`}
    >
      <body className="selection:text-black selection:bg-slate-300">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <QueryProviders>
            <LenisWrapper>
              <NextIntlClientProvider>{children}</NextIntlClientProvider>
            </LenisWrapper>
          </QueryProviders>
          <Analytics />
          <SpeedInsights />
        </ThemeProvider>
      </body>
    </html>
    // </ViewTransition>
  );
}
