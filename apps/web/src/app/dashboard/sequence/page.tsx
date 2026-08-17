"use client";

import { useState } from "react";

import {
    useMutation,
    useQuery,
    useQueryClient,
} from "@tanstack/react-query";

import {
    createSequence,
    getSequences,
} from "@/services/sequence.service";

import SearchBar from "@/components/common/searchBar";

import {
    Card,
    CardContent,
} from "@/components/ui/card";

import {Button} from "@/components/ui/button";
import Badge from "@/components/ui/badge";
import EmptyState from "@/components/ui/empty-state";
import LoadingState from "@/components/ui/loading-state";

import Link from "next/link";
import CreateEntityModal from "@/components/common/entityModal";


export default function SequencesPage() {

    const [search, setSearch] =
        useState("");

    const [open, setOpen] =
        useState(false);


    /* ========================================= */
    /* FETCH */
    /* ========================================= */

    const {
        data,
        isLoading,
        error,
    } = useQuery({

        queryKey: ["sequences"],

        queryFn: getSequences,

        staleTime: 1000 * 60 * 5,

        refetchOnWindowFocus: false,

    });


    const queryClient =
        useQueryClient();


    /* ========================================= */
    /* CREATE */
    /* ========================================= */

    const mutation =
        useMutation({

            mutationFn: createSequence,

            onSuccess() {

                queryClient.invalidateQueries({
                    queryKey: ["sequences"],
                });

                setOpen(false);

            },

        });


    /* ========================================= */
    /* LOADING */
    /* ========================================= */

    if (isLoading) {

        return (
            <LoadingState
                text="Loading sequences..."
            />
        );

    }


    /* ========================================= */
    /* ERROR */
    /* ========================================= */

    if (error) {

        return (
            <EmptyState
                title="Unable to load sequences"
                description="
                    Something went wrong while loading
                    your sequences.
                "
                action={
                    <Button
                        onClick={() =>
                            window.location.reload()
                        }
                    >
                        Try Again
                    </Button>
                }
            />
        );

    }


    /* ========================================= */
    /* FILTER */
    /* ========================================= */

    const filteredSequences =
        data?.filter(
            (sequence: any) =>
                sequence.name
                    .toLowerCase()
                    .includes(
                        search.toLowerCase()
                    )
        ) || [];


    return (

        <div className="space-y-8">


            {/* ========================================= */}
            {/* HEADER */}
            {/* ========================================= */}

            <div className="
                flex
                flex-col
                gap-4
                sm:flex-row
                sm:items-center
                sm:justify-between
            ">

                <div>

                    <div className="
                        mb-2
                        text-[10px]
                        font-medium
                        uppercase
                        tracking-[0.2em]
                        text-[#f4bb4f]
                    ">
                        Automation
                    </div>

                    <h1 className="
                        text-3xl
                        font-semibold
                        text-white
                    ">
                        Sequences
                    </h1>

                    <p className="
                        mt-1
                        text-sm
                        text-gray-500
                    ">
                        Automate your follow-up emails.
                    </p>

                </div>


                <Button
                    onClick={() =>
                        setOpen(true)
                    }
                >
                    + New Sequence
                </Button>

            </div>


            {/* ========================================= */}
            {/* STATS */}
            {/* ========================================= */}

            <div className="
                grid
                grid-cols-1
                gap-4
                sm:grid-cols-3
            ">

                <Card>

                    <CardContent className="p-5">

                        <p className="
                            text-[10px]
                            uppercase
                            tracking-[0.18em]
                            text-gray-500
                        ">
                            Total Sequences
                        </p>

                        <p className="
                            mt-2
                            text-3xl
                            font-semibold
                            text-white
                        ">
                            {data?.length || 0}
                        </p>

                    </CardContent>

                </Card>


                <Card>

                    <CardContent className="p-5">

                        <p className="
                            text-[10px]
                            uppercase
                            tracking-[0.18em]
                            text-gray-500
                        ">
                            Total Steps
                        </p>

                        <p className="
                            mt-2
                            text-3xl
                            font-semibold
                            text-[#f4bb4f]
                        ">
                            {
                                data?.reduce(
                                    (
                                        total: number,
                                        sequence: any
                                    ) =>
                                        total +
                                        (
                                            sequence
                                                .steps
                                                ?.length || 0
                                        ),
                                    0
                                )
                            }
                        </p>

                    </CardContent>

                </Card>


                <Card>

                    <CardContent className="p-5">

                        <p className="
                            text-[10px]
                            uppercase
                            tracking-[0.18em]
                            text-gray-500
                        ">
                            Assigned Leads
                        </p>

                        <p className="
                            mt-2
                            text-3xl
                            font-semibold
                            text-emerald-400
                        ">
                            {
                                data?.reduce(
                                    (
                                        total: number,
                                        sequence: any
                                    ) =>
                                        total +
                                        (
                                            sequence
                                                .leads
                                                ?.length || 0
                                        ),
                                    0
                                )
                            }
                        </p>

                    </CardContent>

                </Card>

            </div>


            {/* ========================================= */}
            {/* SEARCH */}
            {/* ========================================= */}

            <Card>

                <CardContent className="p-4">

                    <SearchBar
                        value={search}
                        placeholder="Search sequences..."
                        onChange={setSearch}
                    />

                </CardContent>

            </Card>


            {/* ========================================= */}
            {/* LIST */}
            {/* ========================================= */}

            {filteredSequences.length === 0 ? (

                <EmptyState

                    title={
                        search
                            ? "No sequences found"
                            : "No sequences yet"
                    }

                    description={
                        search
                            ? "Try another search."
                            : "Create your first automated email sequence."
                    }

                    action={
                        !search && (
                            <Button
                                onClick={() =>
                                    setOpen(true)
                                }
                            >
                                + Create Sequence
                            </Button>
                        )
                    }

                />

            ) : (

                <div className="
                    grid
                    grid-cols-1
                    gap-5
                    xl:grid-cols-2
                ">

                    {filteredSequences.map(
                        (sequence: any) => {

                            const totalSteps =
                                sequence.steps
                                    ?.length || 0;

                            const totalLeads =
                                sequence.leads
                                    ?.length || 0;


                            return (

                                <Card
                                    key={sequence.id}
                                    className="
                                        transition
                                        hover:border-white/20
                                    "
                                >

                                    <CardContent className="
                                        p-6
                                    ">

                                        {/* HEADER */}

                                        <div className="
                                            flex
                                            items-start
                                            justify-between
                                            gap-4
                                        ">

                                            <div className="
                                                min-w-0
                                            ">

                                                <Badge
                                                    variant="info"
                                                >
                                                    ✉ Sequence
                                                </Badge>

                                                <h2 className="
                                                    mt-3
                                                    truncate
                                                    text-xl
                                                    font-semibold
                                                    text-white
                                                ">
                                                    {sequence.name}
                                                </h2>

                                                <p className="
                                                    mt-1
                                                    text-xs
                                                    text-gray-500
                                                ">
                                                    Created{" "}
                                                    {new Date(
                                                        sequence.createdAt
                                                    ).toLocaleDateString()}
                                                </p>

                                            </div>


                                            <Link
                                                href={`/dashboard/sequence/${sequence.id}`}
                                            >

                                                <Button
                                                    variant="secondary"
                                                >
                                                    Open →
                                                </Button>

                                            </Link>

                                        </div>


                                        {/* STATS */}

                                        <div className="
                                            mt-6
                                            grid
                                            grid-cols-2
                                            divide-x
                                            divide-white/10
                                            rounded-xl
                                            border
                                            border-white/5
                                            bg-[#111a2b]
                                            py-4
                                        ">

                                            <div className="px-4">

                                                <p className="
                                                    text-[10px]
                                                    uppercase
                                                    tracking-[0.15em]
                                                    text-gray-600
                                                ">
                                                    Steps
                                                </p>

                                                <p className="
                                                    mt-1
                                                    text-xl
                                                    font-semibold
                                                    text-white
                                                ">
                                                    {totalSteps}
                                                </p>

                                            </div>


                                            <div className="px-4">

                                                <p className="
                                                    text-[10px]
                                                    uppercase
                                                    tracking-[0.15em]
                                                    text-gray-600
                                                ">
                                                    Leads
                                                </p>

                                                <p className="
                                                    mt-1
                                                    text-xl
                                                    font-semibold
                                                    text-[#f4bb4f]
                                                ">
                                                    {totalLeads}
                                                </p>

                                            </div>

                                        </div>

                                    </CardContent>

                                </Card>

                            );

                        }
                    )}

                </div>

            )}


            {/* ========================================= */}
            {/* CREATE MODAL */}
            {/* ========================================= */}

            <CreateEntityModal

                open={open}

                title="Create Sequence"

                fields={[
                    {
                        name: "name",
                        label: "Sequence Name",
                    },
                    {
                        name:"description",
                        label: "Description",
                        type: "textarea",
                        placeholder: "Enter a description for the sequence",
                    }
                ]}

                buttonText={
                    mutation.isPending
                        ? "Creating..."
                        : "Create"
                }

                onClose={() =>
                    setOpen(false)
                }

                onSubmit={(value) => {

                    if (!value.trim()) {
                        return;
                    }

                    mutation.mutate(value);

                }}

            />

        </div>
    );
}