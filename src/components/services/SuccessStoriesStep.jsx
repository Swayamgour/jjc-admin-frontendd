import { Btn, Field, Input, Textarea } from "../ui/UI";

export default function SuccessStoriesStep({
    title = "Success Stories",
    section = {},
    onChange,
}) {
    const stories = section?.stories || [];

    const updateSection = (field, value) => {
        onChange({
            ...section,
            [field]: value,
        });
    };

    const addStory = () => {
        onChange({
            ...section,
            stories: [
                ...stories,
                {
                    industry: "",
                    isSample: true,
                    title: "",
                    summary: "",
                    ctaLink: "",
                    outcomes: [],
                    metrics: [],
                },
            ],
        });
    };

    const updateStory = (storyIndex, field, value) => {
        const updated = [...stories];
        updated[storyIndex] = {
            ...updated[storyIndex],
            [field]: value,
        };
        onChange({
            ...section,
            stories: updated,
        });
    };

    const removeStory = (storyIndex) => {
        const updated = stories.filter((_, i) => i !== storyIndex);
        onChange({
            ...section,
            stories: updated,
        });
    };

    // ---------------- Metrics ----------------

    const addMetric = (storyIndex) => {
        const updated = [...stories];
        updated[storyIndex] = {
            ...updated[storyIndex],
            metrics: [
                ...(updated[storyIndex]?.metrics || []),
                {
                    value: "",
                    label: "",
                },
            ],
        };
        onChange({
            ...section,
            stories: updated,
        });
    };

    const updateMetric = (storyIndex, metricIndex, field, value) => {
        const updated = [...stories];
        const metrics = [...(updated[storyIndex]?.metrics || [])];
        metrics[metricIndex] = {
            ...metrics[metricIndex],
            [field]: value,
        };
        updated[storyIndex] = {
            ...updated[storyIndex],
            metrics,
        };
        onChange({
            ...section,
            stories: updated,
        });
    };

    const removeMetric = (storyIndex, metricIndex) => {
        const updated = [...stories];
        updated[storyIndex] = {
            ...updated[storyIndex],
            metrics: updated[storyIndex].metrics.filter(
                (_, i) => i !== metricIndex
            ),
        };
        onChange({
            ...section,
            stories: updated,
        });
    };

    // ---------------- Outcomes ----------------

    const addOutcome = (storyIndex) => {
        const updated = [...stories];
        updated[storyIndex] = {
            ...updated[storyIndex],
            outcomes: [
                ...(updated[storyIndex]?.outcomes || []),
                "",
            ],
        };
        onChange({
            ...section,
            stories: updated,
        });
    };

    const updateOutcome = (storyIndex, outcomeIndex, value) => {
        const updated = [...stories];
        const outcomes = [...(updated[storyIndex]?.outcomes || [])];
        outcomes[outcomeIndex] = value;
        updated[storyIndex] = {
            ...updated[storyIndex],
            outcomes,
        };
        onChange({
            ...section,
            stories: updated,
        });
    };

    const removeOutcome = (storyIndex, outcomeIndex) => {
        const updated = [...stories];
        updated[storyIndex] = {
            ...updated[storyIndex],
            outcomes: updated[storyIndex].outcomes.filter(
                (_, i) => i !== outcomeIndex
            ),
        };
        onChange({
            ...section,
            stories: updated,
        });
    };

    return (
        <div className="success-stories-step">
            {/* Section Header */}
            <div className="section-header">
                <h2>{title}</h2>
                <p className="section-description">Add success stories to showcase your impact</p>
            </div>

            {/* Section Fields */}
            <div className="form-grid">
                <Field label="Eyebrow">
                    <Input
                        value={section.eyebrow || ""}
                        onChange={(e) => updateSection("eyebrow", e.target.value)}
                        placeholder="e.g. Client Success"
                    />
                </Field>

                <Field label="Title">
                    <Input
                        value={section.title || ""}
                        onChange={(e) => updateSection("title", e.target.value)}
                        placeholder="e.g. Real Results, Real Impact"
                    />
                </Field>

                <Field label="Subtitle">
                    <Input
                        value={section.subtitle || ""}
                        onChange={(e) => updateSection("subtitle", e.target.value)}
                        placeholder="Brief description of the section"
                    />
                </Field>

                <Field label="Disclaimer">
                    <Textarea
                        rows={3}
                        value={section.disclaimer || ""}
                        onChange={(e) => updateSection("disclaimer", e.target.value)}
                        placeholder="Optional disclaimer text"
                    />
                </Field>
            </div>

            {/* Stories Management */}
            <div className="stories-management">
                <div className="management-header">
                    <h3>Stories</h3>
                    <Btn type="button" onClick={addStory} variant="primary">
                        + Add Story
                    </Btn>
                </div>

                {stories.length === 0 ? (
                    <div className="empty-state">
                        <p>No stories added yet</p>
                        <Btn type="button" onClick={addStory} variant="primary">
                            Create your first story
                        </Btn>
                    </div>
                ) : (
                    <div className="stories-list">
                        {stories.map((story, storyIndex) => (
                            <div key={storyIndex} className="story-card">
                                {/* Story Header */}
                                <div className="story-header">
                                    <span className="story-number">Story #{storyIndex + 1}</span>
                                    <Btn
                                        type="button"
                                        variant="danger"
                                        size="sm"
                                        onClick={() => removeStory(storyIndex)}
                                    >
                                        Remove
                                    </Btn>
                                </div>

                                {/* Story Fields */}
                                <div className="form-grid">
                                    <Field label="Industry">
                                        <Input
                                            value={story.industry || ""}
                                            onChange={(e) =>
                                                updateStory(storyIndex, "industry", e.target.value)
                                            }
                                            placeholder="e.g. Healthcare, Finance, Tech"
                                        />
                                    </Field>

                                    <Field label="Title">
                                        <Input
                                            value={story.title || ""}
                                            onChange={(e) =>
                                                updateStory(storyIndex, "title", e.target.value)
                                            }
                                            placeholder="e.g. How we helped X achieve Y"
                                        />
                                    </Field>

                                    <Field label="Summary">
                                        <Textarea
                                            rows={3}
                                            value={story.summary || ""}
                                            onChange={(e) =>
                                                updateStory(storyIndex, "summary", e.target.value)
                                            }
                                            placeholder="Brief summary of the success story"
                                        />
                                    </Field>

                                    <Field label="CTA Link">
                                        <Input
                                            value={story.ctaLink || ""}
                                            onChange={(e) =>
                                                updateStory(storyIndex, "ctaLink", e.target.value)
                                            }
                                            placeholder="https://example.com/case-study"
                                        />
                                    </Field>
                                </div>

                                {/* Outcomes Section */}
                                <div className="nested-section">
                                    <div className="nested-header">
                                        <h4>Key Outcomes</h4>
                                        <Btn
                                            type="button"
                                            variant="secondary"
                                            size="sm"
                                            onClick={() => addOutcome(storyIndex)}
                                        >
                                            + Add Outcome
                                        </Btn>
                                    </div>

                                    {story.outcomes && story.outcomes.length > 0 ? (
                                        <div className="outcomes-list">
                                            {story.outcomes.map((outcome, outcomeIndex) => (
                                                <div key={outcomeIndex} className="outcome-item">
                                                    <div className="outcome-input-wrapper">
                                                        <Input
                                                            value={outcome}
                                                            onChange={(e) =>
                                                                updateOutcome(
                                                                    storyIndex,
                                                                    outcomeIndex,
                                                                    e.target.value
                                                                )
                                                            }
                                                            placeholder={`Outcome ${outcomeIndex + 1}`}
                                                        />
                                                    </div>
                                                    <Btn
                                                        type="button"
                                                        variant="danger"
                                                        size="sm"
                                                        onClick={() =>
                                                            removeOutcome(storyIndex, outcomeIndex)
                                                        }
                                                    >
                                                        ×
                                                    </Btn>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="nested-empty">
                                            <p>No outcomes added</p>
                                        </div>
                                    )}
                                </div>

                                {/* Metrics Section */}
                                <div className="nested-section">
                                    <div className="nested-header">
                                        <h4>Metrics</h4>
                                        <Btn
                                            type="button"
                                            variant="secondary"
                                            size="sm"
                                            onClick={() => addMetric(storyIndex)}
                                        >
                                            + Add Metric
                                        </Btn>
                                    </div>

                                    {story.metrics && story.metrics.length > 0 ? (
                                        <div className="metrics-list">
                                            {story.metrics.map((metric, metricIndex) => (
                                                <div key={metricIndex} className="metric-item">
                                                    <div className="metric-inputs">
                                                        <Input
                                                            value={metric.value || ""}
                                                            onChange={(e) =>
                                                                updateMetric(
                                                                    storyIndex,
                                                                    metricIndex,
                                                                    "value",
                                                                    e.target.value
                                                                )
                                                            }
                                                            placeholder="Value (e.g. 150%)"
                                                        />
                                                        <Input
                                                            value={metric.label || ""}
                                                            onChange={(e) =>
                                                                updateMetric(
                                                                    storyIndex,
                                                                    metricIndex,
                                                                    "label",
                                                                    e.target.value
                                                                )
                                                            }
                                                            placeholder="Label (e.g. Revenue Growth)"
                                                        />
                                                    </div>
                                                    <Btn
                                                        type="button"
                                                        variant="danger"
                                                        size="sm"
                                                        onClick={() =>
                                                            removeMetric(storyIndex, metricIndex)
                                                        }
                                                    >
                                                        ×
                                                    </Btn>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="nested-empty">
                                            <p>No metrics added</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <style jsx>{`
        .success-stories-step {
          padding: 20px 0;
        }

        .section-header {
          margin-bottom: 30px;
        }

        .section-header h2 {
          font-size: 24px;
          font-weight: 600;
          margin: 0 0 8px 0;
          color: #1a1a1a;
        }

        .section-description {
          color: #666;
          margin: 0;
          font-size: 14px;
        }

        .form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
          margin-bottom: 20px;
        }

        .form-grid .full-width {
          grid-column: 1 / -1;
        }

        .stories-management {
          margin-top: 30px;
        }

        .management-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
          padding-bottom: 15px;
          border-bottom: 2px solid #eaeaea;
        }

        .management-header h3 {
          font-size: 18px;
          font-weight: 600;
          margin: 0;
          color: #1a1a1a;
        }

        .empty-state {
          text-align: center;
          padding: 60px 20px;
          background: #f8f9fa;
          border-radius: 8px;
          border: 2px dashed #dde1e5;
        }

        .empty-state p {
          margin: 0 0 15px 0;
          color: #666;
          font-size: 14px;
        }

        .stories-list {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .story-card {
          background: #fff;
          border: 1px solid #eaeaea;
          border-radius: 8px;
          padding: 24px;
          transition: box-shadow 0.2s;
        }

        .story-card:hover {
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
        }

        .story-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
          padding-bottom: 12px;
          border-bottom: 1px solid #f0f0f0;
        }

        .story-number {
          font-weight: 600;
          font-size: 14px;
          color: #1a1a1a;
        }

        .nested-section {
          margin-top: 20px;
          padding: 16px;
          background: #f8f9fa;
          border-radius: 6px;
        }

        .nested-section:first-of-type {
          margin-top: 24px;
        }

        .nested-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
        }

        .nested-header h4 {
          font-size: 14px;
          font-weight: 600;
          margin: 0;
          color: #1a1a1a;
        }

        .nested-empty {
          padding: 12px;
          text-align: center;
          color: #999;
          font-size: 13px;
        }

        .outcomes-list {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .outcome-item {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .outcome-input-wrapper {
          flex: 1;
        }

        .metrics-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .metric-item {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .metric-inputs {
          flex: 1;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }

        /* Responsive adjustments */
        @media (max-width: 768px) {
          .form-grid {
            grid-template-columns: 1fr;
          }

          .metric-inputs {
            grid-template-columns: 1fr;
          }

          .story-card {
            padding: 16px;
          }

          .metric-item {
            flex-wrap: wrap;
          }

          .management-header {
            flex-direction: column;
            align-items: stretch;
            gap: 12px;
          }

          .management-header .btn {
            width: 100%;
          }
        }

        /* Button sizes */
        .btn-sm {
          padding: 4px 12px;
          font-size: 12px;
        }

        /* Remove button styling */
        [variant="danger"] {
          background: #fee2e2;
          color: #991b1b;
          border: none;
          border-radius: 4px;
          padding: 4px 12px;
          cursor: pointer;
          font-size: 13px;
          transition: background 0.2s;
        }

        [variant="danger"]:hover {
          background: #fecaca;
        }

        [variant="danger"][size="sm"] {
          padding: 4px 8px;
          font-size: 14px;
          line-height: 1.5;
        }

        [variant="primary"] {
          background: #1a1a1a;
          color: #fff;
          border: none;
          border-radius: 4px;
          padding: 8px 16px;
          cursor: pointer;
          font-size: 13px;
          font-weight: 500;
          transition: background 0.2s;
        }

        [variant="primary"]:hover {
          background: #333;
        }

        [variant="secondary"] {
          background: #eaeaea;
          color: #1a1a1a;
          border: none;
          border-radius: 4px;
          padding: 4px 12px;
          cursor: pointer;
          font-size: 12px;
          transition: background 0.2s;
        }

        [variant="secondary"]:hover {
          background: #d5d5d5;
        }

        /* Input styling */
        input,
        textarea {
          width: 100%;
          padding: 8px 12px;
          border: 1px solid #dde1e5;
          border-radius: 4px;
          font-size: 14px;
          transition: border-color 0.2s;
        }

        input:focus,
        textarea:focus {
          outline: none;
          border-color: #1a1a1a;
          box-shadow: 0 0 0 3px rgba(26, 26, 26, 0.1);
        }

        textarea {
          resize: vertical;
          font-family: inherit;
        }
      `}</style>
        </div>
    );
}