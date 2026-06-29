import ContentPage from "../components/ui/ContentPage";
import { useGetIndustriesQuery, useCreateIndustryMutation, useUpdateIndustryMutation, useDeleteIndustryMutation, useToggleIndustryPublishMutation } from "../features/industries/industriesApi";

const FIELDS = [
  { key: "title", label: "Industry Title", required: true, placeholder: "e.g. Manufacturing" },
  { key: "overview", label: "Overview", type: "textarea", rows: 3, required: true },
  { key: "urlPath", label: "URL Path", placeholder: "/industries/manufacturing/" },
  {
    key: "seo", label: "SEO", type: "grid", subFields: [
      { key: "metaTitle", label: "Meta Title" },
      { key: "metaDescription", label: "Meta Description" },
    ]
  },
];

export default function IndustriesPage() {
  return <ContentPage title="Industries" subtitle="9 industry-specific pages" useList={useGetIndustriesQuery} useCreate={useCreateIndustryMutation} useUpdate={useUpdateIndustryMutation} useDelete={useDeleteIndustryMutation} useToggle={useToggleIndustryPublishMutation} fields={FIELDS} />;
}
