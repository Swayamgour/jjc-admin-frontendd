import { Field, Input, Textarea, Select } from "../ui/UI";

export default function BasicInfoStep({ form, setForm, categories, type }) {
	const subcategories = categories || [];

	const updateOverview = (field, value) => {
		setForm({
			...form,
			overview: { ...form.overview, [field]: value },
		});
	};

	// Simple toggle component
	const Toggle = ({ checked, onChange, label }) => (
		<div className="toggle-wrapper" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
			<button
				type="button"
				className={`toggle-btn ${checked ? 'toggle-on' : 'toggle-off'}`}
				onClick={() => onChange({ target: { checked: !checked } })}
				style={{
					position: 'relative',
					width: '48px',
					height: '26px',
					borderRadius: '13px',
					border: 'none',
					cursor: 'pointer',
					backgroundColor: checked ? '#2563eb' : '#d1d5db',
					transition: 'background-color 0.2s',
				}}
			>
				<span
					style={{
						position: 'absolute',
						top: '2px',
						left: checked ? '24px' : '2px',
						width: '22px',
						height: '22px',
						borderRadius: '50%',
						backgroundColor: 'white',
						transition: 'left 0.2s',
						boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
					}}
				/>
			</button>
			{label && <span style={{ fontSize: '14px' }}>{label}</span>}
		</div>
	);

	return (
		<div className="form-grid">
			{/* Core Fields */}
			<Field label="Title" required>
				<Input
					value={form.title || ""}
					onChange={(e) => setForm({ ...form, title: e.target.value })}
					placeholder="e.g. IT Strategy & Consulting"
				/>
			</Field>

			<Field label="Badge">
				<Input
					value={form.badge || ""}
					onChange={(e) => setForm({ ...form, badge: e.target.value })}
					placeholder="e.g. Strategy & Transformation"
				/>
			</Field>

			<Field label="Slug" required>
				<Input
					value={form.slug || ""}
					onChange={(e) =>
						setForm({
							...form,
							slug: e.target.value
								.toLowerCase()
								.replace(/\s+/g, "-")
								.replace(/[^a-z0-9-]/g, ""),
						})
					}
					placeholder="it-strategy-consulting"
				/>
			</Field>

			<Field label="URL Path">
				<Input
					value={form.urlPath || ""}
					onChange={(e) => setForm({ ...form, urlPath: e.target.value })}
					placeholder="/services/it-strategy-and-consulting"
				/>
			</Field>

			<Field label="Short Description" required>
				<Textarea
					rows={3}
					value={form.shortDescription || ""}
					onChange={(e) => setForm({ ...form, shortDescription: e.target.value })}
					placeholder="Short description — shown in mega menu / cards (max 300 chars)"
				/>
			</Field>

			{/* Overview Section */}
			<div className="section-divider" style={{ gridColumn: '1 / -1', marginTop: '16px', paddingTop: '16px', borderTop: '2px solid #e5e7eb' }}>
				<h3 style={{ fontSize: '16px', fontWeight: 600 }}>Overview Section</h3>
			</div>

			<Field label="Overview Tag">
				<Input
					value={form.overview?.tag || ""}
					onChange={(e) => updateOverview("tag", e.target.value)}
					placeholder="e.g. Overview"
				/>
			</Field>

			<Field label="Overview Title">
				<Input
					value={form.overview?.title || ""}
					onChange={(e) => updateOverview("title", e.target.value)}
					placeholder="e.g. What we deliver"
				/>
			</Field>

			<Field label="Brand Label">
				<Input
					value={form.overview?.brandLabel || ""}
					onChange={(e) => updateOverview("brandLabel", e.target.value)}
					placeholder="e.g. JJC Systems"
				/>
			</Field>

			<Field label="Overview Paragraphs">
				<Textarea
					rows={5}
					value={(form.overview?.paragraphs || []).join("\n")}
					onChange={(e) =>
						updateOverview("paragraphs", e.target.value.split("\n").filter(Boolean))
					}
					placeholder="One paragraph per line"
				/>
			</Field>

			<Field label="Checklist">
				<Textarea
					rows={4}
					value={(form.overview?.checklist || []).join("\n")}
					onChange={(e) =>
						updateOverview("checklist", e.target.value.split("\n").filter(Boolean))
					}
					placeholder="One item per line"
				/>
			</Field>

			{/* Categories and Order */}
			<div className="section-divider" style={{ gridColumn: '1 / -1', marginTop: '16px', paddingTop: '16px', borderTop: '2px solid #e5e7eb' }}>
				<h3 style={{ fontSize: '16px', fontWeight: 600 }}>Organization</h3>
			</div>

			<Field label="Category" required>
				<Select
					value={form.category || ""}
					onChange={(e) => setForm({ ...form, category: e.target.value })}
				>
					<option value="">Select Category</option>
					{categories.map((cat) => (
						<option key={cat._id} value={cat._id}>
							{cat.name}
						</option>
					))}
				</Select>
			</Field>

			<Field label="Sub Category" required>
				<Select
					value={form.subCategory || ""}
					onChange={(e) => setForm({ ...form, subCategory: e.target.value })}
				>
					<option value="">Select Subcategory</option>
					{subcategories.map((sub) => (
						<option key={sub._id} value={sub._id}>
							{sub.name}
						</option>
					))}
				</Select>
			</Field>

			<Field label="Order">
				<Input
					type="number"
					value={form.order || 0}
					onChange={(e) => setForm({ ...form, order: Number(e.target.value) })}
				/>
			</Field>

			<Field label="Published" style={{ gridColumn: '1 / -1' }}>
				<Toggle
					checked={form.isPublished || false}
					onChange={(e) => setForm({ ...form, isPublished: e.target.checked })}
					label={form.isPublished ? "Published" : "Draft"}
				/>
			</Field>
		</div>
	);
}