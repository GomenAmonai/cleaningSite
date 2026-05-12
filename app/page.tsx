import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Services } from "@/components/sections/Services";
import { WhyUs } from "@/components/sections/WhyUs";
import { Clients } from "@/components/sections/Clients";
import { Reviews } from "@/components/sections/Reviews";
import { FAQ } from "@/components/sections/FAQ";
import { sanityFetch } from "@/sanity/lib/fetch";
import {
    aboutSlidesQuery,
    siteSettingsQuery,
} from "@/sanity/lib/queries";
import type { AboutSlide, SiteSettings } from "@/sanity/lib/types";

export default async function Home() {
    const [settings, aboutSlides] = await Promise.all([
        sanityFetch<SiteSettings>(siteSettingsQuery),
        sanityFetch<AboutSlide[]>(aboutSlidesQuery),
    ]);

    return (
        <>
            <Header />
            <main className="flex-1">
                <Hero
                    title={settings?.heroTitle}
                    subtitle={settings?.heroSubtitle}
                    ctaLabel={settings?.heroCtaLabel}
                />
                <About
                    title={settings?.aboutTitle}
                    slides={aboutSlides ?? undefined}
                />
                <Services />
                <WhyUs />
                <Clients />
                <Reviews />
                <FAQ />
            </main>
            <Footer />
        </>
    );
}
