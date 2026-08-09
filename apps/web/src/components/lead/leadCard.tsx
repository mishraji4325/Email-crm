"use client";

import LeadActions from "./leadActions";

interface LeadCardProps {
    lead: any;
    selected: boolean;
    onToggle: (id: string) => void;
    onGenerate?: (id: string) => void;
    onSend?: (id: string) => void;
}

export default function LeadCard({
    lead, selected, onToggle, onGenerate, onSend
}: LeadCardProps) {
    const emailsSent = lead.emailRecords?.filter((email: any) => !email.isDraft).length || 0;
    const opened = lead.emailRecords?.some((email: any) => email.opened);
    console.log(lead)
    return (
        <div className="border rounded-lg p-5 mb-4">
            <div className="flex items-start gap-4">
                <input type="checkbox"
                    checked={selected}
                    onChange={() => onToggle(lead.id)}
                />
                <div className="flex-1">
                    <div className="flex-justify-between">
                        <h2 className="text-xl font-semibold">
                            {lead.name}
                        </h2>
                        <span className="border rounded px-2 py-1 text-sm">
                            {lead.status}
                        </span>
                    </div>
                    <p className="mt-2">
                        🏢 {lead.company || "-"}
                    </p>
                    <p>
                        💼 {lead.role || "-"}
                    </p>
                    <p>
                        📧 {lead.emails}
                    </p>
                    <p>
                        📢 Campaign : {
                            lead.campaigns?.length ? lead.campaigns[0].campaign.name : "Not Assigned"
                        }
                    </p>
                    <p>
                        📨 Emails Sent : {emailsSent}
                    </p>
                    <p>
                        👁️ Opened : {
                            opened ? "Yes" : "No"
                        }
                    </p>
                    <LeadActions
                        lead={lead}
                        onGenerate={onGenerate}
                        onSend={onSend} />
                </div>
            </div>
        </div>
    );
}