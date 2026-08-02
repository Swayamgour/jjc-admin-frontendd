// Matches backend utils/blogLabels.js exactly. Blog's platform list differs
// slightly from Guides/Checklists/Whitepapers (it has a single "cybersecurity"
// platform instead of separate defender/purview), so this is kept separate
// from contentTaxonomy.js rather than shared.

export const BLOG_PLATFORMS = [
  { value: "business-central", label: "Dynamics 365 Business Central" },
  { value: "d365-sales", label: "Dynamics 365 Sales" },
  { value: "azure", label: "Azure" },
  { value: "cybersecurity", label: "Cybersecurity" },
  { value: "fabric", label: "Microsoft Fabric" },
  { value: "power-bi", label: "Power BI" },
  { value: "intune", label: "Intune" },
  { value: "sharepoint", label: "SharePoint" },
];

export const BLOG_SERVICES = [
  { value: "strategy-transformation", label: "Strategy & Transformation" },
  { value: "managed-it-security", label: "Managed IT & Security" },
  { value: "business-applications", label: "Business Applications" },
  { value: "data-ai-integration", label: "Data, AI & Integration" },
  { value: "modern-work-automation", label: "Modern Work & Automation" },
  { value: "talent", label: "Talent" },
];

export const BLOG_INDUSTRIES = [
  { value: "healthcare", label: "Healthcare" },
  { value: "legal", label: "Legal" },
  { value: "financial-services", label: "Financial Services" },
  { value: "public-sector", label: "Public Sector" },
  { value: "education", label: "Education" },
  { value: "manufacturing", label: "Manufacturing" },
  { value: "retail-distribution", label: "Retail & Distribution" },
  { value: "construction-field-services", label: "Construction & Field Services" },
  { value: "professional-services", label: "Professional Services" },
  { value: "small-mid-market", label: "Small & Mid-Market" },
  { value: "nonprofits-associations", label: "Nonprofits & Associations" },
];

export const BLOG_TYPES = [
  "Challenges",
  "Solutions",
  "How-to guide",
  "Best practices",
  "Market trends",
  "Features",
  "Future readiness",
];

export const BLOG_ICONS = ["erp", "docs", "chart", "grid", "device", "shield", "cloud", "sales"];

export const makeSlug = (text = "") =>
  text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
