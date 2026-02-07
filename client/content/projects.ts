import IProject from "@/interfaces/IProject";
import dayjs from "dayjs";

const projects: IProject[] = [
  {
    name: "Iglesia China Asistencias App | Church Attendance Management System",
    description:
      "Architected full stack attendance tracking application using Next.js, Supabase, and PostgreSQL for church community. Implemented role-based access control (RBAC) with JWT authentication managing 6 distinct user roles. Built QR code-based check-in system with real-time attendance tracking and automated late/present status calculation. Designed complex relational database schema with user management, events, tags, and attendance tracking. Developed multi-language support (Chinese, English, Spanish) with dynamic preference management. Created comprehensive admin dashboard with KPIs, attendance analytics, and gender distribution visualizations.",
    categories: ["Full Stack", "Web Development", "Management System"],
    technologies: [
      "Next.js",
      "Supabase",
      "PostgreSQL",
      "JWT",
      "TypeScript",
      "QR Code",
      "Tailwind CSS",
    ],
    created_at: dayjs("2025-11-09").toISOString(),
    url: "https://test.iglesiacristianachina.org/es/login",
  },
].sort(
  (a, b) =>
    new Date(b.created_at ?? 0).getTime() -
    new Date(a.created_at ?? 0).getTime()
);

export default projects;
