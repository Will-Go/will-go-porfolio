import Image from "next/image";
import BackgroundBlur from "@/components/BackgroundBlur";
import { unstable_ViewTransition as ViewTransition } from "react";
import Reveal from "@/components/Reveal";
import Link from "next/link";
//COMPONENTS
import Card from "@/components/Card";
import CopyText from "@/components/CopyText";

//ICONS
import { BiLogoGmail } from "react-icons/bi";
import {
  FaLinkedin,
  FaPhone,
  FaMapMarkerAlt,
  FaArrowRight,
} from "react-icons/fa";
import { useTranslations } from "next-intl";

export default function Page() {
  const t = useTranslations();

  const contacts = [
    {
      icon: <BiLogoGmail className="text-red-400" />,
      text: "wilsongongwu1@gmail.com",
      label: "Email",
      href: "mailto:wilsongongwu1@gmail.com",
      description: t("contact.email.description", {
        defaultMessage: "Drop me a line anytime",
      }),
    },
    {
      icon: <FaLinkedin className="text-blue-400" />,
      text: "linkedin.com/in/wilsongw60/",
      label: "LinkedIn",
      href: "https://linkedin.com/in/wilsongw60/",
      description: t("contact.linkedin.description", {
        defaultMessage: "Let's connect professionally",
      }),
    },
    {
      icon: <FaPhone className="text-green-400" />,
      text: "+506 8735-7137",
      label: t("contact.phone.label", { defaultMessage: "Phone" }),
      href: "tel:+50687357137",
      description: t("contact.phone.description", {
        defaultMessage: "Call me directly",
      }),
    },
    {
      icon: <FaMapMarkerAlt className="text-yellow-400" />,
      text: t("home.location"),
      label: t("contact.location.label", { defaultMessage: "Location" }),
      href: "https://maps.google.com/?q=San+José,+Costa+Rica",
      description: t("contact.location.description", {
        defaultMessage: "Central Time Zone (UTC-6)",
      }),
    },
  ];

  return (
    <main className="relative min-h-screen p-6 md:p-24 selection:text-black selection:bg-slate-300 overflow-x-hidden animate-fade-in">
      {" "}
      {/* Hero Section */}
      <section className="relative flex flex-col justify-center items-center min-h-[80vh] md:flex-row gap-8 lg:gap-12 w-full max-w-7xl mx-auto">
        {/* IMAGE SECTION - Now on the left */}
        <div className="relative flex-shrink-0 order-2 md:order-1">
          {" "}
          <Reveal
            animationType="rotateIn"
            delay={0.2}
            duration={1}
            easing="backOut"
          >
            <div className="relative">
              <ViewTransition name="Wilson-avatar">
                <div className="relative group">
                  <div className="absolute -inset-4 bg-gradient-to-r from-accent-500/20 to-primary-500/20 rounded-full blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                  <Image
                    src="/Wilson.png"
                    alt={
                      t("navigation.brand.name") +
                      " - " +
                      t("navigation.brand.title")
                    }
                    width={280}
                    height={280}
                    className="relative rounded-full w-48 h-48 sm:w-64 sm:h-64 lg:w-72 lg:h-72 object-cover border-4 border-gray-200 dark:border-primary-800/50 shadow-2xl group-hover:scale-105 transition-transform duration-300"
                    priority
                  />
                  <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-accent-500/10 to-transparent"></div>
                </div>
              </ViewTransition>
            </div>
          </Reveal>
        </div>

        {/* TEXT SECTION - Now on the right */}
        <div className="flex-1 max-w-2xl text-center md:text-left space-y-6 order-1 md:order-2">
          {" "}
          <Reveal animationType="slideDown" duration={1.2} easing="backOut">
            <div className="space-y-2">
              <p className="text-accent-600 dark:text-accent-400 text-sm md:text-base font-medium tracking-wider uppercase">
                {t("contact.subtitle")}
              </p>
              <h1 className="text-3xl sm:text-4xl lg:text-6xl xl:text-7xl font-bold bg-gradient-to-r from-gray-900 via-accent-500 to-gray-800 dark:from-primary-100 dark:via-accent-400 dark:to-primary-200 bg-clip-text text-transparent leading-tight">
                {t("contact.title")}
              </h1>
            </div>
          </Reveal>{" "}
          <Reveal
            animationType="fadeRight"
            delay={0.3}
            duration={1}
            easing="easeOut"
          >
            <h2 className="text-xl sm:text-2xl lg:text-3xl text-gray-700 dark:text-primary-300 font-semibold">
              {t("contact.availability")}
            </h2>
          </Reveal>
          <Reveal delay={0.5}>
            <p className="text-sm sm:text-lg text-gray-600 dark:text-primary-400 leading-relaxed max-w-xl">
              {t("contact.description")}
            </p>
          </Reveal>
          <Reveal
            animationType="scale"
            delay={0.7}
            duration={0.8}
            easing="backOut"
          >
            <div className="flex flex-col sm:flex-row sm:justify-center md:justify-start gap-4 pt-4">
              <Link
                href="mailto:wilsongongwu1@gmail.com"
                className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-accent-500 to-accent-600 text-white font-semibold rounded-xl hover:from-accent-600 hover:to-accent-700 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-primary-950 transition-all duration-200 transform hover:scale-105 group"
              >
                {t("contact.getInTouch")}
                <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
            </div>
          </Reveal>
        </div>

        <BackgroundBlur className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-96 w-96 opacity-30" />
      </section>
      {/* Contact Information Section */}
      <section className="relative w-full max-w-7xl mx-auto py-16">
        <Reveal animationType="flipUp" duration={0.5} easing="backOut">
          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-primary-200 mb-4">
              {t("contact.getInTouch")}
            </h3>
            <p className="text-gray-600 dark:text-primary-400 max-w-2xl mx-auto">
              {t("contact.contactInfo.description", {
                defaultMessage:
                  "Choose your preferred way to reach out. I typically respond within 24 hours.",
              })}
            </p>
          </div>
        </Reveal>{" "}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {contacts.map(({ icon, text, label, href, description }, i) => {
            return (
              <Reveal
                key={i}
                animationType={"flipUp"}
                delay={0.5 + i * 0.2}
                duration={0.8}
                easing="backOut"
                distance={50}
              >
                <Link
                  className="group hover:scale-105 transition-all duration-300  h-full"
                  href={href}
                  target="_blank"
                >
                  {" "}
                  <Card className="hover:border-accent-500/50 h-full !cursor-pointer">
                    <div className="flex flex-col items-center text-center p-4 space-y-4">
                      <div className="text-4xl transition-transform duration-300 group-hover:scale-110">
                        {icon}
                      </div>
                      <div className="space-y-2">
                        <h4 className="text-lg font-semibold text-gray-800 dark:text-primary-200 group-hover:text-accent-400 transition-colors duration-300">
                          {label}
                        </h4>
                        <div className="flex items-center justify-center gap-2">
                          <p className="text-xs text-nowrap text-gray-600 dark:text-primary-400 break-all">
                            {text}
                          </p>
                          <CopyText
                            text={text}
                            tooltipText={`Copy ${label.toLowerCase()}`}
                            className="opacity-60 hover:opacity-100 transition-opacity"
                          />
                        </div>
                        <p className="text-xs text-gray-500 dark:text-primary-500">
                          {description}
                        </p>
                      </div>
                      <div className="mt-auto pt-2">
                        <div className="w-0 h-0.5 bg-gradient-to-r from-accent-500 to-accent-600 group-hover:w-full transition-all duration-300"></div>
                      </div>
                    </div>
                  </Card>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </section>
      {/* Call to Action Section */}
      <section className="relative w-full max-w-4xl mx-auto py-16 text-center">
        <Reveal delay={0.5}>
          <Card className="backdrop-blur-sm bg-white/40 dark:bg-primary-900/40 border-accent-500/10 dark:border-accent-500/30">
            <div className="p-8 md:p-12 space-y-6">
              <h3 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-gray-900 via-accent-500 to-gray-800 dark:from-primary-100 dark:via-accent-400 dark:to-primary-200 bg-clip-text text-transparent">
                {t("contact.cta.title")}
              </h3>
              <p className="text-gray-600 dark:text-primary-400 text-lg max-w-2xl mx-auto">
                {t("contact.cta.description")}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Link
                  href="https://linkedin.com/in/wilsongw60/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-8 py-4 border-2 border-gray-300 dark:border-primary-700 text-gray-700 dark:text-primary-200 font-semibold rounded-xl hover:border-accent-500 hover:text-accent-600 dark:hover:text-accent-400 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-primary-950 transition-all duration-200"
                >
                  <FaLinkedin className="mr-2" />
                  {t("contact.cta.connectLinkedIn")}
                </Link>
              </div>
            </div>
          </Card>
        </Reveal>
      </section>
    </main>
  );
}
