"use client";

import Papa from "papaparse";
import { importLeads } from "../../../services/import.service";

export default function ImportPage() {
  function handleFileUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) return;

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,

      complete: async (results) => {
        try {
          const result = await importLeads(results.data as Record<string, string>[]);
          alert(
            `${result.message}\nImported: ${result.imported ?? "?"}${
              result.skipped ? `\nSkipped: ${result.skipped}` : ""
            }`
          );
        } catch (error: unknown) {
          const message =
            error &&
            typeof error === "object" &&
            "response" in error &&
            error.response &&
            typeof error.response === "object" &&
            "data" in error.response &&
            error.response.data &&
            typeof error.response.data === "object" &&
            "message" in error.response.data
              ? String(error.response.data.message)
              : "Failed to import leads. Check that your CSV has name and email columns.";
          alert(message);
        } finally {
          event.target.value = "";
        }
      },

      error: () => {
        alert("Could not read the CSV file.");
      },
    });
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Import Leads</h1>

      <p className="text-sm text-gray-600 mb-4">
        CSV must include <strong>name</strong> and <strong>email</strong> (or{" "}
        <strong>emails</strong>) columns. Optional: company, role.
      </p>

      <input type="file" accept=".csv" onChange={handleFileUpload} />
    </div>
  );
}
