#!/usr/bin/env node
/**
 * Seed Sanity with the current placeholder content from the v2 components.
 * Idempotent: uses fixed _ids so re-runs overwrite instead of duplicating.
 *
 * Run:
 *   node --env-file=.env.local scripts/seed-sanity.mjs
 * or:
 *   npm run seed
 *
 * Requires in .env.local:
 *   NEXT_PUBLIC_SANITY_PROJECT_ID
 *   NEXT_PUBLIC_SANITY_DATASET
 *   SANITY_API_WRITE_TOKEN
 */

import { createClient } from "@sanity/client";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const token = process.env.SANITY_API_WRITE_TOKEN;
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2026-05-09";

if (!projectId || !dataset) {
    console.error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID or NEXT_PUBLIC_SANITY_DATASET in env.");
    process.exit(1);
}
if (!token) {
    console.error("Missing SANITY_API_WRITE_TOKEN in env (needs write permissions).");
    process.exit(1);
}

const client = createClient({
    projectId,
    dataset,
    apiVersion,
    token,
    useCdn: false,
});

const siteSettings = {
    _id: "siteSettings",
    _type: "siteSettings",
    companyName: "Название компании",
    phone: "+7 (495) 000-00-00",
    email: "info@example.com",
    address: "г. Москва, ул. Примерная, д. 1",
    workingHours: "Пн–Вс: 9:00–21:00",
    heroTitle: "Профессиональная уборка для бизнеса в Москве",
    heroSubtitle:
        "Офисы, помещения, послестроительная уборка. Работаем по договору, оплата по факту.",
    heroCtaLabel: "Оставить заявку",
    aboutTitle: "О компании",
    whyUsTitle: "Почему мы",
    servicesTitle: "Услуги",
    faqTitle: "Частые вопросы",
    clientsTitle: "Наши клиенты",
    reviewsTitle: "Отзывы",
    contactTitle: "Свяжитесь с нами",
};

const services = [
    { slug: "offices", icon: "Building2", title: "Уборка офисов", description: "Ежедневная и поддерживающая уборка офисных помещений любой площади." },
    { slug: "general", icon: "Sparkles", title: "Генеральная уборка", description: "Глубокая уборка с обработкой труднодоступных мест и сантехники." },
    { slug: "post-renovation", icon: "HardHat", title: "Послестроительная уборка", description: "Удаление строительной пыли, грязи и следов ремонта после работ." },
    { slug: "windows", icon: "Wind", title: "Мойка окон", description: "Мойка окон, фасадного остекления и витрин на высоте до 3 этажа." },
    { slug: "furniture", icon: "Sofa", title: "Химчистка мебели", description: "Чистка диванов, кресел, ковров и текстиля профессиональной химией." },
    { slug: "garbage", icon: "Trash2", title: "Вывоз мусора", description: "Вывоз строительного, бытового и крупногабаритного мусора." },
    { slug: "snow", icon: "Snowflake", title: "Уборка снега", description: "Расчистка прилегающей территории, посыпка реагентами зимой." },
    { slug: "disinfection", icon: "ShieldCheck", title: "Дезинфекция", description: "Обработка помещений дезинфицирующими средствами, сертифицированная химия." },
].map((s, i) => ({
    _id: `seed.service.${s.slug}`,
    _type: "service",
    title: s.title,
    description: s.description,
    icon: s.icon,
    order: i,
}));

const aboutSlides = [
    { slug: "experience", title: "Опыт работы", body: "Более 5 лет на рынке клининга. Команда обученных специалистов с опытом работы в крупных бизнес-центрах." },
    { slug: "equipment", title: "Современное оборудование", body: "Профессиональная техника и сертифицированная химия. Безопасно для сотрудников и посетителей." },
    { slug: "schedule", title: "Гибкий график", body: "Работаем в удобное для вас время — днём, ночью, по выходным. Не мешаем рабочему процессу." },
    { slug: "contract", title: "Договор и отчётность", body: "Официальный договор, закрывающие документы, прозрачная цена. Без скрытых платежей." },
].map((s, i) => ({
    _id: `seed.aboutSlide.${s.slug}`,
    _type: "aboutSlide",
    title: s.title,
    body: s.body,
    order: i,
}));

const whyUsCards = [
    { slug: "contract", number: "01", title: "Договор и документы", description: "Заключаем официальный договор. Закрывающие документы для бухгалтерии." },
    { slug: "price", number: "02", title: "Фиксированная цена", description: "Озвучиваем цену на этапе расчёта. Без доплат и пересчётов после уборки." },
    { slug: "staff", number: "03", title: "Свой персонал", description: "Не работаем через субподряд. Все сотрудники в штате, проверены и обучены." },
    { slug: "schedule", number: "04", title: "Гибкий график", description: "Работаем в удобное вам время — днём, ночью, по выходным." },
    { slug: "chemistry", number: "05", title: "Профессиональная химия", description: "Используем сертифицированные средства, безопасные для людей и техники." },
    { slug: "warranty", number: "06", title: "Гарантия результата", description: "Если что-то не устроило — переделаем бесплатно по гарантии договора." },
].map((c, i) => ({
    _id: `seed.whyUsCard.${c.slug}`,
    _type: "whyUsCard",
    number: c.number,
    title: c.title,
    description: c.description,
    order: i,
}));

const faqItems = [
    { slug: "price", question: "Сколько стоит уборка?", answer: "Цена зависит от площади помещения, типа уборки и периодичности. Базовая ставка — от 80 ₽/м². Точную стоимость рассчитываем после выезда на объект, выезд бесплатный." },
    { slug: "contract", question: "Заключаете ли вы договор?", answer: "Да, работаем только по договору. Предоставляем закрывающие документы — акты выполненных работ, счета, счёт-фактуры. Работаем с НДС и без НДС." },
    { slug: "payment", question: "Какие способы оплаты вы принимаете?", answer: "Безналичный расчёт на расчётный счёт юридического лица или ИП, наличный расчёт для физических лиц. Возможна оплата по факту выполнения работ или по предоплате." },
    { slug: "schedule", question: "Работаете ли вы по выходным и в ночное время?", answer: "Да, график работы согласовываем индивидуально. Можем работать днём, ночью, в выходные и праздничные дни без доплат за нестандартное время." },
    { slug: "chemistry", question: "Какую химию используете для уборки?", answer: "Используем сертифицированную профессиональную химию ведущих брендов. Все средства имеют сертификаты соответствия и санитарно-эпидемиологические заключения. Безопасны для людей, животных и поверхностей." },
    { slug: "warranty", question: "Что если меня не устроит результат уборки?", answer: "По договору даём гарантию на выполненные работы. Если что-то не устроило — приедем и переделаем бесплатно. Достаточно сообщить в течение 24 часов после уборки." },
].map((f, i) => ({
    _id: `seed.faqItem.${f.slug}`,
    _type: "faqItem",
    question: f.question,
    answer: f.answer,
    order: i,
}));

const docs = [siteSettings, ...services, ...aboutSlides, ...whyUsCards, ...faqItems];

console.log(`Seeding ${docs.length} documents to ${projectId}/${dataset}…`);

const tx = client.transaction();
for (const doc of docs) {
    tx.createOrReplace(doc);
}

try {
    const result = await tx.commit();
    console.log(`✓ Committed transaction (${result.results?.length ?? docs.length} ops).`);
} catch (err) {
    console.error("✗ Seed failed:", err.message || err);
    process.exit(1);
}
