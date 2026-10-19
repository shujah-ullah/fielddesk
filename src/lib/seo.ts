export const SITE_URL = "https://fielddesk.site";

export type PageSeo = {
  title: string;
  description: string;
  path: string;
};

export function pageSeo({ title, description, path }: PageSeo) {
  const canonical = `${SITE_URL}${path === "/" ? "/" : path}`;
  return {
    meta: [
      { title },
      { name: "description", content: description },
      { name: "robots", content: "index, follow" },
      { property: "og:type", content: "website" },
      { property: "og:url", content: canonical },
      { property: "og:site_name", content: "FieldDesk" },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
    ],
    links: [{ rel: "canonical", href: canonical }],
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "FieldDesk",
    url: SITE_URL,
    description: "Electrical and HVAC field calculators for planning work on the job site.",
    inLanguage: "en-US",
  };
}

export function calculatorSchema({ name, description, path }: PageSeo) {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name,
    url: `${SITE_URL}${path}`,
    description,
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Web",
    browserRequirements: "Requires JavaScript",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  };
}
