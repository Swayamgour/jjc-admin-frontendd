// import ContentPage from "../components/ui/ContentPage";
// import { useGetPlatformsQuery, useCreatePlatformMutation, useUpdatePlatformMutation, useDeletePlatformMutation, useTogglePlatformPublishMutation } from "../features/platforms/platformsApi";
// import { Badge } from "../components/ui/UI";

// const CATEGORY_OPTIONS = [
//   { value: "Microsoft365", label: "Microsoft 365" },
//   { value: "Dynamics365", label: "Dynamics 365" },
//   { value: "Security", label: "Security" },
//   { value: "Azure", label: "Azure" },
//   { value: "PowerPlatform", label: "Power Platform" },
//   { value: "Teams", label: "Teams" },
// ];

// const FIELDS = [
//   { key: "title", label: "Platform Title", required: true, placeholder: "e.g. Microsoft 365 Consulting" },
//   { key: "category", label: "Category", type: "select", required: true, options: CATEGORY_OPTIONS },
//   { key: "shortDescription", label: "Short Description", type: "textarea", rows: 2, placeholder: "Max 300 chars" },
//   { key: "overview", label: "Overview", type: "textarea", rows: 4 },
//   { key: "urlPath", label: "URL Path", placeholder: "/microsoft-365-consulting/", hint: "Exact path from blueprint" },
//   { key: "seo", label: "SEO", type: "grid", subFields: [
//     { key: "metaTitle", label: "Meta Title", placeholder: "Microsoft 365 Consulting | JJC Systems" },
//     { key: "metaDescription", label: "Meta Description", placeholder: "Max 160 chars" },
//   ]},
// ];

// const categoryColor = { Microsoft365: "blue", Dynamics365: "purple", Security: "red", Azure: "blue", PowerPlatform: "green", Teams: "yellow" };

// const EXTRA_COLS = [
//   { key: "category", label: "Category", style: { width: 130 },
//     render: (row) => <Badge color={categoryColor[row.category]||"default"}>{row.category}</Badge> },
// ];

// export default function PlatformsPage() {
//   return <ContentPage title="Platforms" subtitle="14 Microsoft product pages" useList={useGetPlatformsQuery} useCreate={useCreatePlatformMutation} useUpdate={useUpdatePlatformMutation} useDelete={useDeletePlatformMutation} useToggle={useTogglePlatformPublishMutation} fields={FIELDS} columns={EXTRA_COLS} />;
// }

import ContentPage from "../components/ui/ContentPage";
import {
  useGetPlatformsQuery,
  useCreatePlatformMutation,
  useUpdatePlatformMutation,
  useDeletePlatformMutation,
  useTogglePlatformPublishMutation,
} from "../features/platforms/platformsApi";

const FIELDS = [
  {
    key: "title",
    label: "Platform Title",
    required: true,
  },
  {
    key: "shortDescription",
    label: "Short Description",
    type: "textarea",
    rows: 2,
  },
];

const EXTRA_COLS = [
  {
    key: "shortDescription",
    label: "Description",
    render: (row) => (
      <span style={{ color: "var(--text-muted)", fontSize: 12 }}>
        {row.shortDescription?.slice(0, 80)}...
      </span>
    ),
  },
  {
    key: "subCategoryName",
    label: "Sub Category",
  },
];

export default function PlatformsPage() {
  return (
    <ContentPage
      title="Platforms"
      subtitle="Microsoft platform pages"
      useList={useGetPlatformsQuery}
      useCreate={useCreatePlatformMutation}
      useUpdate={useUpdatePlatformMutation}
      useDelete={useDeletePlatformMutation}
      useToggle={useTogglePlatformPublishMutation}
      fields={FIELDS}
      columns={EXTRA_COLS}
      navigateToCreate="/platforms/new"
      navigateToEdit="/platforms/edit"
    />
  );
}
