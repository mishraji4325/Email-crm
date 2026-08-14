"use client";

import { useState } from "react";
import Papa from "papaparse";
import { importLeads } from "../../../services/import.service";
import { Button } from "@/components/ui/button";

interface CsvRow {
    [key: string]: string;
}

export default function ImportPage() {

    const [fileName, setFileName] = useState("");
    const [rows, setRows] = useState<CsvRow[]>([]);
    const [isParsing, setIsParsing] = useState(false);
    const [isImporting, setIsImporting] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    function handleFileUpload(
        event: React.ChangeEvent<HTMLInputElement>
    ) {

        const file = event.target.files?.[0];

        if (!file) return;

        setError("");
        setMessage("");
        setRows([]);
        setFileName(file.name);
        setIsParsing(true);

        if (!file.name.toLowerCase().endsWith(".csv")) {
            setError("Please select a CSV file.");
            setIsParsing(false);
            event.target.value = "";
            return;
        }

        Papa.parse<CsvRow>(file, {
            header: true,
            skipEmptyLines: true,

            complete: (results) => {

                setIsParsing(false);

                if (!results.data.length) {
                    setError("The CSV file is empty.");
                    return;
                }

                const firstRow = results.data[0];

                const keys = Object.keys(firstRow);

                const hasName =
                    keys.some(
                        (key) =>
                            key.toLowerCase() === "name"
                    );

                const hasEmail =
                    keys.some(
                        (key) =>
                            key.toLowerCase() === "email" ||
                            key.toLowerCase() === "emails"
                    );

                if (!hasName || !hasEmail) {
                    setError(
                        "CSV must contain name and email (or emails) columns."
                    );
                    setRows([]);
                    return;
                }

                setRows(results.data);
            },

            error: () => {
                setIsParsing(false);
                setError(
                    "Could not read the CSV file."
                );
            },
        });
    }


    async function handleImport() {

        if (!rows.length) return;

        setIsImporting(true);
        setError("");
        setMessage("");

        try {

            const result = await importLeads(rows);

            setMessage(
                `${result.message} Imported: ${
                    result.imported ?? "?"
                }${
                    result.skipped
                        ? ` • Skipped: ${result.skipped}`
                        : ""
                }`
            );

            setRows([]);
            setFileName("");

        } catch (error: unknown) {

            const responseMessage =
                error &&
                typeof error === "object" &&
                "response" in error &&
                error.response &&
                typeof error.response === "object" &&
                "data" in error.response &&
                error.response.data &&
                typeof error.response.data === "object" &&
                "message" in error.response.data
                    ? String(
                        error.response.data.message
                    )
                    : "Failed to import leads. Check that your CSV has name and email columns.";

            setError(responseMessage);

        } finally {

            setIsImporting(false);

        }
    }


    return (
        <div className="p-6">

            {/* Header */}

            <div className="mb-8">

                <p className="
                    text-[10px]
                    font-medium
                    uppercase
                    tracking-[0.18em]
                    text-gray-600
                ">
                    Lead Management
                </p>

                <h1 className="
                    mt-1
                    text-3xl
                    font-bold
                    text-white
                ">
                    Import Leads
                </h1>

                <p className="
                    mt-2
                    text-sm
                    text-gray-500
                ">
                    Import your prospects from a CSV file.
                </p>

            </div>


            {/* Upload Card */}

            <div className="
                rounded-2xl
                border
                border-white/10
                bg-[#0d1526]
                p-6
            ">

                <div className="
                    rounded-2xl
                    border
                    border-dashed
                    border-white/10
                    bg-[#111a2b]
                    p-10
                    text-center
                ">

                    <div className="
                        mx-auto
                        flex
                        h-14
                        w-14
                        items-center
                        justify-center
                        rounded-2xl
                        bg-[#f4bb4f]/10
                        text-2xl
                    ">
                        ↑
                    </div>

                    <h2 className="
                        mt-5
                        text-lg
                        font-semibold
                        text-white
                    ">
                        Upload CSV
                    </h2>

                    <p className="
                        mx-auto
                        mt-2
                        max-w-md
                        text-sm
                        leading-6
                        text-gray-500
                    ">
                        Upload a CSV containing your leads.
                        The file must include name and email
                        columns.
                    </p>


                    <label className="
                        mt-6
                        inline-flex
                        cursor-pointer
                        items-center
                        rounded-xl
                        bg-[#f4bb4f]
                        px-5
                        py-3
                        text-sm
                        font-medium
                        text-black
                        transition
                        hover:bg-[#f4bb4f]/90
                    ">

                        {isParsing
                            ? "Reading CSV..."
                            : "Choose CSV File"}

                        <input
                            type="file"
                            accept=".csv"
                            onChange={handleFileUpload}
                            disabled={isParsing || isImporting}
                            className="hidden"
                        />

                    </label>


                    <p className="
                        mt-4
                        text-xs
                        text-gray-600
                    ">
                        Supported format: .csv
                    </p>

                </div>

            </div>


            {/* File information */}

            {fileName && rows.length > 0 && (

                <div className="
                    mt-6
                    rounded-2xl
                    border
                    border-white/10
                    bg-[#0d1526]
                    p-6
                ">

                    <div className="
                        flex
                        flex-col
                        gap-4
                        sm:flex-row
                        sm:items-center
                        sm:justify-between
                    ">

                        <div>

                            <p className="
                                text-[10px]
                                uppercase
                                tracking-[0.18em]
                                text-gray-600
                            ">
                                Selected File
                            </p>

                            <p className="
                                mt-1
                                text-sm
                                font-medium
                                text-gray-200
                            ">
                                📄 {fileName}
                            </p>

                        </div>

                        <div className="
                            rounded-xl
                            border
                            border-emerald-500/20
                            bg-emerald-500/10
                            px-4
                            py-2
                            text-sm
                            text-emerald-400
                        ">
                            {rows.length} rows detected
                        </div>

                    </div>


                    {/* Preview */}

                    <div className="mt-6">

                        <div className="
                            mb-4
                            flex
                            items-center
                            justify-between
                        ">

                            <h2 className="
                                text-lg
                                font-semibold
                                text-white
                            ">
                                Import Preview
                            </h2>

                            <span className="
                                text-xs
                                text-gray-600
                            ">
                                Showing first{" "}
                                {Math.min(rows.length, 5)} rows
                            </span>

                        </div>


                        <div className="
                            overflow-x-auto
                            rounded-xl
                            border
                            border-white/10
                        ">

                            <table className="w-full text-left">

                                <thead className="
                                    border-b
                                    border-white/10
                                    bg-[#111a2b]
                                ">

                                    <tr>

                                        {Object.keys(
                                            rows[0]
                                        ).slice(0, 5).map(
                                            (key) => (

                                                <th
                                                    key={key}
                                                    className="
                                                        px-4
                                                        py-3
                                                        text-xs
                                                        font-medium
                                                        uppercase
                                                        tracking-wider
                                                        text-gray-500
                                                    "
                                                >
                                                    {key}
                                                </th>

                                            )
                                        )}

                                    </tr>

                                </thead>


                                <tbody>

                                    {rows
                                        .slice(0, 5)
                                        .map(
                                            (row, index) => (

                                                <tr
                                                    key={index}
                                                    className="
                                                        border-b
                                                        border-white/5
                                                        last:border-0
                                                    "
                                                >

                                                    {Object.keys(
                                                        rows[0]
                                                    )
                                                        .slice(0, 5)
                                                        .map(
                                                            (key) => (

                                                                <td
                                                                    key={key}
                                                                    className="
                                                                        max-w-[220px]
                                                                        truncate
                                                                        px-4
                                                                        py-3
                                                                        text-sm
                                                                        text-gray-300
                                                                    "
                                                                >
                                                                    {row[key] || "-"}
                                                                </td>

                                                            )
                                                        )}

                                                </tr>

                                            )
                                        )}

                                </tbody>

                            </table>

                        </div>

                    </div>


                    {/* Import */}

                    <div className="
                        mt-6
                        flex
                        flex-col
                        gap-3
                        border-t
                        border-white/10
                        pt-6
                        sm:flex-row
                        sm:items-center
                        sm:justify-between
                    ">

                        <p className="
                            text-sm
                            text-gray-500
                        ">
                            Ready to import{" "}
                            <span className="text-gray-300">
                                {rows.length}
                            </span>{" "}
                            leads.
                        </p>

                        <Button
                            onClick={handleImport}
                            disabled={isImporting}
                            className="
                                h-11
                                rounded-xl
                                bg-[#f4bb4f]
                                px-6
                                text-black
                                hover:bg-[#f4bb4f]/90
                            "
                        >
                            {isImporting
                                ? "Importing..."
                                : `Import ${rows.length} Leads`}
                        </Button>

                    </div>

                </div>

            )}


            {/* Success */}

            {message && (

                <div className="
                    mt-6
                    rounded-xl
                    border
                    border-emerald-500/20
                    bg-emerald-500/10
                    p-4
                    text-sm
                    text-emerald-400
                ">
                    ✓ {message}
                </div>

            )}


            {/* Error */}

            {error && (

                <div className="
                    mt-6
                    rounded-xl
                    border
                    border-red-500/20
                    bg-red-500/10
                    p-4
                    text-sm
                    text-red-400
                ">
                    ⚠ {error}
                </div>

            )}


            {/* Requirements */}

            <div className="
                mt-6
                rounded-2xl
                border
                border-white/10
                bg-[#0d1526]
                p-6
            ">

                <h2 className="
                    text-sm
                    font-semibold
                    text-white
                ">
                    CSV Requirements
                </h2>

                <div className="
                    mt-4
                    grid
                    gap-3
                    sm:grid-cols-3
                ">

                    <div className="
                        rounded-xl
                        border
                        border-white/5
                        bg-white/[0.02]
                        p-4
                    ">
                        <p className="
                            text-xs
                            uppercase
                            tracking-wider
                            text-gray-600
                        ">
                            Required
                        </p>

                        <p className="
                            mt-2
                            text-sm
                            text-gray-300
                        ">
                            name
                        </p>
                    </div>


                    <div className="
                        rounded-xl
                        border
                        border-white/5
                        bg-white/[0.02]
                        p-4
                    ">
                        <p className="
                            text-xs
                            uppercase
                            tracking-wider
                            text-gray-600
                        ">
                            Required
                        </p>

                        <p className="
                            mt-2
                            text-sm
                            text-gray-300
                        ">
                            email / emails
                        </p>
                    </div>


                    <div className="
                        rounded-xl
                        border
                        border-white/5
                        bg-white/[0.02]
                        p-4
                    ">
                        <p className="
                            text-xs
                            uppercase
                            tracking-wider
                            text-gray-600
                        ">
                            Optional
                        </p>

                        <p className="
                            mt-2
                            text-sm
                            text-gray-300
                        ">
                            company, role
                        </p>
                    </div>

                </div>

            </div>

        </div>
    );
}