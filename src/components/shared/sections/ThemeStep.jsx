import { Field, Input } from "../../ui/UI";

const COLOR_FIELDS = [
	{ key: "accent", label: "Accent", defaultValue: "#2563eb" },
	{ key: "accentDark", label: "Accent Dark", defaultValue: "#1d4ed8" },
	{ key: "accentLight", label: "Accent Light", defaultValue: "#60a5fa" },
	{ key: "accentSoft", label: "Accent Soft", defaultValue: "#dbeafe" },
	{ key: "heroStart", label: "Hero Start", defaultValue: "#2563eb" },
	{ key: "heroEnd", label: "Hero End", defaultValue: "#7c3aed" },
];

const DEFAULT_RGB = "37,99,235";

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

	const rgbToHex = (rgb = DEFAULT_RGB) => {
		const parts = rgb.split(",").map((n) => Number(n.trim()));

		if (parts.length !== 3 || parts.some(Number.isNaN)) {
			return "#2563eb";
		}

		return (
			"#" + parts.map((n) => n.toString(16).padStart(2, "0")).join("")
		);
	};

	const hexToRgb = (hex) => {
		const r = parseInt(hex.slice(1, 3), 16);
		const g = parseInt(hex.slice(3, 5), 16);
		const b = parseInt(hex.slice(5, 7), 16);

		return `${r},${g},${b}`;
	};

	return (
		<div className="form-grid">
			{COLOR_FIELDS.map(({ key, label, defaultValue }) => (
				<Field key={key} label={label}>
					<div className="color-field">
						<Input
							type="color"
							value={theme[key] || defaultValue}
							onChange={(e) =>
								updateField(key, e.target.value)
							}
						/>
						<span>{theme[key] || defaultValue}</span>
					</div>
				</Field>
			))}

			<Field label="Accent RGB">
				<div className="color-field">
					<Input
						type="color"
						value={rgbToHex(theme.accentRgb)}
						onChange={(e) =>
							updateField("accentRgb", hexToRgb(e.target.value))
						}
					/>
					<span>{theme.accentRgb || DEFAULT_RGB}</span>
				</div>
			</Field>
		</div>
	);
}