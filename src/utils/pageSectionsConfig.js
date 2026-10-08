/* ==============================================================
 Admin wizard config — aligned with backend models/Page.js

 Step keys == Page schema section keys, so every step reads and
 writes form[stepKey] with exactly the shape the backend stores.
================================================================ */

/* ---------- Which steps each page type shows (in page order) ---------- */

export const TYPE_STEP_MAP = {
  service: [
    "basicInfo",
    "hero",
    "definition",          // The basics + layers + paragraphs
    "challenges",
    "outcomes",
    "pillars",
    "taskBoard",
    "approach",
    "whoFor",              // Who it's for
    "microsoftPlatforms",  // Microsoft platforms grid
    "whyUs",
    "successStories",
    "insights",
    "relatedItems",
    "faqs",
    "cta",
    "seo",
  ],
  platform: [
    "basicInfo",
    "hero",
    "challenges",
    "capabilities",
    "industryUseCases",
    "outcomes",
    "pillars",
    "consultingServices",
    "approach",
    "whyUs",
    "successStories",
    "insights",
    "relatedItems",
    "faqs",
    "cta",
    "seo",
  ],
  industry: [
    "basicInfo",
    "hero",
    "challenges",
    "sectorOverview",
    "applicationLayer",
    "outcomes",
    "pillars",
    "consultingServices",
    "appGrid",
    "approach",
    "whyUs",
    "successStories",
    "insights",
    "relatedItems",
    "faqs",
    "cta",
    "seo",
  ],
};

/* Category-collection slug used to load the subcategory (item) dropdown */
export const TYPE_CATEGORY_SLUG = {
  service: "services",
  platform: "platforms",
  industry: "industries",
};

/* Kept for backwards compatibility with older imports */
export const SECTION_LIBRARY = {};

/* ---------- Validation ---------- */

export const REQUIRED_FIELDS = {
  basicInfo: [
    { path: "title", label: "Title" },
    { path: "slug", label: "Slug" },
    { path: "shortDescription", label: "Short Description" },
    { path: "subCategory", label: "Sub Category" },
  ],
  hero: [{ path: "hero.heading", label: "Hero Heading" }],
};

/* ---------- Default form (mirrors backend defaults) ---------- */

export function buildDefaultForm() {
  return {
    title: "",
    slug: "",
    shortDescription: "",
    badge: "",
    subCategory: "",
    order: 0,
    isPublished: false,

    hero: {
      eyebrow: "",
      heading: "",
      lede: "",
      primaryCtaText: "Book a consultation",
      primaryCtaLink: "/contact",
      secondaryCtaText: "See what's included",
      secondaryCtaAnchor: "#included",
      glance: { title: "At a glance", items: [] },
      stats: [],
    },

    definition: {
      eyebrow: "",
      title: "",
      layersLabel: "",
      layers: [],
      paragraphs: [],
    },

    challenges: { eyebrow: "", title: "", subtitle: "", items: [], note: "", noteHighlight: "" },
    sectorOverview: { eyebrow: "", title: "", subtitle: "", items: [], note: "" },
    applicationLayer: { eyebrow: "", title: "", subtitle: "", items: [] },
    capabilities: { eyebrow: "", title: "", subtitle: "", items: [], note: "" },
    industryUseCases: { eyebrow: "", title: "", subtitle: "", items: [] },

    outcomes: {
      eyebrow: "",
      title: "",
      subtitle: "",
      metrics: [],
      note: "",
      associatedTitle: "",
      associatedSubtitle: "",
      associatedItems: [],
      associatedNote: "",
    },

    pillars: { eyebrow: "", title: "", subtitle: "", items: [] },
    taskBoard: { eyebrow: "", title: "", subtitle: "", tasks: [] },
    consultingServices: { eyebrow: "", title: "", subtitle: "", items: [], note: "" },
    appGrid: { eyebrow: "", title: "", subtitle: "", items: [], note: "" },
    approach: { eyebrow: "", title: "", subtitle: "", steps: [], note: "" },

    whoFor: { eyebrow: "", title: "", subtitle: "", honestNote: "", items: [] },
    microsoftPlatforms: { eyebrow: "", title: "", subtitle: "", items: [], note: "" },

    whyUs: { eyebrow: "", title: "", subtitle: "", items: [] },
    successStories: { eyebrow: "", title: "", subtitle: "", stories: [], disclaimer: "" },
    insights: { eyebrow: "", title: "", subtitle: "", posts: [] },

    cta: {
      title: "",
      description: "",
      primaryLabel: "Book a consultation",
      primaryLink: "/contact",
      secondaryLabel: "",
      secondaryLink: "",
      note: "",
    },

    relatedItems: { eyebrow: "Often combined with", title: "Related", items: [] },

    faqs: {
      eyebrow: "FAQs",
      title: "Frequently asked questions",
      helpText: "Can't find your question?",
      helpLinkText: "Ask us directly",
      helpLinkHref: "/contact",
      items: [],
    },

    seo: { metaTitle: "", metaDescription: "", keywords: [], ogImage: "", canonicalUrl: "" },
  };
}

