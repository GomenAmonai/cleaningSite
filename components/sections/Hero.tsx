export function Hero() {
    return (
        <section
            id="hero"
            className="relative isolate min-h-[500px] md:min-h-[600px] flex items-center"
        >
            {/* TODO: replace with next/image using /public/placeholders/hero.jpg once real asset lands */}
            <div className="absolute inset-0 -z-10 bg-ink" aria-hidden="true" />
            <div
                className="absolute inset-0 -z-10 bg-gradient-to-b from-ink/70 to-ink/30"
                aria-hidden="true"
            />

            <div className="w-full px-6 py-20 md:py-28">
                <div className="max-w-3xl mx-auto text-center text-white">
                    {/* TODO: final copy from client */}
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight">
                        Профессиональная уборка для бизнеса в Москве
                    </h1>

                    {/* TODO: final copy from client */}
                    <p className="mt-6 text-base md:text-lg text-white/85 leading-relaxed max-w-2xl mx-auto">
                        Офисы, помещения, послестроительная уборка. Работаем по
                        договору, оплата по факту.
                    </p>

                    <div className="mt-10">
                        {/* TODO: final copy from client */}
                        <a
                            href="#contact"
                            className="inline-flex items-center justify-center bg-cyan hover:bg-cyan/85 text-white font-semibold px-8 py-4 rounded-md transition-colors"
                        >
                            Оставить заявку
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
