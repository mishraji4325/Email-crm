"use client";

import {
    useMutation,
    useQuery,
    useQueryClient,
} from "@tanstack/react-query";

import {
    assignLead,
    getSequenceLeads,
    removeLead,
} from "@/services/sequence.service";

import { getLeads } from "@/services/lead.service";

import { useState } from "react";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/components/ui/card";

import {Button} from "@/components/ui/button";
import EmptyState from "@/components/ui/empty-state";
import LoadingState from "@/components/ui/loading-state";


interface Props {
    sequenceId: string;
}


export default function SequenceLeadSection({
    sequenceId,
}: Props) {

    const [
        selectedLead,
        setSelectedLead,
    ] = useState("");


    /* ================= ASSIGNED LEADS ================= */

    const {
        data,
        isLoading,
    } = useQuery({

        queryKey: [
            "sequence-leads",
            sequenceId,
        ],

        queryFn: () =>
            getSequenceLeads(sequenceId),

    });


    /* ================= ALL LEADS ================= */

    const {
        data: allLeads,
    } = useQuery({

        queryKey: ["all-leads"],

        queryFn: () =>
            getLeads(),

    });


    const queryClient =
        useQueryClient();


    /* ================= ASSIGN ================= */

    const assignMutation =
        useMutation({

            mutationFn: async () => {

                if (!selectedLead) {
                    return;
                }

                return assignLead(
                    sequenceId,
                    selectedLead
                );

            },

            onSuccess() {

                queryClient.invalidateQueries({
                    queryKey: [
                        "sequence-leads",
                        sequenceId,
                    ],
                });

                setSelectedLead("");

            },

        });


    /* ================= REMOVE ================= */

    const removeMutation =
        useMutation({

            mutationFn: (
                leadId: string
            ) =>
                removeLead(
                    sequenceId,
                    leadId
                ),

            onSuccess() {

                queryClient.invalidateQueries({
                    queryKey: [
                        "sequence-leads",
                        sequenceId,
                    ],
                });

            },

        });


    /* ================= LOADING ================= */

    if (isLoading) {

        return (
            <div className="mt-6">
                <LoadingState
                    text="Loading assigned leads..."
                />
            </div>
        );

    }


    /* ================= AVAILABLE LEADS ================= */

    const availableLeads =
        allLeads?.filter(
            (lead: any) =>
                !data?.some(
                    (item: any) =>
                        item.leadId === lead.id
                )
        ) || [];


    return (

        <Card className="mt-6">

            {/* ================= HEADER ================= */}

            <CardHeader>

                <CardTitle>
                    Assigned Leads
                </CardTitle>

                <CardDescription>
                    Add or remove leads from this sequence.
                </CardDescription>

            </CardHeader>


            <CardContent>

                {/* ================= ASSIGN ================= */}

                <div className="
                    flex
                    flex-col
                    gap-3
                    rounded-xl
                    border
                    border-white/10
                    bg-[#111a2b]
                    p-4
                    sm:flex-row
                ">

                    <select
                        value={selectedLead}
                        onChange={(e) =>
                            setSelectedLead(
                                e.target.value
                            )
                        }
                        className="
                            h-11
                            min-w-0
                            flex-1
                            rounded-xl
                            border
                            border-white/10
                            bg-[#0d1526]
                            px-4
                            text-sm
                            text-gray-300
                            outline-none
                            focus:border-[#f4bb4f]/60
                        "
                    >

                        <option value="">
                            Select a lead
                        </option>

                        {availableLeads.map(
                            (lead: any) => (

                                <option
                                    key={lead.id}
                                    value={lead.id}
                                >
                                    {lead.name}
                                </option>

                            )
                        )}

                    </select>


                    <Button
                        disabled={
                            !selectedLead ||
                            assignMutation.isPending
                        }
                        onClick={() =>
                            assignMutation.mutate()
                        }
                    >
                        {assignMutation.isPending
                            ? "Assigning..."
                            : "Assign Lead"
                        }
                    </Button>

                </div>


                {/* ================= LIST ================= */}

                <div className="mt-5">

                    {!data?.length ? (

                        <EmptyState
                            title="No leads assigned"
                            description="
                                Add leads above to start using
                                this sequence.
                            "
                        />

                    ) : (

                        <div className="space-y-2">

                            {data.map(
                                (item: any) => (

                                    <div
                                        key={item.id}
                                        className="
                                            flex
                                            flex-col
                                            gap-4
                                            rounded-xl
                                            border
                                            border-white/10
                                            bg-[#111a2b]
                                            p-4
                                            sm:flex-row
                                            sm:items-center
                                            sm:justify-between
                                        "
                                    >

                                        <div className="
                                            min-w-0
                                        ">

                                            <h3 className="
                                                font-medium
                                                text-white
                                            ">
                                                {item.lead?.name}
                                            </h3>

                                            <p className="
                                                mt-1
                                                truncate
                                                text-sm
                                                text-gray-500
                                            ">
                                                {item.lead?.emails || "-"}
                                            </p>

                                            {item.lead?.company && (
                                                <p className="
                                                    mt-1
                                                    text-xs
                                                    text-gray-600
                                                ">
                                                    {item.lead.company}
                                                </p>
                                            )}

                                        </div>


                                        <Button
                                            variant="danger"
                                            disabled={
                                                removeMutation.isPending
                                            }
                                            onClick={() => {

                                                const confirmed =
                                                    window.confirm(
                                                        "Remove this lead from sequence?"
                                                    );

                                                if (!confirmed) {
                                                    return;
                                                }

                                                removeMutation.mutate(
                                                    item.leadId
                                                );

                                            }}
                                        >
                                            Remove
                                        </Button>

                                    </div>

                                )
                            )}

                        </div>

                    )}

                </div>

            </CardContent>

        </Card>
    );
}