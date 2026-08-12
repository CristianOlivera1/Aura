import { AuraBackground } from "@/components/AuraBackground";
import { GradientProvider } from "@/components/GradientProvider";
import { Hero } from "@/components/Hero";
import { GradientsSection } from "@/components/GradientsSection";
import { Customizer } from "@/components/customizer/Customizer";
import { CopyToastWrapper } from "@/components/ui/CopyToastWrapper";
import { ScrollToTopButton } from "@/components/ScrollToTopButton";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { BackToGalleryButton } from "@/components/ui/BackToGalleryButton";

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
      <ScrollToTopButton />
      <Customizer />
      <CopyToastWrapper />
    </GradientProvider>
  );
}
