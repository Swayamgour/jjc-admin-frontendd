import { useState } from "react";
import {
  PageHeader, Btn, Table, Modal, Field, Input, Select,
  SearchBar, ConfirmDialog, Toast, EmptyState, Badge,
} from "../components/ui/UI";
import "../components/ui/UI.css";
import {
  useGetCaseStudyCategoriesQuery,
  useCreateCaseStudyCategoryMutation,
  useUpdateCaseStudyCategoryMutation,
  useDeleteCaseStudyCategoryMutation,
} from "../features/caseStudies/caseStudyCategoriesApi";

const EMPTY = {
  name: "",
  type: "industry",
  icon: "",
  theme: {
    accent: "#2563eb",
    accentDark: "#1d4ed8",
    accentLight: "#60a5fa",
    accentSoft: "rgba(37,99,235,0.08)",
    accentRgb: "37, 99, 235",
  },
};

const TABS = [
  { value: "", label: "All" },
  { value: "industry", label: "Industry" },
  { value: "capability", label: "Capability" },
];

export default function CaseStudyCategoriesPage() {
  const [tab, setTab] = useState("");
  const [search, setSearch] = useState("");
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState(EMPTY);
  const [confirm, setConfirm] = useState(null);
  const [toast, setToast] = useState(null);

  const { data, isLoading } = useGetCaseStudyCategoriesQuery(tab ? { type: tab } : {});
  const [create, { isLoading: creating }] = useCreateCaseStudyCategoryMutation();
  const [update, { isLoading: updating }] = useUpdateCaseStudyCategoryMutation();
  const [remove, { isLoading: removing }] = useDeleteCaseStudyCategoryMutation();

  const items = data?.data || [];
  const filtered = search
    ? items.filter((i) => i.name?.toLowerCase().includes(search.toLowerCase()))
    : items;

  const showToast = (message, type = "success") => setToast({ message, type });
  const set = (key, value) => setForm((f) => ({ ...f, [key]: value }));
  const setTheme = (key, value) =>
    setForm((f) => ({ ...f, theme: { ...f.theme, [key]: value } }));

  const openCreate = () => { setForm(EMPTY); setModal({ mode: "create" }); };
  const openEdit = (item) => { setForm({ ...EMPTY, ...item, theme: { ...EMPTY.theme, ...item.theme } }); setModal({ mode: "edit", data: item }); };

  const handleSave = async () => {
    try {
      if (modal.mode === "create") {
        await create(form).unwrap();
        showToast("Category created");
      } else {
        await update({ id: modal.data._id, ...form }).unwrap();
        showToast("Category updated");
      }
      setModal(null);
    } catch (err) {
      showToast(err?.data?.message || "Error saving", "error");
    }
  };

  const handleDelete = async () => {
    try {
      await remove(confirm._id).unwrap();
      showToast("Deleted");
      setConfirm(null);
    } catch {
      showToast("Delete failed", "error");
    }
  };

  const columns = [
    {
      key: "name", label: "Name",
      render: (row) => (
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span
            style={{
              width: 14, height: 14, borderRadius: 4, display: "inline-block",
              background: row.theme?.accent || "#ccc",
            }}
          />
          <div>
            <div style={{ fontWeight: 500, color: "var(--text-primary)", fontSize: 13 }}>{row.name}</div>
            <div className="slug">/{row.slug}</div>
          </div>
        </div>
      ),
    },
    {
      key: "type", label: "Type", style: { width: 120 },
      render: (row) => <Badge color={row.type === "industry" ? "blue" : "purple"}>{row.type}</Badge>,
    },
    { key: "icon", label: "Icon", style: { width: 100 } },
    {
      key: "actions", label: "", style: { width: 140 },
      render: (row) => (
        <div className="actions">
          <Btn size="sm" variant="ghost" onClick={() => openEdit(row)}>Edit</Btn>
          <Btn size="sm" variant="danger" onClick={() => setConfirm(row)}>Del</Btn>
        </div>
      ),
    },
  ];

  return (
    <div>
      <PageHeader
        title="Case Study Categories"
        subtitle="Powers the 'Browse By Industry' and 'Browse By Capability' columns"
        action={<Btn variant="primary" onClick={openCreate} icon={<PlusIcon />}>Add Category</Btn>}
      />

      <div className="filters" style={{ marginBottom: 12, gap: 8 }}>
        {TABS.map((t) => (
          <Btn
            key={t.value}
            size="sm"
            variant={tab === t.value ? "primary" : "ghost"}
            onClick={() => setTab(t.value)}
          >
            {t.label}
          </Btn>
        ))}
      </div>

      <div className="filters">
        <SearchBar value={search} onChange={setSearch} placeholder="Search categories…" />
        <span style={{ fontSize: 12, color: "var(--text-muted)", marginLeft: "auto" }}>{filtered.length} entries</span>
      </div>

      {!isLoading && filtered.length === 0 ? (
        <EmptyState
          title="No categories yet"
          description="Add an Industry or Capability category so case studies can be grouped under it."
          action={<Btn variant="primary" onClick={openCreate}>Add First Category</Btn>}
        />
      ) : (
        <Table columns={columns} data={filtered} loading={isLoading} />
      )}

      <Modal
        open={!!modal}
        onClose={() => setModal(null)}
        title={modal?.mode === "create" ? "New Category" : `Edit: ${modal?.data?.name}`}
        width={560}
      >
        <div className="grid-2">
          <Field label="Name" required>
            <Input value={form.name} onChange={(e) => set("name", e.target.value)} placeholder="Healthcare" />
          </Field>
          <Field label="Type" required>
            <Select value={form.type} onChange={(e) => set("type", e.target.value)}>
              <option value="industry">Industry</option>
              <option value="capability">Capability</option>
            </Select>
          </Field>
        </div>

        <Field label="Icon" hint="Icon name used in the Browse By… column, e.g. Building2, ShieldCheck">
          <Input value={form.icon} onChange={(e) => set("icon", e.target.value)} placeholder="Building2" />
        </Field>

        <Field label="Theme Colors">
          <div className="grid-2">
            <Input value={form.theme.accent} onChange={(e) => setTheme("accent", e.target.value)} placeholder="Accent #hex" />
            <Input value={form.theme.accentDark} onChange={(e) => setTheme("accentDark", e.target.value)} placeholder="Accent Dark #hex" />
            <Input value={form.theme.accentLight} onChange={(e) => setTheme("accentLight", e.target.value)} placeholder="Accent Light #hex" />
            <Input value={form.theme.accentSoft} onChange={(e) => setTheme("accentSoft", e.target.value)} placeholder="Accent Soft rgba(...)" />
            <Input value={form.theme.accentRgb} onChange={(e) => setTheme("accentRgb", e.target.value)} placeholder="Accent RGB e.g. 37, 99, 235" />
          </div>
        </Field>

        <div style={{ display: "flex", justifyContent: "flex-end", gap: 8, marginTop: 16 }}>
          <Btn variant="ghost" onClick={() => setModal(null)}>Cancel</Btn>
          <Btn variant="primary" onClick={handleSave} loading={creating || updating}>
            {modal?.mode === "create" ? "Create" : "Save"}
          </Btn>
        </div>
      </Modal>

      <ConfirmDialog
        open={!!confirm} onClose={() => setConfirm(null)} onConfirm={handleDelete}
        loading={removing} title="Delete Category" message={`Delete "${confirm?.name}"? Case studies linked to it won't be deleted, but will lose their category.`}
      />

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
}

const PlusIcon = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>;
