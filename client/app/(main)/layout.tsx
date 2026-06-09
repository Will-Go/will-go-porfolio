import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ParticlesWrapper from "@/wrapper/ParticlesWrapper";
import ChatBotProvider from "@/context/ChatBotProvider";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <ParticlesWrapper>
      <Navbar />
      <ChatBotProvider>
        <main className="min-h-screen">{children}</main>
      </ChatBotProvider>
      <Footer />
    </ParticlesWrapper>
  );
}
