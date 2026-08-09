"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import {
  updateWorkspace,
  deleteWorkspace,
} from "@/services/workspace.service";

interface Props {
  workspace: any;
}

export default function WorkspaceSettings({
  workspace,
}: Props) {
  const [name, setName] = useState(workspace.name);

  const router = useRouter();

  const queryClient = useQueryClient();

  const updateMutation = useMutation({
    mutationFn: () =>
      updateWorkspace(
        workspace.id,
        name
      ),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["workspace", workspace.id],
      });

      queryClient.invalidateQueries({
        queryKey: ["workspaces"],
      });

      alert("Workspace updated.");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: () =>
      deleteWorkspace(workspace.id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["workspaces"],
      });

      router.push("/dashboard/workspaces");
    },
  });

  return (
    <div className="border rounded-xl p-6 mt-6">

      <h2 className="text-xl font-bold mb-6">
        Workspace Settings
      </h2>

      <div className="space-y-6">

        <div>

          <label className="block mb-2 font-medium">
            Workspace Name
          </label>

          <input
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            className="border rounded-lg p-3 w-full"
          />

          <button
            className="bg-black text-white rounded-lg px-5 py-2 mt-4"
            disabled={
              updateMutation.isPending
            }
            onClick={() =>
              updateMutation.mutate()
            }
          >
            {updateMutation.isPending
              ? "Saving..."
              : "Save Changes"}
          </button>

        </div>

        <div className="border-t pt-6">

          <h3 className="text-lg font-bold text-red-600">
            Danger Zone
          </h3>

          <p className="text-gray-500 mt-2">
            Deleting this workspace cannot be undone.
          </p>

          <button
            className="mt-4 border border-red-500 text-red-600 rounded-lg px-5 py-2 hover:bg-red-50"
            disabled={
              deleteMutation.isPending
            }
            onClick={() => {

              const confirmed =
                window.confirm(
                  "Delete this workspace permanently?"
                );

              if (!confirmed) return;

              deleteMutation.mutate();

            }}
          >
            {deleteMutation.isPending
              ? "Deleting..."
              : "Delete Workspace"}
          </button>

        </div>

      </div>

    </div>
  );
}