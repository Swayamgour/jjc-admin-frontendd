import ContentPage from "../components/ui/ContentPage";
import {
  useGetServicesQuery,
  useCreateServiceMutation,
  useUpdateServiceMutation,
  useDeleteServiceMutation,
  useToggleServicePublishMutation,
} from "../features/services/servicesApi";

const FIELDS = [
  { key: "title", label: "Service Title", required: true, placeholder: "e.g. ERP, Finance & Operations" },
  { key: "shortDescription", label: "Short Description", type: "textarea", rows: 2, placeholder: "Max 300 chars — shown in mega menu", required: true },
  { key: "overview", label: "Overview", type: "textarea", rows: 4, placeholder: "Full intro paragraph for the service page", required: true },
  {
    key: "hero", label: "Hero Section", type: "grid",
    subFields: [
      { key: "heading", label: "Hero Heading", placeholder: "e.g. ERP & Finance Operations Consulting" },
      { key: "subHeading", label: "Hero Sub-heading", placeholder: "One-line value statement" },
    ],
  },
  {
    key: "seo", label: "SEO", type: "grid",
    subFields: [
      { key: "metaTitle", label: "Meta Title", placeholder: "JJC Systems | Service Name" },
      { key: "metaDescription", label: "Meta Description (max 160)", placeholder: "Describe this page for Google…" },
    ],
  },
];

const EXTRA_COLS = [
  { key: "shortDescription", label: "Description",
    render: (row) => <span style={{ color: "var(--text-muted)", fontSize: 12 }}>{row.shortDescription?.slice(0, 80)}…</span> },
];

export default function ServicesPage() {
  return (
    <ContentPage
      title="Services"
      subtitle="13 business-outcome service pages"
      useList={useGetServicesQuery}
      useCreate={useCreateServiceMutation}
      useUpdate={useUpdateServiceMutation}
      useDelete={useDeleteServiceMutation}
      useToggle={useToggleServicePublishMutation}
      fields={FIELDS}
      columns={EXTRA_COLS}
    />
  );
}
