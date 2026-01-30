"use client";

import Link from "next/link";
import Card from "@/components/Card";
import Reveal from "@/components/Reveal";
import { FaCode, FaFileAlt } from "react-icons/fa";
import { useTranslations } from "next-intl";

export default function AppsPage() {
  const t = useTranslations("appsContent");

  const apps = [
    {
      title: t("lorem.title"),
      description: t("lorem.description"),
      href: "/lorem",
      icon: <FaFileAlt className="text-4xl text-accent-400 mb-4" />,
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: t("json.title"),
      description: t("json.description"),
      href: "/json/formatter",
      icon: <FaCode className="text-4xl text-purple-400 mb-4" />,
      color: "from-purple-500 to-pink-500",
    },
  ];

  return (
    <main className="relative min-h-screen p-6 md:p-24 selection:text-black selection:bg-slate-300 overflow-x-hidden animate-fade-in">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Header Section */}
        <Reveal animationType="slideDown" duration={0.8} easing="backOut">
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-primary-100 via-accent-400 to-primary-200 bg-clip-text text-transparent">
              {t("title")}
            </h1>
            <p className="text-lg text-primary-400 max-w-2xl mx-auto">
              {t("subtitle")}
            </p>
          </div>
        </Reveal>

        {/* Apps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {apps.map((app, index) => (
            <Reveal
              key={app.href}
              animationType="fadeUp"
              delay={index * 0.1}
              duration={0.8}
            >
              <Link href={app.href} className="block h-full group">
                <Card className="h-full p-8 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-accent-500/10 border-primary-800/50 group-hover:border-accent-500/30">
                  <div className="flex flex-col h-full">
                    <div className="mb-6 bg-primary-900/50 w-16 h-16 rounded-2xl flex items-center justify-center border border-primary-800 group-hover:border-accent-500/30 transition-colors duration-300">
                      {app.icon}
                    </div>

                    <h2 className="text-2xl font-bold text-primary-100 mb-3 group-hover:text-accent-300 transition-colors duration-300">
                      {app.title}
                    </h2>

                    <p className="text-primary-400 mb-6 flex-grow leading-relaxed">
                      {app.description}
                    </p>

                    <div className="flex items-center text-accent-400 font-medium group-hover:translate-x-1 transition-transform duration-300">
                      {t("openTool")}
                      <svg
                        className="w-4 h-4 ml-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </div>
                  </div>
                </Card>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </main>
  );
}
