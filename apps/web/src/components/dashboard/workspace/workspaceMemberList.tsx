"use client";

import { useState } from "react";

import {
    useMutation,
    useQuery,
    useQueryClient,
} from "@tanstack/react-query";

import {
    getAvailableUsers,
    inviteMember,
    removeMember,
} from "@/services/workspace.service";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/components/ui/card";

import {Button} from "@/components/ui/button";

interface Props {
    workspace: any;
}

export default function WorkspaceMemberList({
    workspace,
}: Props) {

    const [
        selectedUser,
        setSelectedUser,
    ] = useState("");

    const queryClient =
        useQueryClient();


    /* ========================================= */
    /* AVAILABLE USERS */
    /* ========================================= */

    const {
        data: availableUsers,
        isLoading,
    } = useQuery({

        queryKey: [
            "available-users",
            workspace.id,
        ],

        queryFn: () =>
            getAvailableUsers(
                workspace.id
            ),

    });


    /* ========================================= */
    /* INVITE */
    /* ========================================= */

    const inviteMutation =
        useMutation({

            mutationFn: () =>
                inviteMember(
                    workspace.id,
                    selectedUser
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
                        "available-users",
                        workspace.id,
                    ],
                });

                setSelectedUser("");

            },

        });


    /* ========================================= */
    /* REMOVE */
    /* ========================================= */

    const removeMutation =
        useMutation({

            mutationFn: (
                userId: string
            ) =>
                removeMember(
                    workspace.id,
                    userId
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
                        "available-users",
                        workspace.id,
                    ],
                });

            },

        });


    const members =
        workspace.users || [];


    return (

        <Card>

            <CardHeader>

                <CardTitle>
                    Team Members
                </CardTitle>

                <CardDescription>
                    Manage the people who have access
                    to this workspace.
                </CardDescription>

            </CardHeader>


            <CardContent>


                {/* ================================= */}
                {/* INVITE */}
                {/* ================================= */}

                <div className="
                    flex
                    flex-col
                    gap-3
                    rounded-xl
                    border
                    border-white/10
                    bg-[#111a2b]
                    p-4
                    sm:flex-row
                ">

                    <select
                        value={selectedUser}
                        onChange={(e) =>
                            setSelectedUser(
                                e.target.value
                            )
                        }
                        className="
                            h-11
                            min-w-0
                            flex-1
                            rounded-xl
                            border
                            border-white/10
                            bg-[#0d1526]
                            px-4
                            text-sm
                            text-gray-300
                            outline-none
                            focus:border-[#f4bb4f]/60
                        "
                    >

                        <option value="">
                            Select User
                        </option>

                        {availableUsers?.map(
                            (user: any) => (

                                <option
                                    key={user.id}
                                    value={user.id}
                                >
                                    {user.name}
                                </option>

                            )
                        )}

                    </select>


                    <Button
                        disabled={
                            !selectedUser ||
                            inviteMutation.isPending
                        }
                        onClick={() =>
                            inviteMutation.mutate()
                        }
                    >
                        {inviteMutation.isPending
                            ? "Inviting..."
                            : "Invite Member"
                        }
                    </Button>

                </div>


                {/* ================================= */}
                {/* MEMBERS */}
                {/* ================================= */}

                <div className="mt-5 space-y-2">

                    {members.length === 0 ? (

                        <div className="
                            rounded-xl
                            border
                            border-dashed
                            border-white/10
                            p-8
                            text-center
                        ">

                            <p className="
                                text-sm
                                text-gray-600
                            ">
                                No members yet.
                            </p>

                        </div>

                    ) : (

                        members.map(
                            (user: any) => (

                                <div
                                    key={user.id}
                                    className="
                                        flex
                                        flex-col
                                        gap-4
                                        rounded-xl
                                        border
                                        border-white/10
                                        bg-[#111a2b]
                                        p-4
                                        sm:flex-row
                                        sm:items-center
                                        sm:justify-between
                                    "
                                >

                                    <div className="
                                        flex
                                        min-w-0
                                        items-center
                                        gap-3
                                    ">

                                        <div className="
                                            flex
                                            h-10
                                            w-10
                                            shrink-0
                                            items-center
                                            justify-center
                                            rounded-full
                                            border
                                            border-white/10
                                            bg-[#0d1526]
                                            text-sm
                                            font-semibold
                                            text-[#f4bb4f]
                                        ">
                                            {user.name
                                                ?.charAt(0)
                                                ?.toUpperCase() ||
                                                "U"}
                                        </div>


                                        <div className="min-w-0">

                                            <h3 className="
                                                truncate
                                                font-medium
                                                text-white
                                            ">
                                                {user.name}
                                            </h3>

                                            <p className="
                                                truncate
                                                text-sm
                                                text-gray-500
                                            ">
                                                {user.email}
                                            </p>

                                        </div>

                                    </div>


                                    <Button
                                        variant="danger"
                                        disabled={
                                            removeMutation.isPending
                                        }
                                        onClick={() => {

                                            const confirmed =
                                                window.confirm(
                                                    `Remove ${user.name} from this workspace?`
                                                );

                                            if (!confirmed) {
                                                return;
                                            }

                                            removeMutation.mutate(
                                                user.id
                                            );

                                        }}
                                    >
                                        Remove
                                    </Button>

                                </div>

                            )
                        )

                    )}

                </div>


                {isLoading && (

                    <p className="
                        mt-4
                        text-xs
                        text-gray-600
                    ">
                        Loading available users...
                    </p>

                )}

            </CardContent>

        </Card>
    );
}