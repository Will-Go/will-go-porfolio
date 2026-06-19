export type PanelHeadPlacement = "panel-top-center";

/**
 * Zones that anchor the floating head to their panel content.
 * Add entries here as more sections need panel-anchored placement.
 */
export const PANEL_HEAD_PLACEMENTS: Partial<
  Record<string, PanelHeadPlacement>
> = {
  welcome: "panel-top-center",
  about: "panel-top-center",
  education: "panel-top-center",
};

export function getPanelHeadPlacement(zone: string): PanelHeadPlacement | null {
  return PANEL_HEAD_PLACEMENTS[zone] ?? null;
}
