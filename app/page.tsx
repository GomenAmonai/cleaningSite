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
    clientsQuery,
    faqItemsQuery,
    reviewsQuery,
    servicesQuery,
    siteSettingsQuery,
    whyUsCardsQuery,
} from "@/sanity/lib/queries";
import type {
    AboutSlide,
    Client,
    FaqItem,
    Review,
    Service,
    SiteSettings,
    WhyUsCard,
} from "@/sanity/lib/types";

export default async function Home() {
    const [
        settings,
        aboutSlides,
        services,
        whyUsCards,
        clients,
        reviews,
        faqItems,
    ] = await Promise.all([
        sanityFetch<SiteSettings>(siteSettingsQuery),
        sanityFetch<AboutSlide[]>(aboutSlidesQuery),
        sanityFetch<Service[]>(servicesQuery),
        sanityFetch<WhyUsCard[]>(whyUsCardsQuery),
        sanityFetch<Client[]>(clientsQuery),
        sanityFetch<Review[]>(reviewsQuery),
        sanityFetch<FaqItem[]>(faqItemsQuery),
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
                <Services
                    title={settings?.servicesTitle}
                    services={services ?? undefined}
                />
                <WhyUs
                    title={settings?.whyUsTitle}
                    cards={whyUsCards ?? undefined}
                />
                <Clients
                    title={settings?.clientsTitle}
                    clients={clients ?? undefined}
                />
                <Reviews
                    title={settings?.reviewsTitle}
                    reviews={reviews ?? undefined}
                />
                <FAQ
                    title={settings?.faqTitle}
                    items={faqItems ?? undefined}
                />
            </main>
            <Footer />
        </>
    );
}
