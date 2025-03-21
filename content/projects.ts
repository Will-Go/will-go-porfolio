import Project from "@/interfaces/IProject";

const projects: Project[] = [
  {
    name: "Comment-moderator-with-AI",
    repoUrl: "https://github.com/Will-Go/Comment-moderator-with-AI",
    description:
      "A comment moderator that uses AI to detect toxic comments and mark them from being posted.",
    categories: ["Frontend", "Backend"],
    technologies: [
      "Gemini API",
      "Next.js",
      "TypeScript",
      "TailwindCSS",
      "Express.Js",
    ],
  },
  {
    name: "firebase-cloud-functions",
    repoUrl: "https://github.com/Will-Go/firebase-cloud-functions",
    description: "This is a project that uses firebase cloud functions",
    categories: ["Backend"],
    technologies: [
      "Firebase",
      "Cloud Functions",
      "TypeScript",
      "GCP (Google Cloud Platform)",
      "Node.js",
    ],
  },
  {
    name: "StackingToken-UI ",
    repoUrl: "https://github.com/Will-Go/StackingToken-UI",
    description: `This project is a decentralized application (dApp); this serves as a practical demonstration of skills acquired in blockchain development, testing, and frontend integration within the Web3 ecosystem. The project showcases the ability to create a functional Web3 application, integrating blockchain technology with modern web development practices. It provides users with a platform to stake their ETH, potentially earn rewards, and interact with smart contracts through an intuitive interface.`,
    categories: ["Web3", "Frontend", "Backend"],
    technologies: ["Solidity", "Sepolia", "NextJS", "Wagmi", "TailwindCSS"],
  },
  {
    name: "rediriguido",
    repoUrl: "https://github.com/Will-Go/rediriguido",
    description:
      "This project aimed to capture data from the browser of any user who visited the page and save it in a database. We achieved this by disguising the page as if it were a Google Docs link.",
    categories: ["Recon", "Phising", "Frontend", "Backend"],
    technologies: ["NextJS", "Firebase", "TailwindCSS"],
  },
  {
    name: "mern-task-app-LabGroup4",
    repoUrl: "https://github.com/Will-Go/mern-task-app-LabGroup4",
    description:
      "This project is for the Lab Group 4 of the MERN stack course. It is a task app that allows users to create, read, update, and delete tasks.",
    categories: ["Frontend", "Backend"],
    technologies: ["ReactJS", "MongoDB", "TailwindCSS", "Express.Js"],
  },
  {
    name: "ProyectoWeb_e-puravida",
    repoUrl: "https://github.com/Will-Go/ProyectoWeb_e-puravida",
    description:
      "This project was one of my first steps with web development where I developed an online platform for selling tourist packages focused on Costa Rica.",
    categories: ["Frontend", "Backend"],
    technologies: ["HTML", "CSS", "JavaScript", "PHP", "MySQL"],
  },
  {
    name: "console-snake",
    repoUrl: "https://github.com/Will-Go/console-snake",
    description:
      "This is a simple snake game that runs in the console. This project was made for educational purposes and specially for fun.",
    categories: ["CLI"],
    technologies: ["python"],
  },
  {
    name: "BackgroudRemoverPy",
    repoUrl: "https://github.com/Will-Go/BackgroudRemoverPy",
    description:
      "This is a simple python app that removes the background of images, this is a Desktop app using tkinter.",
    categories: ["UI"],
    technologies: ["python", "tkinter"],
  },
];

export default projects;
