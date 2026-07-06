import { useState } from "react";
import {
  PageHeader, Btn, Table, Modal, Field, Input, Textarea, Select,
  StatusBadge, SearchBar, ConfirmDialog, Toast, EmptyState,
} from "./UI";
import "./UI.css";
import { useNavigate } from "react-router-dom";

export default function ContentPage({
  title, subtitle,
  useList, useCreate, useUpdate, useDelete, useToggle,
  fields = [], columns = [], queryParams = {},navigateToCreate,navigateToEdit,
}) {
  
  const navigate = useNavigate();
  const [search, setSearch]   = useState("");
  const [modal, setModal]     = useState(null);
  const [form, setForm]       = useState({});
  const [confirm, setConfirm] = useState(null);
  const [toast, setToast]     = useState(null);

  const { data, isLoading }            = useList(queryParams);
  const [create, { isLoading: creating }] = useCreate();
  const [update, { isLoading: updating }] = useUpdate();
  const [remove, { isLoading: removing }] = useDelete();
  const [toggle]                          = useToggle();

  const items   = data?.data || [];
  const filtered = search
    ? items.filter((i) => i.title?.toLowerCase().includes(search.toLowerCase()))
    : items;

  const showToast = (message, type = "success") => setToast({ message, type });

  const openCreate = () => { setForm({}); setModal({ mode: "create" }); };
  const openEdit = (item) => { setForm({ ...item }); setModal({ mode: "edit", data: item }); };
  

  const handleSave = async () => {
    try {
      if (modal.mode === "create") {
        await create(form).unwrap();
        showToast(`Created successfully`);
      } else {
        await update({ slug: modal.data.slug, ...form }).unwrap();
        showToast("Updated successfully");
      }
      setModal(null);
    } catch (err) {
      showToast(err?.data?.message || "Error saving", "error");
    }
  };

  const handleDelete = async () => {
    try {
      await remove(confirm.slug).unwrap();
      showToast("Deleted successfully");
      setConfirm(null);
    } catch {
      showToast("Delete failed", "error");
    }
  };

  const handleToggle = async (slug, isPublished) => {
    try {
      await toggle(slug).unwrap();
      showToast(isPublished ? "Unpublished" : "Published");
    } catch {
      showToast("Toggle failed", "error");
    }
  };

  const tableColumns = [
    {
      key: "title", label: "Title",
      render: (row) => (
        <div>
          <div style={{ fontWeight: 500, color: "var(--text-primary)", fontSize: 13 }}>{row.title}</div>
          <div className="slug">/{row.slug}</div>
        </div>
      ),
    },
    ...columns,
    {
      key: "status", label: "Status", style: { width: 100 },
      render: (row) => <StatusBadge published={row.isPublished} />,
    },
    {
      key: "actions", label: "", style: { width: 170 },
      render: (row) => (
        <div className="actions">
          {/* <Btn size="sm" variant="ghost" onClick={() => openEdit(row)}>Edit</Btn> */}
          <Btn size="sm" variant="ghost" onClick={() =>
  navigateToEdit
    ? navigate(`${navigateToEdit}/${row.slug}`)
    : openEdit(row)
}>Edit</Btn>
          <Btn size="sm" variant={row.isPublished ? "secondary" : "success"}
            onClick={() => handleToggle(row._id, row.isPublished)}>
            {row.isPublished ? "Unpublish" : "Publish"}
          </Btn>
          <Btn size="sm" variant="danger"
            onClick={() => setConfirm({ slug: row.slug, title: row.title })}>
            Del
          </Btn>
        </div>
      ),
    },
  ];

  return (
    <div>
      <PageHeader
        title={title}
        subtitle={subtitle}
        action={
          // <Btn variant="primary" onClick={openCreate} icon={<PlusIcon />}>
          //   Add {title.replace(/s$/, "")}
          // </Btn>
          <Btn variant="primary"
            onClick={() =>
              navigateToCreate
                ? navigate(navigateToCreate)
                : openCreate()
              }
            icon={<PlusIcon />}>
            Add {title.replace(/s$/, "")}
          </Btn>
        }
      />

      <div className="filters">
        <SearchBar value={search} onChange={setSearch} placeholder={`Search ${title.toLowerCase()}…`} />
        <span style={{ fontSize: 12, color: "var(--text-muted)", marginLeft: "auto", whiteSpace: "nowrap" }}>
          {filtered.length} entries
        </span>
      </div>

      {!isLoading && filtered.length === 0 ? (
        <EmptyState
          title={`No ${title.toLowerCase()} yet`}
          description={`Add your first ${title.toLowerCase().replace(/s$/, "")} to get started.`}
          action={<Btn variant="primary" onClick={openCreate}>Add Now</Btn>}
        />
      ) : (
        <Table columns={tableColumns} data={filtered} loading={isLoading} />
      )}

      <Modal
        open={!!modal}
        onClose={() => setModal(null)}
        title={modal?.mode === "create" ? `New ${title.replace(/s$/, "")}` : `Edit: ${modal?.data?.title}`}
        width={600}
      >
        <FormFields fields={fields} form={form} setForm={setForm} />
        <div style={{ display: "flex", justifyContent: "flex-end", gap: 8, marginTop: 20 }}>
          <Btn variant="ghost" onClick={() => setModal(null)}>Cancel</Btn>
          <Btn variant="primary" onClick={handleSave} loading={creating || updating}>
            {modal?.mode === "create" ? "Create" : "Save Changes"}
          </Btn>
        </div>
      </Modal>

      <ConfirmDialog
        open={!!confirm} onClose={() => setConfirm(null)}
        onConfirm={handleDelete} loading={removing}
        title="Delete Entry"
        message={`Are you sure you want to delete "${confirm?.title}"? This cannot be undone.`}
      />

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
}

function FormFields({ fields, form, setForm }) {
  const set = (key, val) => setForm((f) => ({ ...f, [key]: val }));

  return (
    <div>
      {fields.map((f) => (
        <Field key={f.key} label={f.label} required={f.required} hint={f.hint}>
          {f.type === "textarea" ? (
            <Textarea value={form[f.key] || ""} onChange={(e) => set(f.key, e.target.value)}
              placeholder={f.placeholder} rows={f.rows || 4} />
          ) : f.type === "select" ? (
            <Select value={form[f.key] || ""} onChange={(e) => set(f.key, e.target.value)}>
              <option value="">Select…</option>
              {f.options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
            </Select>
          ) : f.type === "grid" ? (
            <div className="grid-2">
              {f.subFields.map((sf) => (
                <Field key={sf.key} label={sf.label}>
                  <Input
                    value={form[f.key]?.[sf.key] || ""}
                    onChange={(e) => set(f.key, { ...(form[f.key] || {}), [sf.key]: e.target.value })}
                    placeholder={sf.placeholder}
                  />
                </Field>
              ))}
            </div>
          ) : (
            <Input value={form[f.key] || ""} onChange={(e) => set(f.key, e.target.value)}
              placeholder={f.placeholder} type={f.type || "text"} />
          )}
        </Field>
      ))}
    </div>
  );
}

const PlusIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
  </svg>
);
