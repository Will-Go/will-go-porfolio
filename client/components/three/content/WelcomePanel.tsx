"use client";

import { useTranslations } from "next-intl";
import { PanelHeadAnchor } from "../PanelHeadAnchor";

export function WelcomePanel() {
  const t = useTranslations();

  return (
    <PanelHeadAnchor zone="welcome">
      <div className="text-left space-y-2">
        <p className="text-sm text-gray-100 leading-relaxed">
          <span className="text-accent-400">{t("home.welcome")}!</span>{" "}
          {t("home.name")}. {t("home.title")} based in {t("home.location")}.
        </p>
        <p className="text-xs text-gray-400 leading-relaxed">
          {t("home.description", { location: t("home.location") })}
        </p>
      </div>
    </PanelHeadAnchor>
  );
}
