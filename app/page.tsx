import Image from "next/image";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { Hero } from "@/app/components/Hero";

const SERVICES_QUERY = `*[_type == "service"] | order(order asc) {
  _id,
  title,
  shortDescription,
  image
}`;

const SITE_SETTINGS_QUERY = `*[_type == "siteSettings"][0] {
  heroTitle,
  heroSubtitle,
  heroImage,
  heroCtaText
}`;

type Service = {
    _id: string;
    title: string;
    shortDescription: string;
    image?: { asset: { _ref: string; _type: string }; _type: string };
};

type SiteSettings = {
    heroTitle?: string;
    heroSubtitle?: string;
    heroImage?: { asset: { _ref: string; _type: string }; _type: string };
    heroCtaText?: string;
};

export default async function Home() {
    const [services, settings] = await Promise.all([
        client.fetch<Service[]>(SERVICES_QUERY),
        client.fetch<SiteSettings>(SITE_SETTINGS_QUERY),
    ]);

    return (
        <main className="min-h-screen bg-white dark:bg-black">
            {settings?.heroTitle && (
                <Hero
                    title={settings.heroTitle}
                    subtitle={settings.heroSubtitle}
                    image={settings.heroImage}
                    ctaText={settings.heroCtaText}
                />
            )}

            <section className="px-6 py-16 max-w-5xl mx-auto">
                <h1 className="text-4xl font-bold mb-12 text-black dark:text-white">
                    Наши услуги
                </h1>

                {services.length === 0 ? (
                    <p className="text-zinc-500">
                        Пока нет услуг. Добавьте их в Sanity Studio.
                    </p>
                ) : (
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {services.map((service) => (
                            <article
                                key={service._id}
                                className="border border-zinc-200 dark:border-zinc-800 rounded-lg overflow-hidden hover:border-zinc-400 dark:hover:border-zinc-600 transition-colors"
                            >
                                {service.image && (
                                    <div className="relative aspect-[4/3] bg-zinc-100 dark:bg-zinc-900">
                                        <Image
                                            src={urlFor(service.image).width(800).height(600).url()}
                                            alt={service.title}
                                            fill
                                            className="object-cover"
                                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                        />
                                    </div>
                                )}
                                <div className="p-6">
                                    <h2 className="text-xl font-semibold mb-3 text-black dark:text-white">
                                        {service.title}
                                    </h2>
                                    <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                                        {service.shortDescription}
                                    </p>
                                </div>
                            </article>
                        ))}
                    </div>
                )}
            </section>
        </main>
    );
}