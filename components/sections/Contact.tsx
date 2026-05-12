import { Mail, MapPin, Phone, Clock } from "lucide-react";

import { SectionHeading } from "@/components/ui/SectionHeading";
import { ContactForm } from "@/components/sections/ContactForm";
import type { SiteSettings } from "@/sanity/lib/types";

type Props = {
    title?: string;
    settings?: SiteSettings;
};

export function Contact({ title, settings }: Props) {
    // TODO: final copy from client — fallbacks used when Sanity has no value
    const phone = settings?.phone ?? "+7 (XXX) XXX-XX-XX";
    const email = settings?.email ?? "info@example.com";
    const address = settings?.address ?? "г. Москва, ул. Примерная, д. 1";
    const hours = settings?.workingHours ?? "Пн–Вс: 9:00–21:00";
    const telHref = `tel:${phone.replace(/[^+\d]/g, "")}`;
    const mailHref = `mailto:${email}`;

    return (
        <section id="contact" className="bg-cyan-light py-20 md:py-28">
            <div className="px-6">
                <SectionHeading
                    // TODO: final copy from client (fallback below)
                    title={title ?? "Свяжитесь с нами"}
                    // TODO: final copy from client
                    subtitle="Оставьте заявку — рассчитаем стоимость и перезвоним в течение часа."
                />

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 max-w-5xl mx-auto">
                    <div>
                        <ul className="space-y-6">
                            <li className="flex items-start gap-4">
                                <Phone
                                    className="text-cyan mt-0.5 shrink-0"
                                    size={22}
                                    strokeWidth={1.75}
                                    aria-hidden="true"
                                />
                                <div>
                                    <div className="text-sm text-ink/60">Телефон</div>
                                    <a
                                        href={telHref}
                                        className="text-lg font-medium text-ink hover:text-cyan transition-colors"
                                    >
                                        {phone}
                                    </a>
                                </div>
                            </li>
                            <li className="flex items-start gap-4">
                                <Mail
                                    className="text-cyan mt-0.5 shrink-0"
                                    size={22}
                                    strokeWidth={1.75}
                                    aria-hidden="true"
                                />
                                <div>
                                    <div className="text-sm text-ink/60">Email</div>
                                    <a
                                        href={mailHref}
                                        className="text-lg font-medium text-ink hover:text-cyan transition-colors break-all"
                                    >
                                        {email}
                                    </a>
                                </div>
                            </li>
                            <li className="flex items-start gap-4">
                                <MapPin
                                    className="text-cyan mt-0.5 shrink-0"
                                    size={22}
                                    strokeWidth={1.75}
                                    aria-hidden="true"
                                />
                                <div>
                                    <div className="text-sm text-ink/60">Адрес</div>
                                    <div className="text-lg font-medium text-ink">
                                        {address}
                                    </div>
                                </div>
                            </li>
                            <li className="flex items-start gap-4">
                                <Clock
                                    className="text-cyan mt-0.5 shrink-0"
                                    size={22}
                                    strokeWidth={1.75}
                                    aria-hidden="true"
                                />
                                <div>
                                    <div className="text-sm text-ink/60">Часы работы</div>
                                    <div className="text-lg font-medium text-ink">
                                        {hours}
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <ContactForm fallbackPhone={phone} />
                    </div>
                </div>
            </div>
        </section>
    );
}
