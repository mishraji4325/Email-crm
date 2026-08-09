"use client";

interface ConfirmDialogProps {
  open: boolean;
  title: string;
  description: string;
  onCancel: () => void;
  onConfirm: () => void;
}

export default function ConfirmDialog({
  open,
  title,
  description,
  onCancel,
  onConfirm,
}: ConfirmDialogProps) {

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
      <div className="bg-white rounded-xl p-6 w-[450px]">
        <h2 className="text-2xl font-bold">
          {title}
        </h2>

        <p className="text-gray-500 mt-3">
          {description}
        </p>

        <div className="flex justify-end gap-3 mt-6">
          <button
            className="border rounded-lg px-4 py-2"
            onClick={onCancel}
          >
            Cancel
          </button>

          <button
            className="bg-red-600 text-white rounded-lg px-4 py-2"
            onClick={onConfirm}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}