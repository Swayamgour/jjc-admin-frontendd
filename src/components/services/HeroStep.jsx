import { Field, Input, Textarea, Btn } from "../ui/UI";

export default function HeroStep({ form, setForm }) {
	const hero = form.hero || {};
	const glance = hero.glance || { title: "", items: [] };
	const stats = hero.stats || [];

	const updateHero = (field, value) => {
		setForm({
			...form,
			hero: { ...hero, [field]: value },
		});
	};

	const updateGlance = (field, value) => {
		setForm({
			...form,
			hero: {
				...hero,
				glance: { ...glance, [field]: value },
			},
		});
	};

	const addStat = () => {
		setForm({
			...form,
			hero: {
				...hero,
				stats: [...stats, { value: "", label: "" }],
			},
		});
	};

	const updateStat = (index, field, value) => {
		const updated = [...stats];
		updated[index] = { ...updated[index], [field]: value };
		setForm({
			...form,
			hero: { ...hero, stats: updated },
		});
	};

	const addGlanceItem = () => {
		updateGlance("items", [...(glance.items || []), ""]);
	};

	const updateGlanceItem = (index, value) => {
		const updated = [...(glance.items || [])];

		updated[index] = value;

		updateGlance("items", updated);
	};

	const removeGlanceItem = (index) => {
		const updated = (glance.items || []).filter(
			(_, i) => i !== index
		);

		updateGlance("items", updated);
	};

	const removeStat = (index) => {
		setForm({
			...form,
			hero: {
				...hero,
				stats: stats.filter((_, i) => i !== index),
			},
		});
	};

	return (
		<div>
			<div className="form-grid">
				<Field label="Hero Eyebrow">
					<Input
						value={hero.eyebrow || ""}
						onChange={(e) => updateHero("eyebrow", e.target.value)}
						placeholder="e.g. Strategy & Transformation"
					/>
				</Field>

				<Field label="Hero Heading" required>
					<Input
						value={hero.heading || ""}
						onChange={(e) => updateHero("heading", e.target.value)}
						placeholder="Main headline"
					/>
				</Field>

				<Field label="Hero Lede">
					<Textarea
						rows={3}
						value={hero.lede || ""}
						onChange={(e) => updateHero("lede", e.target.value)}
						placeholder="Supporting text"
					/>
				</Field>

				<Field label="Primary CTA Text">
					<Input
						value={hero.primaryCtaText || ""}
						onChange={(e) => updateHero("primaryCtaText", e.target.value)}
						placeholder="Book a consultation"
					/>
				</Field>

				<Field label="Primary CTA Link">
					<Input
						value={hero.primaryCtaLink || ""}
						onChange={(e) => updateHero("primaryCtaLink", e.target.value)}
						placeholder="/contact?topic=IT%20strategy"
					/>
				</Field>

				<Field label="Secondary CTA Text">
					<Input
						value={hero.secondaryCtaText || ""}
						onChange={(e) => updateHero("secondaryCtaText", e.target.value)}
						placeholder="See what's included"
					/>
				</Field>

				<Field label="Secondary CTA Anchor">
					<Input
						value={hero.secondaryCtaAnchor || ""}
						onChange={(e) => updateHero("secondaryCtaAnchor", e.target.value)}
						placeholder="#included"
					/>
				</Field>
			</div>

			{/* Glance Section */}
			<div className="section-divider">
				<h3>At a Glance</h3>
			</div>

			<div className="section-divider">
				<h3>Glance Items</h3>

				<Btn type="button" onClick={addGlanceItem}>
					Add Item
				</Btn>
			</div>

			{(glance.items || []).map((item, index) => (
				<div key={index} className="form-grid">
					<Field label={`Item ${index + 1}`}>
						<Input
							value={item || ""}
							onChange={(e) =>
								updateGlanceItem(index, e.target.value)
							}
							placeholder="Enter item"
						/>
					</Field>

					<Btn
						type="button"
						variant="danger"
						onClick={() => removeGlanceItem(index)}
					>
						Remove
					</Btn>
				</div>
			))}

			{/* Stats Section */}
			{/* <div className="section-divider">
				<h3>Stats</h3>
				<Btn type="button" onClick={addStat}>Add Stat</Btn>
			</div> */}

			{/* <div className="dynamic-cards">
				{stats.length === 0 ? (
					<div className="dynamic-empty">
						<p>No stats added.</p>
						<Btn type="button" onClick={addStat}>Add Stat</Btn>
					</div>
				) : (
					stats.map((stat, index) => (
						<div key={index} className="dynamic-card">
							<Field label="Value">
								<Input
									value={stat.value || ""}
									onChange={(e) => updateStat(index, "value", e.target.value)}
									placeholder="2–4 wks"
								/>
							</Field>

							<Field label="Label">
								<Input
									value={stat.label || ""}
									onChange={(e) => updateStat(index, "label", e.target.value)}
									placeholder="Typical assessment duration"
								/>
							</Field>

							<Btn variant="danger" type="button" onClick={() => removeStat(index)}>
								Remove
							</Btn>
						</div>
					))
				)}
			</div> */}
		</div>
	);
}