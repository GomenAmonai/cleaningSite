import Image from "next/image";
import { Users } from "lucide-react";

import { SectionHeading } from "@/components/ui/SectionHeading";
import { urlFor } from "@/sanity/lib/image";
import type { Client as SanityClient } from "@/sanity/lib/types";

type Props = {
    title?: string;
    subtitle?: string;
    clients?: SanityClient[];
};

export function Clients({ title, subtitle, clients }: Props) {
    const hasClients = clients && clients.length > 0;

    return (
        <section id="clients" className="bg-white py-20 md:py-28">
            <div className="px-6">
                <SectionHeading
                    // TODO: final copy from client (fallback below)
                    title={title ?? "Наши клиенты"}
                    // TODO: final copy from client
                    subtitle={
                        subtitle ?? "Нам доверяют компании из разных отраслей."
                    }
                />

                {hasClients ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 md:gap-8 items-center">
                        {clients!.map((c) => {
                            const logoUrl = urlFor(c.logo)
                                .width(280)
                                .height(140)
                                .fit("max")
                                .url();
                            const inner = (
                                <div className="relative h-20 md:h-24 grayscale hover:grayscale-0 opacity-70 hover:opacity-100 transition">
                                    <Image
                                        src={logoUrl}
                                        alt={c.name}
                                        fill
                                        className="object-contain"
                                        sizes="(max-width: 768px) 40vw, 200px"
                                    />
                                </div>
                            );
                            return c.url ? (
                                <a
                                    key={c._id}
                                    href={c.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={c.name}
                                >
                                    {inner}
                                </a>
                            ) : (
                                <div key={c._id} aria-label={c.name}>
                                    {inner}
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div className="border border-dashed border-ink/15 rounded-lg p-12 md:p-16 max-w-2xl mx-auto text-center">
                        <Users
                            className="mx-auto text-ink/30"
                            size={48}
                            strokeWidth={1.5}
                            aria-hidden="true"
                        />
                        {/* TODO: final copy from client */}
                        <p className="mt-5 text-ink/60">
                            Скоро здесь появятся логотипы наших клиентов.
                        </p>
                    </div>
                )}
            </div>
        </section>
    );
}
