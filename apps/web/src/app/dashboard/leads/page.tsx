"use client";

import { useQuery } from "@tanstack/react-query";

import { getLeads } from "@/services/lead.service";
import { useState } from "react";

export default function LeadsPage() {

  const [search, setSearch] = useState("");
  const { data, isLoading } =
    useQuery({
      queryKey: ["leads"],
      queryFn: getLeads,
    });

    const filteredLeads =
        data?.filter((lead: any) =>
            lead.name
            .toLowerCase()
            .includes(search.toLowerCase())
        );
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>

      <h1 className="text-2xl font-bold mb-6">
        Leads
      </h1>

      <input
        type="text"
        placeholder="Search leads..."
        value={search}
        onChange={(e) =>
            setSearch(e.target.value)
        }
        className="border p-2 mb-4 w-full"
        />

      {filteredLeads?.map((lead: any) => (
        <div
          key={lead.id}
          className="border p-4 mb-4"
        >
          <h2>{lead.name}</h2>
          <p>{lead.email}</p>
          <p>{lead.company}</p>
        </div>
      ))}

    </div>
  );
}