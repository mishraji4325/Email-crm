"use client";

import { useState } from "react";

interface Field {
    name: string;
    label: string;
    type?: string;
    placeholder?: string;
}

interface CreateEntityModalProps {
    open: boolean;
    title: string;
    buttonText: string;
    fields?: Field[];
    initialValues?: Record<string, string>;
    onClose: () => void;
    onSubmit: (value: any) => void;
}

export default function CreateEntityModal({
    open,
    title,
    buttonText,
    fields = [],
    initialValues,
    onClose,
    onSubmit,
}: CreateEntityModalProps) {

    const [values, setValues] =
        useState<Record<string, string>>({});


    if (!open) {
        return null;
    }


    const handleChange = (
        name: string,
        value: string
    ) => {

        setValues((current) => ({
            ...current,
            [name]: value,
        }));

    };


    const handleSubmit = (
      e: React.FormEvent
  ) => {
  
      e.preventDefault();
  
      if (fields.length === 1) {

          const fieldName = fields[0]!.name;

          const value =
              values[fieldName] || "";
  
          onSubmit(value);
  
          return;
      }
  
      onSubmit(values);
  };


    return (

        <div className="
            fixed
            inset-0
            z-50
            flex
            items-center
            justify-center
            bg-black/70
            backdrop-blur-sm
            p-4
        ">

            <div className="
                w-full
                max-w-md
                overflow-hidden
                rounded-2xl
                border
                border-white/10
                bg-[#0d1526]
                shadow-2xl
            ">

                {/* Header */}

                <div className="
                    border-b
                    border-white/10
                    px-6
                    py-5
                ">

                    <div className="
                        flex
                        items-center
                        justify-between
                    ">

                        <div>

                            <h2 className="
                                text-lg
                                font-semibold
                                text-white
                            ">
                                {title}
                            </h2>

                            <p className="
                                mt-1
                                text-xs
                                text-gray-500
                            ">
                                Create a new item
                            </p>

                        </div>


                        <button
                            type="button"
                            onClick={onClose}
                            className="
                                flex
                                h-8
                                w-8
                                items-center
                                justify-center
                                rounded-lg
                                text-gray-500
                                hover:bg-white/5
                                hover:text-white
                            "
                        >
                            ✕
                        </button>

                    </div>

                </div>


                {/* Form */}

                <form
                    onSubmit={handleSubmit}
                    className="p-6"
                >

                    <div className="space-y-5">

                        {fields.map((field) => (

                            <div key={field.name}>

                                <label className="
                                    mb-2
                                    block
                                    text-sm
                                    font-medium
                                    text-gray-300
                                ">
                                    {field.label}
                                </label>


                                <input
                                    type={
                                        field.type ||
                                        "text"
                                    }
                                    value={
                                        values[
                                            field.name
                                        ] || ""
                                    }
                                    onChange={(e) =>
                                        handleChange(
                                            field.name,
                                            e.target.value
                                        )
                                    }
                                    placeholder={
                                        field.placeholder
                                    }
                                    className="
                                        h-11
                                        w-full
                                        rounded-xl
                                        border
                                        border-white/10
                                        bg-[#111a2b]
                                        px-4
                                        text-sm
                                        text-white
                                        outline-none
                                        placeholder:text-gray-600
                                        focus:border-[#f4bb4f]/50
                                        focus:ring-2
                                        focus:ring-[#f4bb4f]/10
                                    "
                                />

                            </div>

                        ))}

                    </div>


                    {/* Footer */}

                    <div className="
                        mt-7
                        flex
                        justify-end
                        gap-3
                        border-t
                        border-white/10
                        pt-5
                    ">

                        <button
                            type="button"
                            onClick={onClose}
                            className="
                                rounded-xl
                                border
                                border-white/10
                                px-4
                                py-2.5
                                text-sm
                                font-medium
                                text-gray-400
                                hover:bg-white/5
                                hover:text-white
                            "
                        >
                            Cancel
                        </button>


                        <button
                            type="submit"
                            className="
                                rounded-xl
                                bg-[#f4bb4f]
                                px-5
                                py-2.5
                                text-sm
                                font-semibold
                                text-black
                                hover:bg-[#f4bb4f]/90
                            "
                        >
                            {buttonText}
                        </button>

                    </div>

                </form>

            </div>

        </div>

    );
}