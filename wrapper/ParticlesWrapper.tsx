"use client";
import ParticlesComponent from "@/components/particles";
import React from "react";

function ParticlesWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative w-full h-full">
      {/* Fireflies */}
      <ParticlesComponent id="particles" className="absolute z-[-10] animate-fade-in" />
      {children}
    </div>
  );
}

export default ParticlesWrapper;
