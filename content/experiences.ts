import Experience from "@/interfaces/IExperience";

// Experience data with translation keys
const experiences: Experience[] = [
  {
    name: "experience.experiences.newstreet.name",
    date: "experience.experiences.newstreet.date",
    description: "experience.experiences.newstreet.description",
    technologies: [
      "Next.js",
      "React.js",
      "TypeScript",
      "TailwindCSS",
      "Express.Js",
      "MSSQL",
    ],
    imageUrl: "/newstreet.jpeg",
    companyUrl: "https://www.newstreetdev.com/",
  },
  {
    name: "experience.experiences.dwoof.name",
    date: "experience.experiences.dwoof.date",
    description: "experience.experiences.dwoof.description",
    technologies: ["Next.js", "React.js", "Firebase", "TailwindCSS"],
    imageUrl: "/dwoof.png",
  },
];

export default experiences;
