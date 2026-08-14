"use client";

interface ActivityTimelineProps {
    activities: any[];
}

function getIcon(type: string) {

    switch (type.toLowerCase()) {

        case "email generated":
            return "✦";

        case "email sent":
            return "✉";

        case "meeting booked":
            return "📅";

        case "note added":
            return "📝";

        default:
            return "•";
    }
}

export default function ActivityTimeline({
    activities,
}: ActivityTimelineProps) {

    return (
        <div className="
            rounded-2xl
            border
            border-white/10
            bg-[#0d1526]
            p-6
            mb-3
        ">

            <p className="
                text-[10px]
                font-medium
                uppercase
                tracking-[0.18em]
                text-gray-600
            ">
                Lead History
            </p>

            <h2 className="
                mt-1
                text-xl
                font-bold
                text-white
            ">
                Activity Timeline
            </h2>


            {activities.length === 0 ? (

                <div className="
                    mt-6
                    rounded-xl
                    border
                    border-dashed
                    border-white/10
                    bg-white/[0.02]
                    p-8
                    text-center
                ">

                    <div className="
                        mx-auto
                        flex
                        h-10
                        w-10
                        items-center
                        justify-center
                        rounded-xl
                        bg-white/[0.04]
                        text-gray-500
                    ">
                        •
                    </div>

                    <p className="
                        mt-3
                        text-sm
                        text-gray-500
                    ">
                        No activities yet.
                    </p>

                </div>

            ) : (

                <div className="
                    mt-6
                    space-y-1
                ">

                    {activities.map(
                        (activity: any, index: number) => (

                            <div
                                key={activity.id}
                                className="
                                    relative
                                    flex
                                    gap-4
                                    pb-6
                                "
                            >

                                {/* Timeline line */}

                                {index !== activities.length - 1 && (
                                    <div className="
                                        absolute
                                        left-[17px]
                                        top-9
                                        h-full
                                        w-px
                                        bg-white/10
                                    " />
                                )}


                                {/* Icon */}

                                <div className="
                                    relative
                                    z-10
                                    flex
                                    h-9
                                    w-9
                                    shrink-0
                                    items-center
                                    justify-center
                                    rounded-xl
                                    border
                                    border-[#f4bb4f]/20
                                    bg-[#f4bb4f]/10
                                    text-sm
                                    text-[#f4bb4f]
                                ">
                                    {getIcon(
                                        activity.type
                                    )}
                                </div>


                                {/* Content */}

                                <div className="
                                    min-w-0
                                    flex-1
                                    rounded-xl
                                    border
                                    border-white/10
                                    bg-[#111a2b]
                                    p-4
                                ">

                                    <div className="
                                        flex
                                        flex-col
                                        gap-1
                                        sm:flex-row
                                        sm:items-center
                                        sm:justify-between
                                    ">

                                        <h3 className="
                                            font-semibold
                                            text-gray-200
                                        ">
                                            {activity.type}
                                        </h3>

                                        <p className="
                                            text-xs
                                            text-gray-600
                                        ">
                                            {new Date(
                                                activity.createdAt
                                            ).toLocaleString()}
                                        </p>

                                    </div>


                                    {activity.description && (
                                        <p className="
                                            mt-2
                                            text-sm
                                            leading-6
                                            text-gray-500
                                        ">
                                            {activity.description}
                                        </p>
                                    )}

                                </div>

                            </div>

                        )
                    )}

                </div>

            )}

        </div>
    );
}