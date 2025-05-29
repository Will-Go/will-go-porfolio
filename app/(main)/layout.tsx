import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ParticlesWrapper from "@/wrapper/ParticlesWrapper";
import ChatBotProvider from "@/context/ChatBotProvider";
import ChatBubble from "@/components/ChatBubble";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
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
  );
}
