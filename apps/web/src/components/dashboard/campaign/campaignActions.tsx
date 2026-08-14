"use client";

import {Button} from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
    onSend,
}: CampaignActionsProps) {

    return (
        <Card className="mt-6">

            <CardHeader>

                <CardTitle>
                    Campaign Actions
                </CardTitle>

            </CardHeader>


            <CardContent>

                <div className="
                    flex
                    flex-col
                    gap-3
                    sm:flex-row
                ">

                    <Button
                        onClick={onGenerate}
                        disabled={generating}
                    >
                        {generating
                            ? "Generating..."
                            : "✦ Generate All Emails"
                        }
                    </Button>


                    <Button
                        variant="secondary"
                        onClick={onSend}
                        disabled={sending}
                    >
                        {sending
                            ? "Sending..."
                            : "✉ Send All Emails"
                        }
                    </Button>

                </div>

            </CardContent>

        </Card>
    );
}