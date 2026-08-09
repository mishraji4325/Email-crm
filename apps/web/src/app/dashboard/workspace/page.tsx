"use client";

import { useState } from "react";

import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import {
  getWorkspaces,
  createWorkspace,
} from "@/services/workspace.service";

import EntityCard from "@/components/common/entityCard";
import EntityModal from "@/components/common/entityModal";
import SearchBar from "@/components/common/searchBar";
import SectionHeader from "@/components/common/sectionHeader";
import EmptyState from "@/components/common/emptyState";


export default function WorkSpacePage(){
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState("");

  const { data, isLoading } = useQuery({
    queryKey: ["workspaces"],
    queryFn: getWorkspaces,
  });

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: createWorkspace,
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["workspaces"],
      });
      setOpen(false);
    },
  });

  const filteredWorkspaces =
    data?.filter((workspace: any) =>
      workspace.name
        .toLowerCase()
        .includes(search.toLowerCase())
    );

  return (
    <div className="p-6">
      <SectionHeader
        title="Workspaces"
        buttonText="+ New Workspace"
        onClick={() => setOpen(true)}
      />

      <SearchBar
        value={search}
        placeholder="Search Workspace..."
        onChange={setSearch}
      />

      {
        filteredWorkspaces?.length === 0
          ?
          <EmptyState
            title="No Workspaces"
            description="Create your first workspace."
          />
          :
          <div className="grid gap-6 mt-6">
            {
              filteredWorkspaces?.map((workspace: any) => (
                <EntityCard
                  key={workspace.id}
                  emoji="🏢"
                  title={workspace.name}
                  subtitle={`Created ${new Date(
                    workspace.createdAt
                  ).toLocaleDateString()}`}
                  href={`/dashboard/workspace/${workspace.id}`}
                  stats={[
                    {
                      label: "Members",
                      value: workspace.users.length
                    }
                  ]}
                />
              ))
            }
          </div>
      }

      <EntityModal
        open={open}
        title="Create Workspace"
        buttonText="Create"
        fields={[
          {
            name: "name",
            label: "Workspace Name"
          }
        ]}
        onClose={() =>
          setOpen(false)
        }
        onSubmit={(values) => {
          mutation.mutate(values.name);
        }}
      />
    </div>
  );
}