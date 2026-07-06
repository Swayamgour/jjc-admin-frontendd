import { Field, Input, Textarea } from "../ui/UI";

export default function HeroStep({ form, setForm }) {
	const hero = form.hero;

	const previewImage =
		hero.image instanceof File
			? URL.createObjectURL(hero.image)
			: hero.image?.url;

	const updateHero = (field, value) => {
		setForm({
			...form,
			hero: {
				...hero,
				[field]: value,
			},
		});
	};

	return (
		<div className="form-grid">
			<Field label="Hero Heading" required>
				<Input
					value={hero.heading}
					onChange={(e) => updateHero("heading", e.target.value)}
					placeholder="Transform Your Business"
				/>
			</Field>

			<Field label="Hero Sub Heading">
				<Input
					value={hero.subHeading}
					onChange={(e) => updateHero("subHeading", e.target.value)}
					placeholder="We build scalable solutions"
				/>
			</Field>

			<Field label="CTA Text">
				<Input
					value={hero.ctaText}
					onChange={(e) => updateHero("ctaText", e.target.value)}
					placeholder="Get Started"
				/>
			</Field>

			<Field label="CTA Link">
				<Input
					value={hero.ctaLink}
					onChange={(e) => updateHero("ctaLink", e.target.value)}
					placeholder="/contact"
				/>
			</Field>

			<Field label="Hero Image" hint="Upload banner image">
				<input
					type="file"
					accept="image/*"
					onChange={(e) => updateHero("image", e.target.files?.[0])}
				/>
			</Field>

			{previewImage && (
				<Field label="Preview">
					<img
						src={previewImage}
						alt="preview"
						className="hero-preview"
					/>
				</Field>
			)}
		</div>
	);
}
