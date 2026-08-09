"use client";

import { useState, useEffect } from "react";

interface Field {
  name: string;
  label: string;
  type?: "text" | "number" | "textarea";
  placeholder?: string;
}

interface CreateEntityModalProps {
  open: boolean;
  title: string;
  placeholder: string;
  buttonText: string;
  fields: Field[];
  onClose: () => void;
  onSubmit: (value: Record<string, any>) => void;
  initialValues?: Record<string, any>;
}

export default function CreateEntityModal({
  open,
  title,
  placeholder,
  buttonText,
  onClose,
  onSubmit,
  fields,
  initialValues,
}: CreateEntityModalProps) {

  const [values, setValues] = useState<Record<string, any>>({});

  useEffect(() => {
    if (open) {
      setValues(initialValues || {});
    } else {
      setValues({});
    }
  }, [open, initialValues]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
      <div className="bg-white rounded-xl p-6 w-[450px]">
        <h2 className="text-2xl font-bold mb-6">
          {title}
        </h2>

        <div className="space-y-4">
          {fields.map((field) => (
            <div key={field.name}>
              <label className="block mb-2 font-medium">
                {field.label}
              </label>
              {field.type === "textarea" ? (
                <textarea
                  className="border rounded-lg p-3 w-full"
                  rows={6}
                  placeholder={field.placeholder}
                  value={values[field.name] ?? ""}
                  onChange={(e) =>
                    setValues((prev) => ({
                      ...prev,
                      [field.name]: e.target.value,
                    }))
                  }
                />
              ) : (
                <input
                  className="border rounded-lg p-3 w-full"
                  type={field.type ?? "text"}
                  placeholder={field.placeholder}
                  value={values[field.name] ?? ""}
                  onChange={(e) =>
                    setValues((prev) => ({
                      ...prev,
                      [field.name]: e.target.value,
                    }))
                  }
                />
              )}
            </div>
          ))}

        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="border rounded-lg px-4 py-2"
          >
            Cancel
          </button>

          <button
            className="bg-black text-white rounded-lg px-4 py-2"
            onClick={() => {
              // if (!values.trim()) return;
              onSubmit(values);
              setValues({});
              onClose();
            }}
          >
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
}