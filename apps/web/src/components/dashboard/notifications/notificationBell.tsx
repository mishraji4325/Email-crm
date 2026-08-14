"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { getNotifications } from "@/services/notification.service";

export default function NotificationBell() {

    const { data } = useQuery({
        queryKey: ["notifications"],
        queryFn: getNotifications,
        staleTime: 1000 * 30,
    });

    const unreadCount =
        data?.filter(
            (notification: any) =>
                !notification.read
        ).length || 0;

    return (
        <Link
            href="/dashboard/notifications"
            className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-[#111a2b] text-gray-300 transition hover:border-white/20 hover:text-white"
        >
            <span className="text-lg">🔔</span>

            {unreadCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-xs font-semibold text-white">
                    {unreadCount > 99 ? "99+" : unreadCount}
                </span>
            )}
        </Link>
    );
}