import { headers } from "next/headers";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ParticlesWrapper from "@/wrapper/ParticlesWrapper";
import ChatBotProvider from "@/context/ChatBotProvider";
import { isMobileOrTabletDevice } from "@/utils/isMobileOrTabletDevice";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headersList = await headers();
  const userAgent = headersList.get("user-agent") ?? "";
  const isMobileOrTablet = isMobileOrTabletDevice(userAgent);

  return (
    <ParticlesWrapper>
      <Navbar isMobileOrTablet={isMobileOrTablet} />
      <ChatBotProvider>
        <main className="min-h-screen">{children}</main>
      </ChatBotProvider>
      <Footer />
    </ParticlesWrapper>
  );
}
