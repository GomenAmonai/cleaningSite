"use client";

import Link from "next/link";
import { useContactModal } from "@/components/providers/ModalProvider";
import type { Service, SiteSettings } from "@/sanity/lib/types";

// TODO: final copy from client — used only when Sanity returns no services
const FALLBACK_SERVICE_TITLES = [
    "Уборка офисов",
    "Генеральная уборка",
    "Послестроительная уборка",
    "Мойка окон",
];

const NAV_ITEMS = [
    { label: "Главная", href: "#hero" },
    { label: "О нас", href: "#about" },
    { label: "Услуги", href: "#services" },
    { label: "Преимущества", href: "#why-us" },
    { label: "Отзывы", href: "#reviews" },
    { label: "FAQ", href: "#faq" },
];

const COMPANY_FALLBACK = "Название компании";

type Props = {
    settings?: SiteSettings;
    services?: Service[];
};

export function Footer({ settings, services }: Props) {
    const year = new Date().getFullYear();
    const company = settings?.companyName ?? COMPANY_FALLBACK;
    const { openContactModal } = useContactModal();

    const phone = settings?.phone ?? "+7 (XXX) XXX-XX-XX";
    const telHref = `tel:${phone.replace(/[^+\d]/g, "")}`;

    const serviceList =
        services && services.length > 0
            ? services.slice(0, 6)
            : FALLBACK_SERVICE_TITLES.map((title) => ({ title, slug: undefined }));

    return (
        <footer className="bg-ink text-white mt-auto">
            <div className="px-6 py-14 grid gap-10 md:grid-cols-3">
                {/* Contacts */}
                <div>
                    <h3 className="text-base font-semibold mb-4">Контакты</h3>
                    <ul className="space-y-2 text-sm text-white/75">
                        <li>
                            <a href={telHref} className="hover:text-white transition-colors">
                                {phone}
                            </a>
                        </li>
                        {settings?.email && (
                            <li>
                                <a
                                    href={`mailto:${settings.email}`}
                                    className="hover:text-white transition-colors"
                                >
                                    {settings.email}
                                </a>
                            </li>
                        )}
                        {settings?.address && <li>{settings.address}</li>}
                        {settings?.workingHours && <li>{settings.workingHours}</li>}
                        {settings?.telegram && (
                            <li>
                                <a
                                    href={`https://t.me/${settings.telegram.replace(/^@/, "")}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:text-white transition-colors"
                                >
                                    Telegram
                                </a>
                            </li>
                        )}
                        {settings?.whatsapp && (
                            <li>
                                <a
                                    href={`https://wa.me/${settings.whatsapp.replace(/[^+\d]/g, "")}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:text-white transition-colors"
                                >
                                    WhatsApp
                                </a>
                            </li>
                        )}
                    </ul>
                    <button
                        type="button"
                        onClick={openContactModal}
                        className="mt-5 inline-flex items-center justify-center bg-cyan hover:bg-cyan/85 text-white text-sm font-medium px-5 py-2.5 rounded-md transition-colors"
                    >
                        Оставить заявку
                    </button>
                </div>

                {/* Services */}
                <div>
                    <h3 className="text-base font-semibold mb-4">Услуги</h3>
                    <ul className="space-y-2 text-sm text-white/75">
                        {serviceList.map((item) => {
                            const title = typeof item === "string" ? item : item.title;
                            const slug = typeof item === "string" ? undefined : (item as Service).slug;
                            return (
                                <li key={title}>
                                    {slug ? (
                                        <Link
                                            href={`/services/${slug}`}
                                            className="hover:text-white transition-colors"
                                        >
                                            {title}
                                        </Link>
                                    ) : (
                                        <a href="/#services" className="hover:text-white transition-colors">
                                            {title}
                                        </a>
                                    )}
                                </li>
                            );
                        })}
                    </ul>
                </div>

                {/* Navigation */}
                <div>
                    <h3 className="text-base font-semibold mb-4">Навигация</h3>
                    <ul className="space-y-2 text-sm text-white/75">
                        {NAV_ITEMS.map((item) => (
                            <li key={item.href}>
                                <a
                                    href={item.href}
                                    className="hover:text-white transition-colors"
                                >
                                    {item.label}
                                </a>
                            </li>
                        ))}
                        <li>
                            <button
                                type="button"
                                onClick={openContactModal}
                                className="hover:text-white transition-colors"
                            >
                                Контакты
                            </button>
                        </li>
                    </ul>
                </div>
            </div>

            {/* #contact anchor kept for external deep-links */}
            <span id="contact" aria-hidden="true" />

            <div className="px-6 py-6 border-t border-white/10 text-xs text-white/60">
                © {year} {company}. Все права защищены.
            </div>
        </footer>
    );
}
