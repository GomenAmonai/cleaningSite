import { Users } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Clients() {
    return (
        <section id="clients" className="bg-white py-20 md:py-28">
            <div className="px-6">
                <SectionHeading
                    // TODO: final copy from client
                    title="Наши клиенты"
                    // TODO: final copy from client
                    subtitle="Нам доверяют компании из разных отраслей."
                />

                <div className="border border-dashed border-ink/15 rounded-lg p-12 md:p-16 max-w-2xl mx-auto text-center">
                    <Users
                        className="mx-auto text-ink/30"
                        size={48}
                        strokeWidth={1.5}
                        aria-hidden="true"
                    />
                    {/* TODO: final copy from client — replace with Sanity-driven logo grid in block 5 */}
                    <p className="mt-5 text-ink/60">
                        Скоро здесь появятся логотипы наших клиентов.
                    </p>
                </div>
            </div>
        </section>
    );
}
