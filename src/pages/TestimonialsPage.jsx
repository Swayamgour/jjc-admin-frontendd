import { useState } from "react";
import { PageHeader, Btn, Table, Modal, Field, Input, Textarea, Select, Badge, SearchBar, ConfirmDialog, Toast, EmptyState } from "../components/ui/UI";
import "../components/ui/UI.css";
import { useGetTestimonialsQuery, useCreateTestimonialMutation, useUpdateTestimonialMutation, useDeleteTestimonialMutation } from "../features/testimonials/testimonialsApi";

const EMPTY = { name: "", role: "", company: "", quote: "", rating: "5", industry: "" };

export default function TestimonialsPage() {
  const [search, setSearch] = useState("");
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState(EMPTY);
  const [confirm, setConfirm] = useState(null);
  const [toast, setToast] = useState(null);

  const { data, isLoading } = useGetTestimonialsQuery();
  const [create, { isLoading: creating }] = useCreateTestimonialMutation();
  const [update, { isLoading: updating }] = useUpdateTestimonialMutation();
  const [remove, { isLoading: removing }] = useDeleteTestimonialMutation();

  const items = data?.data || [];
  const filtered = search ? items.filter(i => `${i.name} ${i.company}`.toLowerCase().includes(search.toLowerCase())) : items;
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const showToast = (msg, t="success") => setToast({ message: msg, type: t });

  const openCreate = () => { setForm(EMPTY); setModal({ mode: "create" }); };
  const openEdit = (item) => { setForm({ ...item }); setModal({ mode: "edit", data: item }); };

  const handleSave = async () => {
    try {
      const payload = { ...form, rating: Number(form.rating) };
      if (modal.mode === "create") { await create(payload).unwrap(); showToast("Testimonial created"); }
      else { await update({ id: modal.data._id, ...payload }).unwrap(); showToast("Updated"); }
      setModal(null);
    } catch (err) { showToast(err?.data?.message || "Error", "error"); }
  };

  const handleDelete = async () => {
    try { await remove(confirm.id).unwrap(); showToast("Deleted"); setConfirm(null); }
    catch { showToast("Delete failed", "error"); }
  };

  const stars = (n) => "★".repeat(n) + "☆".repeat(5 - n);

  const columns = [
    { key: "name", label: "Client", render: (row) => (
      <div>
        <div style={{ fontWeight: 500, fontSize: 13, color: "var(--text-primary)" }}>{row.name}</div>
        <div style={{ fontSize: 11, color: "var(--text-muted)" }}>{row.role} {row.company ? `@ ${row.company}` : ""}</div>
      </div>
    )},
    { key: "quote", label: "Quote", render: (row) => <span style={{ fontSize: 12, color: "var(--text-secondary)" }}>"{row.quote?.slice(0, 80)}…"</span> },
    { key: "rating", label: "Rating", style: { width: 100 }, render: (row) => <span style={{ color: "var(--yellow)", fontSize: 12 }}>{stars(row.rating || 5)}</span> },
    { key: "approved", label: "Approved", style: { width: 90 }, render: (row) => <Badge color={row.isApproved ? "green" : "yellow"}>{row.isApproved ? "Yes" : "Pending"}</Badge> },
    { key: "actions", label: "", style: { width: 120 }, render: (row) => (
      <div className="actions">
        <Btn size="sm" variant="ghost" onClick={() => openEdit(row)}>Edit</Btn>
        <Btn size="sm" variant="danger" onClick={() => setConfirm({ id: row._id, title: row.name })}>Del</Btn>
      </div>
    )},
  ];

  return (
    <div>
      <PageHeader title="Testimonials" subtitle="Client quotes and social proof"
        action={<Btn variant="primary" onClick={openCreate}>Add Testimonial</Btn>} />
      <div className="filters"><SearchBar value={search} onChange={setSearch} placeholder="Search by name or company…" /></div>
      {!isLoading && filtered.length === 0 ? <EmptyState title="No testimonials yet" action={<Btn variant="primary" onClick={openCreate}>Add First Testimonial</Btn>} /> : <Table columns={columns} data={filtered} loading={isLoading} />}
      <Modal open={!!modal} onClose={() => setModal(null)} title={modal?.mode === "create" ? "New Testimonial" : "Edit Testimonial"} width={560}>
        <div className="grid-2">
          <Field label="Client Name" required><Input value={form.name} onChange={e => set("name", e.target.value)} placeholder="Jane Smith" /></Field>
          <Field label="Company"><Input value={form.company} onChange={e => set("company", e.target.value)} placeholder="Acme Corp" /></Field>
          <Field label="Job Title"><Input value={form.role} onChange={e => set("role", e.target.value)} placeholder="IT Director" /></Field>
          <Field label="Rating">
            <Select value={form.rating} onChange={e => set("rating", e.target.value)}>
              {[5,4,3,2,1].map(n => <option key={n} value={n}>{n} Stars</option>)}
            </Select>
          </Field>
        </div>
        <Field label="Quote" required><Textarea value={form.quote} onChange={e => set("quote", e.target.value)} rows={4} placeholder="What did the client say?" /></Field>
        <div style={{ display: "flex", justifyContent: "flex-end", gap: 8, marginTop: 16 }}>
          <Btn variant="ghost" onClick={() => setModal(null)}>Cancel</Btn>
          <Btn variant="primary" onClick={handleSave} loading={creating || updating}>{modal?.mode === "create" ? "Create" : "Save"}</Btn>
        </div>
      </Modal>
      <ConfirmDialog open={!!confirm} onClose={() => setConfirm(null)} onConfirm={handleDelete} loading={removing} title="Delete Testimonial" message={`Delete testimonial from "${confirm?.title}"?`} />
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
}
