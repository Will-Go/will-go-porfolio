import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ParticlesWrapper from "@/wrapper/ParticlesWrapper";

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
    <html lang="en">
      <body className={font.className}>
        <ParticlesWrapper>
          <Navbar />
          <main className="mt-24 lg:mx-28">{children}</main>
          <Footer />
        </ParticlesWrapper>
      </body>
    </html>
  );
}
