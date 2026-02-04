/*"use client";
import { useState, useEffect, use } from "react";
import { useTranslation } from "react-i18next";
import { capitalizeFirstLetter, toLowerIfKey } from "../lib/stringUtils";

function DynamicForm({ fields = [], onSubmit }) {
  const { t } = useTranslation();
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
              <option value=""></option>
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
        <button type="submit" className="px-4 py-2 bg-main-pink text-white rounded">{t("Submit")}</button>
      </div>
    </form>
  );
}*/

"use client";

import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "next/navigation";
import Image from "next/image";

function safeParseOptions(value) {
  if (!value) return [];
  if (Array.isArray(value)) return value;
  if (typeof value === "object") return Object.values(value);

  try {
    return JSON.parse(value);
  } catch {
    return [];
  }
}

export default function TestForm() {
  const { t, i18n } = useTranslation();
  const { id } = useParams();

  const [questions, setQuestions] = useState([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);

  const lang = i18n.language === "fr" ? "fr" : "en";

  // Fetch questions
  useEffect(() => {
    if (!id) return;

    setLoading(true);
    fetch(`/api/personality-tests/${id}`)
    .then(res => res.json())
    .then(({ success, data }) => {
      if (!success) throw new Error("API error");

      const rows = Array.isArray(data) ? data : [data];

      const qs = rows.map(q => {
        const opts = safeParseOptions(q[`options_${lang}`]);

        return {
          id: q.key,
          label: q[`label_${lang}`],
          options: opts.map(opt => ({
            value: opt,
            label: opt,
          })),
        };
      });

      setQuestions(qs);
      setCurrentIdx(0);
      setAnswers({});
    })
    .catch(err => {
      setError(err.message);
    })
    .finally(() => {
      setLoading(false);
    });
  }, [id, lang]);

  function handleAnswer(value) {
    const q = questions[currentIdx];
    const nextAnswers = { ...answers, [q.id]: value };

    setAnswers(nextAnswers);

    if (currentIdx < questions.length - 1) {
      setCurrentIdx(idx => idx + 1);
    } else {
      submitAnswers(nextAnswers);
    }
  }

  async function submitAnswers(finalAnswers) {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/personality-tests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          test_id: id,
          answers: finalAnswers,
        }),
      });

      if (!res.ok) throw new Error("API error");
      setSubmitted(true);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  // ───────────────── UI STATES ─────────────────

  if (loading) return <div>{t("Loading...")}</div>;
  if (error) return <div className="text-red-500">{error}</div>;
  if (submitted)
    return <div className="text-green-600">{t("Test submitted! Thank you.")}</div>;

  if (!questions.length || !questions[currentIdx]) {
    return <div>{t("No questions available")}</div>;
  }

  const q = questions[currentIdx];

  return (
    <div className="max-w-xl mx-auto">
      <div className="mb-6">
        <div className="flex gap-spacing-positive-md">
          <Image
            src="/buddy/wink.svg"
            alt="Buddy winking"
            width={100.369}
            height={200}
          />
          <h1>{q.label}</h1>
        </div>

        <ul className="space-y-2">
          {q.options.map(opt => (
            <li key={opt.value}>
              <button
                className="px-4 py-2 bg-grey-50 border border-radius-radius-m border-border-buttons-secondary-default text-grey-950 rounded w-full"
                onClick={() => handleAnswer(opt.value)}
              >
                <p>{opt.label}</p>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
