"use client";

import { useState } from "react";

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

  return (
    <div className="border rounded-lg p-6">
      <h2 className="text-xl font-bold mb-4">
        Notes
      </h2>

      <div className="flex gap-2 mb-6">
        <input
          type="text"
          placeholder="Write a note..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="border rounded p-2 flex-1"
        />

        <button
          className="border rounded px-4"
          onClick={() => {
            if (!content.trim()) return;
            onAdd(content);
            setContent("");
          }}
        >
          Add
        </button>
      </div>

      {
        notes.length === 0 ? (
          <p>No notes yet.</p>
        ) : (
          notes.map((note: any) => (
            <div
              key={note.id}
              className="border rounded p-3 mb-3 flex justify-between items-center"
            >
              <div>
                <p>{note.content}</p>
                <p className="text-xs text-gray-500">
                  {new Date(note.createdAt).toLocaleString()}
                </p>
              </div>

              <button
                className="text-red-500"
                onClick={() => onDelete(note.id)}
              >
                Delete
              </button>
            </div>
          ))
        )
      }

    </div>
  );
}