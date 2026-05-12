import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";

export default function Home() {
    return (
        <>
            <Header />
            <main className="flex-1">
                <Hero />
                <About />
            </main>
            <Footer />
        </>
    );
}
