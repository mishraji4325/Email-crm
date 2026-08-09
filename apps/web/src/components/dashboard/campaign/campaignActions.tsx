"use client";

interface CampaignActionsProps {
    generating: boolean;
    sending: boolean;
    onGenerate: () => void;
    onSend: () => void;
}

export default function CampaignActions({
    generating,
    sending,
    onGenerate,
    onSend
}: CampaignActionsProps) {

    return (
        <div className="border rounded-xl p-6 mt-6">

            <h2 className="text-xl font-bold mb-6">

                Campaign Actions

            </h2>

            <div className="flex flex-col md:flex-row gap-4">

                <button
                    onClick={onGenerate}
                    disabled={generating}
                    className="bg-black text-white border rounded-lg px-5 py-3 disabled:opacity-50"
                >
                    {
                        generating
                            ?
                            "Generating..."
                            :
                            "Generate All Emails"
                    }
                </button>

                <button
                    onClick={onSend}
                    disabled={sending}
                    className="bg-black text-white border rounded-lg px-5 py-3 disabled:opacity-50"
                >
                    {
                        sending
                            ?
                            "Sending..."
                            :
                            "Send All Emails"
                    }
                </button>
            </div>
        </div>
    );
}