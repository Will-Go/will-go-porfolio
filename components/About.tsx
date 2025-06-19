import Reveal from "@/components/Reveal";
import Card from "@/components/Card";
import { useTranslations } from "next-intl";

//ICONS
import {
  FaUser,
  FaCode,
  FaGraduationCap,
  FaRocket,
  FaHeart,
  FaLightbulb,
} from "react-icons/fa";

function About() {
  const t = useTranslations("about");

  const highlights = [
    {
      icon: <FaCode className="text-accent-500" />,
      title: t("highlights.experience.title"),
      description: t("highlights.experience.description"),
    },
    {
      icon: <FaGraduationCap className="text-blue-400" />,
      title: t("highlights.education.title"),
      description: t("highlights.education.description"),
    },
    {
      icon: <FaRocket className="text-green-400" />,
      title: t("highlights.skills.title"),
      description: t("highlights.skills.description"),
    },
    {
      icon: <FaLightbulb className="text-yellow-400" />,
      title: t("highlights.mindset.title"),
      description: t("highlights.mindset.description"),
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center my-16 gap-8 px-4">
      <Reveal animationType="slideDown" duration={1} easing="backOut">
        <div className="text-center space-y-4 max-w-4xl">
          {" "}
          <div className="flex items-center justify-center gap-3 mb-6">
            <FaUser className="text-3xl text-accent-500" />
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary-100 via-accent-400 to-primary-200 bg-clip-text text-transparent">
              {t("title")}
            </h1>
          </div>
          <p className="text-lg text-primary-300 leading-relaxed max-w-2xl mx-auto">
            {t("subtitle")}
          </p>
        </div>
      </Reveal>

      <Reveal animationType="fadeUp" delay={0.3} duration={1} easing="easeOut">
        <Card className="max-w-4xl w-full">
          <div className="p-8 space-y-6">
            {/* Main Description */}
            <div className="space-y-4">
              {" "}
              <div className="flex items-center gap-2 text-primary-200 mb-4">
                <FaHeart className="text-accent-500" />
                <span className="font-semibold text-lg">{t("myStory")}</span>
              </div>
              <p className="text-primary-400 leading-relaxed text-justify">
                {t("description1")}
              </p>{" "}
              <p className="text-primary-400 leading-relaxed text-justify">
                {t("description2")}
              </p>{" "}
              <p className="text-primary-400 leading-relaxed text-justify">
                {t("description3")}
              </p>
            </div>

            {/* Highlights Grid */}
            <div className="pt-6 border-t border-primary-800/30">
              {" "}
              <h3 className="text-primary-200 font-semibold mb-4 text-center">
                {t("keyHighlights")}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {highlights.map((item, index) => (
                  <Reveal
                    key={index}
                    animationType="scale"
                    delay={0.6 + index * 0.1}
                    duration={0.6}
                    easing="backOut"
                  >
                    <div className="text-center p-4 rounded-lg bg-primary-900/30 border-2 border-primary-800/40 hover:border-accent-500/50 transition-colors duration-300 group/card">
                      <div className="text-2xl mb-2 group-hover/card:scale-110 transition-transform duration-300">
                        {item.icon}
                      </div>
                      <h4 className="font-semibold text-primary-200 text-sm mb-1">
                        {item.title}
                      </h4>
                      <p className="text-xs text-primary-400">
                        {item.description}
                      </p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </Card>
      </Reveal>
    </div>
  );
}

export default About;
