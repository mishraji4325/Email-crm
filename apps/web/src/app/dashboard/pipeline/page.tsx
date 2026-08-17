"use client";

import { useState } from "react";


import { getLeads } from "@/services/lead.service";
import PipelineLeadCard from "@/components/dashboard/pipeline/pipelineLeadCard";

import {
    Card,
    CardContent,
} from "@/components/ui/card";

import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import Badge from "@/components/ui/badge";
import EmptyState from "@/components/common/emptyState";
import { useQuery } from "@tanstack/react-query";


const stages = [
    {
        key: "NEW",
        label: "New",
    },
    {
        key: "CONTACTED",
        label: "Contacted",
    },
    {
        key: "REPLIED",
        label: "Replied",
    },
    {
        key: "MEETING",
        label: "Meeting",
    },
    {
        key: "CLOSED",
        label: "Closed",
    },
];


export default function PipelinePage() {

    const [search, setSearch] =
        useState("");

    const [openStages, setOpenStages] =
        useState<string[]>([
            "NEW",
        ]);


    /* ========================================= */
    /* TOGGLE STAGE */
    /* ========================================= */

    const toggleStage = (
        stageKey: string
    ) => {

        setOpenStages((current) =>
            current.includes(stageKey)
                ? current.filter(
                    (key) =>
                        key !== stageKey
                )
                : [
                    ...current,
                    stageKey,
                ]
        );

    };


    /* ========================================= */
    /* FETCH LEADS */
    /* ========================================= */

    const {
        data: leads,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ["pipeline-leads"],
        queryFn: () => getLeads(),

    });


    /* ========================================= */
    /* LOADING */
    /* ========================================= */

    if (isLoading) {

        return (
            <div className="space-y-6">
                <div className="h-10 w-48 animate-pulse rounded-lg bg-[#111a2b]" />
                <div className="h-20 animate-pulse rounded-xl bg-[#111a2b]" />
                <div className="h-40 animate-pulse rounded-xl bg-[#111a2b]" />
            </div>
        );

    }


    /* ========================================= */
    /* ERROR */
    /* ========================================= */

    if (isError) {

        return (
            <EmptyState
                title="Unable to load pipeline"
                description="
                    Something went wrong while
                    loading your leads.
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
    /* SEARCH */
    /* ========================================= */

    const filteredLeads =
        leads?.filter(
            (lead: any) => {

                const searchValue =
                    search
                        .toLowerCase()
                        .trim();

                if (!searchValue) {
                    return true;
                }

                return (
                    lead.name
                        ?.toLowerCase()
                        .includes(
                            searchValue
                        ) ||

                    lead.company
                        ?.toLowerCase()
                        .includes(
                            searchValue
                        ) ||

                    lead.emails
                        ?.toLowerCase()
                        .includes(
                            searchValue
                        )
                );

            }
        ) || [];


    /* ========================================= */
    /* TOTAL */
    /* ========================================= */

    const totalLeads =
        leads?.length || 0;


    return (

        <div className="space-y-8">


            {/* ========================================= */}
            {/* HEADER */}
            {/* ========================================= */}

            <div className="
                flex
                flex-col
                gap-5
                lg:flex-row
                lg:items-end
                lg:justify-between
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
                        Sales Pipeline
                    </div>

                    <h1 className="
                        text-3xl
                        font-semibold
                        text-white
                    ">
                        Pipeline
                    </h1>

                    <p className="
                        mt-1
                        text-sm
                        text-gray-500
                    ">
                        Track your leads through the
                        sales process.
                    </p>

                </div>


                {/* SEARCH */}

                <div className="
                    w-full
                    lg:w-80
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
                        Search Leads
                    </label>

                    <Input
                        value={search}
                        onChange={(e) =>
                            setSearch(
                                e.target.value
                            )
                        }
                        placeholder="
                            Search by name, company or email...
                        "
                        className="
                            h-11
                            rounded-xl
                            border-white/10
                            bg-[#111a2b]
                            px-4
                            text-gray-300
                            placeholder:text-gray-600
                            focus-visible:border-[#f4bb4f]/60
                            focus-visible:ring-[#f4bb4f]/20
                        "
                    />

                </div>

            </div>


            {/* ========================================= */}
            {/* OVERVIEW */}
            {/* ========================================= */}

            <div className="
                grid
                grid-cols-2
                gap-3
                sm:grid-cols-3
                lg:grid-cols-6
            ">

                {/* Total */}

                <Card>

                    <CardContent className="p-4">

                        <p className="
                            text-[10px]
                            uppercase
                            tracking-[0.15em]
                            text-gray-500
                        ">
                            Total
                        </p>

                        <p className="
                            mt-2
                            text-2xl
                            font-semibold
                            text-white
                        ">
                            {totalLeads}
                        </p>

                    </CardContent>

                </Card>


                {stages.map(
                    (stage) => {

                        const count =
                            leads?.filter(
                                (lead: any) =>
                                    lead.status ===
                                    stage.key
                            ).length || 0;


                        return (

                            <Card
                                key={stage.key}
                            >

                                <CardContent className="p-4">

                                    <p className="
                                        text-[10px]
                                        uppercase
                                        tracking-[0.15em]
                                        text-gray-500
                                    ">
                                        {stage.label}
                                    </p>

                                    <p className="
                                        mt-2
                                        text-2xl
                                        font-semibold
                                        text-[#f4bb4f]
                                    ">
                                        {count}
                                    </p>

                                </CardContent>

                            </Card>

                        );

                    }
                )}

            </div>


            {/* ========================================= */}
            {/* PIPELINE STAGES */}
            {/* ========================================= */}

            <div className="space-y-3">

                {stages.map(
                    (stage) => {

                        const stageLeads =
                            filteredLeads.filter(
                                (lead: any) =>
                                    lead.status ===
                                    stage.key
                            );


                        const isOpen =
                            openStages.includes(
                                stage.key
                            );


                        return (

                            <Card
                                key={stage.key}
                                className="
                                    overflow-hidden
                                "
                            >

                                {/* ================= HEADER ================= */}

                                <button
                                    type="button"
                                    onClick={() =>
                                        toggleStage(
                                            stage.key
                                        )
                                    }
                                    className="
                                        flex
                                        w-full
                                        items-center
                                        justify-between
                                        px-5
                                        py-4
                                        text-left
                                        transition
                                        hover:bg-white/[0.02]
                                    "
                                >

                                    <div className="
                                        flex
                                        items-center
                                        gap-3
                                    ">

                                        <span className="
                                            flex
                                            h-7
                                            w-7
                                            items-center
                                            justify-center
                                            rounded-lg
                                            border
                                            border-white/10
                                            bg-[#111a2b]
                                            text-xs
                                            text-gray-400
                                        ">
                                            {isOpen
                                                ? "−"
                                                : "+"
                                            }
                                        </span>


                                        <div>

                                            <h2 className="
                                                font-semibold
                                                text-white
                                            ">
                                                {stage.label}
                                            </h2>

                                            <p className="
                                                text-xs
                                                text-gray-600
                                            ">
                                                {
                                                    stageLeads.length
                                                }{" "}
                                                lead
                                                {
                                                    stageLeads.length !== 1
                                                        ? "s"
                                                        : ""
                                                }
                                            </p>

                                        </div>

                                    </div>


                                    <Badge
                                        variant={
                                            stage.key ===
                                            "CLOSED"
                                                ? "success"
                                                : "default"
                                        }
                                    >
                                        {stageLeads.length}
                                    </Badge>

                                </button>


                                {/* ================= CONTENT ================= */}

                                {isOpen && (

                                    <div className="
                                        border-t
                                        border-white/10
                                        p-5
                                    ">

                                        {stageLeads.length === 0 ? (

                                            <div className="
                                                rounded-xl
                                                border
                                                border-dashed
                                                border-white/10
                                                bg-[#111a2b]/50
                                                p-8
                                                text-center
                                            ">

                                                <p className="
                                                    text-sm
                                                    text-gray-600
                                                ">
                                                    No leads in this stage.
                                                </p>

                                            </div>

                                        ) : (

                                            <div className="
                                                grid
                                                grid-cols-1
                                                gap-4
                                                md:grid-cols-2
                                                xl:grid-cols-3
                                            ">

                                                {stageLeads.map(
                                                    (lead: any) => (

                                                        <PipelineLeadCard
                                                            key={
                                                                lead.id
                                                            }
                                                            lead={
                                                                lead
                                                            }
                                                        />

                                                    )
                                                )}

                                            </div>

                                        )}

                                    </div>

                                )}

                            </Card>

                        );

                    }
                )}

            </div>


            {/* ========================================= */}
            {/* NO SEARCH RESULTS */}
            {/* ========================================= */}

            {search &&
                filteredLeads.length === 0 && (

                    <EmptyState
                        title="No leads found"
                        description="
                            No leads match your search.
                            Try another name, company or email.
                        "
                    />

                )}

        </div>
    );
}