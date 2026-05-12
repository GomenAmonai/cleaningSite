import { notFound } from "next/navigation";
import Link from "next/link";
import {
    Building2,
    Droplets,
    HardHat,
    HelpCircle,
    ShieldCheck,
    Snowflake,
    Sofa,
    Sparkles,
    Trash2,
    Wind,
    Wrench,
    CheckCircle2,
    ChevronRight,
    type LucideIcon,
} from "lucide-react";
import type { Metadata } from "next";

import { sanityFetch } from "@/sanity/lib/fetch";
import {
    serviceBySlugQuery,
    serviceSlugsQuery,
    servicesQuery,
} from "@/sanity/lib/queries";
import type { Service } from "@/sanity/lib/types";
import { PortableTextRenderer } from "@/components/ui/PortableTextRenderer";
import { ContactButton } from "@/components/ui/ContactButton";

const ICON_MAP: Record<string, LucideIcon> = {
    Building2,
    Sparkles,
    HardHat,
    Wind,
    Sofa,
    Trash2,
    Snowflake,
    ShieldCheck,
    Droplets,
    Wrench,
};

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
    const slugs = await sanityFetch<{ slug: string }[]>(serviceSlugsQuery);
    return (slugs ?? []).map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const service = await sanityFetch<Service>(serviceBySlugQuery, { slug });
    if (!service) return {};
    return {
        title: service.metaTitle ?? service.title,
        description: service.metaDescription ?? service.description,
    };
}

export default async function ServicePage({ params }: Props) {
    const { slug } = await params;
    const [service, allServices] = await Promise.all([
        sanityFetch<Service>(serviceBySlugQuery, { slug }),
        sanityFetch<Service[]>(servicesQuery),
    ]);

    if (!service) notFound();

    const Icon = ICON_MAP[service.icon] ?? HelpCircle;
    const otherServices = (allServices ?? []).filter((s) => s.slug !== slug).slice(0, 4);

    return (
        <>
            {/* Hero */}
            <section className="bg-ink text-white py-16 md:py-24">
                <div className="px-6 max-w-[1280px] mx-auto">
                    <nav className="flex items-center gap-2 text-sm text-white/50 mb-8" aria-label="Breadcrumb">
                        <Link href="/" className="hover:text-white transition-colors">Главная</Link>
                        <ChevronRight size={14} className="shrink-0" />
                        <Link href="/#services" className="hover:text-white transition-colors">Услуги</Link>
                        <ChevronRight size={14} className="shrink-0" />
                        <span className="text-white/80">{service.title}</span>
                    </nav>
                    <div className="flex items-center gap-4 mb-6">
                        <Icon className="text-cyan shrink-0" size={48} strokeWidth={1.5} aria-hidden="true" />
                        <h1 className="text-3xl md:text-5xl font-semibold leading-tight">
                            {service.title}
                        </h1>
                    </div>
                    {service.description && (
                        <p className="text-white/70 text-lg max-w-2xl leading-relaxed">
                            {service.description}
                        </p>
                    )}
                </div>
            </section>

            {/* Body + Sidebar */}
            <section className="bg-white py-16 md:py-24">
                <div className="px-6 max-w-[1280px] mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
                        {/* Main content */}
                        <div className="lg:col-span-2">
                            {service.longDescription && service.longDescription.length > 0 && (
                                <div className="mb-10">
                                    <PortableTextRenderer value={service.longDescription} />
                                </div>
                            )}
                            {service.features && service.features.length > 0 && (
                                <div>
                                    <h2 className="text-xl font-semibold text-ink mb-5">Что входит в услугу</h2>
                                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                        {service.features.map((feature, i) => (
                                            <li key={i} className="flex items-start gap-3">
                                                <CheckCircle2
                                                    className="text-cyan shrink-0 mt-0.5"
                                                    size={20}
                                                    strokeWidth={1.5}
                                                    aria-hidden="true"
                                                />
                                                <span className="text-ink/80 text-sm leading-relaxed">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>

                        {/* Sticky sidebar */}
                        <aside className="lg:col-span-1">
                            <div className="sticky top-24 bg-cyan-light border border-cyan/20 rounded-xl p-6 md:p-8 space-y-6">
                                {service.pricing && (
                                    <div>
                                        <p className="text-sm text-ink/60 mb-1">Стоимость</p>
                                        <p className="text-2xl font-semibold text-cyan">{service.pricing}</p>
                                    </div>
                                )}
                                <p className="text-sm text-ink/70">
                                    Точная стоимость рассчитывается после осмотра объекта. Выезд бесплатный.
                                </p>
                                <ContactButton />
                                <p className="text-xs text-ink/50 text-center">
                                    Или позвоните:{" "}
                                    <a href="tel:+74950000000" className="text-cyan hover:underline">
                                        +7 (495) 000-00-00
                                    </a>
                                </p>
                            </div>
                        </aside>
                    </div>
                </div>
            </section>

            {/* Other services */}
            {otherServices.length > 0 && (
                <section className="bg-cyan-light py-16 md:py-20">
                    <div className="px-6 max-w-[1280px] mx-auto">
                        <h2 className="text-2xl md:text-3xl font-semibold text-ink mb-8 text-center">
                            Другие услуги
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {otherServices.map((s) => {
                                const OtherIcon = ICON_MAP[s.icon] ?? HelpCircle;
                                return (
                                    <Link
                                        key={s._id}
                                        href={s.slug ? `/services/${s.slug}` : "/#services"}
                                        className="p-6 bg-white border border-ink/10 rounded-lg hover:border-cyan transition-colors group"
                                    >
                                        <OtherIcon
                                            className="text-cyan"
                                            size={36}
                                            strokeWidth={1.5}
                                            aria-hidden="true"
                                        />
                                        <h3 className="mt-4 font-semibold text-ink text-sm leading-snug group-hover:text-cyan transition-colors">
                                            {s.title}
                                        </h3>
                                    </Link>
                                );
                            })}
                        </div>
                        <div className="text-center mt-8">
                            <Link
                                href="/#services"
                                className="inline-flex items-center gap-2 text-cyan font-medium text-sm hover:underline"
                            >
                                Все услуги
                                <ChevronRight size={16} />
                            </Link>
                        </div>
                    </div>
                </section>
            )}
        </>
    );
}
