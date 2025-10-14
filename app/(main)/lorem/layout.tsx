import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lorem Ipsum Generator",
  description: "Generate random placeholder text for your designs and mockups",
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
