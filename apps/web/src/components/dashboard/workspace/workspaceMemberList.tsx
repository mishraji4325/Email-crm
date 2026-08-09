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

interface Props {
    workspace: any;
}

export default function WorkspaceMemberList({
    workspace,
}: Props) {
    const [selectedUser, setSelectedUser] = useState("");

    const queryClient = useQueryClient();

    // Fetch users that are NOT in any workspace
    const { data: availableUsers, isLoading } = useQuery({
        queryKey: ["available-users", workspace.id],
        queryFn: () => getAvailableUsers(workspace.id),
    });

    console.log("Available Users:", availableUsers);

    // Invite Member
    const inviteMutation = useMutation({
        mutationFn: () =>
            inviteMember(workspace.id, selectedUser),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["workspace", workspace.id],
            });

            queryClient.invalidateQueries({
                queryKey: ["available-users", workspace.id],
            });

            setSelectedUser("");
        },
    });

    // Remove Member
    const removeMutation = useMutation({
        mutationFn: (userId: string) =>
            removeMember(workspace.id, userId),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["workspace", workspace.id],
            });

            queryClient.invalidateQueries({
                queryKey: ["available-users", workspace.id],
            });
        },
    });

    return (
        <div className="border rounded-xl p-6">
            <h2 className="text-xl font-bold mb-6">
                Members
            </h2>

            {/* Invite User */}
            <div className="flex gap-3 mb-6">
                <select
                    value={selectedUser}
                    onChange={(e) =>
                        setSelectedUser(e.target.value)
                    }
                    className="border rounded-lg p-2 flex-1"
                >
                    <option value="">
                        Select User
                    </option>

                    {availableUsers?.map((user: any) => (
                        <option
                            key={user.id}
                            value={user.id}
                        >
                            {user.name}
                        </option>
                    ))}
                </select>

                <button
                    className="bg-black text-white px-5 rounded-lg"
                    disabled={
                        !selectedUser ||
                        inviteMutation.isPending
                    }
                    onClick={() => inviteMutation.mutate()}
                >
                    Invite
                </button>
            </div>

            {/* Members List */}

            {workspace.users.length === 0 ? (
                <p className="text-gray-500">
                    No members yet.
                </p>
            ) : (
                workspace.users.map((user: any) => (
                    <div
                        key={user.id}
                        className="border rounded-lg p-4 mb-3 flex justify-between items-center"
                    >
                        <div>
                            <h3 className="font-semibold">
                                {user.name}
                            </h3>

                            <p className="text-gray-500">
                                {user.email}
                            </p>
                        </div>

                        <button
                            className="border border-red-500 text-red-600 rounded-lg px-3 py-1 hover:bg-red-500 transition"
                            onClick={() => {
                                const confirmed = window.confirm(
                                    `Remove ${user.name} from this workspace?`
                                );
                            
                                if (!confirmed) return;
                            
                                removeMutation.mutate(user.id);
                            }}
                        >
                            Remove
                        </button>
                    </div>
                ))
            )}

            {isLoading && (
                <p className="text-gray-500 mt-4">
                    Loading available users...
                </p>
            )}
        </div>
    );
}