"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { markNotificationRead } from "@/services/notification.service";

interface Props {
    notification: any;
}

export default function NotificationItem({
    notification,
}: Props) {

    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: () =>
            markNotificationRead(
                notification.id
            ),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["notifications"],
            });
        },
    });

    return (
        <div
            className={`border rounded-xl p-5 ${notification.read
                    ? "bg-white"
                    : "bg-gray-50"
                }`}
        >

            <div className="flex justify-between gap-4">

                <div className="flex gap-4">

                    <div className="text-xl">
                        🔔
                    </div>

                    <div>

                        <h3 className="font-semibold">
                            {notification.title}
                        </h3>

                        <p className="text-gray-600 mt-1">
                            {notification.message}
                        </p>

                        <p className="text-xs text-gray-400 mt-2">
                            {new Date(
                                notification.createdAt
                            ).toLocaleString()}
                        </p>

                    </div>

                </div>

                {!notification.read && (
                    <button
                        onClick={() =>
                            mutation.mutate()
                        }
                        disabled={mutation.isPending}
                        className="text-sm border rounded-lg px-3 py-1 h-fit"
                    >
                        Mark read
                    </button>
                )}

            </div>

        </div>
    );
}