"use client";

import {
    useMutation,
    useQuery,
    useQueryClient,
} from "@tanstack/react-query";

import {
    getNotifications,
    markAllNotificationsRead,
} from "@/services/notification.service";
import NotificationList from "@/components/dashboard/notifications/notificationList";



export default function NotificationsPage() {

    const queryClient =
        useQueryClient();

    const {
        data,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ["notifications"],
        queryFn: getNotifications,
    });

    const markAllMutation =
        useMutation({
            mutationFn:
                markAllNotificationsRead,

            onSuccess: () => {
                queryClient.invalidateQueries({
                    queryKey: ["notifications"],
                });
            },
        });

    if (isLoading) {
        return (
            <div className="p-6">
                Loading notifications...
            </div>
        );
    }

    if (isError) {
        return (
            <div className="p-6">
                <h1 className="text-2xl font-bold">
                    Notifications
                </h1>

                <p className="text-red-500 mt-2">
                    Failed to load notifications.
                </p>
            </div>
        );
    }

    const unreadCount =
        data?.filter(
            (notification: any) =>
                !notification.read
        ).length || 0;

    return (
        <div className="p-6 max-w-4xl">

            <div className="flex items-center justify-between mb-6">

                <div>

                    <h1 className="text-3xl font-bold">
                        Notifications
                    </h1>

                    <p className="text-gray-500 mt-1">
                        {unreadCount} unread notification
                        {unreadCount !== 1
                            ? "s"
                            : ""}
                    </p>

                </div>

                {unreadCount > 0 && (
                    <button
                        onClick={() =>
                            markAllMutation.mutate()
                        }
                        disabled={
                            markAllMutation.isPending
                        }
                        className="border rounded-lg px-4 py-2"
                    >
                        Mark all as read
                    </button>
                )}

            </div>

            <NotificationList
                notifications={data ?? []}
            />

        </div>
    );
}