"use client";

interface BulkActionsProps{
    selectedLeads:string[];
    onGenerate:()=>void;
    onSend:()=>void;
    onCampaign:()=>void;
    onSequence:()=>void;
}

export default function BulkActions({
    selectedLeads, onGenerate, onSend, onCampaign, onSequence
}: BulkActionsProps){
    if(selectedLeads.length===0){
        return null;
    }
    return (
        <div className="border rounded-lg p-4 mb-6 bg-gray-50">
            <div className="flex justify-between items-center">
                <h2 className="font-semibold">
                    {selectedLeads.length} Lead(s) selected
                </h2>
                <div className="flex gap-3">
                    <button onClick={onGenerate} className="border px-3 py-2 rounded">
                        Generative Ai
                    </button>
                    <button onClick={onSend} className="border px-3 py-2 rounded">
                        Send
                    </button>
                    <button onClick={onCampaign} className="border px-3 py-2 rounded">
                        Add Campaign
                    </button>
                    <button onClick={onSequence} className="border px-3 py-2 rounded">
                        Add Sequence
                    </button>
                </div>
            </div>
        </div>
    );
}