"use client";

import { useParams } from "next/navigation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createStep, deleteStep, getSequence, updateStep } from "@/services/sequence.service";
import SequenceHeader from "@/components/dashboard/sequence/sequenceHeader";
import SequenceSummary from "@/components/dashboard/sequence/sequenceSummary";
import SequenceStepList from "@/components/dashboard/sequence/sequenceStepList";
import { useState } from "react";
import EntityModal from "@/components/common/entityModal";
import SequenceLeadSection from "@/components/dashboard/sequence/sequenceLeadSection";
import CreateEntityModal from "@/components/common/entityModal";

export default function SequenceDetailsPage() {
    const params = useParams();
    const [open, setOpen] = useState(false);
    const [editingStep, setEditingStep] = useState<any>(null);


    const { data, isLoading } = useQuery({
        queryKey: ["sequence", params.id],
        queryFn: () => getSequence(params.id as string),
    });


    const queryClient = useQueryClient();
    const createStepMutation = useMutation({
        mutationFn: (data: any) =>
            createStep(
                params.id as string,
                data
            ),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [
                    "sequence",
                    params.id,
                ],
            });
            setOpen(false);
        },
    });

    const updateStepMutation = useMutation({
        mutationFn: (data: any) =>
            updateStep(editingStep.id, data),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["sequence", params.id],
            });

            setEditingStep(null);
        },
    });

    const deleteMutation = useMutation({
        mutationFn: deleteStep,

        onSuccess() {
            queryClient.invalidateQueries({
                queryKey: ["sequence", params.id]
            });
        }
    });

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!data) {
        return <div>Sequence not found.</div>;
    }

    const sequence = {
        ...data,
        steps: data.steps ?? [],
    };

    return (
        <div className="space-y-6">
            <SequenceHeader sequence={sequence} />

            <SequenceSummary sequence={sequence} />

            <SequenceStepList sequence={sequence}
                onEdit={(step) => {
                    setEditingStep(step);
                    setOpen(true);
                }}
                onDelete={(id) => {
                    if (confirm("Delete this step?")) {
                        deleteMutation.mutate(id);
                    }
                }}
            />

            <SequenceLeadSection
                sequenceId={params.id as string}
            />
            <div className="flex justify-end">

                <button
                    onClick={() => setOpen(true)}
                    className="bg-black text-white rounded-lg px-5 py-2"
                >
                    + Add Step
                </button>

            </div>
            <CreateEntityModal
                open={open}
                title={editingStep ? "Edit Step" : "Add Step"}
                buttonText={editingStep ? "Update" : "Save"}
                fields={[
                    {
                        name: "dayOffset",
                        label: "Day",
                        type: "number"
                    },
                    {
                        name: "subject",
                        label: "Subject"
                    },
                    {
                        name: "body",
                        label: "Email Body",
                        type: "textarea"
                    }
                ]}
                initialValues={
                    editingStep
                        ? {
                            dayOffset: editingStep.dayOffset,
                            subject: editingStep.subject,
                            body: editingStep.body,
                        }
                        : {}
                }

                onClose={() => setOpen(false)}
                onSubmit={(values) => {
                    if (editingStep) {
                        updateStepMutation.mutate(values);
                    } else {
                        createStepMutation.mutate(values);
                    }
                }}
            />
        </div>
    );
}