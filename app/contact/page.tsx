import Image from "next/image";
import BackgroundBlur from "@/components/BackgroundBlur";
import { unstable_ViewTransition as ViewTransition } from "react";
//COMPONENTS
import Card from "@/components/Card";

//ICONS
import { BiLogoGmail } from "react-icons/bi";
import { FaLinkedin, FaPhone } from "react-icons/fa";

function page() {
  const contacts = [
    { icon: <BiLogoGmail />, text: "wilsongongwu1@gmail.com" },
    { icon: <FaLinkedin />, text: "linkedin.com/in/wilsongw60/" },
    { icon: <FaPhone />, text: "+506 8735-7137" },
  ];

  return (
    <main className="min-h-screen  p-6 md:p-24 selection:text-black selection:bg-slate-300 overflow-clip animate-fade-in">
      <div className="flex flex-col  justify-center items-center mt-20 ">
        <h1>Contact Me</h1>
        <div className="flex flex-col md:flex-row justify-between items-center gap-12 mt-16">
          <div className="relative flex place-items-center order-last md:order-none before:absolute before:h-[300px] before:w-full sm:before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full sm:after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] dark:before:bg-linear-to-br dark:before:from-transparent dark:before:to-blue-700 dark:before:opacity-10 dark:after:from-sky-900 dark:after:via-[#0141ff] dark:after:opacity-40 lg:before:h-[360px] after:animate-pulse z-[-1]">
            <ViewTransition name="Wilson-avatar">
              <Image
                src="/Wilson.png"
                alt="A picture of Wilson"
                width={200}
                height={200}
                className="rounded-full max-w-[200px] max-h-[200px] object-cover relative  "
              />
            </ViewTransition>
            <BackgroundBlur className="h-96 w-96" />
          </div>

          <Card>
            {" "}
            <ol className="grid gap-8">
              {contacts.map(({ icon, text }, i) => (
                <li
                  key={i}
                  className="flex items-center gap-2 fade-in-up"
                  style={{
                    animationDelay: `${i * 0.25}s`,
                  }}
                >
                  <div className="text-2xl">{icon}</div>
                  <div>{text}</div>
                </li>
              ))}
            </ol>
          </Card>
        </div>
      </div>
    </main>
  );
}

export default page;
