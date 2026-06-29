import ContentPage from "../components/ui/ContentPage";
import { useGetSolutionsQuery, useCreateSolutionMutation, useUpdateSolutionMutation, useDeleteSolutionMutation, useToggleSolutionPublishMutation } from "../features/solutions/solutionsApi";

const FIELDS = [
  { key: "title", label: "Solution Title", required: true, placeholder: "e.g. Modern Work" },
  { key: "shortDescription", label: "Short Description", type: "textarea", rows: 2 },
  { key: "urlPath", label: "URL Path", placeholder: "/solutions/modern-work/" },
  { key: "seo", label: "SEO", type: "grid", subFields: [
    { key: "metaTitle", label: "Meta Title" },
    { key: "metaDescription", label: "Meta Description" },
  ]},
];

export default function SolutionsPage() {
  return <ContentPage title="Solutions" subtitle="13 outcome-based solution pages" useList={useGetSolutionsQuery} useCreate={useCreateSolutionMutation} useUpdate={useUpdateSolutionMutation} useDelete={useDeleteSolutionMutation} useToggle={useToggleSolutionPublishMutation} fields={FIELDS} />;
}