/* ---------- Step labels ---------- */

export function getStepLabel(type, key) {
  const labels = {
    basicInfo: "Basic Info",
    hero: "Hero",
    definition: "The Basics",
    challenges: "Challenges",
    sectorOverview: "Sector Overview",
    applicationLayer: "Application Layer",
    capabilities: "Capabilities",
    industryUseCases: "Industry Use Cases",
    outcomes: "Outcomes",
    pillars: "How We Help",
    taskBoard: "What's Included",
    consultingServices: "Consulting Services",
    appGrid: "App Grid",
    approach: "Approach",
    whoFor: "Who It's For",
    microsoftPlatforms: "Microsoft Platforms",
    whyUs: "Why Us",
    successStories: "Success Stories",
    insights: "Insights",
    relatedItems: "Related Items",
    faqs: "FAQs",
    cta: "Call to Action",
    seo: "SEO",
  };
  return labels[key] || key;
}

/* ==============================================================
 SECTION_FIELD_CONFIG — used by CardSectionStep for every
 "header + list of cards" section.

   arrayKey     : name of the array inside the section
                  (backend: items | metrics | tasks | steps | posts)
   fields       : per-card fields (in order)
   header       : which section-level fields to show
   note         : show section.note
   noteHighlight: show section.noteHighlight (challenges only)
   tagOptions   : if set, the card "tag" becomes a dropdown
   associated   : outcomes-only "business outcomes" block
================================================================ */

const HEADER = ["eyebrow", "title", "subtitle"];

export const SECTION_FIELD_CONFIG = {
  challenges: {
    arrayKey: "items",
    label: "Challenge",
    fields: ["title", "description"],
    header: HEADER,
    note: true,
    noteHighlight: true,
  },
  sectorOverview: {
    arrayKey: "items",
    label: "Sector",
    fields: ["title", "description"],
    header: HEADER,
    note: true,
  },
  applicationLayer: {
    arrayKey: "items",
    label: "Application",
    fields: ["tag", "title", "description"],
    header: HEADER,
  },
  capabilities: {
    arrayKey: "items",
    label: "Capability",
    fields: ["icon", "title", "description", "points"],
    header: HEADER,
    note: true,
  },
  industryUseCases: {
    arrayKey: "items",
    label: "Use Case",
    fields: ["title", "description"],
    header: HEADER,
  },
  outcomes: {
    arrayKey: "metrics",
    label: "Metric",
    fields: ["label", "value", "description"],
    header: HEADER,
    note: true,
    associated: true,
  },
  pillars: {
    arrayKey: "items",
    label: "Pillar",
    fields: ["icon", "title", "description", "points"],
    header: HEADER,
  },
  taskBoard: {
    arrayKey: "tasks",
    label: "Task",
    fields: ["tag", "title", "description"],
    header: HEADER,
    tagOptions: ["core", "industry", "challenge"], // backend enum
  },
  consultingServices: {
    arrayKey: "items",
    label: "Service",
    fields: ["tag", "title", "description"],
    header: HEADER,
    note: true,
  },
  appGrid: {
    arrayKey: "items",
    label: "Application",
    fields: ["tag", "title", "description"],
    header: HEADER,
    note: true,
  },
  approach: {
    arrayKey: "steps",
    label: "Step",
    fields: ["title", "description"],
    header: HEADER,
    note: true,
  },
  whyUs: {
    arrayKey: "items",
    label: "Reason",
    fields: ["icon", "title", "description", "points"],
    header: HEADER,
  },
  insights: {
    arrayKey: "posts",
    label: "Post",
    fields: ["tag", "meta", "title", "description", "link"],
    header: HEADER,
  },
  relatedItems: {
    arrayKey: "items",
    label: "Related Item",
    fields: ["icon", "title", "description", "link"],
    header: ["eyebrow", "title"], // backend relatedItems has no subtitle
  },
};

/* Industry challenges show an extra "outcome leaders ask for" line */
export function getSectionConfig(type, key) {
  const base = SECTION_FIELD_CONFIG[key];
  if (!base) return null;

  if (key === "challenges" && type === "industry") {
    return { ...base, fields: ["title", "description", "outcomeAsk"] };
  }

  return base;
}