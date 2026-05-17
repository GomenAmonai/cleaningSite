import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Политика конфиденциальности",
    description: "Политика обработки персональных данных",
};

export default function PrivacyPage() {
    return (
        <main className="flex-1 px-6 py-16 md:py-24 max-w-3xl mx-auto w-full">
            <Link
                href="/"
                className="text-sm text-cyan hover:underline mb-8 inline-block"
            >
                ← На главную
            </Link>

            <h1 className="text-3xl md:text-4xl font-semibold text-ink mb-8">
                Политика конфиденциальности
            </h1>

            <div className="prose prose-slate max-w-none space-y-6 text-ink/80 leading-relaxed">
                <section>
                    <h2 className="text-xl font-semibold text-ink mb-3">1. Общие положения</h2>
                    <p>
                        Настоящая политика конфиденциальности определяет порядок обработки
                        персональных данных пользователей сайта в соответствии с Федеральным
                        законом № 152-ФЗ «О персональных данных».
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold text-ink mb-3">2. Какие данные мы собираем</h2>
                    <p>При заполнении формы заявки мы собираем:</p>
                    <ul className="list-disc pl-6 space-y-1 mt-2">
                        <li>Имя</li>
                        <li>Номер телефона</li>
                        <li>Адрес электронной почты (по желанию)</li>
                        <li>Текст сообщения (по желанию)</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-xl font-semibold text-ink mb-3">3. Цель обработки данных</h2>
                    <p>
                        Персональные данные обрабатываются исключительно с целью обратной связи
                        с пользователем для оказания клининговых услуг и не передаются третьим
                        лицам.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold text-ink mb-3">4. Хранение данных</h2>
                    <p>
                        Данные хранятся на защищённых серверах и не передаются третьим лицам
                        без вашего согласия. Вы вправе в любой момент отозвать согласие на
                        обработку персональных данных, направив запрос по контактному email.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold text-ink mb-3">5. Контакты</h2>
                    <p>
                        По вопросам обработки персональных данных обращайтесь по контактам,
                        указанным на главной странице сайта.
                    </p>
                </section>
            </div>
        </main>
    );
}
