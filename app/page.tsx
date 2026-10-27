import { Hero } from "@/components/Hero";
import { CTA, FAQ, Footer, HowItWorks, Nav } from "@/components/Sections";
import { LocalAI, Models, More, PrivacyFlow, Themes } from "@/components/Explainers";
import { getRelease, getStarCount, SITE_URL } from "@/lib/site";

export default async function Home() {
  const [stars, release] = await Promise.all([getStarCount(), getRelease()]);
  // The app, as search engines describe software (version and download from the release).
  const app = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Scribe",
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Windows 10, Windows 11",
    softwareVersion: release.version,
    downloadUrl: release.url,
    url: SITE_URL,
    license: "https://opensource.org/licenses/MIT",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(app) }} />
      <Nav release={release} stars={stars} />
      <main id="top">
        <Hero release={release} stars={stars} />
        <HowItWorks />
        <PrivacyFlow />
        <LocalAI />
        <Models />
        <Themes />
        <More />
        <FAQ />
        <CTA release={release} />
      </main>
      <Footer release={release} />
    </>
  );
}
