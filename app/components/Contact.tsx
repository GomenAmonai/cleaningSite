import Link from "next/link";

type ContactProps = {
    phone?: string;
    address?: string;
    workingHours?: string;
    whatsapp?: string;
    telegram?: string;
};

export function Contact({ phone, address, workingHours, whatsapp, telegram }: ContactProps) {
    return (
        <section id="contact" className="bg-accent text-white">
            <div className="max-w-6xl mx-auto px-6 lg:px-12 py-24">
                <h2 className="font-serif text-4xl sm:text-5xl font-medium tracking-tight mb-4">
                    Связаться с нами
                </h2>
                <p className="text-white/70 text-lg mb-16 max-w-xl">
                    Позвоните или напишите — расскажем условия и подготовим расчёт под ваш объект.
                </p>

                <div className="grid gap-12 lg:grid-cols-2">
                    <div className="space-y-10">
                        {phone && (
                            <div>
                                <p className="text-white/50 text-sm uppercase tracking-wider mb-2">
                                    Телефон
                                </p>
                            <a
                                href={`tel:${phone.replace(/[^+\d]/g, "")}`}
                                className="font-serif text-3xl sm:text-4xl text-white hover:text-gold transition-colors"
                                >
                                {phone}
                            </a>
                            </div>
                            )}

                        {workingHours && (
                            <div>
                                <p className="text-white/50 text-sm uppercase tracking-wider mb-2">
                                    Часы работы
                                </p>
                                <p className="text-white text-lg">{workingHours}</p>
                            </div>
                        )}

                        {address && (
                            <div>
                                <p className="text-white/50 text-sm uppercase tracking-wider mb-2">
                                    Адрес
                                </p>
                                <p className="text-white text-lg">{address}</p>
                            </div>
                        )}
                    </div>

                    <div className="space-y-4">
                        <p className="text-white/50 text-sm uppercase tracking-wider mb-4">
                            Написать в мессенджер
                        </p>

                        {whatsapp && (
                            <Link
                                href={whatsapp}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-between bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl px-6 py-5 transition-colors"
                            >
                                <span className="font-medium text-lg">WhatsApp</span>
                                <span className="text-gold text-xl">→</span>
                            </Link>
                        )}

                        {telegram && (
                            <Link
                                href={telegram}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-between bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl px-6 py-5 transition-colors"
                            >
                                <span className="font-medium text-lg">Telegram</span>
                                <span className="text-gold text-xl">→</span>
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}