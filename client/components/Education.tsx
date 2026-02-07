//COMPONENTS
import Card from "@/components/Card";
import Reveal from "@/components/Reveal";
import { useTranslations } from "next-intl";

//ICONS
import {
  FaGraduationCap,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaBookOpen,
} from "react-icons/fa";

const PERCENTAGE_COMPLETE = 100; // Example percentage of program completion

function Education() {
  const t = useTranslations("education");

  return (
    <div
      id="education"
      className="flex flex-col items-center justify-center my-16 gap-8 px-4"
    >
      <Reveal animationType="slideDown" duration={1} easing="backOut">
        <div className="text-center space-y-4 max-w-4xl">
          <div className="flex items-center justify-center gap-3 mb-6">
            <FaGraduationCap className="text-3xl text-accent-500" />
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-800 via-accent-500 to-gray-900 dark:from-primary-100 dark:via-accent-400 dark:to-primary-200 bg-clip-text text-transparent">
              {t("title")}
            </h1>
          </div>
          <p className="text-lg text-gray-600 dark:text-primary-300 leading-relaxed max-w-2xl mx-auto">
            {t("subtitle")}
          </p>
        </div>
      </Reveal>

      <Reveal animationType="fadeUp" delay={0.3} duration={1} easing="easeOut">
        <Card className="max-w-4xl w-full  transition-colors duration-300">
          <div className="p-8 space-y-6">
            {/* University Header */}
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
              <div className="space-y-2">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-primary-100 leading-tight">
                  {t("university")}
                </h2>
                <h3 className="text-lg font-semibold text-accent-400">
                  {t("degree")}
                </h3>
              </div>
              <div className="flex items-center gap-2 text-gray-500 dark:text-primary-400">
                <FaCalendarAlt className="text-accent-500" />
                <span className="font-medium">
                  {t("period", { percentage: PERCENTAGE_COMPLETE })}
                </span>
              </div>
            </div>

            {/* Location */}
            <div className="flex items-center gap-2 text-gray-600 dark:text-primary-300">
              <FaMapMarkerAlt className="text-accent-500" />
              <span>{t("location")}</span>
            </div>

            {/* Description */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-gray-800 dark:text-primary-200">
                <FaBookOpen className="text-accent-500" />
                <span className="font-semibold">Program Overview</span>
              </div>
              <p className="text-gray-600 dark:text-primary-400 leading-relaxed text-justify">
                {t("description")}
              </p>
            </div>

            {/* Key Areas */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
              <div className="space-y-2">
                <h4 className="font-semibold text-gray-800 dark:text-primary-200">
                  Key Focus Areas:
                </h4>
                <ul className="text-sm text-gray-600 dark:text-primary-400 space-y-1">
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-accent-500 rounded-full"></div>
                    Software Development & Engineering
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-accent-500 rounded-full"></div>
                    Database Design & Management
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-accent-500 rounded-full"></div>
                    Web Development Technologies
                  </li>
                </ul>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold text-gray-800 dark:text-primary-200">
                  Technical Skills:
                </h4>
                <ul className="text-sm text-gray-600 dark:text-primary-400 space-y-1">
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-accent-500 rounded-full"></div>
                    Object-Oriented Programming
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-accent-500 rounded-full"></div>
                    Software Architecture & Design
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-accent-500 rounded-full"></div>
                    Project Management
                  </li>
                </ul>
              </div>
            </div>

            {/* Progress Indicator */}
            <div className="pt-6 border-t border-gray-200 dark:border-primary-800/30">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-600 dark:text-primary-300">
                  {t("progress.title")}
                </span>
                <span className="text-sm text-accent-400 font-semibold">
                  {PERCENTAGE_COMPLETE}% Complete
                </span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-primary-900/50 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-accent-500 to-accent-600 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${PERCENTAGE_COMPLETE}%` }}
                ></div>
              </div>
            </div>
          </div>
        </Card>
      </Reveal>
    </div>
  );
}

export default Education;
