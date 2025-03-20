"use client";
import ExperienceCard from "@/components/ExperienceCard";
import experiences from "@/content/experiences";

function Experience() {
  return (
    <div className="flex flex-col items-center justify-center my-12 gap-6  ">
      <h1 className="text-center">Experience</h1>
      <div className="flex flex-col gap-6">
        {experiences.map((experience, i) => (
          <ExperienceCard
            key={i}
            index={i}
            {...experience}
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.25 * i }}
          />
        ))}
      </div>
    </div>
  );
}

export default Experience;
