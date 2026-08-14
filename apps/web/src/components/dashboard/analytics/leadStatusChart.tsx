"use client";

import {
    Pie,
} from "react-chartjs-2";

interface Props {
    data: any[];
}

export default function LeadStatusChart({
    data,
}: Props) {

    const chartData = {

        labels: data.map(
            (item) => item.status
        ),

        datasets: [
            {
                data: data.map(
                    (item) =>
                        item._count.status
                ),

                backgroundColor: [
                    "#f4bb4f",
                    "#60a5fa",
                    "#a78bfa",
                    "#34d399",
                    "#f87171",
                ],

                borderColor:
                    "#0d1526",

                borderWidth: 3,
            },
        ],

    };


    const options = {

        responsive: true,

        maintainAspectRatio: false,

        plugins: {

            legend: {

                position: "bottom" as const,

                labels: {

                    color: "#9ca3af",

                    padding: 18,

                    usePointStyle: true,

                },

            },

        },

    };


    return (

        <div className="h-[320px]">

            {data.length === 0 ? (

                <div className="
                    flex
                    h-full
                    items-center
                    justify-center
                    text-sm
                    text-gray-600
                ">
                    No lead status data available.
                </div>

            ) : (

                <Pie
                    data={chartData}
                    options={options}
                />

            )}

        </div>

    );
}