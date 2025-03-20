import Experience from "@/interfaces/IExperience";

const experiences: Experience[] = [
  {
    name: "New Street Development",
    date: "nov. 2024",
    description:
      "Responsible for developing and maintaining the front-end of web applications while supporting back-end integration. Tasks include designing responsive, intuitive user interfaces, ensuring cross-platform optimization, and collaborating with designers to create seamless user experiences. Works with modern frameworks and APIs to deliver high-performance, visually appealing applications.",
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
    name: "D'woof",
    date: "nov. 2023",
    description:
      "I work as a fullstack web developer for a startup. My main responsibility involves contributing to the development of a comprehensive social media web application. Our goal is to connect dog enthusiasts through a dedicated platform. This platform allows users to review various businesses that offer services related to dogs and their owners. We also have plans to launch a mobile app in the near future to expand our reach and accessibility.",
    technologies: ["Next.js", "React.js", "Firebase", "TailwindCSS"],
    imageUrl: "/dwoof.png",
  },
];

export default experiences;
