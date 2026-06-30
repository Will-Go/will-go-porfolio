"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

const BLUR_LAYERS = 4;
const EDGE_BLUR = 12;
const EDGE_HEIGHT = 14;
// Distance (in px) over which a band fades out as you reach that end of the page.
const FADE_RANGE = 140;

interface EdgeBandProps {
  edge: "top" | "bottom";
  opacity: number;
}

/**
 * A progressive backdrop blur fixed to one edge of the viewport. The blur is
 * strongest right at the edge and ramps to zero toward the center, so content
 * only goes out of focus as it scrolls off-screen. It's anchored to the
 * viewport (not individual sections) so there are no seams between sections.
 */
function EdgeBand({ edge, opacity }: EdgeBandProps) {
  const toCenter = edge === "top" ? "to bottom" : "to top";

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-x-0 z-30 transition-opacity duration-300 ease-out"
      style={{ [edge]: 0, height: `${EDGE_HEIGHT}vh`, opacity }}
    >
      {Array.from({ length: BLUR_LAYERS }).map((_, index) => {
        const layer = index + 1;
        const blur = (EDGE_BLUR * layer) / BLUR_LAYERS;
        // Opaque band shrinks toward the edge as the blur strength grows, so the
        // heaviest blur only covers the thin strip right at the edge.
        const fadeStop = 100 - (layer - 1) * (100 / BLUR_LAYERS);
        const solidStop = Math.max(fadeStop - 100 / BLUR_LAYERS, 0);
        const mask = `linear-gradient(${toCenter}, black 0%, black ${solidStop}%, transparent ${fadeStop}%)`;

        return (
          <div
            key={layer}
            className="absolute inset-0"
            style={{
              backdropFilter: `blur(${blur}px)`,
              WebkitBackdropFilter: `blur(${blur}px)`,
              maskImage: mask,
              WebkitMaskImage: mask,
            }}
          />
        );
      })}
    </div>
  );
}

const clamp01 = (value: number) => Math.min(Math.max(value, 0), 1);

interface ScrollEdgeBlurProps {
  children: ReactNode;
}

export default function ScrollEdgeBlur({ children }: ScrollEdgeBlurProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [topOpacity, setTopOpacity] = useState(0);
  const [bottomOpacity, setBottomOpacity] = useState(1);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      const container = containerRef.current;
      if (!container) return;

      const scrollTop = window.scrollY;
      const viewportBottom = scrollTop + window.innerHeight;
      const containerTop = container.offsetTop;
      const containerBottom = containerTop + container.offsetHeight;
      const scrolledPastTop = scrollTop - containerTop;
      const distanceFromBottom = containerBottom - viewportBottom;

      setTopOpacity(clamp01(scrolledPastTop / FADE_RANGE));
      setBottomOpacity(clamp01(distanceFromBottom / FADE_RANGE));
    };

    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative">
      {children}
      <EdgeBand edge="top" opacity={topOpacity} />
      <EdgeBand edge="bottom" opacity={bottomOpacity} />
    </div>
  );
}
