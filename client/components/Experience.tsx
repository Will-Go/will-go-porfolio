import ExperienceCard from "@/components/ExperienceCard";
import Reveal from "@/components/Reveal";
import experiences from "@/content/experiences";
import { useTranslations } from "next-intl";

//ICONS
import { FaBriefcase, FaRoad } from "react-icons/fa";

function Experience() {
  const t_experience = useTranslations("experience");
  const t = useTranslations();

  return (
    <div className="flex flex-col items-center justify-center my-16 gap-8 px-4">
      <Reveal animationType="slideDown" duration={1} easing="backOut">
        <div className="text-center space-y-4 max-w-4xl">
          <div className="flex items-center justify-center gap-3 mb-6">
            <FaBriefcase className="text-3xl text-accent-500" />
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-800 via-accent-500 to-gray-900 dark:from-primary-100 dark:via-accent-400 dark:to-primary-200 bg-clip-text text-transparent">
              {t_experience("title")}
            </h1>
          </div>
          <p className="text-lg text-gray-600 dark:text-primary-300 leading-relaxed max-w-2xl mx-auto">
            {t_experience("subtitle")}
          </p>
        </div>
      </Reveal>

      <Reveal animationType="fadeUp" delay={0.3} duration={1} easing="easeOut">
        <div className="w-full max-w-5xl">
          {/* Timeline Container */}
          <div className="relative">
            {/* Timeline Line */}
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-accent-500 via-accent-600 to-transparent"></div>
            {/* Timeline Dot at Top */}
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 -translate-y-2 w-4 h-4 bg-accent-500 rounded-full border-4 border-gray-50 dark:border-primary-950 z-10"></div>{" "}
            <div className="flex flex-col gap-12">
              {" "}
              {experiences.map((experience, i) => {
                // Translate the experience data
                const translatedExperience = {
                  ...experience,
                  name: t(experience.name as string),
                  date: t(experience.date as string),
                  description: t(experience.description as string),
                };

                return (
                  <div key={i} className="relative">
                    {/* Timeline Dot */}
                    <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 top-8 w-4 h-4 bg-accent-400 rounded-full border-4 border-gray-50 dark:border-primary-950 z-20 shadow-lg"></div>

                    <div className="md:grid md:grid-cols-2 md:gap-8 md:items-center">
                      {/* Left Side Card (even indexes) */}
                      {i % 2 === 0 && (
                        <Reveal
                          animationType="fadeRight"
                          delay={0.5 + i * 0.2}
                          duration={0.8}
                          easing="easeOut"
                        >
                          <div className="md:pr-4">
                            <ExperienceCard
                              index={i}
                              {...translatedExperience}
                              isLeft={true}
                            />
                          </div>
                        </Reveal>
                      )}

                      {/* Right Side Card (odd indexes) */}
                      {i % 2 === 1 && (
                        <>
                          <div></div> {/* Empty space for left side */}
                          <Reveal
                            animationType="fadeLeft"
                            delay={0.5 + i * 0.2}
                            duration={0.8}
                            easing="easeOut"
                          >
                            <div className="md:pl-4">
                              <ExperienceCard
                                index={i}
                                {...translatedExperience}
                                isLeft={false}
                              />
                            </div>
                          </Reveal>
                        </>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
            {/* Timeline End */}
            <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 bottom-0 translate-y-8 items-center justify-center w-8 h-8 bg-gray-50 dark:bg-primary-900 rounded-full border-2 border-accent-500">
              <FaRoad className="text-accent-500 text-sm" />
            </div>
          </div>
        </div>
      </Reveal>
    </div>
  );
}

export default Experience;
