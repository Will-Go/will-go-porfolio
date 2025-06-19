import Link from "next/link";
import Reveal from "@/components/Reveal";
import { useTranslations } from "next-intl";
import {
  FaGithub,
  FaLinkedin,
  FaHeart,
  FaCode,
  FaRocket,
} from "react-icons/fa";

function Footer() {
  const t = useTranslations();

  const socials = [
    {
      icon: <FaGithub className="text-xl" />,
      link: "https://github.com/Will-Go",
      label: "GitHub",
      hoverColor: "hover:text-primary-100",
    },
    {
      icon: <FaLinkedin className="text-xl" />,
      link: "https://www.linkedin.com/in/wilsongw60/",
      label: "LinkedIn",
      hoverColor: "hover:text-[#0b66c2]",
    },
  ];

  const quickLinks = [
    { label: t("navigation.about"), href: "/#about" },
    { label: t("navigation.experience"), href: "/#experience" },
    { label: t("navigation.projects"), href: "/#projects" },
    { label: t("navigation.contact"), href: "/contact" },
  ];

  const currentDate = new Date();

  return (
    <footer className="group/footer relative mt-20 bg-gradient-to-br from-primary-950 via-primary-900 to-accent-950/20 border-t border-primary-800/50">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary-950/80 to-transparent"></div>
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1/6 h-0.5 transition-all duration-300 ease-in-out group-hover/footer:w-5/6 bg-gradient-to-r from-transparent via-accent-500 to-transparent"></div>

      <div className="relative max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          {/* Brand Section */}
          <Reveal animationType="fadeRight" duration={0.8} easing="easeOut">
            <div className="text-center md:text-left space-y-3">
              <div className="flex items-center justify-center md:justify-start gap-2 mb-3">
                <FaCode className="text-accent-500 text-lg" />
                <h3 className="text-xl font-bold bg-gradient-to-r from-primary-100 via-accent-400 to-primary-200 bg-clip-text text-transparent">
                  {t("footer.brand")}
                </h3>
              </div>
              <p className="text-primary-400 text-sm leading-relaxed">
                {t("footer.tagline")}
              </p>
              <div className="flex items-center justify-center md:justify-start gap-1 text-primary-500 text-xs">
                <span>{t("footer.madeWith")}</span>
                <FaHeart className="text-red-500 text-xs animate-pulse" />
                <span>and</span>
                <FaRocket className="text-accent-500 text-xs" />
              </div>
            </div>
          </Reveal>

          {/* Quick Links Section */}
          <Reveal
            animationType="fadeUp"
            delay={0.2}
            duration={0.8}
            easing="easeOut"
          >
            <div className="text-center space-y-3">
              <h4 className="text-primary-200 font-semibold text-sm uppercase tracking-wider">
                {t("footer.quickLinks")}
              </h4>
              <div className="flex flex-wrap justify-center gap-4 text-sm">
                {quickLinks.map((link, i) => (
                  <Link
                    key={i}
                    href={link.href}
                    className="text-primary-400 hover:text-accent-400 transition-colors duration-300 hover:underline underline-offset-4"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Social Links Section */}
          <Reveal
            animationType="fadeLeft"
            delay={0.4}
            duration={0.8}
            easing="easeOut"
          >
            <div className="text-center md:text-right space-y-4">
              <h4 className="text-primary-200 font-semibold text-sm uppercase tracking-wider">
                {t("footer.connect")}
              </h4>
              <div className="flex justify-center md:justify-end gap-4">
                {socials.map(({ icon, link, label, hoverColor }, i) => (
                  <Link
                    key={i}
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group relative p-3 rounded-full bg-primary-900/50 border border-primary-800/60 ${hoverColor} transition-all duration-300 hover:border-accent-500/60 hover:bg-accent-500/10 hover:scale-110 hover:shadow-lg hover:shadow-accent-500/20`}
                    aria-label={label}
                  >
                    <div className="relative">
                      {icon}
                      {/* Tooltip */}
                      <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                        <div className="bg-primary-900 text-primary-200 text-xs px-2 py-1 rounded border border-primary-700/60 whitespace-nowrap">
                          {label}
                        </div>
                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-2 h-2 bg-primary-900 border-r border-b border-primary-700/60 rotate-45 -mt-1"></div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </Reveal>
        </div>

        {/* Bottom Section */}
        <Reveal
          animationType="fadeUp"
          delay={0.6}
          duration={0.8}
          easing="easeOut"
        >
          <div className="mt-12 pt-8 border-t border-primary-800/30">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-primary-500">
              <div className="flex items-center gap-4">
                <span>
                  {t("footer.copyright", { year: currentDate.getFullYear() })}
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <span>{t("footer.builtWith")}</span>
                <div className="w-2 h-2 rounded-full bg-accent-500 animate-pulse"></div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </footer>
  );
}

export default Footer;
