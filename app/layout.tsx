import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ParticlesWrapper from "@/wrapper/ParticlesWrapper";
import ChatBotProvider from "@/context/ChatBotProvider";
import ChatBubble from "@/components/ChatBubble";
import { Analytics } from "@vercel/analytics/react";
// import { unstable_ViewTransition as ViewTransition } from "react";

export const metadata = {
  title: "Wilson's Portfolio",
  description: "Hello this is my personal porfolio!",
};

//IMPORTA LAS FUENTES
import { Encode_Sans_Expanded } from "next/font/google";

const font = Encode_Sans_Expanded({
  subsets: ["latin"],
  weight: ["300", "600"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // <ViewTransition>
    <html lang="en">
      <body
        className={`${font.className} selection:text-black selection:bg-slate-300 `}
      >
        <ParticlesWrapper>
          <Navbar />
          <ChatBotProvider>
            <main className="mt-24 lg:mx-28">
              {children}

              <ChatBubble />
            </main>
          </ChatBotProvider>
          <Footer />
        </ParticlesWrapper>
        <Analytics />
      </body>
    </html>
    // </ViewTransition>
  );
}
