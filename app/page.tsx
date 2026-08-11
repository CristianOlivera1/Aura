import { AuraBackground } from "@/components/AuraBackground";
import { GradientProvider } from "@/components/GradientProvider";
import { Hero } from "@/components/Hero";
import { GradientsSection } from "@/components/GradientsSection";
import { Customizer } from "@/components/customizer/Customizer";
import { CopyToastWrapper } from "@/components/CopyToastWrapper";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";

export default function Home() {
  return (
    <GradientProvider>
      <AuraBackground />
      <Header />
      <main className="flex-1">
        <Hero />
        <GradientsSection />
      </main>
      <Footer />
      <Customizer />
      <CopyToastWrapper />
    </GradientProvider>
  );
}
