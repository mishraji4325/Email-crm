"use client";

import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createSequence, getSequences } from "@/services/sequence.service";
import SearchBar from "@/components/common/searchBar";
import SectionHeader from "@/components/common/sectionHeader";
import EmptyState from "@/components/common/emptyState";
import EntityModal from "@/components/common/entityModal";
import EntityCard from "@/components/common/entityCard";


export default function SequencesPage() {
    const [search, setSearch] = useState("");
    const [open, setOpen] = useState(false);

    const { data, isLoading } = useQuery({
        queryKey: ["sequences"],
        queryFn: getSequences,
        staleTime: 1000 * 60 * 5, // 5 minutes
        refetchOnWindowFocus: false,
    });

    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: createSequence,
        onSuccess(){
            queryClient.invalidateQueries({
                queryKey:["sequences"]
            });
            setOpen(false);
        }
    });

    if (isLoading) {
        return <div>Loading...</div>;
    }



    const filteredSequences =
        data?.filter((sequence: any) =>
            sequence.name
                .toLowerCase()
                .includes(search.toLowerCase())
        );

    return (
        <div className="p-6">

            <SectionHeader
                title="Sequences"
                buttonText="+ New Sequence"
                onClick={() => setOpen(true)}
            />

            <SearchBar
                value={search}
                placeholder="Search Sequence..."
                onChange={setSearch}
            />
            {
                filteredSequences?.length === 0 ?
                    (
                        <div className="border-2 border-dashed rounded-xl p-12 text-center">
                            <EmptyState
                                title="No Sequences Yet"
                                description="Create your first email sequence."
                            />

                            <p className="text-gray-500 mt-2">
                                Create your first sequence.
                            </p>
                        </div>
                    )
                    :
                    (
                        <div className="grid gap-6">
                            {
                                filteredSequences?.map((sequence: any) => {

                                    const totalSteps = sequence.steps?.length || 0;
                                
                                    return (
                                        <EntityCard
                                            key={sequence.id}
                                            emoji="📧"
                                            title={sequence.name}
                                            subtitle={`Created ${new Date(
                                                sequence.createdAt
                                            ).toLocaleDateString()}`}
                                            href={`/dashboard/sequence/${sequence.id}`}
                                            stats={[
                                                {
                                                    label: "Steps",
                                                    value: totalSteps,
                                                },
                                                {
                                                    label: "Leads",
                                                    value: 0,
                                                },
                                            ]}
                                        />
                                    );
                                
                                })
                            }
                        </div>
                    )
            }
            <EntityModal
            open={open}
            title="Create Sequence"
            placeholder="Sequence Name"
            buttonText="Create"
            onClose={()=>
                setOpen(false)
            }
            onSubmit={(value)=>{
                mutation.mutate(value)
            }}/>
        </div>
    );
}