"use client";

import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

import { getWorkspace } from "@/services/workspace.service";
import WorkspaceHeader from "@/components/dashboard/workspace/workspaceHeader";
import WorkspaceSummary from "@/components/dashboard/workspace/workspaceSummary";
import WorkspaceMemberList from "@/components/dashboard/workspace/workspaceMemberList";
import WorkspaceSettings from "@/components/dashboard/workspace/workspaceSettings";


export default function WorkspaceDetailsPage() {
    const params = useParams();

    const { data, isLoading } = useQuery({
        queryKey: [
            "workspace",
            params.id
        ],
        queryFn: () =>
            getWorkspace(params.id as string)
    });

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!data) {
        return <div>Workspace not found.</div>;
    }

    return (
        <div className="space-y-6">
            <WorkspaceHeader
                workspace={data}
            />

            <WorkspaceSummary
                workspace={data}
            />

            <WorkspaceMemberList
                workspace={data}
            />

            <WorkspaceSettings
                workspace={data} 
            />
        </div>
    );
}