"use client";

import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getLead } from "@/services/lead.service";
import { createNote } from "@/services/note.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

export default function leadPage() {
  const params = useParams();

  const [note, setNote] = useState("");

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

  return (
    <div>
      <h1 className="text-2xl font-bold">{data?.name}</h1>

      <p>{data?.emails}</p>
      <p>{data?.company}</p>
      <p>{data?.role}</p>

      <div className="mt-8">
        <label
          htmlFor="lead-status"
          className="block text-sm font-medium text-gray-700"
        >
          Status
        </label>

        <select
          id="lead-status"
          name="status"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
        >
          <option value="new">new</option>
          <option value="contacted">contacted</option>
          <option value="replied">replied</option>
          <option value="booked">booked</option>
          <option value="closed">closed</option>
        </select>

        <h2>Notes</h2>

        {data?.notes?.map((note: any) => (
          <div key={note.id} className="border p-3 mt-2">
            {note.content}
          </div>
        ))}
      </div>
    </div>
  );
}
