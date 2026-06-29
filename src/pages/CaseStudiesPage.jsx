import { useState } from "react";
import {
  PageHeader, Btn, Table, Modal, Field, Input, Textarea,
  StatusBadge, SearchBar, ConfirmDialog, Toast, Badge, EmptyState,
} from "../components/ui/UI";
import "../components/ui/UI.css";
import {
  useGetCaseStudiesQuery, useCreateCaseStudyMutation,
  useUpdateCaseStudyMutation, useDeleteCaseStudyMutation,
  useToggleCaseStudyPublishMutation,
} from "../features/caseStudies/caseStudiesApi";

const EMPTY = { title: "", clientName: "", industry: "", challenge: "", solution: "", technologies: "", testimonialQuote: "", testimonialPerson: "" };

export default function CaseStudiesPage() {
  const [search, setSearch] = useState("");
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState(EMPTY);
  const [confirm, setConfirm] = useState(null);
  const [toast, setToast] = useState(null);

  const { data, isLoading } = useGetCaseStudiesQuery();
  const [create, { isLoading: creating }] = useCreateCaseStudyMutation();
  const [update, { isLoading: updating }] = useUpdateCaseStudyMutation();
  const [remove, { isLoading: removing }] = useDeleteCaseStudyMutation();
  const [toggle] = useToggleCaseStudyPublishMutation();

  const items = data?.data || [];
  const filtered = search ? items.filter((i) => i.title?.toLowerCase().includes(search.toLowerCase()) || i.clientName?.toLowerCase().includes(search.toLowerCase())) : items;

  const showToast = (msg, t = "success") => setToast({ message: msg, type: t });
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const openCreate = () => { setForm(EMPTY); setModal({ mode: "create" }); };
  const openEdit = (item) => { setForm({ ...item, technologies: item.technologies?.join(", ") || "" }); setModal({ mode: "edit", data: item }); };

  const handleSave = async () => {
    try {
      const payload = { ...form, technologies: form.technologies ? form.technologies.split(",").map((t) => t.trim()) : [] };
      if (modal.mode === "create") { await create(payload).unwrap(); showToast("Case study created"); }
      else { await update({ slug: modal.data.slug, ...payload }).unwrap(); showToast("Updated"); }
      setModal(null);
    } catch (err) { showToast(err?.data?.message || "Error", "error"); }
  };

  const handleDelete = async () => {
    try { await remove(confirm.slug).unwrap(); showToast("Deleted"); setConfirm(null); }
    catch { showToast("Delete failed", "error"); }
  };

  const columns = [
    {
      key: "title", label: "Title",
      render: (row) => <div><div style={{ fontWeight: 500, color: "var(--text-primary)", fontSize: 13 }}>{row.title}</div><div className="slug">/{row.slug}</div></div>
    },
    {
      key: "clientName", label: "Client", style: { width: 130 },
      render: (row) => <span style={{ fontSize: 13, color: "var(--text-secondary)" }}>{row.clientName}</span>
    },
    {
      key: "industry", label: "Industry", style: { width: 120 },
      render: (row) => <Badge color="purple">{row.industry?.title || row.industry || "—"}</Badge>
    },
    { key: "status", label: "Status", style: { width: 90 }, render: (row) => <StatusBadge published={row.isPublished} /> },
    {
      key: "actions", label: "", style: { width: 160 },
      render: (row) => (
        <div className="actions">
          <Btn size="sm" variant="ghost" onClick={() => openEdit(row)}>Edit</Btn>
          <Btn size="sm" variant={row.isPublished ? "secondary" : "success"} onClick={() => toggle(row._id)}>{row.isPublished ? "Unpublish" : "Publish"}</Btn>
          <Btn size="sm" variant="danger" onClick={() => setConfirm({ slug: row.slug, title: row.title })}>Del</Btn>
        </div>
      )
    },
  ];

  return (
    <div>
      <PageHeader title="Case Studies" subtitle="Real client results — approved evidence only"
        action={<Btn variant="primary" onClick={openCreate} icon={<PlusIcon />}>Add Case Study</Btn>} />

      <div className="filters" style={{ marginBottom: 12 }}>
        <div style={{ background: "var(--yellow-muted)", border: "1px solid rgba(245,158,11,.2)", borderRadius: "var(--radius-sm)", padding: "7px 12px", fontSize: 12, color: "var(--yellow)", display: "flex", alignItems: "center", gap: 6 }}>
          <span>⚠</span> Blueprint rule: Only publish case studies with client approval and real, supportable evidence.
        </div>
      </div>

      <div className="filters">
        <SearchBar value={search} onChange={setSearch} placeholder="Search by title or client…" />
        <span style={{ fontSize: 12, color: "var(--text-muted)", marginLeft: "auto" }}>{filtered.length} entries</span>
      </div>

      {!isLoading && filtered.length === 0
        ? <EmptyState title="No case studies yet" description="Add client case studies with real, approved results." action={<Btn variant="primary" onClick={openCreate}>Add First Case Study</Btn>} />
        : <Table columns={columns} data={filtered} loading={isLoading} />
      }

      <Modal open={!!modal} onClose={() => setModal(null)}
        title={modal?.mode === "create" ? "New Case Study" : `Edit: ${modal?.data?.title}`} width={660}>
        <div className="grid-2">
          <Field label="Case Study Title" required><Input value={form.title} onChange={(e) => set("title", e.target.value)} placeholder="Client: Problem Solved" /></Field>
          <Field label="Client Name" required><Input value={form.clientName} onChange={(e) => set("clientName", e.target.value)} placeholder="Company Name" /></Field>
        </div>
        <Field label="Industry" hint="e.g. Manufacturing, Healthcare">
          <Input value={form.industry} onChange={(e) => set("industry", e.target.value)} placeholder="Healthcare" />
        </Field>
        <Field label="Challenge" required>
          <Textarea value={form.challenge} onChange={(e) => set("challenge", e.target.value)} rows={3} placeholder="What problem did the client face?" />
        </Field>
        <Field label="Solution" required>
          <Textarea value={form.solution} onChange={(e) => set("solution", e.target.value)} rows={3} placeholder="What did JJC Systems implement?" />
        </Field>
        <Field label="Technologies Used" hint="Comma separated: Dynamics 365, Power BI, SharePoint">
          <Input value={form.technologies} onChange={(e) => set("technologies", e.target.value)} placeholder="Microsoft 365, Dynamics 365, Power BI" />
        </Field>
        <div className="grid-2">
          <Field label="Testimonial Quote"><Textarea value={form.testimonialQuote} onChange={(e) => set("testimonialQuote", e.target.value)} rows={2} placeholder="Client quote…" /></Field>
          <Field label="Quote Attribution"><Input value={form.testimonialPerson} onChange={(e) => set("testimonialPerson", e.target.value)} placeholder="Name, Title @ Company" /></Field>
        </div>
        <div style={{ display: "flex", justifyContent: "flex-end", gap: 8, marginTop: 16 }}>
          <Btn variant="ghost" onClick={() => setModal(null)}>Cancel</Btn>
          <Btn variant="primary" onClick={handleSave} loading={creating || updating}>
            {modal?.mode === "create" ? "Create" : "Save"}
          </Btn>
        </div>
      </Modal>

      <ConfirmDialog open={!!confirm} onClose={() => setConfirm(null)} onConfirm={handleDelete}
        loading={removing} title="Delete Case Study" message={`Delete "${confirm?.title}"?`} />

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
}

const PlusIcon = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>;
