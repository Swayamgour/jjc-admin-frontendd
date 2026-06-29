import { useState } from "react";
import {
  PageHeader, Btn, Table, Modal, Field, Input, Textarea, Select,
  StatusBadge, SearchBar, ConfirmDialog, Toast, Badge, EmptyState,
} from "../components/ui/UI";
import "../components/ui/UI.css";
import {
  useGetResourcesQuery,
  useCreateResourceMutation,
  useUpdateResourceMutation,
  useDeleteResourceMutation,
  useToggleResourcePublishMutation,
} from "../features/resources/resourcesApi";

const CATEGORIES = ["Blog", "Guide", "Checklist", "FAQ", "Resource", "Whitepaper"];
const TOPIC_CLUSTERS = ["microsoft-365", "azure", "sharepoint", "power-bi", "security", "dynamics-365", "power-platform", "teams", "general"];
const CAT_COLOR = { Blog: "blue", Guide: "green", Checklist: "yellow", FAQ: "purple", Resource: "default", Whitepaper: "red" };

const EMPTY_FORM = { title: "", category: "", topicCluster: "general", excerpt: "", content: "", tags: "" };

export default function ResourcesPage() {
  const [catFilter, setCatFilter] = useState("");
  const [search, setSearch] = useState("");
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [confirm, setConfirm] = useState(null);
  const [toast, setToast] = useState(null);

  const { data, isLoading } = useGetResourcesQuery({ category: catFilter || undefined, limit: 50 });
  const [create, { isLoading: creating }] = useCreateResourceMutation();
  const [update, { isLoading: updating }] = useUpdateResourceMutation();
  const [remove, { isLoading: removing }] = useDeleteResourceMutation();
  const [toggle] = useToggleResourcePublishMutation();

  const items = data?.data || [];
  const filtered = search ? items.filter((i) => i.title?.toLowerCase().includes(search.toLowerCase())) : items;

  const showToast = (msg, type = "success") => setToast({ message: msg, type });
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const openCreate = () => { setForm(EMPTY_FORM); setModal({ mode: "create" }); };
  const openEdit = (item) => { setForm({ ...item, tags: item.tags?.join(", ") || "" }); setModal({ mode: "edit", data: item }); };

  const handleSave = async () => {
    try {
      const payload = { ...form, tags: form.tags ? form.tags.split(",").map((t) => t.trim()) : [] };
      if (modal.mode === "create") { await create(payload).unwrap(); showToast("Resource created"); }
      else { await update({ slug: modal.data.slug, ...payload }).unwrap(); showToast("Updated"); }
      setModal(null);
    } catch (err) { showToast(err?.data?.message || "Error", "error"); }
  };

  const handleDelete = async () => {
    try { await remove(confirm.slug).unwrap(); showToast("Deleted"); setConfirm(null); }
    catch { showToast("Delete failed", "error"); }
  };

  const columns = [
    { key: "title", label: "Title",
      render: (row) => <div><div style={{ fontWeight: 500, color: "var(--text-primary)", fontSize: 13 }}>{row.title}</div><div className="slug">/{row.slug}</div></div> },
    { key: "category", label: "Category", style: { width: 100 },
      render: (row) => <Badge color={CAT_COLOR[row.category] || "default"}>{row.category}</Badge> },
    { key: "topicCluster", label: "Topic", style: { width: 120 },
      render: (row) => <span style={{ fontSize: 11, color: "var(--text-muted)" }}>{row.topicCluster}</span> },
    { key: "status", label: "Status", style: { width: 90 },
      render: (row) => <StatusBadge published={row.isPublished} /> },
    { key: "actions", label: "", style: { width: 160 },
      render: (row) => (
        <div className="actions">
          <Btn size="sm" variant="ghost" onClick={() => openEdit(row)}>Edit</Btn>
          <Btn size="sm" variant={row.isPublished ? "secondary" : "success"} onClick={() => toggle(row.slug)}>{row.isPublished ? "Unpublish" : "Publish"}</Btn>
          <Btn size="sm" variant="danger" onClick={() => setConfirm({ slug: row.slug, title: row.title })}>Del</Btn>
        </div>
      )},
  ];

  return (
    <div>
      <PageHeader title="Blog & Resources" subtitle="Blog posts, guides, checklists, FAQs"
        action={<Btn variant="primary" onClick={openCreate} icon={<PlusIcon />}>Add Resource</Btn>} />

      <div className="filters">
        <SearchBar value={search} onChange={setSearch} placeholder="Search resources…" />
        <Select value={catFilter} onChange={(e) => setCatFilter(e.target.value)}>
          <option value="">All Categories</option>
          {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
        </Select>
        <span style={{ fontSize: 12, color: "var(--text-muted)", marginLeft: "auto" }}>{filtered.length} entries</span>
      </div>

      {!isLoading && filtered.length === 0
        ? <EmptyState title="No resources yet" action={<Btn variant="primary" onClick={openCreate}>Add First Resource</Btn>} />
        : <Table columns={columns} data={filtered} loading={isLoading} />
      }

      <Modal open={!!modal} onClose={() => setModal(null)}
        title={modal?.mode === "create" ? "New Resource" : `Edit: ${modal?.data?.title}`} width={640}>
        <div className="grid-2">
          <Field label="Title" required><Input value={form.title} onChange={(e) => set("title", e.target.value)} placeholder="Resource title" /></Field>
          <Field label="Category" required>
            <Select value={form.category} onChange={(e) => set("category", e.target.value)}>
              <option value="">Select…</option>
              {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </Select>
          </Field>
        </div>
        <Field label="Topic Cluster">
          <Select value={form.topicCluster} onChange={(e) => set("topicCluster", e.target.value)}>
            {TOPIC_CLUSTERS.map((t) => <option key={t} value={t}>{t}</option>)}
          </Select>
        </Field>
        <Field label="Excerpt" hint="Shown in listing pages (max 400 chars)">
          <Textarea value={form.excerpt} onChange={(e) => set("excerpt", e.target.value)} rows={2} placeholder="Brief description…" />
        </Field>
        <Field label="Content" required hint="Main body — supports markdown">
          <Textarea value={form.content} onChange={(e) => set("content", e.target.value)} rows={8} placeholder="Write your content here…" />
        </Field>
        <Field label="Tags" hint="Comma separated: azure, m365, security">
          <Input value={form.tags} onChange={(e) => set("tags", e.target.value)} placeholder="azure, m365, consulting" />
        </Field>
        <div style={{ display: "flex", justifyContent: "flex-end", gap: 8, marginTop: 16 }}>
          <Btn variant="ghost" onClick={() => setModal(null)}>Cancel</Btn>
          <Btn variant="primary" onClick={handleSave} loading={creating || updating}>
            {modal?.mode === "create" ? "Create" : "Save"}
          </Btn>
        </div>
      </Modal>

      <ConfirmDialog open={!!confirm} onClose={() => setConfirm(null)} onConfirm={handleDelete}
        loading={removing} title="Delete Resource"
        message={`Delete "${confirm?.title}"? This cannot be undone.`} />

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
}

const PlusIcon = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>;
