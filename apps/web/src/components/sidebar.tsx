"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { useAuthStore } from "@/store/auth.store";


const navigation = [
    {
        name: "Dashboard",
        href: "/dashboard",
        icon: "⌂",
    },
    {
        name: "Leads",
        href: "/dashboard/leads",
        icon: "◉",
    },
    {
        name: "Pipeline",
        href: "/dashboard/pipeline",
        icon: "◈",
    },
    {
        name: "Campaigns",
        href: "/dashboard/campaigns",
        icon: "✉",
    },
    {
        name: "Import Leads",
        href: "/dashboard/import",
        icon: "↑",
    },
    {
        name: "Analytics",
        href: "/dashboard/analytics",
        icon: "▥",
    },
    {
        name: "Workspace",
        href: "/dashboard/workspace",
        icon: "♧",
    },
    {
        name: "Sequences",
        href: "/dashboard/sequence",
        icon: "≡",
    },
];


export default function Sidebar() {

    const pathname =
        usePathname();

    const router =
        useRouter();


    const user =
        useAuthStore(
            (state) => state.user
        );

    const logout =
        useAuthStore(
            (state) => state.logout
        );


    const handleLogout = () => {

        logout();

        localStorage.removeItem(
            "token"
        );

        router.push("/login");

    };


    return (

        <aside className="
            sticky
            top-0
            flex
            h-screen
            w-64
            shrink-0
            flex-col
            border-r
            border-white/10
            bg-[#080f1e]
        ">


            {/* ================================= */}
            {/* LOGO */}
            {/* ================================= */}

            <div className="
                flex
                items-center
                gap-3
                px-6
                py-6
            ">

                <div className="
                    flex
                    h-9
                    w-9
                    items-center
                    justify-center
                    rounded-xl
                    bg-[#f4bb4f]
                    text-sm
                    font-bold
                    text-[#080f1e]
                    shadow-lg
                    shadow-[#f4bb4f]/10
                ">
                    AI
                </div>


                <div>

                    <h1 className="
                        text-lg
                        font-semibold
                        tracking-tight
                        text-white
                    ">
                        AI CRM
                    </h1>

                    <p className="
                        text-[9px]
                        uppercase
                        tracking-[0.2em]
                        text-gray-600
                    ">
                        Outreach platform
                    </p>

                </div>

            </div>


            {/* ================================= */}
            {/* WORKSPACE */}
            {/* ================================= */}

            <div className="
                mb-5
                px-4
            ">

                <Link
                    href="/dashboard/workspace"
                    className="
                        block
                        rounded-xl
                        border
                        border-white/10
                        bg-[#0d1526]
                        px-3
                        py-3
                        transition
                        hover:border-white/20
                    "
                >

                    <p className="
                        text-[9px]
                        uppercase
                        tracking-[0.18em]
                        text-gray-600
                    ">
                        Workspace
                    </p>


                    <div className="
                        mt-1
                        flex
                        items-center
                        justify-between
                    ">

                        <p className="
                            truncate
                            text-sm
                            font-medium
                            text-gray-200
                        ">
                            My Workspace
                        </p>

                        <span className="
                            text-xs
                            text-gray-600
                        ">
                            ↗
                        </span>

                    </div>

                </Link>

            </div>


            {/* ================================= */}
            {/* NAVIGATION */}
            {/* ================================= */}

            <nav className="
                flex
                flex-1
                flex-col
                gap-1
                overflow-y-auto
                px-4
            ">

                <p className="
                    mb-2
                    px-3
                    text-[10px]
                    font-medium
                    uppercase
                    tracking-[0.18em]
                    text-gray-600
                ">
                    Main Menu
                </p>


                {navigation.map(
                    (item) => {

                        const isActive =
                            pathname ===
                                item.href ||

                            (
                                item.href !==
                                    "/dashboard" &&

                                pathname.startsWith(
                                    item.href
                                )
                            );


                        return (

                            <Link
                                key={item.href}
                                href={item.href}
                                className={`
                                    group
                                    relative
                                    flex
                                    items-center
                                    gap-3
                                    rounded-xl
                                    px-3
                                    py-2.5
                                    text-sm
                                    transition-all
                                    ${
                                        isActive
                                            ? `
                                                bg-[#f4bb4f]/10
                                                font-medium
                                                text-[#f4bb4f]
                                            `
                                            : `
                                                text-gray-400
                                                hover:bg-white/[0.04]
                                                hover:text-white
                                            `
                                    }
                                `}
                            >

                                {/* Active indicator */}

                                {isActive && (

                                    <span className="
                                        absolute
                                        left-0
                                        h-6
                                        w-0.5
                                        rounded-r-full
                                        bg-[#f4bb4f]
                                    " />

                                )}


                                {/* Icon */}

                                <span
                                    className={`
                                        flex
                                        h-8
                                        w-8
                                        shrink-0
                                        items-center
                                        justify-center
                                        rounded-lg
                                        text-sm
                                        transition
                                        ${
                                            isActive
                                                ? `
                                                    bg-[#f4bb4f]/10
                                                    text-[#f4bb4f]
                                                `
                                                : `
                                                    text-gray-500
                                                    group-hover:bg-white/5
                                                    group-hover:text-gray-300
                                                `
                                        }
                                    `}
                                >
                                    {item.icon}
                                </span>


                                {/* Label */}

                                <span>
                                    {item.name}
                                </span>


                                {/* Active dot */}

                                {isActive && (

                                    <span className="
                                        ml-auto
                                        h-1.5
                                        w-1.5
                                        rounded-full
                                        bg-[#f4bb4f]
                                        shadow-sm
                                        shadow-[#f4bb4f]
                                    " />

                                )}

                            </Link>

                        );

                    }
                )}

            </nav>


            {/* ================================= */}
            {/* BOTTOM */}
            {/* ================================= */}

            <div className="
                px-4
                pb-5
            ">

                <div className="
                    mb-3
                    h-px
                    bg-white/10
                " />


                {/* Settings */}

                <Link
                    href="/dashboard/settings"
                    className="
                        mb-2
                        flex
                        items-center
                        gap-3
                        rounded-xl
                        px-3
                        py-2.5
                        text-sm
                        text-gray-400
                        transition
                        hover:bg-white/[0.04]
                        hover:text-white
                    "
                >

                    <span className="
                        flex
                        h-8
                        w-8
                        items-center
                        justify-center
                        text-sm
                    ">
                        ⚙
                    </span>

                    Settings

                </Link>


                {/* ================================= */}
                {/* USER */}
                {/* ================================= */}

                <div className="
                    rounded-xl
                    border
                    border-white/10
                    bg-[#0d1526]
                    p-3
                ">

                    <div className="
                        flex
                        items-center
                        gap-3
                    ">

                        <div className="
                            flex
                            h-9
                            w-9
                            shrink-0
                            items-center
                            justify-center
                            rounded-full
                            bg-[#f4bb4f]/10
                            text-sm
                            font-semibold
                            text-[#f4bb4f]
                        ">
                            {user?.name
                                ?.charAt(0)
                                ?.toUpperCase() ||
                                "U"}
                        </div>


                        <div className="
                            min-w-0
                            flex-1
                        ">

                            <p className="
                                truncate
                                text-xs
                                font-medium
                                text-white
                            ">
                                {user?.name ||
                                    "User"}
                            </p>

                            <p className="
                                truncate
                                text-[10px]
                                text-gray-600
                            ">
                                {user?.email ||
                                    ""}
                            </p>

                        </div>

                    </div>


                    {/* Logout */}

                    {/* <button
                        onClick={
                            handleLogout
                        }
                        className="
                            mt-3
                            flex
                            w-full
                            items-center
                            gap-2
                            rounded-lg
                            px-2
                            py-2
                            text-xs
                            text-gray-500
                            transition
                            hover:bg-red-500/10
                            hover:text-red-400
                        "
                    >
                        <span>
                            ↪
                        </span>

                        Logout
                    </button> */}

                </div>

            </div>

        </aside>

    );
}