"use client";

import { useState } from "react";
import { Button } from "../ui/button";

interface NotesSectionProps {
    notes: any[];
    onAdd: (content: string) => void;
    onDelete: (id: string) => void;
}

export default function NotesSection({
    notes,
    onAdd,
    onDelete,
}: NotesSectionProps) {

    const [content, setContent] = useState("");

    const handleAdd = () => {

        if (!content.trim()) return;

        onAdd(content);
        setContent("");
    };

    return (
        <div className="
            rounded-2xl
            border
            border-white/10
            bg-[#0d1526]
            p-6
        ">

            {/* Header */}

            <div className="mb-5">

                <p className="
                    text-[10px]
                    font-medium
                    uppercase
                    tracking-[0.18em]
                    text-gray-600
                ">
                    Lead Notes
                </p>

                <h2 className="
                    mt-1
                    text-xl
                    font-bold
                    text-white
                ">
                    Notes
                </h2>

            </div>


            {/* Add note */}

            <div className="
                flex
                flex-col
                gap-3
                sm:flex-row
            ">

                <input
                    type="text"
                    placeholder="Write a note..."
                    value={content}
                    onChange={(e) =>
                        setContent(e.target.value)
                    }
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            handleAdd();
                        }
                    }}
                    className="
                        h-11
                        min-w-0
                        flex-1
                        rounded-xl
                        border
                        border-white/10
                        bg-[#111a2b]
                        px-4
                        text-sm
                        text-gray-200
                        outline-none
                        placeholder:text-gray-600
                        transition
                        focus:border-[#f4bb4f]/60
                        focus:ring-1
                        focus:ring-[#f4bb4f]/20
                    "
                />

                <Button
                    onClick={handleAdd}
                    disabled={!content.trim()}
                    className="
                        h-11
                        rounded-xl
                        bg-[#f4bb4f]
                        px-5
                        font-medium
                        text-black
                        hover:bg-[#f4bb4f]/90
                        disabled:cursor-not-allowed
                        disabled:opacity-40
                    "
                >
                    + Add Note
                </Button>

            </div>


            {/* Notes */}

            <div className="mt-6">

                {notes.length === 0 ? (

                    <div className="
                        rounded-xl
                        border
                        border-dashed
                        border-white/10
                        bg-white/[0.02]
                        p-8
                        text-center
                    ">

                        <div className="
                            mx-auto
                            flex
                            h-10
                            w-10
                            items-center
                            justify-center
                            rounded-xl
                            bg-white/[0.04]
                        ">
                            📝
                        </div>

                        <p className="
                            mt-3
                            text-sm
                            text-gray-500
                        ">
                            No notes yet.
                        </p>

                        <p className="
                            mt-1
                            text-xs
                            text-gray-600
                        ">
                            Add a note to keep track of important lead information.
                        </p>

                    </div>

                ) : (

                    <div className="space-y-3">

                        {notes.map((note: any) => (

                            <div
                                key={note.id}
                                className="
                                    rounded-xl
                                    border
                                    border-white/10
                                    bg-[#111a2b]
                                    p-4
                                "
                            >

                                <div className="
                                    flex
                                    items-start
                                    justify-between
                                    gap-4
                                ">

                                    <div className="min-w-0 flex-1">

                                        <p className="
                                            whitespace-pre-wrap
                                            text-sm
                                            leading-6
                                            text-gray-300
                                        ">
                                            {note.content}
                                        </p>

                                        <p className="
                                            mt-3
                                            text-xs
                                            text-gray-600
                                        ">
                                            {new Date(
                                                note.createdAt
                                            ).toLocaleString()}
                                        </p>

                                    </div>

                                    <button
                                        type="button"
                                        onClick={() =>
                                            onDelete(note.id)
                                        }
                                        className="
                                            shrink-0
                                            rounded-lg
                                            px-3
                                            py-1.5
                                            text-xs
                                            text-red-400
                                            transition
                                            hover:bg-red-500/10
                                            hover:text-red-300
                                        "
                                    >
                                        Delete
                                    </button>

                                </div>

                            </div>

                        ))}

                    </div>

                )}

            </div>

        </div>
    );
}