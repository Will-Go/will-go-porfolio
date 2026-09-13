import React from "react";
import type { Metadata } from "next";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "QR Code Generator",
  description:
    "Create custom QR codes for websites and text, with frames, logos, and downloadable PNG, JPG, or SVG files.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <Footer />
    </>
  );
}
