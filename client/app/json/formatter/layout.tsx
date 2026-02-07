import React from "react";
import type { Metadata } from "next";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "JSON Formatter",
  description: "A simple JSON formatter app to validate, prettify, and compress JSON.",
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <Footer />
    </>
  );
}
