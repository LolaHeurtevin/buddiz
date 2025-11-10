"use client";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { capitalizeFirstLetter, toLowerIfKey } from "../lib/stringUtils";

function DynamicForm({ fields = [], onSubmit }) {
  const initialValues = fields.reduce((acc, f) => {
    if (f.type === "checkbox") acc[f.id] = f.default || false;
    else if (f.type === "radio") acc[f.id] = f.default ?? "";
    else acc[f.id] = f.default ?? "";
    return acc;
  }, {});

  const [values, setValues] = useState(initialValues);

  function handleChange(id, value) {
    setValues(prev => ({ ...prev, [id]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (onSubmit) onSubmit(values);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {fields.map(field => (
        <div key={field.id}>
          <label className="block text-sm font-medium mb-1" htmlFor={field.id}>{capitalizeFirstLetter(toLowerIfKey(field.label))}</label>
          {field.type === "text" && (
            <input id={field.id} value={values[field.id]} onChange={e => handleChange(field.id, e.target.value)} className="border p-2 rounded w-full" />
          )}

          {field.type === "textarea" && (
            <textarea id={field.id} value={values[field.id]} onChange={e => handleChange(field.id, e.target.value)} className="border p-2 rounded w-full" />
          )}

          {field.type === "select" && (
            <select id={field.id} value={values[field.id]} onChange={e => handleChange(field.id, e.target.value)} className="border p-2 rounded w-full">
              <option value="">--</option>
              {field.options?.map(opt => (
                <option key={opt.value ?? opt} value={opt.value ?? opt}>{capitalizeFirstLetter(toLowerIfKey(opt.label ?? opt))}</option>
              ))}
            </select>
          )}

          {field.type === "radio" && (
            <div className="flex gap-4">
              {field.options?.map(opt => (
                <label key={opt.value ?? opt} className="flex items-center gap-2">
                  <input type="radio" name={field.id} value={opt.value ?? opt} checked={values[field.id] === (opt.value ?? opt)} onChange={e => handleChange(field.id, e.target.value)} />
                  <span>{capitalizeFirstLetter(toLowerIfKey(opt.label ?? opt))}</span>
                </label>
              ))}
            </div>
          )}

          {field.type === "checkbox" && (
            <label className="flex items-center gap-2">
              <input type="checkbox" id={field.id} checked={values[field.id]} onChange={e => handleChange(field.id, e.target.checked)} />
              <span>{capitalizeFirstLetter(toLowerIfKey(field.help ?? field.label))}</span>
            </label>
          )}
        </div>
      ))}

      <div>
        <button type="submit" className="px-4 py-2 bg-main-pink text-white rounded">Submit</button>
      </div>
    </form>
  );
}

export default function TestForm() {
  const { t } = useTranslation();
  const sampleFields = [
    { id: "question_1", label: t("question_1"), type: "select", options: [{ value: t("sports"), label: t("sports") }, { value: t("sewing"), label: t("sewing") }] },
    { id: "question_2", label: t("question_2"), type: "radio", options: ["less than once a week", "once a week", "more than one a week"]  },
    { id: "question_3", label: t("question_3"), type: "radio", options: [t("brazil"), t("south africa"), t("greece")] },
    { id: "question_4", label: t("question_4"), type: "select", options: [{ value: t("rock"), label: t("rock") }, { value: t("pop"), label: t("pop") }] },
    { id: "question_5", label: t("question_5"), type: "checkbox", options: [{ value: t("invisibility"), label: t("invisibility") }, { value: t("superstrenght"), label: t("superstrenght") }] },
  ];

  function handleSubmit(values) {
    // For now, just log. Replace with fetch to API or state management.
    console.log("Form values:", values);
    alert("Submitted: " + JSON.stringify(values));
  }

  return (
      <DynamicForm fields={sampleFields} onSubmit={handleSubmit} />
  );
}