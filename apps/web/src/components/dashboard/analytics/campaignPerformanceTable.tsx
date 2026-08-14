"use client";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface Props {
    campaigns: any[];
}

export default function CampaignPerformanceTable({
    campaigns,
}: Props) {

    if (
        !campaigns ||
        campaigns.length === 0
    ) {

        return (

            <div className="
                rounded-xl
                border
                border-dashed
                border-white/10
                bg-[#111a2b]
                p-8
                text-center
            ">

                <p className="
                    text-sm
                    text-gray-600
                ">
                    No campaign data available.
                </p>

            </div>

        );

    }


    return (

        <div className="
            overflow-x-auto
        ">

            <Table className="w-full">

                <TableHeader>

                    <TableRow className="
                        border-b
                        border-white/10
                        text-left
                    ">

                        <TableHead className="
                            pb-3
                            pr-6
                            text-[10px]
                            font-medium
                            uppercase
                            tracking-[0.15em]
                            text-gray-600
                        ">
                            Campaign
                        </TableHead>

                        <TableHead className="
                            pb-3
                            pr-6
                            text-[10px]
                            font-medium
                            uppercase
                            tracking-[0.15em]
                            text-gray-600
                        ">
                            Leads
                        </TableHead>

                        <TableHead className="
                            pb-3
                            pr-6
                            text-[10px]
                            font-medium
                            uppercase
                            tracking-[0.15em]
                            text-gray-600
                        ">
                            Emails
                        </TableHead>

                        <TableHead className="
                            pb-3
                            pr-6
                            text-[10px]
                            font-medium
                            uppercase
                            tracking-[0.15em]
                            text-gray-600
                        ">
                            Opened
                        </TableHead>

                        <TableHead className="
                            pb-3
                            text-[10px]
                            font-medium
                            uppercase
                            tracking-[0.15em]
                            text-gray-600
                        ">
                            Open Rate
                        </TableHead>

                    </TableRow>

                </TableHeader >


                <TableBody>

                    {campaigns.map(
                        (campaign) => {

                            const emails =
                                campaign
                                    .emailRecords
                                    ?.length || 0;


                            const opened =
                                campaign
                                    .emailRecords
                                    ?.filter(
                                        (email: any) =>
                                            email.opened
                                    )
                                    .length || 0;


                            const openRate =
                                emails === 0
                                    ? 0
                                    : (
                                        (opened /
                                            emails) *
                                        100
                                    ).toFixed(1);


                            return (

                                <TableRow
                                    key={
                                        campaign.id
                                    }
                                    className="
                                        border-b
                                        border-white/5
                                        last:border-0
                                    "
                                >

                                    <TableCell className="
                                        py-4
                                        pr-6
                                        font-medium
                                        text-white
                                    ">
                                        {campaign.name}
                                    </TableCell>


                                    <TableCell className="
                                        py-4
                                        pr-6
                                        text-gray-400
                                    ">
                                        {
                                            campaign
                                                .campaignLeads
                                                ?.length || 0
                                        }
                                    </TableCell>


                                    <TableCell className="
                                        py-4
                                        pr-6
                                        text-gray-400
                                    ">
                                        {emails}
                                    </TableCell>


                                    <TableCell className="
                                        py-4
                                        pr-6
                                        text-gray-400
                                    ">
                                        {opened}
                                    </TableCell>


                                    <TableCell className="
                                        py-4
                                        font-semibold
                                        text-[#f4bb4f]
                                    ">
                                        {openRate}%
                                    </TableCell>

                                </TableRow>

                            );

                        }
                    )}

                </TableBody>

            </Table>

        </div>

    );
}