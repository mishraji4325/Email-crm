"use client";

import Link from "next/link";

import {
    useMutation,
    useQueryClient,
} from "@tanstack/react-query";

import { updateLeadStatus } from "@/services/lead.service";

import {Button} from "@/components/ui/button";
import Badge from "@/components/ui/badge";

interface Props {
    lead: any;
}

const statuses = [
    {
        value: "NEW",
        label: "New",
    },
    {
        value: "CONTACTED",
        label: "Contacted",
    },
    {
        value: "REPLIED",
        label: "Replied",
    },
    {
        value: "MEETING",
        label: "Meeting",
    },
    {
        value: "CLOSED",
        label: "Closed",
    },
];


export default function PipelineLeadCard({
    lead,
}: Props) {

    const queryClient =
        useQueryClient();


    const mutation =
        useMutation({

            mutationFn: (
                status: string
            ) =>
                updateLeadStatus(
                    lead.id,
                    status
                ),

            onSuccess: () => {

                queryClient.invalidateQueries({
                    queryKey: [
                        "pipeline-leads",
                    ],
                });

                queryClient.invalidateQueries({
                    queryKey: [
                        "leads",
                    ],
                });

            },

        });


    const currentStatus =
        statuses.find(
            (status) =>
                status.value === lead.status
        );


    return (

        <div className="
            rounded-xl
            border
            border-white/10
            bg-[#111a2b]
            p-5
            transition
            duration-200
            hover:border-white/20
            hover:bg-[#152037]
        ">

            {/* ================================= */}
            {/* HEADER */}
            {/* ================================= */}

            <div className="
                flex
                items-start
                justify-between
                gap-3
            ">

                <div className="min-w-0">

                    <h3 className="
                        truncate
                        font-semibold
                        text-white
                    ">
                        {lead.name}
                    </h3>


                    {lead.company && (

                        <p className="
                            mt-1
                            truncate
                            text-sm
                            text-gray-500
                        ">
                            {lead.company}
                        </p>

                    )}


                    {lead.role && (

                        <p className="
                            truncate
                            text-xs
                            text-gray-600
                        ">
                            {lead.role}
                        </p>

                    )}

                </div>


                {/* OPEN */}

                <Link
                    href={`/dashboard/leads/${lead.id}`}
                >
                    <Button
                        variant="secondary"
                        className="
                            h-8
                            px-3
                            text-xs
                        "
                    >
                        Open →
                    </Button>
                </Link>

            </div>


            {/* ================================= */}
            {/* STATUS */}
            {/* ================================= */}

            <div className="mt-5">

                <div className="
                    mb-2
                    flex
                    items-center
                    justify-between
                ">

                    <span className="
                        text-[10px]
                        uppercase
                        tracking-[0.15em]
                        text-gray-600
                    ">
                        Status
                    </span>


                    <Badge
                        variant={
                            lead.status === "CLOSED"
                                ? "success"
                                : "default"
                        }
                    >
                        {currentStatus?.label ||
                            lead.status}
                    </Badge>

                </div>


                <select
                    value={lead.status}
                    onChange={(e) =>
                        mutation.mutate(
                            e.target.value
                        )
                    }
                    disabled={
                        mutation.isPending
                    }
                    className="
                        h-10
                        w-full
                        rounded-xl
                        border
                        border-white/10
                        bg-[#0d1526]
                        px-3
                        text-sm
                        text-gray-300
                        outline-none
                        transition
                        focus:border-[#f4bb4f]/60
                        focus:ring-1
                        focus:ring-[#f4bb4f]/20
                        disabled:cursor-not-allowed
                        disabled:opacity-50
                    "
                >

                    {statuses.map(
                        (status) => (

                            <option
                                key={
                                    status.value
                                }
                                value={
                                    status.value
                                }
                            >
                                {status.label}
                            </option>

                        )
                    )}

                </select>

            </div>


            {/* ================================= */}
            {/* EMAIL */}
            {/* ================================= */}

            <div className="
                mt-4
                border-t
                border-white/5
                pt-3
            ">

                <p className="
                    truncate
                    text-xs
                    text-gray-600
                ">
                    {lead.emails || "No email"}
                </p>

            </div>

        </div>
    );
}