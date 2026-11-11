import React from "react";
import type { Metadata } from "next";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "UUID Generator",
  description:
    "Generate RFC 9562 UUIDs (v1, v3, v4, v5, v6, v7, v8), format them as GUIDs, copy in bulk, and decode timestamps in your browser.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <Footer />
    </>
  );
}
