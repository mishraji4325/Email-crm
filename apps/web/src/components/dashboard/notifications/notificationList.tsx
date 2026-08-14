"use client";

import NotificationItem from "./notificationItem";



interface Props {
    notifications: any[];
}

export default function NotificationList({
    notifications,
}: Props) {

    if (!notifications || notifications.length === 0) {
        return (
            <div className="border-2 border-dashed rounded-xl p-12 text-center">

                <div className="text-4xl mb-4">
                    🔔
                </div>

                <h2 className="text-xl font-bold">
                    No Notifications
                </h2>

                <p className="text-gray-500 mt-2">
                    You're all caught up.
                </p>

            </div>
        );
    }

    return (
        <div className="space-y-4">

            {notifications.map(
                (notification) => (
                    <NotificationItem
                        key={notification.id}
                        notification={notification}
                    />
                )
            )}

        </div>
    );
}