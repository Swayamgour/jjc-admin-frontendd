import { Btn, Field, Input, Textarea } from "../ui/UI";


export default function DynamicCardStep({
	title,
	section,
	onChange
}) {


	const items = section?.items || [];



	const updateSection = (field, value) => {


		onChange({

			...section,

			[field]: value

		});


	};




	const addItem = () => {


		onChange({


			...section,


			items: [

				...items,


				{
					icon: "",
					title: "",
					subtitle: "",
					description: ""
				}


			]


		});


	};






	const updateItem = (index, field, value) => {


		const updated = [...items];


		updated[index] = {

			...updated[index],

			[field]: value

		};



		onChange({


			...section,


			items: updated


		});



	};






	const removeItem = (index) => {


		onChange({


			...section,


			items: items.filter(
				(_, i) => i !== index
			)


		});


	};








	return (


		<div>



			{/* SECTION DATA */}


			<div className="form-grid">



				<Field label={`${title} Tag`}>


					<Input

						value={section?.tag || ""}


						onChange={(e) =>

							updateSection(
								"tag",
								e.target.value
							)

						}


						placeholder="Section tag"

					/>


				</Field>






				<Field label={`${title} Title`}>


					<Input

						value={section?.title || ""}


						onChange={(e) =>

							updateSection(
								"title",
								e.target.value
							)

						}


						placeholder="Section title"

					/>


				</Field>








				<Field label={`${title} Subtitle`}>


					<Input

						value={section?.subtitle || ""}


						onChange={(e) =>

							updateSection(
								"subtitle",
								e.target.value
							)

						}


						placeholder="Section subtitle"

					/>


				</Field>




			</div>








			<div className="dynamic-header">


				<h3>
					{title} Items
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

								No {title.toLowerCase()} added yet.

							</p>


							<Btn
								type="button"
								onClick={addItem}
							>

								Add {title}

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

										value={item.icon || ""}


										onChange={(e) =>

											updateItem(

												index,

												"icon",

												e.target.value

											)

										}


										placeholder="lucide icon"

									/>


								</Field>







								<Field label="Title">


									<Input


										value={item.title || ""}


										onChange={(e) =>

											updateItem(

												index,

												"title",

												e.target.value

											)

										}


									/>


								</Field>








								<Field label="Subtitle">


									<Input


										value={item.subtitle || ""}


										onChange={(e) =>

											updateItem(

												index,

												"subtitle",

												e.target.value

											)

										}


									/>


								</Field>








								<Field label="Description">


									<Textarea

										rows={4}


										value={
											item.description || ""
										}


										onChange={(e) =>

											updateItem(

												index,

												"description",

												e.target.value

											)

										}

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