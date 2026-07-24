import ContentPage from "../components/ui/ContentPage";
import {
  useGetCaseStudiesQuery,
  useCreateCaseStudyMutation,
  useUpdateCaseStudyMutation,
  useDeleteCaseStudyMutation,
  useToggleCaseStudyPublishMutation,
} from "../features/caseStudies/caseStudiesApi";

const EXTRA_COLS = [
  {
    key: "sourceType", label: "Type", style: { width: 100 },
    render: (row) => (
      <span style={{ fontSize: 12, color: "var(--text-muted)", textTransform: "capitalize" }}>
        {row.sourceType}
      </span>
    ),
  },
  {
    key: "parent", label: "Category", style: { width: 140 },
    render: (row) => (
      <span style={{ fontSize: 12, color: "var(--text-muted)" }}>
        {row.parent?.name || "—"}
      </span>
    ),
  },
  {
    key: "description", label: "Description",
    render: (row) => (
      <span style={{ color: "var(--text-muted)", fontSize: 12 }}>
        {row.description?.slice(0, 80)}…
      </span>
    ),
  },
];

export default function CaseStudiesPage() {
  return (
    <ContentPage
      title="Case Studies"
      subtitle="Real client results — approved evidence only"
      useList={useGetCaseStudiesQuery}
      useCreate={useCreateCaseStudyMutation}
      useUpdate={useUpdateCaseStudyMutation}
      useDelete={useDeleteCaseStudyMutation}
      useToggle={useToggleCaseStudyPublishMutation}
      columns={EXTRA_COLS}
      navigateToCreate="/case-studies/new"
      navigateToEdit="/case-studies/edit"
    />
  );
}
