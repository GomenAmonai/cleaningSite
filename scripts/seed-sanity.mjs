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
    {
        slug: "offices",
        icon: "Building2",
        title: "Уборка офисов",
        description: "Ежедневная и поддерживающая уборка офисных помещений любой площади.",
        pricing: "от 80 ₽/м²",
        features: [
            "Уборка рабочих мест и переговорных",
            "Мытьё полов и пылесосение ковров",
            "Чистка оргтехники от пыли",
            "Протирка стеклянных поверхностей",
            "Дезинфекция санузлов",
            "Вынос мусора и замена пакетов",
        ],
        longDescription: [
            { _type: "block", _key: "b1", style: "normal", markDefs: [], children: [{ _type: "span", _key: "s1", text: "Регулярная уборка офиса поддерживает чистоту и порядок, создаёт комфортные условия для сотрудников и партнёров. Мы работаем по согласованному графику — ежедневно, несколько раз в неделю или по запросу.", marks: [] }] },
            { _type: "block", _key: "b2", style: "normal", markDefs: [], children: [{ _type: "span", _key: "s2", text: "Специалисты приезжают в удобное для вас время, в том числе до начала рабочего дня или после его окончания, чтобы не мешать работе команды.", marks: [] }] },
        ],
    },
    {
        slug: "general",
        icon: "Sparkles",
        title: "Генеральная уборка",
        description: "Глубокая уборка с обработкой труднодоступных мест и сантехники.",
        pricing: "от 120 ₽/м²",
        features: [
            "Мытьё окон изнутри",
            "Чистка плинтусов и труднодоступных мест",
            "Мытьё осветительных приборов",
            "Дезинфекция всех поверхностей",
            "Чистка ковров и мягкой мебели",
            "Удаление стойких загрязнений",
        ],
        longDescription: [
            { _type: "block", _key: "b1", style: "normal", markDefs: [], children: [{ _type: "span", _key: "s1", text: "Генеральная уборка — это комплексная глубокая очистка помещения, которую рекомендуется проводить раз в квартал или перед важными мероприятиями.", marks: [] }] },
            { _type: "block", _key: "b2", style: "normal", markDefs: [], children: [{ _type: "span", _key: "s2", text: "В отличие от поддерживающей уборки, мы обрабатываем все поверхности: от потолочных плинтусов до пространства за мебелью. Результат заметен сразу.", marks: [] }] },
        ],
    },
    {
        slug: "post-renovation",
        icon: "HardHat",
        title: "Послестроительная уборка",
        description: "Удаление строительной пыли, грязи и следов ремонта после работ.",
        pricing: "от 150 ₽/м²",
        features: [
            "Удаление строительной пыли со всех поверхностей",
            "Очистка окон от монтажной пены и наклеек",
            "Мытьё полов от штукатурки и краски",
            "Чистка радиаторов и вентиляционных решёток",
            "Мойка сантехники от налёта",
            "Вынос строительного мусора",
        ],
        longDescription: [
            { _type: "block", _key: "b1", style: "normal", markDefs: [], children: [{ _type: "span", _key: "s1", text: "После ремонта помещение требует особого подхода: строительная пыль проникает в каждую щель, на стёклах остаются монтажная пена и малярный скотч, полы покрыты штукатуркой.", marks: [] }] },
            { _type: "block", _key: "b2", style: "normal", markDefs: [], children: [{ _type: "span", _key: "s2", text: "Наша бригада использует профессиональный пылесос HEPA-класса и специальные растворители для удаления строительных загрязнений без повреждения отделки.", marks: [] }] },
        ],
    },
    {
        slug: "windows",
        icon: "Wind",
        title: "Мойка окон",
        description: "Мойка окон, фасадного остекления и витрин на высоте до 3 этажа.",
        pricing: "от 200 ₽/окно",
        features: [
            "Мойка стекла с двух сторон",
            "Очистка рам и подоконников",
            "Мойка витрин и стеклянных перегородок",
            "Фасадное остекление до 3 этажа",
            "Удаление известкового налёта",
            "Без разводов и полос",
        ],
        longDescription: [
            { _type: "block", _key: "b1", style: "normal", markDefs: [], children: [{ _type: "span", _key: "s1", text: "Профессиональная мойка окон обеспечивает кристальную чистоту без разводов. Мы используем деионизированную воду и телескопические швабры для безопасной работы на высоте.", marks: [] }] },
            { _type: "block", _key: "b2", style: "normal", markDefs: [], children: [{ _type: "span", _key: "s2", text: "Подходит для офисов, магазинов, ресторанов. Один звонок — и ваши окна сияют чистотой.", marks: [] }] },
        ],
    },
    {
        slug: "furniture",
        icon: "Sofa",
        title: "Химчистка мебели",
        description: "Чистка диванов, кресел, ковров и текстиля профессиональной химией.",
        pricing: "от 800 ₽/посадочное место",
        features: [
            "Чистка диванов, кресел, пуфов",
            "Чистка ковров и ковровых покрытий",
            "Удаление пятен и запахов",
            "Безопасная химия, гипоаллергенные составы",
            "Быстрое высыхание — 2–4 часа",
            "Дезинфекция и антибактериальная обработка",
        ],
        longDescription: [
            { _type: "block", _key: "b1", style: "normal", markDefs: [], children: [{ _type: "span", _key: "s1", text: "Химчистка мягкой мебели на дому или в офисе — без перевозки. Профессиональное оборудование извлекает загрязнения из глубины ткани, куда не достаёт обычный пылесос.", marks: [] }] },
            { _type: "block", _key: "b2", style: "normal", markDefs: [], children: [{ _type: "span", _key: "s2", text: "Сертифицированная химия безопасна для детей, аллергиков и домашних животных. Мебель готова к использованию через несколько часов после обработки.", marks: [] }] },
        ],
    },
    {
        slug: "garbage",
        icon: "Trash2",
        title: "Вывоз мусора",
        description: "Вывоз строительного, бытового и крупногабаритного мусора.",
        pricing: "от 3 500 ₽/машина",
        features: [
            "Строительный мусор после ремонта",
            "Крупногабаритная мебель и техника",
            "Бытовые отходы",
            "Грузчики в бригаде",
            "Газель и грузовые автомобили",
            "Утилизация по экологическим нормам",
        ],
        longDescription: [
            { _type: "block", _key: "b1", style: "normal", markDefs: [], children: [{ _type: "span", _key: "s1", text: "Оперативный вывоз мусора любого объёма: от пары мешков до нескольких машин строительных отходов. В бригаде — грузчики, всё сделаем сами.", marks: [] }] },
            { _type: "block", _key: "b2", style: "normal", markDefs: [], children: [{ _type: "span", _key: "s2", text: "Работаем по договору, предоставляем документы для юридических лиц. Вывоз в лицензированные пункты утилизации.", marks: [] }] },
        ],
    },
    {
        slug: "snow",
        icon: "Snowflake",
        title: "Уборка снега",
        description: "Расчистка прилегающей территории, посыпка реагентами зимой.",
        pricing: "от 5 000 ₽/выезд",
        features: [
            "Ручная и механическая уборка снега",
            "Расчистка парковок и подъездных путей",
            "Посыпка реагентами и песком",
            "Сколка льда",
            "Абонементное обслуживание на сезон",
            "Выезд в течение 2 часов после снегопада",
        ],
        longDescription: [
            { _type: "block", _key: "b1", style: "normal", markDefs: [], children: [{ _type: "span", _key: "s1", text: "Своевременная уборка снега и наледи — это безопасность сотрудников и клиентов. Мы оперативно выезжаем после снегопадов и обеспечиваем чистоту территории круглую зиму.", marks: [] }] },
            { _type: "block", _key: "b2", style: "normal", markDefs: [], children: [{ _type: "span", _key: "s2", text: "Предлагаем абонементное обслуживание на весь зимний сезон с фиксированной ценой — без переплат в дни сильных снегопадов.", marks: [] }] },
        ],
    },
    {
        slug: "disinfection",
        icon: "ShieldCheck",
        title: "Дезинфекция",
        description: "Обработка помещений дезинфицирующими средствами, сертифицированная химия.",
        pricing: "от 30 ₽/м²",
        features: [
            "Обработка всех поверхностей",
            "Дезинфекция воздуха (распыление)",
            "Уничтожение бактерий и вирусов",
            "Сертифицированные препараты",
            "Протокол и документы для СЭС",
            "Помещение готово через 2 часа",
        ],
        longDescription: [
            { _type: "block", _key: "b1", style: "normal", markDefs: [], children: [{ _type: "span", _key: "s1", text: "Профессиональная дезинфекция показана после болезни, при смене арендатора, а также как плановая мера для медицинских учреждений, пищевых производств и офисов.", marks: [] }] },
            { _type: "block", _key: "b2", style: "normal", markDefs: [], children: [{ _type: "span", _key: "s2", text: "Применяем препараты 3–4 классов опасности, безопасные для людей и животных после проветривания. Выдаём акт о проведённой дезинфекции.", marks: [] }] },
        ],
    },
].map((s, i) => ({
    _id: `seed.service.${s.slug}`,
    _type: "service",
    title: s.title,
    description: s.description,
    icon: s.icon,
    slug: { _type: "slug", current: s.slug },
    pricing: s.pricing,
    features: s.features,
    longDescription: s.longDescription,
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
