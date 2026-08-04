// Add this to your existing pageSectionsConfig.js



// pageSectionsConfig.js
export const TYPE_STEP_MAP = {
  service: ["basicInfo", "hero", "challenges", "pillars", "taskBoard", "approach", "whyUs", "outcomes", "successStories", "insights", "cta", "seo"],
  platform: ["basicInfo", "hero", "challenges", "capabilities", "industryUseCases", "outcomes", "pillars", "consultingServices", "approach", "whyUs", "successStories", "insights", "cta", "seo"],
  industry: ["basicInfo", "hero", "sectorOverview", "applicationLayer", "outcomes", "pillars", "consultingServices", "appGrid", "approach", "whyUs", "successStories", "insights", "cta", "seo"],
};

export const TYPE_CATEGORY_SLUG = {
  service: "services",
  platform: "platforms",
  industry: "industries",
};

export const SECTION_LIBRARY = {
  deliveryProcess: { component: "deliveryProcess" },
  industryExamples: { component: "industryList" },
  // ... other sections
};

export const REQUIRED_FIELDS = {
  basicInfo: [
    { path: "title", label: "Title" },
    { path: "slug", label: "Slug" },
    { path: "shortDescription", label: "Short Description" },
    { path: "subCategory", label: "Sub Category" },
  ],
  hero: [
    { path: "hero.heading", label: "Hero Heading" },
  ],
  // ... other required fields
};

export function buildDefaultForm(type) {
  return {
    title: "",
    slug: "",
    shortDescription: "",
    badge: "",
    urlPath: "",
    category: "",
    subCategory: "",
    order: 0,
    isPublished: false,
    overview: { tag: "", title: "", brandLabel: "", paragraphs: [], checklist: [] },
    hero: {
      eyebrow: "",
      heading: "",
      lede: "",
      primaryCtaText: "",
      primaryCtaLink: "",
      secondaryCtaText: "",
      secondaryCtaAnchor: "",
      glance: { title: "At a glance", items: [] },
      stats: []
    },
    seo: { metaTitle: "", metaDescription: "", keywords: [], ogImage: "", canonicalUrl: "" },
    faqs: { tag: "", title: "", subtitle: "", items: [] },
    // ... other sections with default values
  };
}

export function getStepLabel(type, key) {
  const labels = {
    basicInfo: "Basic Info",
    hero: "Hero",
    overview: "Overview",
    seo: "SEO",
    faqs: "FAQs",
    challenges: "Challenges",
    pillars: "Pillars",
    taskBoard: "Task Board",
    consultingServices: "Consulting Services",
    approach: "Approach",
    whyUs: "Why Us",
    successStories: "Success Stories",
    insights: "Insights",
    cta: "Call to Action",
    capabilities: "Capabilities",
    industryUseCases: "Industry Use Cases",
    outcomes: "Outcomes",
    sectorOverview: "Sector Overview",
    applicationLayer: "Application Layer",
    appGrid: "App Grid",
  };
  return labels[key] || key;
}

export const SECTION_FIELD_CONFIG = {
  challenges: { fields: ["title", "description"], label: "Challenge" },
  sectorOverview: { fields: ["title", "description"], label: "Sector" },
  applicationLayer: { fields: ["tag", "title", "description"], label: "Application" },
  capabilities: { fields: ["icon", "title", "description", "points"], label: "Capability" },
  industryUseCases: { fields: ["title", "description"], label: "Use Case" },
  outcomes: { fields: ["label", "value", "description"], label: "Outcome" },
  pillars: { fields: ["icon", "title", "description", "points"], label: "Pillar" },
  taskBoard: { fields: ["tag", "title", "description"], label: "Task" },
  consultingServices: { fields: ["tag", "title", "description"], label: "Service" },
  appGrid: { fields: ["tag", "title", "description"], label: "Application" },
  whyUs: { fields: ["icon", "title", "description", "points"], label: "Reason" },
  successStories: {
    fields: ["industry", "isSample", "title", "summary", "metrics", "outcomes", "ctaLink"],
    label: "Story"
  },
  insights: { fields: ["tag", "meta", "title", "description", "link"], label: "Post" },
  cta: {
    fields: ["title", "description", "primaryLabel", "primaryLink", "secondaryLabel", "secondaryLink", "note"],
    label: "CTA"
  },
  relatedItems: { fields: ["title", "description"], label: "Related Item" },
  approach: { fields: ["title", "description"], label: "Step" },
};