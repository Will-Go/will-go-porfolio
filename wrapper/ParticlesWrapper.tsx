"use client";
import ParticlesComponent from "@/components/particles";
function ParticlesWrapper({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ParticlesComponent id="particles" className=" absolute z-[-10]" />
      {children}
    </>
  );
}

export default ParticlesWrapper;
