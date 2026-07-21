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
	useGetCategoriesQuery,
	useCreateCategoryMutation,
	useUpdateCategoryMutation,
	useDeleteCategoryMutation,
	useAddSubcategoryMutation,
	useUpdateSubcategoryMutation,
	useDeleteSubcategoryMutation,
	useAddItemMutation,
	useUpdateItemMutation,
	useDeleteItemMutation,
} from "../features/categories/categoryApi";

export default function CategoriesPage() {
	const [search, setSearch] = useState("");

	const [expanded, setExpanded] = useState({});

	const [categoryModal, setCategoryModal] = useState(false);
	const [subcategoryModal, setSubcategoryModal] = useState(false);
	const [itemModal, setItemModal] = useState(false);

	const [confirm, setConfirm] = useState(null);
	const [toast, setToast] = useState(null);

	const [categoryForm, setCategoryForm] = useState({
		name: "",
		isPublished: true,
	});

	const [subcategoryForm, setSubcategoryForm] = useState({
		name: "",
		slug: "",
		icon: "",
	});

	const [itemForm, setItemForm] = useState({
		name: "",
		slug: "",
		icon: "",
		description: "",
	});

	const [selectedCategory, setSelectedCategory] = useState(null);
	const [selectedSubcategory, setSelectedSubcategory] = useState(null);

	const [editingCategory, setEditingCategory] = useState(null);
	const [editingSubcategory, setEditingSubcategory] = useState(null);
	const [editingItem, setEditingItem] = useState(null);

	const { data, isLoading } = useGetCategoriesQuery();

	const [createCategory, { isLoading: creatingCategory }] = useCreateCategoryMutation();
	const [updateCategory, { isLoading: updatingCategory }] = useUpdateCategoryMutation();
	const [deleteCategory, { isLoading: deletingCategory }] = useDeleteCategoryMutation();

	const [addSubcategory, { isLoading: creatingSubcategory }] = useAddSubcategoryMutation();
	const [updateSubcategory, { isLoading: updatingSubcategory }] = useUpdateSubcategoryMutation();
	const [deleteSubcategory, { isLoading: deletingSubcategory }] = useDeleteSubcategoryMutation();

	const [addItem, { isLoading: creatingItem }] = useAddItemMutation();
	const [updateItem, { isLoading: updatingItem }] = useUpdateItemMutation();
	const [deleteItem, { isLoading: deletingItem }] = useDeleteItemMutation();

	const items = data?.data || [];

	const filtered = search
		? items.filter((item) =>
			item.name?.toLowerCase().includes(search.toLowerCase()),
		)
		: items;

	const showToast = (message, type = "success") => {
		setToast({ message, type });
	};

	// ---------------- Category modal ----------------

	const closeCategoryModal = () => {
		setCategoryModal(false);
		setEditingCategory(null);
		setCategoryForm({
			name: "",
			isPublished: true,
		});
	};

	const openCategoryModal = (category = null) => {
		setEditingCategory(category);

		setCategoryForm({
			name: category?.name || "",
			isPublished: category?.isPublished ?? true,
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

				showToast("Category updated successfully");
			} else {
				await createCategory(categoryForm).unwrap();

				showToast("Category created successfully");
			}

			closeCategoryModal();
		} catch (err) {
			showToast(err?.data?.message || "Operation failed", "error");
		}
	};

	// ---------------- Subcategory modal ----------------

	const closeSubcategoryModal = () => {
		setSubcategoryModal(false);
		setEditingSubcategory(null);
		setSelectedCategory(null);
		setSubcategoryForm({
			name: "",
			slug: "",
			icon: "",
		});
	};

	const openSubcategoryModal = (category, subcategory = null) => {
		setSelectedCategory(category);
		setEditingSubcategory(subcategory);

		setSubcategoryForm({
			name: subcategory?.name || "",
			slug: subcategory?.slug || "",
			icon: subcategory?.icon || "",
		});

		setSubcategoryModal(true);
	};

	const handleSaveSubcategory = async () => {
		try {
			const categoryId = selectedCategory._id;

			if (editingSubcategory) {
				await updateSubcategory({
					categoryId,
					subId: editingSubcategory._id,
					body: {
						name: subcategoryForm.name,
						slug: subcategoryForm.slug,
						icon: subcategoryForm.icon,
					},
				}).unwrap();

				showToast("Subcategory updated successfully");
			} else {
				await addSubcategory({
					categoryId,
					body: {
						name: subcategoryForm.name,
						slug: subcategoryForm.slug,
						icon: subcategoryForm.icon,
					},
				}).unwrap();

				showToast("Subcategory created successfully");
			}

			setExpanded((prev) => ({
				...prev,
				[categoryId]: true,
			}));

			closeSubcategoryModal();
		} catch (err) {
			showToast(err?.data?.message || "Operation failed", "error");
		}
	};

	// ---------------- Item modal ----------------

	const closeItemModal = () => {
		setItemModal(false);
		setEditingItem(null);
		setSelectedCategory(null);
		setSelectedSubcategory(null);
		setItemForm({
			name: "",
			slug: "",
			icon: "",
			description: "",
		});
	};

	const openItemModal = (category, subcategory, item = null) => {
		setSelectedCategory(category);
		setSelectedSubcategory(subcategory);
		setEditingItem(item);

		setItemForm({
			name: item?.name || "",
			slug: item?.slug || "",
			icon: item?.icon || "",
			description: item?.description || "",
		});

		setItemModal(true);
	};

	const handleSaveItem = async () => {
		try {
			const categoryId = selectedCategory._id;
			const subId = selectedSubcategory._id;

			if (editingItem) {
				await updateItem({
					categoryId,
					subId,
					itemId: editingItem._id,
					body: {
						name: itemForm.name,
						slug: itemForm.slug,
						icon: itemForm.icon,
						description: itemForm.description,
					},
				}).unwrap();

				showToast("Item updated successfully");
			} else {
				await addItem({
					categoryId,
					subId,
					body: {
						name: itemForm.name,
						slug: itemForm.slug,
						icon: itemForm.icon,
						description: itemForm.description,
					},
				}).unwrap();

				showToast("Item created successfully");
			}

			closeItemModal();
		} catch (err) {
			showToast(err?.data?.message || "Operation failed", "error");
		}
	};

	// ---------------- Delete (category / subcategory / item) ----------------

	const handleDelete = async () => {
		try {
			if (confirm.type === "category") {
				await deleteCategory(confirm.id).unwrap();

				showToast("Category deleted successfully");
			} else if (confirm.type === "subcategory") {
				await deleteSubcategory({
					categoryId: confirm.categoryId,
					subId: confirm.id,
				}).unwrap();

				showToast("Subcategory deleted successfully");
			} else if (confirm.type === "item") {
				await deleteItem({
					categoryId: confirm.categoryId,
					subId: confirm.subId,
					itemId: confirm.id,
				}).unwrap();

				showToast("Item deleted successfully");
			}

			setConfirm(null);
		} catch (err) {
			showToast(err?.data?.message || "Delete failed", "error");
		}
	};

	const tableColumns = [
		{
			key: "name",
			label: "Category",
			render: (row) => (
				<div>
					<div style={{ fontWeight: 500, color: "var(--text-primary)", fontSize: 13 }}>
						{row.name}
					</div>

					<div className="slug">/{row.slug}</div>

					{expanded[row._id] &&
						row.subcategories?.map((sub) => (
							<div key={sub._id} style={{ marginTop: 8, marginLeft: 24 }}>
								<div
									style={{
										display: "flex",
										justifyContent: "space-between",
										alignItems: "flex-start",
									}}
								>
									<div>
										<div style={{ fontWeight: 500, color: "var(--text-primary)", fontSize: 13 }}>
											└── {sub.icon ? `[${sub.icon}] ` : ""}
											{sub.name}
										</div>

										<div className="slug" style={{ marginLeft: 18, fontSize: 12 }}>
											/{sub.slug}
										</div>
									</div>

									<div style={{ display: "flex", gap: 8 }}>
										<Btn
											size="sm"
											variant="secondary"
											onClick={() => openItemModal(row, sub)}
										>
											Add Item
										</Btn>

										<Btn
											size="sm"
											variant="secondary"
											onClick={() => openSubcategoryModal(row, sub)}
										>
											Edit
										</Btn>

										<Btn
											size="sm"
											variant="danger"
											onClick={() =>
												setConfirm({
													type: "subcategory",
													id: sub._id,
													categoryId: row._id,
													name: sub.name,
												})
											}
										>
											Delete
										</Btn>
									</div>
								</div>

								{sub.items?.map((item) => (
									<div
										key={item._id}
										style={{
											marginTop: 6,
											marginLeft: 36,
											display: "flex",
											justifyContent: "space-between",
											alignItems: "flex-start",
										}}
									>
										<div>
											<div style={{ fontWeight: 500, color: "var(--text-primary)", fontSize: 12 }}>
												── {item.icon ? `[${item.icon}] ` : ""}
												{item.name}
											</div>

											{item.description && (
												<div className="slug" style={{ marginLeft: 14, fontSize: 11 }}>
													{item.description}
												</div>
											)}
										</div>

										<div style={{ display: "flex", gap: 8 }}>
											<Btn
												size="sm"
												variant="secondary"
												onClick={() => openItemModal(row, sub, item)}
											>
												Edit
											</Btn>

											<Btn
												size="sm"
												variant="danger"
												onClick={() =>
													setConfirm({
														type: "item",
														id: item._id,
														categoryId: row._id,
														subId: sub._id,
														name: item.name,
													})
												}
											>
												Delete
											</Btn>
										</div>
									</div>
								))}
							</div>
						))}
				</div>
			),
		},
		{
			key: "count",
			label: "Subcategories",
			style: { width: 120 },
			render: (row) => row.subcategories?.length || 0,
		},
		{
			key: "status",
			label: "Status",
			style: { width: 120 },
			render: (row) => <StatusBadge published={row.isPublished} />,
		},
		{
			key: "actions",
			label: "",
			style: { width: 280 },
			render: (row) => (
				<div className="actions">
					<Btn
						size="sm"
						variant="ghost"
						onClick={() =>
							setExpanded((prev) => ({
								...prev,
								[row._id]: !prev[row._id],
							}))
						}
					>
						{expanded[row._id] ? "Hide" : "View"}
					</Btn>

					<Btn size="sm" variant="secondary" onClick={() => openSubcategoryModal(row)}>
						Add Subcategory
					</Btn>

					<Btn size="sm" variant="secondary" onClick={() => openCategoryModal(row)}>
						Edit
					</Btn>

					<Btn
						size="sm"
						variant="danger"
						onClick={() =>
							setConfirm({
								type: "category",
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
				title="Categories"
				subtitle="Manage categories, subcategories and items"
				action={
					<Btn variant="primary" onClick={() => openCategoryModal()} icon={<PlusIcon />}>
						Add Category
					</Btn>
				}
			/>

			<div className="filters">
				<SearchBar value={search} onChange={setSearch} placeholder="Search categories..." />

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
					title="No categories yet"
					description="Add your first category to get started."
					action={
						<Btn variant="primary" onClick={openCategoryModal}>
							Add Category
						</Btn>
					}
				/>
			) : (
				<Table columns={tableColumns} data={filtered} loading={isLoading} />
			)}

			{/* Add/Edit Category */}
			<Modal
				open={categoryModal}
				onClose={closeCategoryModal}
				title={editingCategory ? "Edit Category" : "New Category"}
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
						placeholder="e.g. Services"
					/>
				</Field>

				<div style={{ display: "flex", justifyContent: "flex-end", gap: 8, marginTop: 20 }}>
					<Btn variant="ghost" onClick={closeCategoryModal}>
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

			{/* Add/Edit Subcategory */}
			<Modal
				open={subcategoryModal}
				onClose={closeSubcategoryModal}
				title={editingSubcategory ? "Edit Subcategory" : "New Subcategory"}
			>
				<Field label="Subcategory Name" required>
					<Input
						value={subcategoryForm.name}
						onChange={(e) =>
							setSubcategoryForm((prev) => ({
								...prev,
								name: e.target.value,
							}))
						}
						placeholder="e.g. Managed IT & Security"
					/>
				</Field>

				<Field label="Icon" hint="Icon name (e.g. lucide icon name like 'shield').">
					<Input
						value={subcategoryForm.icon}
						onChange={(e) =>
							setSubcategoryForm((prev) => ({
								...prev,
								icon: e.target.value,
							}))
						}
						placeholder="e.g. shield"
					/>
				</Field>

				<Field label="Slug" hint="Optional. Leave empty to auto-generate.">
					<Input
						value={subcategoryForm.slug}
						onChange={(e) =>
							setSubcategoryForm((prev) => ({
								...prev,
								slug: e.target.value,
							}))
						}
						placeholder="e.g. managed-it-security"
					/>
				</Field>

				<div style={{ display: "flex", justifyContent: "flex-end", gap: 8, marginTop: 20 }}>
					<Btn variant="ghost" onClick={closeSubcategoryModal}>
						Cancel
					</Btn>

					<Btn
						variant="primary"
						loading={creatingSubcategory || updatingSubcategory}
						onClick={handleSaveSubcategory}
					>
						{editingSubcategory ? "Update" : "Create"}
					</Btn>
				</div>
			</Modal>

			{/* Add/Edit Item */}
			<Modal
				open={itemModal}
				onClose={closeItemModal}
				title={editingItem ? "Edit Item" : "New Item"}
			>
				<Field label="Item Name" required>
					<Input
						value={itemForm.name}
						onChange={(e) =>
							setItemForm((prev) => ({
								...prev,
								name: e.target.value,
							}))
						}
						placeholder="e.g. IT Strategy & Consulting"
					/>
				</Field>

				<Field label="Icon" hint="Icon name (e.g. lucide icon name like 'compass').">
					<Input
						value={itemForm.icon}
						onChange={(e) =>
							setItemForm((prev) => ({
								...prev,
								icon: e.target.value,
							}))
						}
						placeholder="e.g. compass"
					/>
				</Field>

				<Field label="Description">
					<Input
						value={itemForm.description}
						onChange={(e) =>
							setItemForm((prev) => ({
								...prev,
								description: e.target.value,
							}))
						}
						placeholder="Short description"
					/>
				</Field>

				<Field label="Slug" hint="Optional. Leave empty to auto-generate.">
					<Input
						value={itemForm.slug}
						onChange={(e) =>
							setItemForm((prev) => ({
								...prev,
								slug: e.target.value,
							}))
						}
						placeholder="e.g. it-strategy-consulting"
					/>
				</Field>

				<div style={{ display: "flex", justifyContent: "flex-end", gap: 8, marginTop: 20 }}>
					<Btn variant="ghost" onClick={closeItemModal}>
						Cancel
					</Btn>

					<Btn
						variant="primary"
						loading={creatingItem || updatingItem}
						onClick={handleSaveItem}
					>
						{editingItem ? "Update" : "Create"}
					</Btn>
				</div>
			</Modal>

			<ConfirmDialog
				open={!!confirm}
				onClose={() => setConfirm(null)}
				onConfirm={handleDelete}
				loading={deletingCategory || deletingSubcategory || deletingItem}
				title="Delete Entry"
				message={`Are you sure you want to delete "${confirm?.name}"? This cannot be undone.`}
			/>

			{toast && (
				<Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />
			)}
		</div>
	);
}

const PlusIcon = () => (
	<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
		<line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
	</svg>
);