"use client";

interface EditableCardProps {
  title: string;
  subtitle?: string;
  content?: React.ReactNode;
  onEdit?: () => void;
  onDelete?: () => void;
  children?: React.ReactNode;
}

export default function EditableCard({
  title,
  subtitle,
  content,
  onEdit,
  onDelete,
  children,
}: EditableCardProps) {

  return (

    <div className="border rounded-xl p-6 shadow-sm hover:shadow-md transition">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-xl font-semibold">
            {title}
          </h2>
          {
            subtitle && (
              <p className="text-gray-500 mt-1">
                {subtitle}
              </p>
            )
          }
        </div>

        <div className="flex gap-2">
          {
            onEdit && (
              <button
                onClick={onEdit}
                className="border rounded px-3 py-1 hover:bg-gray-100"
              >
                Edit
              </button>
            )
          }
          {
            onDelete && (
              <button
                onClick={onDelete}
                className="bg-red-600 text-white rounded px-3 py-1"
              >
                Delete
              </button>
            )
          }
        </div>
      </div>
      {
        content && (
          <div className="mt-6">
            {content}
          </div>
        )
      }
      {
        children && (
          <div className="mt-6">
            {children}
          </div>
        )
      }
    </div>
  );
}