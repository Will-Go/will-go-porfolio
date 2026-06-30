"use client";

import { useEffect } from "react";
import ThreeExperience from "@/components/three/Experience";
import HomeSections from "@/components/HomeSections";
import ScrollEdgeBlur from "@/components/ScrollEdgeBlur";
import { useTranslations } from "next-intl";
import { FaCube, FaScroll } from "react-icons/fa";
import { useViewModeStore } from "@/stores/useViewModeStore";
import { usePanelStore } from "@/stores/usePanelStore";

export default function HomePage() {
  const t = useTranslations();
  const is3D = useViewModeStore((state) => state.is3D);
  const expandedPanel = usePanelStore((state) => state.expandedPanel);
  const toggleView = useViewModeStore((state) => state.toggleView);

  useEffect(() => {
    if (is3D) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [is3D]);

  if (is3D) {
    return (
      <div className="relative animate-fade-in overflow-x-clip p-4 selection:bg-slate-300 selection:text-black md:p-12 lg:p-20">
        <ThreeExperience />
        {!expandedPanel && (
          <button
            type="button"
            onClick={toggleView}
            className="fixed top-28 right-4 z-50 flex cursor-pointer items-center gap-2 rounded-xl border border-accent-500/20 bg-black/40 px-3 py-2 text-xs text-gray-300 backdrop-blur-md transition-all duration-300 hover:border-accent-500/40 hover:text-white"
            title={t("common.seeMore")}
          >
            <FaScroll className="text-accent-500" />
            <span className="hidden sm:inline">{t("home.viewWork")}</span>
          </button>
        )}
      </div>
    );
  }

  return (
    <>
      <ScrollEdgeBlur>
        <HomeSections />
      </ScrollEdgeBlur>
      <button
        type="button"
        onClick={toggleView}
        className="fixed top-28 right-4 z-50 flex cursor-pointer items-center gap-2 rounded-xl border border-primary/20 bg-black/40 px-3 py-2 text-xs text-gray-300 backdrop-blur-md transition-all duration-300 hover:border-primary/40 hover:text-white"
        title="Switch to 3D"
      >
        <FaCube className="text-primary" />
        <span className="hidden sm:inline">3D View</span>
      </button>
    </>
  );
}
