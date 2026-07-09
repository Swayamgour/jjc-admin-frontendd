import { Field, Input, Textarea } from "../ui/UI";


export default function HeroStep({
	form,
	setForm
}) {


	const hero = form.hero;



	const previewImage =

		hero.image instanceof File

			?

			URL.createObjectURL(hero.image)

			:

			hero.image?.url;




	const updateHero = (field, value) => {


		setForm({


			...form,


			hero: {


				...hero,


				[field]: value


			}


		});


	};





	return (

		<div className="form-grid">



			<Field label="Hero Heading" required>


				<Input

					value={hero.heading || ""}


					onChange={(e) =>

						updateHero(
							"heading",
							e.target.value
						)

					}


					placeholder="Microsoft 365 Consulting Services"

				/>


			</Field>







			<Field label="Highlighted Heading">


				<Input

					value={
						hero.highlightedHeading || ""
					}


					onChange={(e) =>

						updateHero(
							"highlightedHeading",
							e.target.value
						)

					}


					placeholder="Transform Your Digital Workplace"

				/>


			</Field>








			<Field label="Hero Description">


				<Textarea

					rows={4}


					value={
						hero.description || ""
					}


					onChange={(e) =>

						updateHero(
							"description",
							e.target.value
						)

					}


					placeholder="Main hero description"

				/>


			</Field>








			<Field label="Sub Description">


				<Textarea

					rows={3}


					value={
						hero.subDescription || ""
					}


					onChange={(e) =>

						updateHero(
							"subDescription",
							e.target.value
						)

					}


					placeholder="Additional hero text"

				/>


			</Field>









			<Field label="Hero Badges (comma separated)">



				<Input


					value={
						(hero.badges || [])
							.join(", ")
					}



					onChange={(e) =>

						updateHero(

							"badges",


							e.target.value

								.split(",")

								.map(
									item => item.trim()
								)

								.filter(Boolean)

						)

					}



					placeholder="Microsoft Teams, SharePoint"

				/>


			</Field>










			<Field label="CTA Text">


				<Input


					value={hero.ctaText || ""}


					onChange={(e) =>

						updateHero(
							"ctaText",
							e.target.value
						)

					}


					placeholder="Schedule Consultation"

				/>


			</Field>









			<Field label="CTA Link">


				<Input


					value={hero.ctaLink || ""}


					onChange={(e) =>

						updateHero(
							"ctaLink",
							e.target.value
						)

					}


					placeholder="/contact"

				/>


			</Field>










			<Field
				label="Hero Image"
				hint="Upload banner image"
			>


				<input

					type="file"

					accept="image/*"


					onChange={(e) =>

						updateHero(
							"image",
							e.target.files?.[0]
						)

					}

				/>


			</Field>










			{

				previewImage && (


					<Field label="Preview">


						<img

							src={previewImage}

							alt="preview"

							className="hero-preview"

						/>


					</Field>


				)

			}




		</div>

	);

}