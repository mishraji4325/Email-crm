"use client";

import { useState } from "react";

import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import {
  createCampaign,
  getCampaigns,
} from "@/services/campaign.service";

import {
  getCampaignStats,
} from "@/lib/utils/campaign";

import EntityModal from "@/components/common/entityModal";

import {
  Card,
  CardContent,
} from "@/components/ui/card";

import PageHeader from "@/components/ui/page-header";
import {Button} from "@/components/ui/button";
import Badge from "@/components/ui/badge";
import EmptyState from "@/components/ui/empty-state";
import LoadingState from "@/components/ui/loading-state";

import Link from "next/link";
import { Input } from "@/components/ui/input";
import CreateEntityModal from "@/components/common/entityModal";


export default function CampaignPage() {

  const [name, setName] =
    useState("");

  const [search, setSearch] =
    useState("");

  const [sort, setSort] =
    useState("newest");

  const [open, setOpen] =
    useState(false);


  const queryClient =
    useQueryClient();


  /* ================================================= */
  /* FETCH CAMPAIGNS */
  /* ================================================= */

  const {
    data,
    isLoading,
    error,
  } = useQuery({

    queryKey: ["campaigns"],

    queryFn: getCampaigns,

  });


  /* ================================================= */
  /* CREATE CAMPAIGN */
  /* ================================================= */

  const mutation = useMutation({

    mutationFn: createCampaign,

    onSuccess: () => {

      queryClient.invalidateQueries({
        queryKey: ["campaigns"],
      });

      setName("");

      setOpen(false);

    },

  });


  /* ================================================= */
  /* SEARCH + SORT */
  /* ================================================= */

  const filteredCampaigns =
    data
      ?.filter(
        (campaign: any) =>
          campaign.name
            .toLowerCase()
            .includes(
              search.toLowerCase()
            )
      )
      ?.sort(
        (a: any, b: any) => {

          if (sort === "name") {

            return a.name.localeCompare(
              b.name
            );

          }

          if (sort === "oldest") {

            return (
              new Date(
                a.createdAt
              ).getTime() -
              new Date(
                b.createdAt
              ).getTime()
            );

          }

          return (
            new Date(
              b.createdAt
            ).getTime() -
            new Date(
              a.createdAt
            ).getTime()
          );

        }
      );


  /* ================================================= */
  /* CREATE HANDLER */
  /* ================================================= */

  function handleSubmit(
    e: React.FormEvent
  ) {

    e.preventDefault();

    if (!name.trim()) {
      return;
    }

    mutation.mutate(name);

  }


  /* ================================================= */
  /* LOADING */
  /* ================================================= */

  if (isLoading) {

    return (
      <LoadingState
        text="Loading campaigns..."
      />
    );

  }


  /* ================================================= */
  /* ERROR */
  /* ================================================= */

  if (error) {

    return (
      <EmptyState
        title="Unable to load campaigns"
        description="
                    Something went wrong while
                    fetching your campaigns.
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


  return (

    <div className="space-y-8">


      {/* ================================================= */}
      {/* HEADER */}
      {/* ================================================= */}

      <PageHeader

        title="Campaigns"

        description="
                    Create, manage and track your
                    outreach campaigns.
                "

        action={

          <Button
            onClick={() =>
              setOpen(true)
            }
          >
            + New Campaign
          </Button>

        }

      />


      {/* ================================================= */}
      {/* TOP STATS */}
      {/* ================================================= */}

      <div className="
                grid
                grid-cols-1
                gap-4
                sm:grid-cols-3
            ">

        {/* Total */}

        <Card>

          <CardContent className="p-5">

            <p className="
                            text-[10px]
                            uppercase
                            tracking-[0.18em]
                            text-gray-500
                        ">
              Total Campaigns
            </p>

            <p className="
                            mt-2
                            text-3xl
                            font-semibold
                            text-white
                        ">
              {data?.length || 0}
            </p>

          </CardContent>

        </Card>


        {/* Active */}

        <Card>

          <CardContent className="p-5">

            <p className="
                            text-[10px]
                            uppercase
                            tracking-[0.18em]
                            text-gray-500
                        ">
              Active
            </p>

            <p className="
                            mt-2
                            text-3xl
                            font-semibold
                            text-emerald-400
                        ">
              {
                data?.filter(
                  (campaign: any) =>
                    campaign.emailRecords
                      ?.length > 0
                ).length || 0
              }
            </p>

          </CardContent>

        </Card>


        {/* Leads */}

        <Card>

          <CardContent className="p-5">

            <p className="
                            text-[10px]
                            uppercase
                            tracking-[0.18em]
                            text-gray-500
                        ">
              Total Leads
            </p>

            <p className="
                            mt-2
                            text-3xl
                            font-semibold
                            text-[#f4bb4f]
                        ">
              {
                data?.reduce(
                  (
                    total: number,
                    campaign: any
                  ) =>
                    total +
                    (
                      campaign
                        .campaignLeads
                        ?.length || 0
                    ),
                  0
                )
              }
            </p>

          </CardContent>

        </Card>

      </div>


      {/* ================================================= */}
      {/* SEARCH / SORT */}
      {/* ================================================= */}

      <Card>

        <CardContent className="
                    p-4
                    sm:p-5
                ">

          <div className="
                        flex
                        flex-col
                        gap-4
                        sm:flex-row
                        sm:items-end
                    ">

            {/* Search */}

            <div className="flex-1">

              <label className="
                                mb-2
                                block
                                text-[10px]
                                font-medium
                                uppercase
                                tracking-[0.18em]
                                text-gray-500
                            ">
                Search Campaigns
              </label>

              <Input
                value={search}
                onChange={(e) =>
                  setSearch(
                    e.target.value
                  )
                }
                placeholder="
                                    Search campaign...
                                "
              />

            </div>


            {/* Sort */}

            <div className="
                            w-full
                            sm:w-48
                        ">

              <label className="
                                mb-2
                                block
                                text-[10px]
                                font-medium
                                uppercase
                                tracking-[0.18em]
                                text-gray-500
                            ">
                Sort By
              </label>

              <select
                value={sort}
                onChange={(e) =>
                  setSort(
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
                                    text-gray-300
                                    outline-none
                                    focus:border-[#f4bb4f]/60
                                "
              >

                <option value="newest">
                  Newest
                </option>

                <option value="oldest">
                  Oldest
                </option>

                <option value="name">
                  Name
                </option>

              </select>

            </div>

          </div>

        </CardContent>

      </Card>


      {/* ================================================= */}
      {/* CAMPAIGN LIST */}
      {/* ================================================= */}

      {!filteredCampaigns?.length ? (

        <EmptyState

          title={
            search
              ? "No campaigns found"
              : "No campaigns yet"
          }

          description={
            search
              ? "Try a different campaign name."
              : "Create your first campaign to start your outreach."
          }

          action={
            !search && (
              <Button
                onClick={() =>
                  setOpen(true)
                }
              >
                + Create Campaign
              </Button>
            )
          }

        />

      ) : (

        <div className="
                    grid
                    grid-cols-1
                    gap-5
                    xl:grid-cols-2
                ">

          {filteredCampaigns.map(
            (campaign: any) => {

              const stats =
                getCampaignStats(
                  campaign
                );

              const isActive =
                campaign
                  .emailRecords
                  ?.length > 0;


              return (

                <Card
                  key={campaign.id}
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
                                                min-w-0
                                            ">

                        <Badge
                          variant={
                            isActive
                              ? "success"
                              : "warning"
                          }
                        >
                          {isActive
                            ? "● Active"
                            : "● Draft"
                          }
                        </Badge>

                        <h2 className="
                                                    mt-3
                                                    truncate
                                                    text-xl
                                                    font-semibold
                                                    text-white
                                                ">
                          {campaign.name}
                        </h2>

                        <p className="
                                                    mt-1
                                                    text-xs
                                                    text-gray-500
                                                ">
                          Created{" "}
                          {new Date(
                            campaign.createdAt
                          ).toLocaleDateString()}
                        </p>

                      </div>


                      {/* OPEN */}

                      <Link
                        href={`/dashboard/campaigns/${campaign.id}`}
                      >

                        <Button
                          variant="secondary"
                        >
                          Open →
                        </Button>

                      </Link>

                    </div>


                    {/* STATS */}

                    <div className="
                                            mt-6
                                            grid
                                            grid-cols-3
                                            divide-x
                                            divide-white/10
                                            rounded-xl
                                            border
                                            border-white/5
                                            bg-[#111a2b]
                                            py-4
                                        ">

                      <div className="px-4">

                        <p className="
                                                    text-[10px]
                                                    uppercase
                                                    tracking-[0.15em]
                                                    text-gray-600
                                                ">
                          Leads
                        </p>

                        <p className="
                                                    mt-1
                                                    text-xl
                                                    font-semibold
                                                    text-white
                                                ">
                          {
                            stats.totalLeads
                          }
                        </p>

                      </div>


                      <div className="px-4">

                        <p className="
                                                    text-[10px]
                                                    uppercase
                                                    tracking-[0.15em]
                                                    text-gray-600
                                                ">
                          Emails
                        </p>

                        <p className="
                                                    mt-1
                                                    text-xl
                                                    font-semibold
                                                    text-white
                                                ">
                          {
                            stats.totalEmails
                          }
                        </p>

                      </div>


                      <div className="px-4">

                        <p className="
                                                    text-[10px]
                                                    uppercase
                                                    tracking-[0.15em]
                                                    text-gray-600
                                                ">
                          Open Rate
                        </p>

                        <p className="
                                                    mt-1
                                                    text-xl
                                                    font-semibold
                                                    text-[#f4bb4f]
                                                ">
                          {
                            stats.openRate
                          }%
                        </p>

                      </div>

                    </div>

                  </CardContent>

                </Card>

              );

            }
          )}

        </div>

      )}


      {/* ================================================= */}
      {/* CREATE CAMPAIGN MODAL */}
      {/* ================================================= */}

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
        onClose={() =>
          setOpen(false)
        }

        onSubmit={(value) => {

          if (!value.trim()) {
            return;
          }

          mutation.mutate(value);

        }}

      />

    </div>
  );
}