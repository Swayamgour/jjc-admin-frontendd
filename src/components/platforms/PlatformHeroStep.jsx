import { Field, Input, Textarea } from "../ui/UI";

export default function PlatformHeroStep({ form, setForm }) {
	const hero = form.hero;

	const updateHero = (key, value) => {
		setForm({
			...form,
			hero: {
				...hero,
				[key]: value,
			},
		});
	};

	return (
		<div className="form-grid">
			<Field label="Heading">
				<Input
					value={hero.heading}
					onChange={(e) => updateHero("heading", e.target.value)}
				/>
			</Field>

			<Field label="Highlighted Heading">
				<Input
					value={hero.highlightedHeading}
					onChange={(e) => updateHero("highlightedHeading", e.target.value)}
				/>
			</Field>

			<Field label="Description">
				<Textarea
					rows={4}
					value={hero.description}
					onChange={(e) => updateHero("description", e.target.value)}
				/>
			</Field>

			<Field label="Sub Description">
				<Textarea
					rows={3}
					value={hero.subDescription}
					onChange={(e) => updateHero("subDescription", e.target.value)}
				/>
			</Field>

			<Field label="Badges (comma separated)">
				<Input
					placeholder="Microsoft Partner, ISO Certified"
					value={(hero.badges || []).join(", ")}
					onChange={(e) =>
						updateHero(
							"badges",
							e.target.value
								.split(",")
								.map((item) => item.trim())
								.filter(Boolean),
						)
					}
				/>
			</Field>

			<Field label="Hero Image">
				<Input
					type="file"
					accept="image/*"
					onChange={(e) => updateHero("image", e.target.files?.[0] || null)}
				/>
			</Field>

			{hero.image && (
				<img
					className="hero-preview"
					src={
						hero.image instanceof File
							? URL.createObjectURL(hero.image)
							: hero.image.url
					}
					alt="Hero Preview"
				/>
			)}
		</div>
	);
}
