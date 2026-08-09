"use client";

import { useState } from "react";
import Link from "next/link";
import { socket } from '@/lib/socket';
import { useEffect } from 'react';
import { useQueryClient } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";

import { bulkGenerate, bulkSend, getLeads } from "@/services/lead.service";
import LeadFilters from "@/components/lead/leadFilters";
import LeadCard from "@/components/lead/leadCard";
import BulkActions from "@/components/lead/bulkActions";

export default function LeadsPage() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [selectedLeads, setSelectedLeads] = useState<string[]>([]);

  const { data, isLoading } = useQuery({
    queryKey: ["leads", search, status],
    queryFn: () => getLeads(search, status),
  });

  // const filteredLeads = data?.filter((lead: any) =>
  //   lead.name.toLowerCase().includes(search.toLowerCase())
  // );

  const toggleLead = (id: string) => {
    if (selectedLeads.includes(id)) {
      setSelectedLeads(selectedLeads.filter((leadId) => leadId !== id));
    } else {
      setSelectedLeads([...selectedLeads, id]);
    }
  };

  const queryClient = useQueryClient();

  useEffect(() => {
    socket.on("email generated",
      (data) => {
        queryClient.invalidateQueries({
          queryKey: ["leads"]
        })
      }
    );
    return () => {
      socket.off("email generated")
    }
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Leads</h1>
      {/* <h2>Email History</h2>
      <h2>Activities</h2>
      <h2>Notes</h2>
      <h2>Campaigns</h2> */}

      {/* <input  
        type="text"
        placeholder="Search leads..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border p-2 mb-4 w-full"
      /> */}
      <LeadFilters
        search={search}
        status={status}
        setSearch={setSearch}
        setStatus={setStatus}
      />
      <br />

      {/* {filteredLeads?.map((lead: any) => (
        <div key={lead.id} className="border p-4 mb-4 flex gap-3 items-start">
          <input
            type="checkbox"
            checked={selectedLeads.includes(lead.id)}
            onChange={() => toggleLead(lead.id)}
          />

          <Link href={`/dashboard/leads/${lead.id}`} className="flex-1">
            <h2>{lead.name}</h2>
            <p>{lead.emails}</p>
            <p>{lead.company}</p>
          </Link>
        </div>
      ))} */}

      <BulkActions
        selectedLeads={selectedLeads}
        onGenerate={() => { bulkGenerate(selectedLeads) }}
        onSend={() => { bulkSend(selectedLeads) }}
        onCampaign={() => { console.log(selectedLeads) }}
        onSequence={() => { console.log(selectedLeads) }} 
      />



      {data?.map((lead: any) => (
        <LeadCard key={lead.id}
          lead={lead}
          selected={selectedLeads.includes(
            lead.id
          )}
          onToggle={toggleLead}
          onGenerate={(id) => {
            console.log("Generate", id)
          }}
          onSend={(id) => {
            console.log("Send", id)
          }}
        />
      ))}
    </div>
  );
}
