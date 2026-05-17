import Link from "next/link";
import Image from "next/image";
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
    type LucideIcon,
} from "lucide-react";

import { SectionHeading } from "@/components/ui/SectionHeading";
import { urlFor } from "@/sanity/lib/image";
import type { Service as SanityService } from "@/sanity/lib/types";

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

type DisplayService = {
    key: string;
    icon: LucideIcon;
    title: string;
    description: string;
    slug?: string;
    imageUrl?: string;
};

// TODO: final copy from client — used only when Sanity returns no services
const FALLBACK_SERVICES: DisplayService[] = [
    {
        key: "offices",
        icon: Building2,
        title: "Уборка офисов",
        description:
            "Ежедневная и поддерживающая уборка офисных помещений любой площади.",
    },
    {
        key: "general",
        icon: Sparkles,
        title: "Генеральная уборка",
        description:
            "Глубокая уборка с обработкой труднодоступных мест и сантехники.",
    },
    {
        key: "post-renovation",
        icon: HardHat,
        title: "Послестроительная уборка",
        description:
            "Удаление строительной пыли, грязи и следов ремонта после работ.",
    },
    {
        key: "windows",
        icon: Wind,
        title: "Мойка окон",
        description:
            "Мойка окон, фасадного остекления и витрин на высоте до 3 этажа.",
    },
    {
        key: "furniture",
        icon: Sofa,
        title: "Химчистка мебели",
        description:
            "Чистка диванов, кресел, ковров и текстиля профессиональной химией.",
    },
    {
        key: "garbage",
        icon: Trash2,
        title: "Вывоз мусора",
        description:
            "Вывоз строительного, бытового и крупногабаритного мусора.",
    },
    {
        key: "snow",
        icon: Snowflake,
        title: "Уборка снега",
        description:
            "Расчистка прилегающей территории, посыпка реагентами зимой.",
    },
    {
        key: "disinfection",
        icon: ShieldCheck,
        title: "Дезинфекция",
        description:
            "Обработка помещений дезинфицирующими средствами, сертифицированная химия.",
    },
];

type Props = {
    title?: string;
    subtitle?: string;
    services?: SanityService[];
};

export function Services({ title, subtitle, services }: Props) {
    const display: DisplayService[] =
        services && services.length > 0
            ? services.map((s) => ({
                  key: s._id,
                  icon: ICON_MAP[s.icon] ?? HelpCircle,
                  title: s.title,
                  description: s.description ?? "",
                  slug: s.slug,
                  imageUrl: s.image
                      ? urlFor(s.image).width(800).quality(80).url()
                      : undefined,
              }))
            : FALLBACK_SERVICES;

    return (
        <section id="services" className="bg-white py-20 md:py-28">
            <div className="px-6">
                <SectionHeading
                    // TODO: final copy from client (fallback below)
                    title={title ?? "Услуги"}
                    // TODO: final copy from client
                    subtitle={
                        subtitle ??
                        "Полный спектр клининговых услуг для бизнеса и помещений любого назначения."
                    }
                />

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 md:gap-8">
                    {display.map(({ key, icon: Icon, title, description, slug, imageUrl }) => {
                        const inner = (
                            <>
                                {imageUrl ? (
                                    <div className="relative aspect-[16/10] overflow-hidden rounded-md bg-ink/5">
                                        <Image
                                            src={imageUrl}
                                            alt={title}
                                            fill
                                            sizes="(min-width: 1280px) 25vw, (min-width: 768px) 50vw, 100vw"
                                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                    </div>
                                ) : (
                                    <div className="flex items-center justify-center aspect-[16/10] rounded-md bg-cyan-light">
                                        <Icon
                                            className="text-cyan"
                                            size={56}
                                            strokeWidth={1.25}
                                            aria-hidden="true"
                                        />
                                    </div>
                                )}
                                <h3 className="mt-5 text-lg font-semibold text-ink group-hover:text-cyan transition-colors">
                                    {title}
                                </h3>
                                <p className="mt-2 text-sm text-ink/70 leading-relaxed">
                                    {description}
                                </p>
                            </>
                        );
                        const cardClass =
                            "group bg-white border border-ink/10 rounded-lg p-4 md:p-5 hover:border-cyan transition-colors block";
                        return slug ? (
                            <Link key={key} href={`/services/${slug}`} className={cardClass}>
                                {inner}
                            </Link>
                        ) : (
                            <article key={key} className={cardClass}>
                                {inner}
                            </article>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
