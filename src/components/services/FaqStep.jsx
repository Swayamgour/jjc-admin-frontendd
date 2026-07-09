import { Btn, Field, Input, Textarea } from "../ui/UI";


export default function FaqStep({
	form,
	setForm
}) {


	const faqSection =
		form.faqs;


	const items =
		faqSection.items || [];




	const updateSection = (field, value) => {


		setForm({

			...form,

			faqs: {

				...faqSection,

				[field]: value

			}

		});


	};





	const addFaq = () => {


		setForm({


			...form,


			faqs: {


				...faqSection,


				items: [

					...items,

					{
						question: "",
						answer: ""
					}

				]


			}


		});


	};








	const updateFaq = (
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


			faqs: {


				...faqSection,


				items: updated


			}


		});



	};








	const removeFaq = (index) => {


		setForm({


			...form,


			faqs: {


				...faqSection,


				items:

					items.filter(
						(_, i) => i !== index
					)


			}


		});


	};









	return (

		<div>





			{/* FAQ SECTION DATA */}



			<div className="form-grid">



				<Field label="FAQ Tag">


					<Input


						value={
							faqSection.tag || ""
						}


						onChange={(e) =>

							updateSection(

								"tag",

								e.target.value

							)

						}


						placeholder="FAQs"


					/>


				</Field>








				<Field label="FAQ Title">


					<Input


						value={
							faqSection.title || ""
						}


						onChange={(e) =>

							updateSection(

								"title",

								e.target.value

							)

						}


						placeholder="Frequently Asked Questions"


					/>


				</Field>






			</div>









			<div className="dynamic-header">


				<h3>

					FAQ Items

				</h3>




				<Btn

					type="button"

					onClick={addFaq}

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

								No FAQs added yet.

							</p>




							<Btn

								type="button"

								onClick={addFaq}

							>

								Add FAQ

							</Btn>




						</div>


						:


						items.map((faq, index) => (



							<div

								key={index}

								className="dynamic-card"

							>







								<Field label="Question">


									<Input


										value={
											faq.question || ""
										}


										onChange={(e) =>

											updateFaq(

												index,

												"question",

												e.target.value

											)

										}


									/>


								</Field>









								<Field label="Answer">


									<Textarea


										rows={4}


										value={
											faq.answer || ""
										}


										onChange={(e) =>

											updateFaq(

												index,

												"answer",

												e.target.value

											)

										}


									/>


								</Field>









								<Btn

									variant="danger"

									type="button"

									onClick={() =>

										removeFaq(index)

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