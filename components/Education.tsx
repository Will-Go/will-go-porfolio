//COMPONENTS
import Card from "@/components/Card";
import Reveal from "@/components/Reveal";

//ICONS
import {
  FaGraduationCap,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaBookOpen,
} from "react-icons/fa";

const PERCENTAGE_COMPLETE = 90; // Example percentage of program completion

function Education() {
  return (
    <div
      id="education"
      className="flex flex-col items-center justify-center my-16 gap-8 px-4"
    >
      <Reveal animationType="slideDown" duration={1} easing="backOut">
        <div className="text-center space-y-4 max-w-4xl">
          <div className="flex items-center justify-center gap-3 mb-6">
            <FaGraduationCap className="text-3xl text-accent-500" />
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary-100 via-accent-400 to-primary-200 bg-clip-text text-transparent">
              Education
            </h1>
          </div>
          <p className="text-lg text-primary-300 leading-relaxed max-w-2xl mx-auto">
            Currently pursuing my passion for technology through formal
            education in Software Engineering
          </p>
        </div>
      </Reveal>

      <Reveal animationType="fadeUp" delay={0.3} duration={1} easing="easeOut">
        <Card className="max-w-4xl w-full  transition-colors duration-300">
          <div className="p-8 space-y-6">
            {/* University Header */}
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
              <div className="space-y-2">
                <h2 className="text-2xl md:text-3xl font-bold text-primary-100 leading-tight">
                  Universidad Latinoamericana de Ciencia y Tecnología
                </h2>
                <h3 className="text-lg font-semibold text-accent-400">
                  Bachelor&apos;s Degree in Software Engineering
                </h3>
              </div>
              <div className="flex items-center gap-2 text-primary-400">
                <FaCalendarAlt className="text-accent-500" />
                <span className="font-medium">2022 - 2026</span>
              </div>
            </div>

            {/* Location */}
            <div className="flex items-center gap-2 text-primary-300">
              <FaMapMarkerAlt className="text-accent-500" />
              <span>San José, Barrio Tournon, Costa Rica</span>
            </div>

            {/* Description */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-primary-200">
                <FaBookOpen className="text-accent-500" />
                <span className="font-semibold">Program Overview</span>
              </div>
              <p className="text-primary-400 leading-relaxed text-justify">
                Currently pursuing a comprehensive four-year Bachelor&apos;s
                degree program in Software Engineering. The curriculum covers
                fundamental and advanced concepts in software development,
                including programming languages, database management, software
                architecture, project management, and modern development
                methodologies. This program provides both theoretical knowledge
                and practical experience through hands-on projects and
                real-world applications.
              </p>
            </div>

            {/* Key Areas */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
              <div className="space-y-2">
                <h4 className="font-semibold text-primary-200">
                  Key Focus Areas:
                </h4>
                <ul className="text-sm text-primary-400 space-y-1">
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
                <h4 className="font-semibold text-primary-200">
                  Technical Skills:
                </h4>
                <ul className="text-sm text-primary-400 space-y-1">
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
            <div className="pt-6 border-t border-primary-800/30">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-primary-300">
                  Program Progress
                </span>
                <span className="text-sm text-accent-400 font-semibold">
                  {PERCENTAGE_COMPLETE}% Complete
                </span>
              </div>
              <div className="w-full bg-primary-900/50 rounded-full h-2">
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
