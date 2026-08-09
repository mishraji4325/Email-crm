"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { assignLead, getSequenceLeads, removeLead } from "@/services/sequence.service";
import { getLeads } from "@/services/lead.service";
import { useState } from "react";

interface Props {
    sequenceId: string;
}

export default function SequenceLeadSection({
    sequenceId,
}: Props) {
    const [selectedLead, setSelectedLead] = useState("");
    const { data, isLoading } = useQuery({
        queryKey: ["sequence-leads", sequenceId],
        queryFn: () => getSequenceLeads(sequenceId),
    });

    const { data: allLeads } = useQuery({
        queryKey: ["all-leads"],
        queryFn: () => getLeads(),
    });

    const queryClient = useQueryClient();
    const assignMutation = useMutation({
        mutationFn: async () => {
            if (!selectedLead) return;

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

    const removeMutation = useMutation({
        mutationFn: (leadId: string) =>
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

    if (isLoading) {
        return <div>Loading leads...</div>;
    }

    const availableLeads =
        allLeads?.filter(
            (lead: any) =>
                !data?.some(
                    (item: any) =>
                        item.leadId === lead.id
                )
        ) || [];

    return (
        <div className="border rounded-xl p-6 mt-8">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">
                    Assigned Leads
                </h2>
                <div className="flex gap-3 mb-6">
                    <select
                        value={selectedLead}
                        onChange={(e) => setSelectedLead(e.target.value)}
                        className="border rounded-lg p-2 flex-1"
                    >
                        <option value="">
                            Select Lead
                        </option>

                        {availableLeads?.map((lead: any) => (
                            <option
                                key={lead.id}
                                value={lead.id}
                            >
                                {lead.name}
                            </option>
                        ))}
                    </select>

                    <button
                        className="bg-black text-white rounded-lg px-4"
                        disabled={!selectedLead || assignMutation.isPending}
                        onClick={() => assignMutation.mutate()}
                    >
                        Assign
                    </button>
                </div>
            </div>

            {data?.length === 0 ? (
                <div className="text-gray-500">
                    No leads assigned.
                </div>
            ) : (
                <div className="space-y-3">
                    {data?.map((item: any) => (
                        <div
                            key={item.id}
                            className="border rounded-lg p-4 flex justify-between items-center"
                        >

                            <div>
                                <h3 className="font-semibold">
                                    {item.lead.name}
                                </h3>

                                <p className="text-sm text-gray-500">
                                    {item.lead.emails}
                                </p>
                            </div>

                            <button
                                className="border rounded-lg px-4 py-2 text-red-600"
                                onClick={() => {
                                    const confirmed =
                                        window.confirm(
                                            "Remove this lead from sequence?"
                                        );
                                    if (!confirmed) return;
                                    removeMutation.mutate(
                                        item.leadId
                                    );
                                }}
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}