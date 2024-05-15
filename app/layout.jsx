import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components";
import Footer from "@/components/Footer";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Wilson's Portfolio",
  description: "Hello this is my personal porfolio!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className + "  font-mono overflow-x-hidden"}>
        <main className="mx-1 lg:mx-28">
          <Navbar />
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}
