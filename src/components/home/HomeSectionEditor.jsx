import { useEffect, useState } from "react";
import { Btn, Field, Input, Textarea, ConfirmDialog, Toast, Spinner } from "../ui/UI";
import {
  useGetHomeSectionQuery,
  useUpdateHomeSectionHeaderMutation,
  useAddHomeSectionItemMutation,
  useUpdateHomeSectionItemMutation,
  useDeleteHomeSectionItemMutation,
  useReorderHomeSectionItemsMutation,
  useUploadHomeSectionItemImageMutation,
} from "../../features/home/homeApi";
import HomeItemModal from "./HomeItemModal";

export default function HomeSectionEditor({ sectionKey, label, itemLabel = "Card" }) {
  // console.log(label)
  const { data, isLoading } = useGetHomeSectionQuery(sectionKey);
  const [updateHeader, { isLoading: savingHeader }] = useUpdateHomeSectionHeaderMutation();
  const [addItem, { isLoading: adding }] = useAddHomeSectionItemMutation();
  const [updateItem, { isLoading: updatingItem }] = useUpdateHomeSectionItemMutation();
  const [deleteItem, { isLoading: deleting }] = useDeleteHomeSectionItemMutation();
  const [reorderItems] = useReorderHomeSectionItemsMutation();
  const [uploadImage] = useUploadHomeSectionItemImageMutation();

  const [header, setHeader] = useState({
    tag: "", title: "", description: "", outro: "",
    primaryLabel: "", primaryLink: "", secondaryLabel: "", secondaryLink: "",
  });
  const [itemModal, setItemModal] = useState(null); // { mode: 'create' | 'edit', item }
  const [confirm, setConfirm] = useState(null);
  const [toast, setToast] = useState(null);

  const section = data?.data;
  const items = section?.items || [];

  useEffect(() => {
    if (!section) return;
    setHeader({
      tag: section.tag || "",
      title: section.title || "",
      description: section.description || "",
      outro: section.outro || "",
      primaryLabel: section.primaryLabel || "",
      primaryLink: section.primaryLink || "",
      secondaryLabel: section.secondaryLabel || "",
      secondaryLink: section.secondaryLink || "",
    });
  }, [section]);

  const showToast = (message, type = "success") => setToast({ message, type });

  const saveHeader = async () => {
    try {
      await updateHeader({ key: sectionKey, body: header }).unwrap();
      showToast("Section header saved");
    } catch (err) {
      showToast(err?.data?.message || "Failed to save header", "error");
    }
  };

  const handleSaveItem = async ({ fields, imageFile }) => {
    try {
      if (itemModal.mode === "edit") {
        const itemId = itemModal.item._id;
        await updateItem({ key: sectionKey, itemId, body: fields }).unwrap();
        if (imageFile) {
          const formData = new FormData();
          formData.append("image", imageFile);
          await uploadImage({ key: sectionKey, itemId, formData }).unwrap();
        }
        showToast(`${itemLabel} updated`);
      } else {
        const result = await addItem({ key: sectionKey, body: fields }).unwrap();
        if (imageFile) {
          const newItems = result?.data?.items || [];
          const newItem = newItems[newItems.length - 1];
          if (newItem?._id) {
            const formData = new FormData();
            formData.append("image", imageFile);
            await uploadImage({ key: sectionKey, itemId: newItem._id, formData }).unwrap();
          }
        }
        showToast(`${itemLabel} added`);
      }
      setItemModal(null);
    } catch (err) {
      showToast(err?.data?.message || "Failed to save item", "error");
    }
  };

  const handleDelete = async () => {
    try {
      await deleteItem({ key: sectionKey, itemId: confirm._id }).unwrap();
      showToast(`${itemLabel} deleted`);
      setConfirm(null);
    } catch {
      showToast("Delete failed", "error");
    }
  };

  const move = async (index, dir) => {
    const target = index + dir;
    if (target < 0 || target >= items.length) return;
    const reordered = [...items];
    [reordered[index], reordered[target]] = [reordered[target], reordered[index]];
    try {
      await reorderItems({ key: sectionKey, order: reordered.map((i) => i._id) }).unwrap();
    } catch {
      showToast("Reorder failed", "error");
    }
  };

  if (isLoading) {
    return (
      <div style={{ padding: 40, textAlign: "center" }}>
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div>
      <div className="form-grid">
        <Field label="Tag">
          <Input value={header.tag} onChange={(e) => setHeader({ ...header, tag: e.target.value })} />
        </Field>
        <Field label="Title">
          <Input value={header.title} onChange={(e) => setHeader({ ...header, title: e.target.value })} />
        </Field>
        <Field label="Description" className="field-full">
          <Textarea
            rows={3}
            value={header.description}
            onChange={(e) => setHeader({ ...header, description: e.target.value })}
          />
        </Field>
        <Field label="Sort desc" className="field-full">
          <Textarea
            rows={2}
            value={header.outro}
            onChange={(e) => setHeader({ ...header, outro: e.target.value })}
          />
        </Field>
        {/* <Field label="Primary Button Label">
          <Input
            value={header.primaryLabel}
            onChange={(e) => setHeader({ ...header, primaryLabel: e.target.value })}
          />
        </Field>
        <Field label="Primary Button Link">
          <Input
            value={header.primaryLink}
            onChange={(e) => setHeader({ ...header, primaryLink: e.target.value })}
          />
        </Field> */}
        {/* <Field label="Secondary Button Label">
          <Input
            value={header.secondaryLabel}
            onChange={(e) => setHeader({ ...header, secondaryLabel: e.target.value })}
          />
        </Field>
        <Field label="Secondary Button Link">
          <Input
            value={header.secondaryLink}
            onChange={(e) => setHeader({ ...header, secondaryLink: e.target.value })}
          />
        </Field> */}
      </div>

      <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 16 }}>
        <Btn variant="primary" onClick={saveHeader} loading={savingHeader}>
          Save {label} Header
        </Btn>
      </div>

      <div className="dynamic-header" style={{ marginTop: 32 }}>
        <h3>{label} — {itemLabel}s</h3>
        <Btn onClick={() => setItemModal({ mode: "create" })}>+ Add {itemLabel}</Btn>
      </div>

      <div className="dynamic-cards">
        {items.map((item, index) => (
          <div key={item._id || index} className="dynamic-card">
            <div style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
              {item.image?.url && (
                <img
                  src={item.image.url}
                  alt={item.title}
                  style={{ width: 64, height: 64, objectFit: "cover", borderRadius: 8, border: "1px solid var(--border)" }}
                />
              )}
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, fontSize: 14 }}>{item.title || "(untitled)"}</div>
                {item.subtitle && <div style={{ fontSize: 12, color: "var(--text-muted)" }}>{item.subtitle}</div>}
                {item.description && (
                  <div style={{ fontSize: 12, color: "var(--text-secondary)", marginTop: 4 }}>
                    {item.description}
                  </div>
                )}
                {item.icon && (
                  <div style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 4 }}>Icon: {item.icon}</div>
                )}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <Btn size="sm" variant="ghost" disabled={index === 0} onClick={() => move(index, -1)}>↑</Btn>
                <Btn size="sm" variant="ghost" disabled={index === items.length - 1} onClick={() => move(index, 1)}>↓</Btn>
              </div>
            </div>

            <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
              <Btn size="sm" variant="secondary" onClick={() => setItemModal({ mode: "edit", item })}>
                Edit
              </Btn>
              <Btn size="sm" variant="danger" onClick={() => setConfirm(item)}>
                Delete
              </Btn>
            </div>
          </div>
        ))}

        {items.length === 0 && (
          <div className="dynamic-empty">
            <p>No {itemLabel.toLowerCase()}s added yet.</p>
            <Btn onClick={() => setItemModal({ mode: "create" })}>Add First {itemLabel}</Btn>
          </div>
        )}
      </div>

      <HomeItemModal
        open={!!itemModal}
        mode={itemModal?.mode}
        item={itemModal?.item}
        itemLabel={itemLabel}
        onClose={() => setItemModal(null)}
        onSave={handleSaveItem}
        saving={adding || updatingItem}
        label={label}
      />

      <ConfirmDialog
        open={!!confirm}
        onClose={() => setConfirm(null)}
        onConfirm={handleDelete}
        loading={deleting}
        title={`Delete ${itemLabel}`}
        message={`Are you sure you want to delete "${confirm?.title || "this item"}"? This cannot be undone.`}
      />

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
}
