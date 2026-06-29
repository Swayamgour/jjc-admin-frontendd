import { useState } from "react";
import { PageHeader, Btn, Table, Modal, Field, Input, Textarea, Select, Badge, SearchBar, ConfirmDialog, Toast, EmptyState } from "../components/ui/UI";
import "../components/ui/UI.css";
import { useGetFAQsQuery, useCreateFAQMutation, useUpdateFAQMutation, useDeleteFAQMutation } from "../features/faq/faqApi";

const CATS = ["General","Microsoft365","Azure","Dynamics365","PowerPlatform","SharePoint","Security","Pricing","Process"];
const EMPTY = { question: "", answer: "", category: "General" };

export default function FAQsPage() {
  const [catFilter, setCatFilter] = useState("");
  const [search, setSearch] = useState("");
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState(EMPTY);
  const [confirm, setConfirm] = useState(null);
  const [toast, setToast] = useState(null);

  const { data, isLoading } = useGetFAQsQuery({ category: catFilter || undefined });
  const [create, { isLoading: creating }] = useCreateFAQMutation();
  const [update, { isLoading: updating }] = useUpdateFAQMutation();
  const [remove, { isLoading: removing }] = useDeleteFAQMutation();

  const items = data?.data || [];
  const filtered = search ? items.filter(i => i.question?.toLowerCase().includes(search.toLowerCase())) : items;
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const showToast = (msg, t="success") => setToast({ message: msg, type: t });

  const openCreate = () => { setForm(EMPTY); setModal({ mode: "create" }); };
  const openEdit = (item) => { setForm({ ...item }); setModal({ mode: "edit", data: item }); };

  const handleSave = async () => {
    try {
      if (modal.mode === "create") { await create(form).unwrap(); showToast("FAQ created"); }
      else { await update({ id: modal.data._id, ...form }).unwrap(); showToast("Updated"); }
      setModal(null);
    } catch (err) { showToast(err?.data?.message || "Error", "error"); }
  };

  const handleDelete = async () => {
    try { await remove(confirm.id).unwrap(); showToast("Deleted"); setConfirm(null); }
    catch { showToast("Delete failed", "error"); }
  };

  const columns = [
    { key: "question", label: "Question", render: (row) => <div style={{ fontWeight: 500, fontSize: 13, color: "var(--text-primary)" }}>{row.question}</div> },
    { key: "category", label: "Category", style: { width: 130 }, render: (row) => <Badge color="blue">{row.category}</Badge> },
    { key: "actions", label: "", style: { width: 120 }, render: (row) => (
      <div className="actions">
        <Btn size="sm" variant="ghost" onClick={() => openEdit(row)}>Edit</Btn>
        <Btn size="sm" variant="danger" onClick={() => setConfirm({ id: row._id, title: row.question })}>Del</Btn>
      </div>
    )},
  ];

  return (
    <div>
      <PageHeader title="FAQs" subtitle="Global FAQs by category — shown on /insights/faqs/"
        action={<Btn variant="primary" onClick={openCreate}>Add FAQ</Btn>} />
      <div className="filters">
        <SearchBar value={search} onChange={setSearch} placeholder="Search questions…" />
        <Select value={catFilter} onChange={e => setCatFilter(e.target.value)}>
          <option value="">All Categories</option>
          {CATS.map(c => <option key={c} value={c}>{c}</option>)}
        </Select>
      </div>
      {!isLoading && filtered.length === 0 ? <EmptyState title="No FAQs yet" action={<Btn variant="primary" onClick={openCreate}>Add First FAQ</Btn>} /> : <Table columns={columns} data={filtered} loading={isLoading} />}
      <Modal open={!!modal} onClose={() => setModal(null)} title={modal?.mode === "create" ? "New FAQ" : "Edit FAQ"} width={580}>
        <Field label="Category">
          <Select value={form.category} onChange={e => set("category", e.target.value)}>
            {CATS.map(c => <option key={c} value={c}>{c}</option>)}
          </Select>
        </Field>
        <Field label="Question" required><Input value={form.question} onChange={e => set("question", e.target.value)} placeholder="Enter the question…" /></Field>
        <Field label="Answer" required><Textarea value={form.answer} onChange={e => set("answer", e.target.value)} rows={5} placeholder="Write a clear, helpful answer…" /></Field>
        <div style={{ display: "flex", justifyContent: "flex-end", gap: 8, marginTop: 16 }}>
          <Btn variant="ghost" onClick={() => setModal(null)}>Cancel</Btn>
          <Btn variant="primary" onClick={handleSave} loading={creating || updating}>{modal?.mode === "create" ? "Create" : "Save"}</Btn>
        </div>
      </Modal>
      <ConfirmDialog open={!!confirm} onClose={() => setConfirm(null)} onConfirm={handleDelete} loading={removing} title="Delete FAQ" message={`Delete this FAQ?`} />
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
}
