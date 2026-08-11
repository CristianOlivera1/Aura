import { AuraBackground } from "@/components/AuraBackground";
import { GradientProvider } from "@/components/GradientProvider";
import { Hero } from "@/components/Hero";
import { GradientsSection } from "@/components/GradientsSection";
import { BackToGalleryButton } from "@/components/BackToGalleryButton";
import { Customizer } from "@/components/customizer/Customizer";
import { CopyToastWrapper } from "@/components/CopyToastWrapper";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";

export default function Home() {
  return (
    <GradientProvider>
      <AuraBackground />
      <Header />
      <main id="main" tabIndex={-1} className="flex-1 outline-none">
        <Hero />
        <GradientsSection />
      </main>
      <Footer />
      <BackToGalleryButton />
      <Customizer />
      <CopyToastWrapper />
    </GradientProvider>
  );
}
