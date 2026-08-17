"use client";

import { useRouter } from "next/navigation";

import { useParams } from "next/navigation";

import { useQuery } from "@tanstack/react-query";

import { deleteCampaign, generateCampaignEmails, getCampaign, getCampaignAnalytics } from "@/services/campaign.service";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar } from "react-chartjs-2";
import CampaignHeader from "@/components/dashboard/campaign/campaignHeader";
import CampaignLeadList from "@/components/dashboard/campaign/campaignLeadList";
import CampaignAnalytics from "@/components/dashboard/campaign/CampaignAnalytics";
import { useState } from "react";
import CampaignActions from "@/components/dashboard/campaign/campaignActions";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
);

export default function CampaignDetailsPage() {

  const params = useParams();
  const router = useRouter();
  const [generating, setGenerating] = useState(false);
  const [sending, setSending] = useState(false);

  const { data: campaign, isLoading } = useQuery({
    queryKey: ["campaign", params.id],
    queryFn: () => getCampaign(params.id as string),
  });


  const { data: analytics } = useQuery({
    queryKey: ["campaignAnalytics", params.id],
    queryFn: () => getCampaignAnalytics(params.id as string),
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const chartData = {
    labels: [
      "Sent",
      "Opened",
    ],

    datasets: [
      {
        label: "Campaign Performance",

        data: [
          analytics?.sent || 0,
          analytics?.opened || 0,
        ],
      },
    ],

  };
  async function handleGenerate() {
    try {
      setGenerating(true);
      const confirmed = window.confirm(
        "Generate AI emails for all leads in this campaign?"
      );
      if (!confirmed) return;
      await generateCampaignEmails(
        params.id as string
      );
      alert("Generation Started");
      // toast({
      //   title: "Generation Started",
      //   description: "Emails are being generated in the background.",
      // });
    }
    finally {
      setGenerating(false);
    }
  }

  async function handleSend() {
    try {
      setSending(true);
      alert("Send queue started")
    }
    finally {
      setSending(false);
    }
  }

  async function handleDelete() {

    const confirmed = window.confirm(
      "Delete this campaign?"
    );

    if (!confirmed) return;

    await deleteCampaign(
      params.id as string
    );

    router.push("/dashboard/campaigns");

  }

  return (

    <div className="p-6">

      {/* <h1 className="text-3xl font-bold mb-6">
        Campaign Analytics
      </h1> */}

      <CampaignHeader campaign={campaign} onDelete={handleDelete} />
      <CampaignAnalytics campaign={campaign} />
      <CampaignActions
        generating={generating}
        sending={sending}
        onGenerate={handleGenerate}
        onSend={handleSend}
      />
      <CampaignLeadList campaign={campaign} />


      {/* Metrics Cards */}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">

        <div className="border rounded p-4">

          <h2 className="font-semibold">
            Leads
          </h2>

          <p className="text-2xl">
            {analytics?.leadCount}
          </p>

        </div>

        <div className="border rounded p-4">

          <h2 className="font-semibold">
            Sent
          </h2>

          <p className="text-2xl">
            {analytics?.sent}
          </p>

        </div>

        <div className="border rounded p-4">

          <h2 className="font-semibold">
            Opened
          </h2>

          <p className="text-2xl">
            {analytics?.opened}
          </p>

        </div>

        <div className="border rounded p-4">

          <h2 className="font-semibold">
            Open Rate
          </h2>

          <p className="text-2xl">

            {analytics?.openRate?.toFixed(1)}%

          </p>

        </div>

      </div>

      {/* Chart */}

      <div className="border rounded p-6">

        <h2 className="text-xl font-bold mb-4">
          Campaign Performance
        </h2>

        <Bar data={chartData} />

      </div>

    </div>

  );

}