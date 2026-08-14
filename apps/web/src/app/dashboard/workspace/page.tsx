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


import SearchBar from "@/components/common/searchBar";
import EmptyState from "@/components/common/emptyState";

import {
  Card,
  CardContent,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";

import Link from "next/link";
import CreateEntityModal from "@/components/common/entityModal";


export default function WorkSpacePage() {

  const [search, setSearch] =
    useState("");

  const [open, setOpen] =
    useState(false);


  /* ========================================= */
  /* FETCH WORKSPACES */
  /* ========================================= */

  const {
    data,
    isLoading,
    isError,
  } = useQuery({

    queryKey: ["workspaces"],

    queryFn: getWorkspaces,

  });


  const queryClient =
    useQueryClient();


  /* ========================================= */
  /* CREATE WORKSPACE */
  /* ========================================= */

  const mutation =
    useMutation({

      mutationFn: createWorkspace,

      onSuccess() {

        queryClient.invalidateQueries({
          queryKey: ["workspaces"],
        });

        setOpen(false);

      },

    });


  /* ========================================= */
  /* LOADING */
  /* ========================================= */

  if (isLoading) {

    return (
      <div className="space-y-6">
        <div className="h-10 w-48 animate-pulse rounded-lg bg-[#111a2b]" />
        <div className="h-12 animate-pulse rounded-xl bg-[#111a2b]" />
        <div className="h-48 animate-pulse rounded-xl bg-[#111a2b]" />
      </div>
    );

  }


  /* ========================================= */
  /* ERROR */
  /* ========================================= */

  if (isError) {

    return (

      <EmptyState

        title="Unable to load workspaces"

        description="
                    Something went wrong while loading
                    your workspaces.
                "

        action={

          <Button
            onClick={() =>
              window.location.reload()
            }
          >
            Try Again
          </Button>

        }

      />

    );

  }


  /* ========================================= */
  /* FILTER */
  /* ========================================= */

  const filteredWorkspaces =
    data?.filter(
      (workspace: any) =>
        workspace.name
          .toLowerCase()
          .includes(
            search.toLowerCase()
          )
    ) || [];


  return (

    <div className="space-y-8">


      {/* ========================================= */}
      {/* HEADER */}
      {/* ========================================= */}

      <div className="
                flex
                flex-col
                gap-4
                sm:flex-row
                sm:items-center
                sm:justify-between
            ">

        <div>

          <div className="
                        mb-2
                        text-[10px]
                        font-medium
                        uppercase
                        tracking-[0.2em]
                        text-[#f4bb4f]
                    ">
            Organization
          </div>

          <h1 className="
                        text-3xl
                        font-semibold
                        text-white
                    ">
            Workspaces
          </h1>

          <p className="
                        mt-1
                        text-sm
                        text-gray-500
                    ">
            Manage your teams and workspace
            environments.
          </p>

        </div>


        <Button
          onClick={() =>
            setOpen(true)
          }
        >
          + New Workspace
        </Button>

      </div>


      {/* ========================================= */}
      {/* SEARCH */}
      {/* ========================================= */}

      <Card>

        <CardContent className="p-4">

          <SearchBar
            value={search}
            placeholder="Search workspaces..."
            onChange={setSearch}
          />

        </CardContent>

      </Card>


      {/* ========================================= */}
      {/* WORKSPACE LIST */}
      {/* ========================================= */}

      {filteredWorkspaces.length === 0 ? (

        <EmptyState

          title={
            search
              ? "No workspaces found"
              : "No workspaces yet"
          }

          description={
            search
              ? "Try another search."
              : "Create your first workspace to get started."
          }

          action={
            !search && (

              <Button
                onClick={() =>
                  setOpen(true)
                }
              >
                + Create Workspace
              </Button>

            )
          }

        />

      ) : (

        <div className="
                    grid
                    grid-cols-1
                    gap-5
                    md:grid-cols-2
                    xl:grid-cols-3
                ">

          {filteredWorkspaces.map(
            (workspace: any) => {

              const members =
                workspace.users
                  ?.length || 0;


              return (

                <Card
                  key={
                    workspace.id
                  }
                  className="
                                        transition
                                        hover:border-white/20
                                    "
                >

                  <CardContent className="
                                        p-6
                                    ">

                    {/* HEADER */}

                    <div className="
                                            flex
                                            items-start
                                            justify-between
                                            gap-4
                                        ">

                      <div className="
                                                flex
                                                min-w-0
                                                items-center
                                                gap-3
                                            ">

                        <div className="
                                                    flex
                                                    h-11
                                                    w-11
                                                    shrink-0
                                                    items-center
                                                    justify-center
                                                    rounded-xl
                                                    border
                                                    border-[#f4bb4f]/20
                                                    bg-[#f4bb4f]/10
                                                    text-lg
                                                ">
                          🏢
                        </div>


                        <div className="
                                                    min-w-0
                                                ">

                          <h2 className="
                                                        truncate
                                                        text-lg
                                                        font-semibold
                                                        text-white
                                                    ">
                            {
                              workspace.name
                            }
                          </h2>

                          <p className="
                                                        mt-1
                                                        text-xs
                                                        text-gray-600
                                                    ">
                            Created{" "}
                            {new Date(
                              workspace.createdAt
                            ).toLocaleDateString()}
                          </p>

                        </div>

                      </div>

                    </div>


                    {/* STATS */}

                    <div className="
                                            mt-6
                                            rounded-xl
                                            border
                                            border-white/5
                                            bg-[#111a2b]
                                            p-4
                                        ">

                      <p className="
                                                text-[10px]
                                                uppercase
                                                tracking-[0.15em]
                                                text-gray-600
                                            ">
                        Team Members
                      </p>

                      <div className="
                                                mt-2
                                                flex
                                                items-end
                                                justify-between
                                            ">

                        <p className="
                                                    text-2xl
                                                    font-semibold
                                                    text-[#f4bb4f]
                                                ">
                          {members}
                        </p>

                        <p className="
                                                    text-xs
                                                    text-gray-600
                                                ">
                          member
                          {members !== 1
                            ? "s"
                            : ""}
                        </p>

                      </div>

                    </div>


                    {/* ACTION */}

                    <Link
                      href={`/dashboard/workspace/${workspace.id}`}
                      className="
                                                mt-5
                                                block
                                            "
                    >

                      <Button
                        variant="secondary"
                        className="
                                                    w-full
                                                "
                      >
                        Open Workspace →
                      </Button>

                    </Link>

                  </CardContent>

                </Card>

              );

            }
          )}

        </div>

      )}


      {/* ========================================= */}
      {/* CREATE MODAL */}
      {/* ========================================= */}

      <CreateEntityModal
        open={open}
        title="Create Campaign"
        buttonText="Create Campaign"
        fields={[
          {
            name: "name",
            label: "Campaign Name",
            placeholder: "Enter campaign name",
          },
        ]}
        onClose={() => setOpen(false)}
        onSubmit={(value) => {

          console.log("CAMPAIGN MODAL VALUE:", value);

          if (!value.trim()) {
            return;
          }

          mutation.mutate(value);
        }}
      />

    </div>

  );
}