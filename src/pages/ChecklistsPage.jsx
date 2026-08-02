import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  PageHeader, Btn, Table, ConfirmDialog, Toast, EmptyState,
  SearchBar, Badge, StatusBadge,
} from "../components/ui/UI";
import {
  useGetChecklistsQuery,
  useDeleteChecklistMutation,
  useUpdateChecklistMutation,
} from "../features/checklists/checklistApi";

export default function ChecklistsPage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [confirm, setConfirm] = useState(null);
  const [toast, setToast] = useState(null);

  const { data, isLoading } = useGetChecklistsQuery({});
  const [remove, { isLoading: removing }] = useDeleteChecklistMutation();
  const [update] = useUpdateChecklistMutation();

  const items = (data?.data || []).filter((c) =>
    c.title?.toLowerCase().includes(search.toLowerCase())
  );

  const showToast = (message, type = "success") => setToast({ message, type });

  const handleDelete = async () => {
    try {
      await remove(confirm._id).unwrap();
      showToast("Checklist deleted");
      setConfirm(null);
    } catch (err) {
      showToast(err?.data?.message || "Delete failed", "error");
    }
  };

  const handleTogglePublish = async (row) => {
    try {
      await update({ id: row._id, isPublished: !row.isPublished }).unwrap();
      showToast(row.isPublished ? "Checklist unpublished" : "Checklist published");
    } catch (err) {
      showToast(err?.data?.message || "Update failed", "error");
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
      key: "platform", label: "Platform", style: { width: 160 },
      render: (row) => <span style={{ fontSize: 12, color: "var(--text-muted)" }}>{row.platform}</span>,
    },
    {
      key: "industry", label: "Industry", style: { width: 150 },
      render: (row) => <span style={{ fontSize: 12, color: "var(--text-muted)" }}>{row.industry}</span>,
    },
    {
      key: "badge", label: "Badge", style: { width: 110 },
      render: (row) => <Badge>{row.badge}</Badge>,
    },
    {
      key: "totalChecks", label: "Checks", style: { width: 80 },
      render: (row) => <span style={{ fontSize: 12 }}>{row.totalChecks ?? 0}</span>,
    },
    {
      key: "status", label: "Status", style: { width: 100 },
      render: (row) => <StatusBadge published={row.isPublished} />,
    },
    {
      key: "actions", label: "", style: { width: 190 },
      render: (row) => (
        <div className="actions">
          <Btn size="sm" variant="ghost" onClick={() => navigate(`/checklists/edit/${row._id}`)}>Edit</Btn>
          <Btn size="sm" variant={row.isPublished ? "secondary" : "success"} onClick={() => handleTogglePublish(row)}>
            {row.isPublished ? "Unpublish" : "Publish"}
          </Btn>
          <Btn size="sm" variant="danger" onClick={() => setConfirm(row)}>Del</Btn>
        </div>
      ),
    },
  ];

  return (
    <div>
      <PageHeader
        title="Checklists"
        subtitle="Interactive readiness, audit and compliance checklists"
        action={<Btn variant="primary" onClick={() => navigate("/checklists/new")} icon={<PlusIcon />}>Add Checklist</Btn>}
      />

      <div className="filters">
        <SearchBar value={search} onChange={setSearch} placeholder="Search checklists…" />
        <span style={{ fontSize: 12, color: "var(--text-muted)", marginLeft: "auto" }}>{items.length} entries</span>
      </div>

      {!isLoading && items.length === 0 ? (
        <EmptyState
          title="No checklists yet"
          description="Add your first checklist to get started."
          action={<Btn variant="primary" onClick={() => navigate("/checklists/new")}>Add First Checklist</Btn>}
        />
      ) : (
        <Table columns={columns} data={items} loading={isLoading} />
      )}

      <ConfirmDialog
        open={!!confirm} onClose={() => setConfirm(null)} onConfirm={handleDelete}
        loading={removing} title="Delete Checklist" message={`Delete "${confirm?.title}"? This cannot be undone.`}
      />

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
}

const PlusIcon = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>;
