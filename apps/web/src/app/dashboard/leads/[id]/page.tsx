"use client";

import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getLead, getLeadActivities } from "@/services/lead.service";
import { createNote } from "@/services/note.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { updateEmail } from "@/services/email.service";
import { api } from "@/lib/axios";
import LeadHeader from "@/components/lead-details/leadHeader";
import EmailHistory from "@/components/lead-details/emailHistory";
import ActivityTimeline from "@/components/lead-details/activityTimeline";
import NotesSection from "@/components/lead-details/notesSection";
import { assignLeadToCampaign, getCampaigns } from "@/services/campaign.service";
import CampaignSection from "@/components/lead-details/campaignSequence";
import { assignSequence, getSequences } from "@/services/sequence.service";
import SequenceSection from "@/components/lead-details/sequenceSection";

export default function leadPage() {
  const params = useParams();
  const [note, setNote] = useState("");
  const [selectedCampaign, setSelectedCampaign] = useState("");
  const [selectedSequence, setSelectedSequence] = useState("");

  const { data: sequences = [] } = useQuery({
    queryKey: ["sequences"],
    queryFn: getSequences,
  })

  const { data: campaigns = [] } = useQuery({
    queryKey: ["campaigns"],
    queryFn: getCampaigns,
  })

  const { data, isLoading } = useQuery({
    queryKey: ["lead", params.id],

    queryFn: () => getLead(params.id as string),
  });

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createNote,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["lead", params.id],
      });

      setNote("");
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  async function bookMeeting() {
    await api.patch(`/leads/${params.id}/book`);

    alert("Meeting booked");
  };

  if (!data) {
    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold">
                Lead not found
            </h1>

            <p className="text-gray-500 mt-2">
                This lead doesn't exist or you don't have permission to view it.
            </p>
        </div>
    );
}


  return (
    <div>
      <LeadHeader lead={data} />

      <div className="mt-8">
        <label
          htmlFor="lead-status"
          className="block text-sm font-medium text-gray-700"
        >
          Status
        </label>

        
        <div className="mb-3">
          <NotesSection notes={data?.notes ?? []}
            onAdd={async (content) => {
              await mutation.mutateAsync({
                leadId: params.id as string,
                content,
              });
            }}
            onDelete={async (noteId) => {
              await api.delete(`/notes/${noteId}`);
              queryClient.invalidateQueries({
                queryKey: ["lead", params.id]
              })
            }}
          />
        </div>

        <CampaignSection campaigns={data?.campaigns ?? []}
          allCampaigns={campaigns}
          selectedCampaign={selectedCampaign}
          setSelectedCampaign={setSelectedCampaign}
          onAssign={async () => {
            if (!selectedCampaign) return;
            await assignLeadToCampaign(
              selectedCampaign,
              params.id as string
            );
            queryClient.invalidateQueries({
              queryKey: ["leads", params.id]
            })
          }} />

        <SequenceSection sequences={sequences}
          selectedSequence={selectedSequence}
          setSelectedSequence={setSelectedSequence}
          onAssign={async () => {
            if (!selectedSequence) {
              alert("select a sequence")
              return;
            }
            await assignSequence(
              selectedSequence,
              params.id as string,
            );
            alert("sequence assigned")
          }} />


        {data?.notes?.map((note: any) => (
          <div key={note.id} className="border p-3 mt-2">
            {note.content}
          </div>
        ))}

        <button onClick={bookMeeting} className="border px-4 py-2">
          Book Meeting
        </button>

        <ActivityTimeline activities={data?.activities ?? []} />

        <EmailHistory emails={data?.emailRecords ?? []}
          onSave={async (
            emailId, content
          ) => {
            await updateEmail(
              emailId, content
            );
            alert("Draft Saved")
          }}
          onSend={async (emailId) => {
            await api.post(`/send/${emailId}`);
            alert("Email queued");
          }} />

        <button
          onClick={async () => {
            await api.post(`/generate/${params.id}`);

            alert("Generation started");
          }}
          className="border px-4 py-2"
        >
          Generate AI Email
        </button>
      </div>
    </div>
  );
}
