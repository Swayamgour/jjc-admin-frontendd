// src/pages/CategoriesPage.jsx

import { useState } from "react";
import {
  PageHeader,
  Btn,
  Table,
  Modal,
  Field,
  Input,
  StatusBadge,
  SearchBar,
  ConfirmDialog,
  Toast,
  EmptyState,
} from "../components/ui/UI";

import {
  useGetBlogCategoriesQuery,
useCreateBlogCategoryMutation,
useUpdateBlogCategoryMutation,
useDeleteBlogCategoryMutation
} from "../features/blogCategories/blogCategoryApi";

export default function BlogCategoriesPage() {
  const [search, setSearch] = useState("");

  

  const [categoryModal, setCategoryModal] = useState(false);


  const [confirm, setConfirm] = useState(null);
  const [toast, setToast] = useState(null);

  const [categoryForm, setCategoryForm] = useState({ name: "", slug: "" });

  const [editingCategory, setEditingCategory] = useState(null);

  const { data, isLoading } = useGetBlogCategoriesQuery();

  const [createCategory, { isLoading: creatingCategory }] = useCreateBlogCategoryMutation();
  
  const [updateCategory, { isLoading: updatingCategory }] = useUpdateBlogCategoryMutation();
  
  const [deleteCategory, { isLoading: deletingCategory }] = useDeleteBlogCategoryMutation();

  
  const items = data?.data || [];

  const filtered = search
    ? items.filter((item) =>
        item.name?.toLowerCase().includes(search.toLowerCase()),
      )
    : items;

  const showToast = (message, type = "success") => {
    setToast({ message, type });
  };
  
  const closeCategoryModal = () => {
    setCategoryModal(false);
    setEditingCategory(null);
    setCategoryForm({
      name: "",
      slug: "",
    });
  };
  

  const openCategoryModal = (category = null) => {
    setEditingCategory(category);

    setCategoryForm({
      name: category?.name || "",
      slug: category?.slug || "",
    });

    setCategoryModal(true);
  };

  const handleSaveCategory = async () => {
    try {
      if (editingCategory) {
        await updateCategory({
          id: editingCategory._id,
          ...categoryForm,
      }).unwrap();

        showToast("Blog category updated successfully");
      } else {
        await createCategory(categoryForm).unwrap();

        showToast("Blog category created successfully");
      }

      setCategoryModal(false);
      setEditingCategory(null);
      setCategoryForm({
        name: "",
        slug: "",
      });
    } catch (err) {
      showToast(
        err?.data?.message || "Operation failed",
        "error"
      );
    }
  };
  

  const handleDelete = async () => {
    try {
      await deleteCategory(confirm.id).unwrap();

      showToast("Blog category deleted successfully");

      setConfirm(null);
    } catch (err) {
      showToast(
        err?.data?.message || "Delete failed",
        "error"
      );
    }
  };


  const tableColumns = [
  {
    key: "name",
    label: "Category",
    render: (row) => (
      <div>
        <div
          style={{
            fontWeight: 500,
            color: "var(--text-primary)",
            fontSize: 13,
          }}
        >
          {row.name}
        </div>

        <div className="slug">/{row.slug}</div>
      </div>
    ),
  },

  
  
    {
  key: "createdAt",
  label: "Created",
  style: {
    width: 180,
  },
  render: (row) => (
    <div
      style={{
        color: "var(--text-primary)",
        fontSize: 13,
      }}
    >
      {new Date(row.createdAt).toLocaleDateString()}
    </div>
  ),
},

    {
  key: "actions",
  label: "",
  style: { width: 150 },
  render: (row) => (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
      }}
    >
      <Btn
        size="sm"
        variant="secondary"
        onClick={() => openCategoryModal(row)}
      >
        Edit
      </Btn>

      <Btn
        size="sm"
        variant="danger"
        onClick={() =>
          setConfirm({
            id: row._id,
            name: row.name,
          })
        }
      >
        Delete
      </Btn>
    </div>
  ),
},
];
  
  return (
  <div>
    <PageHeader
      title="Blog Categories"
      subtitle="Create, update and manage blog categories"
      action={
        <Btn
          variant="primary"
          onClick={() => openCategoryModal()}
          icon={<PlusIcon />}
        >
          Add Category
        </Btn>
      }
    />

    <div className="filters">
      <SearchBar
        value={search}
        onChange={setSearch}
        placeholder="Search blog categories..."
      />

      <span
        style={{
          fontSize: 12,
          color: "var(--text-muted)",
          marginLeft: "auto",
          whiteSpace: "nowrap",
        }}
      >
        {filtered.length} entries
      </span>
    </div>

    {!isLoading && filtered.length === 0 ? (
      <EmptyState
        title="No blog categories yet"
        description="Add your first blog category to organize blog posts."
        action={
          <Btn
            variant="primary"
            onClick={() => openCategoryModal()}
          >
            Add Category
          </Btn>
        }
      />
    ) : (
      <Table
        columns={tableColumns}
        data={filtered}
        loading={isLoading}
      />
    )}

    <Modal
      open={categoryModal}
      onClose={closeCategoryModal}
      title={
        editingCategory
          ? "Edit Blog Category"
          : "New Blog Category"
      }
    >
      <Field label="Category Name" required>
        <Input
          value={categoryForm.name}
          onChange={(e) =>
            setCategoryForm({
              ...categoryForm,
              name: e.target.value,
            })
          }
          placeholder="e.g. Artificial Intelligence"
        />
      </Field>

      <Field
        label="Slug"
        hint="Optional. Leave empty to auto-generate."
      >
        <Input
          value={categoryForm.slug}
          onChange={(e) =>
            setCategoryForm({
              ...categoryForm,
              slug: e.target.value,
            })
          }
          placeholder="e.g. artificial-intelligence"
        />
      </Field>

      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          gap: 8,
          marginTop: 20,
        }}
      >
        <Btn
          variant="ghost"
          onClick={closeCategoryModal}
        >
          Cancel
        </Btn>

        <Btn
          variant="primary"
          loading={creatingCategory || updatingCategory}
          onClick={handleSaveCategory}
        >
          {editingCategory ? "Update" : "Create"}
        </Btn>
      </div>
    </Modal>

    <ConfirmDialog
      open={!!confirm}
      onClose={() => setConfirm(null)}
      onConfirm={handleDelete}
      loading={deletingCategory}
      title="Delete Category"
      message={`Are you sure you want to delete "${confirm?.name}"? This cannot be undone.`}
    />

    {toast && (
      <Toast
        message={toast.message}
        type={toast.type}
        onClose={() => setToast(null)}
      />
    )}
  </div>
);
}

const PlusIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
  </svg>
);
