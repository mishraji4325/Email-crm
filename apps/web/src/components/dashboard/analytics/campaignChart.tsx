"use client";

import {
    Bar,
} from "react-chartjs-2";

interface Props {
    campaigns: any[];
}

export default function CampaignChart({
    campaigns,
}: Props) {

    const chartData = {

        labels: campaigns.map(
            (campaign) => campaign.name
        ),

        datasets: [
            {
                label: "Leads",

                data: campaigns.map(
                    (campaign) =>
                        campaign.campaignLeads?.length || 0
                ),

                backgroundColor:
                    "rgba(244, 187, 79, 0.75)",

                borderColor:
                    "#f4bb4f",

                borderWidth: 1,

                borderRadius: 6,
            },
        ],

    };


    const options = {

        responsive: true,

        maintainAspectRatio: false,

        plugins: {

            legend: {
                labels: {
                    color: "#9ca3af",
                },
            },

        },

        scales: {

            x: {
                ticks: {
                    color: "#6b7280",
                },

                grid: {
                    color:
                        "rgba(255,255,255,0.05)",
                },
            },

            y: {
                beginAtZero: true,

                ticks: {
                    color: "#6b7280",
                    precision: 0,
                },

                grid: {
                    color:
                        "rgba(255,255,255,0.05)",
                },
            },

        },

    };


    return (

        <div className="h-[320px]">

            {campaigns.length === 0 ? (

                <div className="
                    flex
                    h-full
                    items-center
                    justify-center
                    text-sm
                    text-gray-600
                ">
                    No campaign data available.
                </div>

            ) : (

                <Bar
                    data={chartData}
                    options={options}
                />

            )}

        </div>

    );
}