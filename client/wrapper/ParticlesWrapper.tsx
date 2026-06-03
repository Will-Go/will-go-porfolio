"use client";
import ParticlesComponent from "@/components/particles";
import React from "react";

function ParticlesWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative w-full isolate">
      {/* Fireflies */}
      <ParticlesComponent id="particles" className="absolute inset-0 animate-fade-in -z-10 pointer-events-none" />
      <div className="relative z-0">
        {children}
      </div>
    </div>
  );
}

export default ParticlesWrapper;
