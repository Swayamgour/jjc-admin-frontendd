// Single source of truth for the enums used across Guides, Checklists, and
// Whitepapers admin forms. These values MUST match the backend's
// utils/guideLabels.js, checklistLabels.js, whitepaperLabels.js exactly —
// the string saved here is what gets stored in `platform` / `service` /
// `industry` on the document.

export const PLATFORMS = [
  { value: "business-central", label: "Dynamics 365 Business Central" },
  { value: "d365-sales", label: "Dynamics 365 Sales" },
  { value: "azure", label: "Azure" },
  { value: "fabric", label: "Microsoft Fabric" },
  { value: "defender", label: "Microsoft Defender" },
  { value: "purview", label: "Microsoft Purview" },
  { value: "power-bi", label: "Power BI" },
  { value: "intune", label: "Microsoft Intune" },
  { value: "sharepoint", label: "SharePoint" },
];

export const SERVICES = [
  { value: "strategy-transformation", label: "Strategy & Transformation" },
  { value: "managed-it-security", label: "Managed IT & Security" },
  { value: "business-applications", label: "Business Applications" },
  { value: "data-ai-integration", label: "Data, AI & Integration" },
  { value: "modern-work-automation", label: "Modern Work & Automation" },
  { value: "talent", label: "Talent" },
];

export const INDUSTRIES = [
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

export const LEVELS = ["Foundation", "Intermediate", "Advanced"];

export const CHECKLIST_BADGES = ["Readiness", "Audit", "Compliance", "Health check", "Go-live"];

export const makeSlug = (text = "") =>
  text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
