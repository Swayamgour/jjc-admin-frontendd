import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  PageHeader, Btn, Table, ConfirmDialog, Toast, EmptyState,
  SearchBar, Badge,
} from "../components/ui/UI";
import "../components/ui/UI.css";
import {
  useGetCaseStudiesQuery,
  useDeleteCaseStudyMutation,
} from "../features/caseStudies/caseStudiesApi";

export default function CaseStudiesPage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [confirm, setConfirm] = useState(null);
  const [toast, setToast] = useState(null);

  const { data, isLoading } = useGetCaseStudiesQuery({});
  const [remove, { isLoading: removing }] = useDeleteCaseStudyMutation();

  const items = data?.data || [];
  const filtered = search
    ? items.filter((i) => i.name?.toLowerCase().includes(search.toLowerCase()))
    : items;

  const showToast = (message, type = "success") => setToast({ message, type });

  const handleDelete = async () => {
    try {
      await remove(confirm._id).unwrap();
      showToast("Case study deleted");
      setConfirm(null);
    } catch (err) {
      showToast(err?.data?.message || "Delete failed", "error");
    }
  };

  const columns = [
    {
      key: "name", label: "Name",
      render: (row) => (
        <div>
          <div style={{ fontWeight: 500, color: "var(--text-primary)", fontSize: 13 }}>{row.name}</div>
          <div className="slug">/{row.slug}</div>
        </div>
      ),
    },
    {
      key: "sourceType", label: "Type", style: { width: 100 },
      render: (row) => (
        <span style={{ fontSize: 12, color: "var(--text-muted)", textTransform: "capitalize" }}>
          {row.sourceType}
        </span>
      ),
    },
    {
      key: "parent", label: "Category", style: { width: 160 },
      render: (row) => (
        <span style={{ fontSize: 12, color: "var(--text-muted)" }}>
          {row.parent?.name || "—"}
        </span>
      ),
    },
    {
      key: "stories", label: "Stories", style: { width: 90 },
      render: (row) => (
        <span style={{ fontSize: 12, color: "var(--text-muted)" }}>
          {row.successStories?.stories?.length || 0}
        </span>
      ),
    },
    {
      key: "status", label: "Status", style: { width: 100 },
      render: (row) => <Badge color={row.status === "published" ? "green" : "yellow"}>{row.status}</Badge>,
    },
    {
      key: "actions", label: "", style: { width: 140 },
      render: (row) => (
        <div className="actions">
          <Btn size="sm" variant="ghost" onClick={() => navigate(`/case-studies/edit/${row.slug}`)}>Edit</Btn>
          <Btn size="sm" variant="danger" onClick={() => setConfirm(row)}>Del</Btn>
        </div>
      ),
    },
  ];

  return (
    <div>
      <PageHeader
        title="Case Studies"
        subtitle="Industry / Capability listing pages — hero, success stories, related capabilities"
        action={<Btn variant="primary" onClick={() => navigate("/case-studies/new")} icon={<PlusIcon />}>Add Case Study</Btn>}
      />

      <div className="filters">
        <SearchBar value={search} onChange={setSearch} placeholder="Search case studies…" />
        <span style={{ fontSize: 12, color: "var(--text-muted)", marginLeft: "auto" }}>{filtered.length} entries</span>
      </div>

      {!isLoading && filtered.length === 0 ? (
        <EmptyState
          title="No case studies yet"
          description="Add your first industry or capability case study page."
          action={<Btn variant="primary" onClick={() => navigate("/case-studies/new")}>Add First Case Study</Btn>}
        />
      ) : (
        <Table columns={columns} data={filtered} loading={isLoading} />
      )}

      <ConfirmDialog
        open={!!confirm} onClose={() => setConfirm(null)} onConfirm={handleDelete}
        loading={removing} title="Delete Case Study" message={`Delete "${confirm?.name}"? This cannot be undone.`}
      />

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
}

const PlusIcon = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>;
