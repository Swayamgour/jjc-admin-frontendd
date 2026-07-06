import { Btn, Field, Input, Textarea } from "../../ui/UI";

export default function ImplementationProcessStep({form,setForm,}) {
	const implementation = form.implementationProcess || {};

	const updateSection = (key, value) => {
		setForm({
			...form,
			implementationProcess: {
				...implementation,
				[key]: value,
			},
		});
	};

	const addStep = () => {
		updateSection("steps", [
			...(implementation.steps || []),
			{
				step: (implementation.steps?.length || 0) + 1,
				icon: "",
				title: "",
				description: "",
			},
		]);
	};

	const updateStep = (index, key, value) => {
		const steps = [...(implementation.steps || [])];

		steps[index] = {
			...steps[index],
			[key]: key === "step" ? Number(value) : value,
		};

		updateSection("steps", steps);
	};

	const removeStep = (index) => {
		const updated = (implementation.steps || [])
			.filter((_, i) => i !== index)
      .map((item, idx) => ({ ...item, step: idx + 1 }));

		updateSection("steps", updated);
	};

	return (
		<div>
			<div className="form-grid">
				<Field label="Tag">
					<Input
						value={implementation.tag || ""}
            onChange={(e) => updateSection("tag", e.target.value)}
					/>
				</Field>

				<Field label="Title">
					<Input
						value={implementation.title || ""}
            onChange={(e) => updateSection("title", e.target.value)}
					/>
				</Field>

				<Field label="Subtitle">
					<Textarea
						rows={3}
						value={implementation.subtitle || ""}
            onChange={(e) => updateSection("subtitle", e.target.value)}
					/>
				</Field>
			</div>

			<div className="dynamic-header">
				<h3>Implementation Steps</h3>

				<Btn onClick={addStep}>+ Add Step</Btn>
			</div>

			<div className="dynamic-cards">
				{(implementation.steps || []).map(
					(item, index) => (
						<div key={index} className="dynamic-card">
							<div className="form-grid">
								<Field label="Step No">
									<Input
										type="number"
										value={item.step || ""}
										onChange={(e) => updateStep(index,"step",e.target.value)}
									/>
								</Field>

								<Field label="Icon">
									<Input
										placeholder="FaCloud"
										value={item.icon || ""}
                    onChange={(e) => updateStep(index, "icon", e.target.value)}
									/>
								</Field>

								<Field label="Title">
									<Input
										value={item.title || ""}
                    onChange={(e) => updateStep(index, "title", e.target.value)}
									/>
								</Field>

								<Field label="Description">
									<Textarea
										rows={4}
										value={item.description || ""}
                    onChange={(e) => updateStep(index, "description", e.target.value)}
									/>
								</Field>
							</div>

							<Btn variant="danger" onClick={() => removeStep(index)}>
							Remove Step
						</Btn>
						</div>
					),
				)}

				{(!implementation.steps ||
					implementation.steps.length === 0) && (
					<div className="dynamic-empty">
						<p>No implementation steps added.</p>

						<Btn onClick={addStep}>Add First Step</Btn>
					</div>
				)}
			</div>
		</div>
	);
}