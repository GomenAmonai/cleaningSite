export const siteSettingsQuery = `*[_type == "siteSettings"][0]{
  companyName,
  phone,
  email,
  address,
  workingHours,
  telegram,
  whatsapp,
  heroTitle,
  heroSubtitle,
  heroCtaLabel,
  aboutTitle,
  whyUsTitle,
  servicesTitle,
  faqTitle,
  clientsTitle,
  reviewsTitle,
  contactTitle
}`;

export const servicesQuery = `*[_type == "service"] | order(order asc){
  _id, title, description, icon, order, image
}`;

export const aboutSlidesQuery = `*[_type == "aboutSlide"] | order(order asc){
  _id, title, body, image, order
}`;

export const whyUsCardsQuery = `*[_type == "whyUsCard"] | order(order asc){
  _id, number, title, description, order
}`;

export const faqItemsQuery = `*[_type == "faqItem"] | order(order asc){
  _id, question, answer, order
}`;

export const reviewsQuery = `*[_type == "review"] | order(order asc){
  _id, authorName, authorCompany, text, rating, order
}`;

export const clientsQuery = `*[_type == "client"] | order(order asc){
  _id, name, logo, url, order
}`;
