"use client";

import { useState } from "react";

import Link from "next/link";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { createCampaign, getCampaigns } from "@/services/campaign.service";
import { getCampaignStats } from "@/lib/utils/campaign";
import EntityModal from "@/components/common/entityModal";
import EntityCard from "@/components/common/entityCard";


export default function CampaignPage() {
  const [name, setName] = useState("");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [openModal, setOpenModal] = useState("");
  const [open, setOpen] = useState("");

  
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["campaigns"],

    queryFn: getCampaigns,
  });

  const mutation = useMutation({
    mutationFn: createCampaign,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["campaigns"],
      });
      alert("Campaign Created")

      setName("");
    },
  });

  const filteredCampaigns = data?.filter((campaign: any) =>
    campaign.name.toLowerCase().includes(search.toLowerCase())
  )?.sort((a: any, b: any) => {
    if (sort === "name") {
      return a.name.localeCompare(b.name);
    }
    if (sort === "oldest") {
      return (new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
    }
    return (
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
  });


  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    mutation.mutate(name);
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="h-24 bg-gray-200 rounded animate-pulse" />
        <div className="h-40 bg-gray-200 rounded animate-pulse" />
        <div className="h-56 bg-gray-200 rounded animate-pulse" />
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* <h1 className="text-2xl font-bold mb-6">Campaigns</h1> */}

      {/* <form onSubmit={handleSubmit} className="mb-6">
        <input
          type="text"
          placeholder="Campaign Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 mr-2"
        />

        <button type="submit" className="bg-black text-white px-5 py-2 rounded-lg">
          Create Campaign
        </button>
      </form> */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">
          Campaigns
        </h1>
        <button className="bg-black text-white px-5 py-2 rounded-lg"
          onClick={() => setOpenModal(true)}>
          + New Campaigns
        </button>
      </div>
      <div className="flex gap-4 mb-6">
        <input type="text" placeholder="Search Campaign"
          value={search} onChange={(e) => setSearch(e.target.value)}
          className="border rounded-lg p-2 flex-1"
        />
        <select value={sort} onChange={(e) => setSort(e.target.value)}
          className="border rounded-lg p-2"
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

      {
        filteredCampaigns?.length === 0 ? (
          <div className="border rounded-lg p-10 text-center">
            <h2 className="text-xl font-bold">
              No Campaign Found
            </h2>
            <p className="text-gray-500 mt-2">
              Try another search.
            </p>
          </div>
        ) : (
          filteredCampaigns?.map((campaign: any) => {
            const stats = getCampaignStats(campaign);
          
            return (
              <EntityCard
                key={campaign.id}
                emoji="🚀"
                title={campaign.name}
                subtitle={`Created ${new Date(
                  campaign.createdAt
                ).toLocaleDateString()}`}
                href={`/dashboard/campaigns/${campaign.id}`}
                stats={[
                  {
                    label: "Leads",
                    value: stats.totalLeads,
                  },
                  {
                    label: "Emails",
                    value: stats.totalEmails,
                  },
                  {
                    label: "Open Rate",
                    value: `${stats.openRate}%`,
                  },
                ]}
              />
            );
          })
        )
      }

      <EntityModal
        open={open}
        title="Create Campaign"
        placeholder="Campaign Name"
        buttonText="Create Campaign"
        onClose={() => setOpen(false)}
        onSubmit={(value) => mutation.mutate(value)}
      />
    </div>
  );
}
