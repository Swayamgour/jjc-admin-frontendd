import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  PageHeader, Btn, Table, ConfirmDialog, Toast, EmptyState,
  SearchBar, Badge,
} from "../components/ui/UI";
import "../components/ui/UI.css";
import {
  useGetCaseStudyStoriesQuery,
  useDeleteCaseStudyStoryMutation,
} from "../features/caseStudies/caseStudyStoriesApi";

export default function CaseStudyStoriesPage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [confirm, setConfirm] = useState(null);
  const [toast, setToast] = useState(null);

  const { data, isLoading } = useGetCaseStudyStoriesQuery({ search });
  const [remove, { isLoading: removing }] = useDeleteCaseStudyStoryMutation();

  const items = data?.data || [];

  const showToast = (message, type = "success") => setToast({ message, type });

  const handleDelete = async () => {
    try {
      await remove(confirm._id).unwrap();
      showToast("Story deleted");
      setConfirm(null);
    } catch (err) {
      showToast(err?.data?.message || "Delete failed", "error");
    }
  };

  const columns = [
    {
      key: "title", label: "Title",
      render: (row) => (
        <div>
          <div style={{ fontWeight: 500, color: "var(--text-primary)", fontSize: 13 }}>{row.title}</div>
          <div className="slug">/{row.slug}</div>
        </div>
      ),
    },
    {
      key: "organization", label: "Organization", style: { width: 180 },
      render: (row) => <span style={{ fontSize: 12, color: "var(--text-muted)" }}>{row.organization || "—"}</span>,
    },
    {
      key: "parentCategory", label: "Category", style: { width: 160 },
      render: (row) => <span style={{ fontSize: 12, color: "var(--text-muted)" }}>{row.parentCategory?.name || "—"}</span>,
    },
    {
      key: "status", label: "Status", style: { width: 100 },
      render: (row) => <Badge color={row.status === "published" ? "green" : "yellow"}>{row.status}</Badge>,
    },
    {
      key: "actions", label: "", style: { width: 140 },
      render: (row) => (
        <div className="actions">
          <Btn size="sm" variant="ghost" onClick={() => navigate(`/case-study-stories/edit/${row.slug}`)}>Edit</Btn>
          <Btn size="sm" variant="danger" onClick={() => setConfirm(row)}>Del</Btn>
        </div>
      ),
    },
  ];

  return (
    <div>
      <PageHeader
        title="Case Study Stories"
        subtitle="Full narrative case study pages — hero, situation, approach, results, and more"
        action={<Btn variant="primary" onClick={() => navigate("/case-study-stories/new")} icon={<PlusIcon />}>Add Story</Btn>}
      />

      <div className="filters">
        <SearchBar value={search} onChange={setSearch} placeholder="Search stories…" />
        <span style={{ fontSize: 12, color: "var(--text-muted)", marginLeft: "auto" }}>{items.length} entries</span>
      </div>

      {!isLoading && items.length === 0 ? (
        <EmptyState
          title="No stories yet"
          description="Add your first case study story to get started."
          action={<Btn variant="primary" onClick={() => navigate("/case-study-stories/new")}>Add First Story</Btn>}
        />
      ) : (
        <Table columns={columns} data={items} loading={isLoading} />
      )}

      <ConfirmDialog
        open={!!confirm} onClose={() => setConfirm(null)} onConfirm={handleDelete}
        loading={removing} title="Delete Story" message={`Delete "${confirm?.title}"? This cannot be undone.`}
      />

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
}

const PlusIcon = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>;
