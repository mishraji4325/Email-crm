"use client";

interface SequenceSectionProps {
    sequences:any[];
    selectedSequence:string;
    setSelectedSequence:(value:string)=>void;
    onAssign:()=>void;
}

export default function SequenceSection({
    sequences,
    selectedSequence,
    setSelectedSequence,
    onAssign
}:SequenceSectionProps){
    return(
        <div className="border rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">
                Sequence
            </h2>

            <select
                value={selectedSequence}
                onChange={(e)=>
                    setSelectedSequence(
                        e.target.value
                    )
                }
                className="border rounded p-2 w-full"
            >
                <option value="">
                    Select Sequence
                </option>
                {
                    sequences.map((sequence:any)=>(
                        <option
                            key={sequence.id}
                            value={sequence.id}
                        >
                            {sequence.name}
                        </option>
                    ))
                }
            </select>

            <button
                className="border rounded px-4 py-2 mt-4"
                onClick={onAssign}
            >
                Assign Sequence
            </button>
        </div>
    );
}