"use client";

interface Props {
    activities: any[];
}

export default function RecentActivity({
    activities,
}: Props) {

    if (
        !activities ||
        activities.length === 0
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
                    No recent activity.
                </p>

            </div>

        );

    }


    return (

        <div className="space-y-3">

            {activities.map(
                (activity) => (

                    <div
                        key={activity.id}
                        className="
                            flex
                            items-start
                            gap-3
                            rounded-xl
                            border
                            border-white/10
                            bg-[#111a2b]
                            p-4
                        "
                    >

                        <div className="
                            flex
                            h-9
                            w-9
                            shrink-0
                            items-center
                            justify-center
                            rounded-full
                            border
                            border-[#f4bb4f]/20
                            bg-[#f4bb4f]/10
                            text-sm
                        ">
                            📌
                        </div>


                        <div className="
                            min-w-0
                            flex-1
                        ">

                            <p className="
                                font-medium
                                text-white
                            ">
                                {activity.type}
                            </p>


                            <p className="
                                mt-1
                                truncate
                                text-sm
                                text-gray-500
                            ">
                                {activity.lead?.name ||
                                    "Unknown Lead"}
                            </p>


                            <p className="
                                mt-1
                                text-[11px]
                                text-gray-600
                            ">
                                {new Date(
                                    activity.createdAt
                                ).toLocaleString()}
                            </p>

                        </div>

                    </div>

                )
            )}

        </div>

    );
}