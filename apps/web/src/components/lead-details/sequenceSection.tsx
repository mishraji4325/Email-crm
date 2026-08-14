"use client";

import { Button } from "../ui/button";

interface SequenceSectionProps {
    sequences: any[];
    selectedSequence: string;
    setSelectedSequence: (value: string) => void;
    onAssign: () => void;
}

export default function SequenceSection({
    sequences,
    selectedSequence,
    setSelectedSequence,
    onAssign,
}: SequenceSectionProps) {

    return (
        <div className="
            mt-6
            rounded-2xl
            border
            border-white/10
            bg-[#0d1526]
            p-6
            mb-3
        ">

            {/* Header */}

            <div className="
                flex
                items-center
                justify-between
                gap-3
                mb-5
            ">

                <div>

                    <p className="
                        text-[10px]
                        font-medium
                        uppercase
                        tracking-[0.18em]
                        text-gray-600
                    ">
                        Lead Automation
                    </p>

                    <h2 className="
                        mt-1
                        text-xl
                        font-bold
                        text-white
                    ">
                        Sequence
                    </h2>

                </div>

                <span className="
                    rounded-full
                    border
                    border-white/10
                    bg-white/[0.03]
                    px-3
                    py-1
                    text-xs
                    text-gray-400
                ">
                    Automation
                </span>

            </div>


            {/* Select */}

            <label className="
                mb-2
                block
                text-[10px]
                font-medium
                uppercase
                tracking-[0.18em]
                text-gray-600
            ">
                Assign Sequence
            </label>


            <div className="
                flex
                flex-col
                gap-3
                sm:flex-row
            ">

                <select
                    value={selectedSequence}
                    onChange={(e) =>
                        setSelectedSequence(
                            e.target.value
                        )
                    }
                    className="
                        h-11
                        min-w-0
                        flex-1
                        rounded-xl
                        border
                        border-white/10
                        bg-[#111a2b]
                        px-4
                        text-sm
                        text-gray-300
                        outline-none
                        transition
                        focus:border-[#f4bb4f]/60
                        focus:ring-1
                        focus:ring-[#f4bb4f]/20
                    "
                >

                    <option
                        value=""
                        className="
                            bg-[#111a2b]
                            text-gray-300
                        "
                    >
                        Select Sequence
                    </option>

                    {sequences.map(
                        (sequence: any) => (

                            <option
                                key={sequence.id}
                                value={sequence.id}
                                className="
                                    bg-[#111a2b]
                                    text-gray-300
                                "
                            >
                                {sequence.name}
                            </option>

                        )
                    )}

                </select>


                <Button
                    onClick={onAssign}
                    disabled={!selectedSequence}
                    className="
                        h-11
                        rounded-xl
                        bg-[#f4bb4f]
                        px-5
                        font-medium
                        text-black
                        hover:bg-[#f4bb4f]/90
                        disabled:cursor-not-allowed
                        disabled:opacity-40
                    "
                >
                    Assign Sequence
                </Button>

            </div>

        </div>
    );
}