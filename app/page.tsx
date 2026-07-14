import { Hero } from "@/components/Hero";
import { CTA, FAQ, Features, Footer, HowItWorks, Nav, Privacy, VideoShowcase } from "@/components/Sections";
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
        <Privacy />
        <VideoShowcase />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
