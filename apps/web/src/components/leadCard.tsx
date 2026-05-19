"use client";

import { useDraggable } from "@dnd-kit/core";

export default function LeadCard({ lead }: any) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: lead.id,
  });

  const style = transform
    ? {
        transform: `translate(
${transform.x}px,
${transform.y}px
)`,
      }
    : {};

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={style}
      className="border p-3 mt-2 bg-white rounded cursor-pointer"
    >
      {lead.name}
    </div>
  );
}
