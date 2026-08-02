import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  PageHeader, Btn, Table, ConfirmDialog, Toast, EmptyState,
  SearchBar, Badge, StatusBadge,
} from "../components/ui/UI";
import {
  useGetBlogsQuery,
  useDeleteBlogMutation,
  useUpdateBlogMutation,
} from "../features/blogs/blogApi";

export default function BlogsPage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [confirm, setConfirm] = useState(null);
  const [toast, setToast] = useState(null);

  const { data, isLoading } = useGetBlogsQuery({});
  const [remove, { isLoading: removing }] = useDeleteBlogMutation();
  const [update] = useUpdateBlogMutation();

  const items = (data?.data || []).filter((p) =>
    p.title?.toLowerCase().includes(search.toLowerCase())
  );

  const showToast = (message, type = "success") => setToast({ message, type });

  const handleDelete = async () => {
    try {
      await remove(confirm._id).unwrap();
      showToast("Blog post deleted");
      setConfirm(null);
    } catch (err) {
      showToast(err?.data?.message || "Delete failed", "error");
    }
  };

  const handleTogglePublish = async (row) => {
    try {
      await update({ id: row._id, isPublished: !row.isPublished }).unwrap();
      showToast(row.isPublished ? "Post unpublished" : "Post published");
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
      key: "type", label: "Type", style: { width: 130 },
      render: (row) => <Badge>{row.type}</Badge>,
    },
    {
      key: "status", label: "Status", style: { width: 100 },
      render: (row) => <StatusBadge published={row.isPublished} />,
    },
    {
      key: "actions", label: "", style: { width: 190 },
      render: (row) => (
        <div className="actions">
          <Btn size="sm" variant="ghost" onClick={() => navigate(`/blog/edit/${row._id}`)}>Edit</Btn>
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
        title="Blog"
        subtitle="Insights and articles"
        action={<Btn variant="primary" onClick={() => navigate("/blog/new")} icon={<PlusIcon />}>Add Post</Btn>}
      />

      <div className="filters">
        <SearchBar value={search} onChange={setSearch} placeholder="Search posts…" />
        <span style={{ fontSize: 12, color: "var(--text-muted)", marginLeft: "auto" }}>{items.length} entries</span>
      </div>

      {!isLoading && items.length === 0 ? (
        <EmptyState
          title="No blog posts yet"
          description="Add your first post to get started."
          action={<Btn variant="primary" onClick={() => navigate("/blog/new")}>Add First Post</Btn>}
        />
      ) : (
        <Table columns={columns} data={items} loading={isLoading} />
      )}

      <ConfirmDialog
        open={!!confirm} onClose={() => setConfirm(null)} onConfirm={handleDelete}
        loading={removing} title="Delete Blog Post" message={`Delete "${confirm?.title}"? This cannot be undone.`}
      />

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
}

const PlusIcon = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>;
