import Header from "@/components/Header";
import Hero from "@/components/Hero";
import IntroBoard from "@/components/IntroBoard";
import CollectionIntro from "@/components/CollectionIntro";
import ShopObjects from "@/components/ShopObjects";
import AtHomeSection from "@/components/AtHomeSection";
import JournalSection from "@/components/JournalSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <IntroBoard />
        <CollectionIntro />
        <ShopObjects />
        <AtHomeSection />
        <JournalSection />
      </main>
      <Footer />
    </>
  );
}
