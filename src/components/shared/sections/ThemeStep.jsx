import { Field, Input } from "../../ui/UI";

export default function ThemeStep({ form, setForm }) {
	const theme = form.theme || {};

	const updateField = (key, value) => {
		setForm({
			...form,
			theme: {
				...theme,
				[key]: value,
			},
		});
	};

	return (
		<div className="form-grid">
			<Field label="Accent">
				<Input
					placeholder="#2563eb"
					value={theme.accent || ""}
					onChange={(e) => updateField("accent", e.target.value)}
				/>
			</Field>

			<Field label="Accent Dark">
				<Input
					value={theme.accentDark || ""}
					onChange={(e) => updateField("accentDark", e.target.value)}
				/>
			</Field>

			<Field label="Accent Light">
				<Input
					value={theme.accentLight || ""}
					onChange={(e) => updateField("accentLight", e.target.value)}
				/>
			</Field>

			<Field label="Accent Soft">
				<Input
					value={theme.accentSoft || ""}
					onChange={(e) => updateField("accentSoft", e.target.value)}
				/>
			</Field>

			<Field label="Hero Start">
				<Input
					value={theme.heroStart || ""}
					onChange={(e) => updateField("heroStart", e.target.value)}
				/>
			</Field>

			<Field label="Hero End">
				<Input
					value={theme.heroEnd || ""}
					onChange={(e) => updateField("heroEnd", e.target.value)}
				/>
			</Field>

			<Field label="Accent RGB">
				<Input
					placeholder="37,99,235"
					value={theme.accentRgb || ""}
					onChange={(e) => updateField("accentRgb", e.target.value)}
				/>
			</Field>
		</div>
	);
}