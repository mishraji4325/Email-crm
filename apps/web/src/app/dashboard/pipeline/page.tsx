"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getLeads, updateLeadStatus } from "@/services/lead.service";
import { DndContext } from "@dnd-kit/core";
import LeadCard from "@/components/leadCard";
import { useDroppable } from "@dnd-kit/core";
import Column from "@/components/column";

export default function PipelinePage() {
  const columns = ["new", "contacted", "replied", "meeting_booked", "closed"];

  const { data } = useQuery({
    queryKey: ["leads"],

    queryFn: getLeads,
  });

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({ id, status }: any) => updateLeadStatus(id, status),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["leads"],
      });
    },
  });

  function handleDragEnd(event: any) {
    const {
      active,
      over,
    } = event;

    if (!over) return;

    mutation.mutate({
      id: active.id,

      status: over.id,
    });
  }


  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="grid grid-cols-5 gap-4">
        {columns.map((status) => (
          <Column key={status} id={status}>
            <h2 className="font-bold mb-4">{status}</h2>
            {data
              ?.filter((lead: any) => lead.status === status)
              .map((lead: any) => (
                <LeadCard key={lead.id} lead={lead} />
              ))}
          </Column>
        ))}
      </div>
    </DndContext>
  );
};
