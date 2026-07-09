import { Btn, Field, Input, Textarea } from "../ui/UI";


export default function IndustryExamplesStep({
	form,
	setForm
}) {


	const industry =
		form.industryExamples;


	const items =
		industry.items || [];





	const updateSection = (field, value) => {


		setForm({

			...form,

			industryExamples: {

				...industry,

				[field]: value

			}

		});


	};






	const addItem = () => {


		setForm({

			...form,

			industryExamples: {


				...industry,


				items: [

					...items,


					{
						icon: "",
						industry: "",
						example: ""
					}

				]


			}


		});


	};








	const updateItem = (
		index,
		field,
		value
	) => {


		const updated =
			[...items];



		updated[index] = {

			...updated[index],

			[field]: value

		};




		setForm({


			...form,


			industryExamples: {


				...industry,


				items: updated


			}


		});


	};








	const removeItem = (index) => {


		setForm({


			...form,


			industryExamples: {


				...industry,


				items:

					items.filter(
						(_, i) => i !== index
					)


			}


		});


	};








	return (

		<div>





			{/* SECTION INFO */}



			<div className="form-grid">



				<Field label="Industry Tag">


					<Input


						value={industry.tag || ""}


						onChange={(e) =>

							updateSection(
								"tag",
								e.target.value
							)

						}


						placeholder="Industries"


					/>


				</Field>









				<Field label="Industry Title">


					<Input


						value={
							industry.title || ""
						}


						onChange={(e) =>

							updateSection(
								"title",
								e.target.value
							)

						}


						placeholder="Industries We Support"


					/>


				</Field>








				<Field label="Industry Subtitle">


					<Input


						value={
							industry.subtitle || ""
						}


						onChange={(e) =>

							updateSection(
								"subtitle",
								e.target.value
							)

						}


					/>


				</Field>




			</div>










			<div className="dynamic-header">


				<h3>

					Industry Items

				</h3>




				<Btn

					type="button"

					onClick={addItem}

				>


					Add


				</Btn>


			</div>









			<div className="dynamic-cards">



				{


					items.length === 0

						?


						<div className="dynamic-empty">


							<p>

								No industry examples added.

							</p>



							<Btn

								type="button"

								onClick={addItem}

							>

								Add Industry

							</Btn>



						</div>


						:



						items.map((item, index) => (



							<div

								key={index}

								className="dynamic-card"

							>








								<Field label="Icon">


									<Input


										value={
											item.icon || ""
										}


										onChange={(e) =>

											updateItem(

												index,

												"icon",

												e.target.value

											)

										}


										placeholder="Building"


									/>


								</Field>









								<Field label="Industry">


									<Input


										value={
											item.industry || ""
										}


										onChange={(e) =>

											updateItem(

												index,

												"industry",

												e.target.value

											)

										}


										placeholder="Healthcare"


									/>


								</Field>










								<Field label="Example">


									<Textarea


										rows={4}


										value={
											item.example || ""
										}


										onChange={(e) =>

											updateItem(

												index,

												"example",

												e.target.value

											)

										}


										placeholder="Industry solution example"


									/>


								</Field>











								<Btn

									variant="danger"

									type="button"

									onClick={() =>

										removeItem(index)

									}

								>


									Remove


								</Btn>






							</div>


						))

				}



			</div>






		</div>

	);

}