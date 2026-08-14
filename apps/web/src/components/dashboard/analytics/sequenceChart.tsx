"use client";

import {
    Line,
} from "react-chartjs-2";

interface Props {
    sequences: any[];
}

export default function SequenceChart({
    sequences,
}: Props) {

    const chartData = {

        labels: sequences.map(
            (sequence) =>
                sequence.name
        ),

        datasets: [
            {
                label: "Steps",

                data: sequences.map(
                    (sequence) =>
                        sequence.steps?.length || 0
                ),

                borderColor:
                    "#f4bb4f",

                backgroundColor:
                    "rgba(244, 187, 79, 0.12)",

                pointBackgroundColor:
                    "#f4bb4f",

                pointBorderColor:
                    "#0d1526",

                pointBorderWidth: 2,

                pointRadius: 5,

                tension: 0.35,

                fill: true,
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

            {sequences.length === 0 ? (

                <div className="
                    flex
                    h-full
                    items-center
                    justify-center
                    text-sm
                    text-gray-600
                ">
                    No sequence data available.
                </div>

            ) : (

                <Line
                    data={chartData}
                    options={options}
                />

            )}

        </div>

    );
}