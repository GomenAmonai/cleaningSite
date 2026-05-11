import Image from "next/image";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { Hero } from "@/app/components/Hero";
import { Header } from "@/app/components/Header";
import { WhyUs } from "@/app/components/WhyUs";
import { Faq } from "@/app/components/Faq";
import { Contact } from "@/app/components/Contact";
import { Footer } from "@/app/components/Footer";

const SERVICES_QUERY = `*[_type == "service"] | order(order asc) {
  _id,
  title,
  shortDescription,
  image
}`;

const SITE_SETTINGS_QUERY = `*[_type == "siteSettings"][0] {
  companyName,
  phone,
  address,
  workingHours,
  whatsapp,
  telegram,
  heroTitle,
  heroSubtitle,
  heroImage,
  heroCtaText,
  whyUsTitle,
  whyUsItems,
  faqTitle,
  faqItems
}`;

type Service = {
    _id: string;
    title: string;
    shortDescription: string;
    image?: { asset: { _ref: string; _type: string }; _type: string };
};

type WhyUsItem = {
    title: string;
    description: string;
};

type FaqItem = {
    question: string;
    answer: string;
};

type SiteSettings = {
    companyName?: string;
    phone?: string;
    address?: string;
    workingHours?: string;
    whatsapp?: string;
    telegram?: string;
    heroTitle?: string;
    heroSubtitle?: string;
    heroImage?: { asset: { _ref: string; _type: string }; _type: string };
    heroCtaText?: string;
    whyUsTitle?: string;
    whyUsItems?: WhyUsItem[];
    faqTitle?: string;
    faqItems?: FaqItem[];
};

export default async function Home() {
    const [services, settings] = await Promise.all([
        client.fetch<Service[]>(SERVICES_QUERY),
        client.fetch<SiteSettings>(SITE_SETTINGS_QUERY),
    ]);

    return (
        <>
            <Header companyName={settings?.companyName} phone={settings?.phone} />
            <main className="bg-background text-foreground">
                {settings?.heroTitle && (
                    <Hero
                        title={settings.heroTitle}
                        subtitle={settings.heroSubtitle}
                        image={settings.heroImage}
                        ctaText={settings.heroCtaText}
                    />
                )}

                <section className="px-6 py-24 max-w-6xl mx-auto">
                    <h2 className="font-serif text-4xl sm:text-5xl font-medium mb-16 text-foreground tracking-tight">
                        Наши услуги
                    </h2>

                    {services.length === 0 ? (
                        <p className="text-muted">
                            Пока нет услуг. Добавьте их в Sanity Studio.
                        </p>
                    ) : (
                        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                            {services.map((service) => (
                                <article
                                    key={service._id}
                                    className="bg-surface border border-border rounded-xl overflow-hidden hover:border-accent hover:-translate-y-1 transition-all duration-300"
                                >
                                    {service.image && (
                                        <div className="relative aspect-[4/3] bg-background">
                                            <Image
                                                src={urlFor(service.image).width(800).height(600).url()}
                                                alt={service.title}
                                                fill
                                                className="object-cover"
                                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                            />
                                        </div>
                                    )}
                                    <div className="p-8">
                                        <h3 className="font-serif text-2xl font-medium mb-3 text-foreground tracking-tight">
                                            {service.title}
                                        </h3>
                                        <p className="text-muted leading-relaxed">
                                            {service.shortDescription}
                                        </p>
                                    </div>
                                </article>
                            ))}
                        </div>
                    )}
                </section>

                <WhyUs title={settings?.whyUsTitle} items={settings?.whyUsItems} />
                <Faq title={settings?.faqTitle} items={settings?.faqItems} />
                <Contact
                    phone={settings?.phone}
                    address={settings?.address}
                    workingHours={settings?.workingHours}
                    whatsapp={settings?.whatsapp}
                    telegram={settings?.telegram}
                />
            </main>
            <Footer companyName={settings?.companyName} phone={settings?.phone} />
        </>
    );
}