import Reveal from "@/components/Reveal";
import Card from "@/components/Card";

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
  const highlights = [
    {
      icon: <FaCode className="text-accent-500" />,
      title: "2+ Years Experience",
      description: "Frontend Development",
    },
    {
      icon: <FaGraduationCap className="text-blue-400" />,
      title: "Software Engineering",
      description: "Student at ULACIT",
    },
    {
      icon: <FaRocket className="text-green-400" />,
      title: "Full-Stack Ready",
      description: "React & Next.js Expert",
    },
    {
      icon: <FaLightbulb className="text-yellow-400" />,
      title: "Problem Solver",
      description: "Innovative Solutions",
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center my-16 gap-8 px-4">
      <Reveal animationType="slideDown" duration={1} easing="backOut">
        <div className="text-center space-y-4 max-w-4xl">
          <div className="flex items-center justify-center gap-3 mb-6">
            <FaUser className="text-3xl text-accent-500" />
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary-100 via-accent-400 to-primary-200 bg-clip-text text-transparent">
              About Me
            </h1>
          </div>
          <p className="text-lg text-primary-300 leading-relaxed max-w-2xl mx-auto">
            Passionate about creating digital experiences that make a difference
          </p>
        </div>
      </Reveal>

      <Reveal animationType="fadeUp" delay={0.3} duration={1} easing="easeOut">
        <Card className="max-w-4xl w-full">
          <div className="p-8 space-y-6">
            {/* Main Description */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-primary-200 mb-4">
                <FaHeart className="text-accent-500" />
                <span className="font-semibold text-lg">My Story</span>
              </div>
              <p className="text-primary-400 leading-relaxed text-justify">
                I&apos;m a highly motivated Software Engineering student with a
                passion for creating innovative digital solutions. With strong
                analytical and problem-solving abilities, I thrive on
                transforming complex challenges into elegant, user-friendly
                applications.
              </p>
              <p className="text-primary-400 leading-relaxed text-justify">
                Currently working as a Junior Frontend Developer, I&apos;ve
                spent the last 2 years building scalable web applications,
                crafting reusable components, and creating intuitive user
                interfaces. My expertise spans across React and Next.js
                ecosystems, with deep knowledge in state management, API
                integrations, and performance optimization.
              </p>
              <p className="text-primary-400 leading-relaxed text-justify">
                What drives me is the opportunity to collaborate with
                cross-functional teams, adapt to emerging technologies, and
                deliver high-quality solutions that exceed expectations.
                I&apos;m committed to staying current with industry trends and
                continuously expanding my technical expertise.
              </p>
            </div>

            {/* Highlights Grid */}
            <div className="pt-6 border-t border-primary-800/30">
              <h3 className="text-primary-200 font-semibold mb-4 text-center">
                Key Highlights
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
