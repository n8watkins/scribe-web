import { Hero } from "@/components/Hero";
import { Nav, Features, HowItWorks, VideoShowcase, CTA, Footer } from "@/components/Sections";
import { getStarCount } from "@/lib/site";

export default async function Home() {
  const stars = await getStarCount();
  return (
    <>
      <Nav />
      <main>
        <Hero stars={stars} />
        <Features />
        <HowItWorks />
        <VideoShowcase />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
