"use client";

import { useState, useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { socket } from "@/lib/socket";

import { getLeads, bulkGenerate, bulkSend } from "@/services/lead.service";

import LeadFilters from "@/components/lead/leadFilters";
import LeadCard from "@/components/lead/leadCard";
import BulkActions from "@/components/lead/bulkActions";

import PageHeader from "@/components/ui/page-header";
import {Button} from "@/components/ui/button";
import LoadingState from "@/components/ui/loading-state";
import EmptyState from "@/components/ui/empty-state";
import { Card } from "@/components/ui/card";


export default function LeadsPage() {

    const [search, setSearch] =
        useState("");

    const [status, setStatus] =
        useState("");

    const [selectedLeads, setSelectedLeads] =
        useState<string[]>([]);

    const queryClient =
        useQueryClient();


    /* ================= FETCH ================= */

    const {
        data,
        isLoading,
        error,
    } = useQuery({

        queryKey: [
            "leads",
            search,
            status,
        ],

        queryFn: () =>
            getLeads(
                search,
                status
            ),

    });


    /* ================= SOCKET ================= */

    useEffect(() => {

        const handleEmailGenerated = () => {

            queryClient.invalidateQueries({
                queryKey: ["leads"],
            });

        };

        socket.on(
            "email generated",
            handleEmailGenerated
        );

        return () => {

            socket.off(
                "email generated",
                handleEmailGenerated
            );

        };

    }, [queryClient]);


    /* ================= SELECT ================= */

    const toggleLead = (
        id: string
    ) => {

        setSelectedLeads((current) => {

            if (current.includes(id)) {

                return current.filter(
                    (leadId) =>
                        leadId !== id
                );

            }

            return [
                ...current,
                id,
            ];

        });

    };


    /* ================= SELECT ALL ================= */

    const toggleAll = () => {

        if (!data?.length) {
            return;
        }

        if (
            selectedLeads.length ===
            data.length
        ) {

            setSelectedLeads([]);

        } else {

            setSelectedLeads(
                data.map(
                    (lead: any) =>
                        lead.id
                )
            );

        }

    };


    /* ================= LOADING ================= */

    if (isLoading) {

        return (
            <LoadingState
                text="Loading leads..."
            />
        );

    }


    /* ================= ERROR ================= */

    if (error) {

        return (
            <EmptyState
                title="Unable to load leads"
                description="Something went wrong while fetching your leads."
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

        <div className="space-y-6">


            {/* ================================================= */}
            {/* HEADER */}
            {/* ================================================= */}

            <PageHeader

                title="Leads"

                description="
                    Manage your prospects, track outreach,
                    and move conversations forward.
                "

                action={
                    <Button
                        onClick={() =>
                            window.location.href =
                                "/dashboard/import"
                        }
                    >
                        + Import Leads
                    </Button>
                }

            />


            {/* ================================================= */}
            {/* FILTERS */}
            {/* ================================================= */}

            <Card className="p-4">

                <LeadFilters

                    search={search}

                    status={status}

                    setSearch={setSearch}

                    setStatus={setStatus}

                />

            </Card>


            {/* ================================================= */}
            {/* BULK ACTION BAR */}
            {/* ================================================= */}

            {data?.length > 0 && (

                <div className="
                    flex
                    flex-col
                    gap-3
                    rounded-2xl
                    border
                    border-white/10
                    bg-[#0d1526]
                    p-4
                    sm:flex-row
                    sm:items-center
                    sm:justify-between
                ">

                    <div className="
                        flex
                        items-center
                        gap-3
                    ">

                        <input
                            type="checkbox"
                            checked={
                                data.length > 0 &&
                                selectedLeads.length ===
                                data.length
                            }
                            onChange={toggleAll}
                            className="
                                h-4
                                w-4
                                cursor-pointer
                                accent-[#f4bb4f]
                            "
                        />

                        <span className="
                            text-sm
                            text-gray-400
                        ">

                            {selectedLeads.length
                                ? `${selectedLeads.length} selected`
                                : "Select leads"
                            }

                        </span>

                    </div>


                    <BulkActions

                        selectedLeads={
                            selectedLeads
                        }

                        onGenerate={() => {

                            if (
                                !selectedLeads.length
                            ) {
                                return;
                            }

                            bulkGenerate(
                                selectedLeads
                            );

                        }}

                        onSend={() => {

                            if (
                                !selectedLeads.length
                            ) {
                                return;
                            }

                            bulkSend(
                                selectedLeads
                            );

                        }}

                        onCampaign={() => {
                            console.log(
                                "Campaign:",
                                selectedLeads
                            );
                        }}

                        onSequence={() => {
                            console.log(
                                "Sequence:",
                                selectedLeads
                            );
                        }}

                    />

                </div>

            )}


            {/* ================================================= */}
            {/* LEADS */}
            {/* ================================================= */}

            {!data?.length ? (

                <EmptyState

                    title="No leads found"

                    description={
                        search || status
                            ? "Try changing your search or filters."
                            : "Import your first batch of leads to get started."
                    }

                    action={
                        <Button
                            onClick={() =>
                                window.location.href =
                                    "/dashboard/import"
                            }
                        >
                            Import Leads
                        </Button>
                    }

                />

            ) : (

                <div className="
                    space-y-4
                ">

                    {data.map(
                        (lead: any) => (

                            <LeadCard

                                key={lead.id}

                                lead={lead}

                                selected={
                                    selectedLeads.includes(
                                        lead.id
                                    )
                                }

                                onToggle={
                                    toggleLead
                                }

                                onGenerate={(
                                    id
                                ) => {

                                    console.log(
                                        "Generate",
                                        id
                                    );

                                }}

                                onSend={(
                                    id
                                ) => {

                                    console.log(
                                        "Send",
                                        id
                                    );

                                }}

                            />

                        )
                    )}

                </div>

            )}

        </div>
    );
}