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

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import {Button} from "@/components/ui/button";

interface Props {
    workspace: any;
}

export default function WorkspaceSettings({
    workspace,
}: Props) {

    const [
        name,
        setName,
    ] = useState(
        workspace.name
    );


    const router =
        useRouter();


    const queryClient =
        useQueryClient();


    /* ========================================= */
    /* UPDATE */
    /* ========================================= */

    const updateMutation =
        useMutation({

            mutationFn: () =>
                updateWorkspace(
                    workspace.id,
                    name
                ),

            onSuccess: () => {

                queryClient.invalidateQueries({
                    queryKey: [
                        "workspace",
                        workspace.id,
                    ],
                });

                queryClient.invalidateQueries({
                    queryKey: [
                        "workspaces",
                    ],
                });

                alert(
                    "Workspace updated."
                );

            },

        });


    /* ========================================= */
    /* DELETE */
    /* ========================================= */

    const deleteMutation =
        useMutation({

            mutationFn: () =>
                deleteWorkspace(
                    workspace.id
                ),

            onSuccess: () => {

                queryClient.invalidateQueries({
                    queryKey: [
                        "workspaces",
                    ],
                });

                router.push(
                    "/dashboard/workspaces"
                );

            },

        });


    return (

        <Card className="mt-6">

            <CardHeader>

                <CardTitle>
                    Workspace Settings
                </CardTitle>

            </CardHeader>


            <CardContent>

                <div className="space-y-8">


                    {/* ================================= */}
                    {/* NAME */}
                    {/* ================================= */}

                    <div>

                        <label className="
                            mb-2
                            block
                            text-[10px]
                            font-medium
                            uppercase
                            tracking-[0.16em]
                            text-gray-500
                        ">
                            Workspace Name
                        </label>


                        <input
                            value={name}
                            onChange={(e) =>
                                setName(
                                    e.target.value
                                )
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
                                focus:border-[#f4bb4f]/60
                            "
                        />


                        <Button
                            className="mt-3"
                            disabled={
                                updateMutation.isPending ||
                                !name.trim()
                            }
                            onClick={() =>
                                updateMutation.mutate()
                            }
                        >
                            {updateMutation.isPending
                                ? "Saving..."
                                : "Save Changes"
                            }
                        </Button>

                    </div>


                    {/* ================================= */}
                    {/* DANGER ZONE */}
                    {/* ================================= */}

                    <div className="
                        border-t
                        border-white/10
                        pt-7
                    ">

                        <h3 className="
                            text-lg
                            font-semibold
                            text-red-400
                        ">
                            Danger Zone
                        </h3>


                        <p className="
                            mt-1
                            text-sm
                            text-gray-600
                        ">
                            Deleting this workspace
                            cannot be undone.
                        </p>


                        <Button
                            variant="danger"
                            className="mt-4"
                            disabled={
                                deleteMutation.isPending
                            }
                            onClick={() => {

                                const confirmed =
                                    window.confirm(
                                        "Delete this workspace permanently?"
                                    );

                                if (!confirmed) {
                                    return;
                                }

                                deleteMutation.mutate();

                            }}
                        >
                            {deleteMutation.isPending
                                ? "Deleting..."
                                : "Delete Workspace"
                            }
                        </Button>

                    </div>

                </div>

            </CardContent>

        </Card>
    );
}