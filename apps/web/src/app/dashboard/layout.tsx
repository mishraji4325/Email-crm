"use client";

import { useState } from "react";

import Sidebar from "@/components/sidebar";
import Navbar from "@/components/navbar";
import ProtectedRoute from "@/components/protected-route";


export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {

    const [
        sidebarOpen,
        setSidebarOpen,
    ] = useState(false);


    return (

        <ProtectedRoute>

            <div className="
                flex
                min-h-screen
                bg-[#080e1a]
                text-white
            ">

                {/* ============================== */}
                {/* MOBILE OVERLAY */}
                {/* ============================== */}

                {sidebarOpen && (

                    <button
                        aria-label="Close sidebar"
                        onClick={() =>
                            setSidebarOpen(false)
                        }
                        className="
                            fixed
                            inset-0
                            z-40
                            bg-black/60
                            backdrop-blur-sm
                            lg:hidden
                        "
                    />

                )}


                {/* ============================== */}
                {/* SIDEBAR */}
                {/* ============================== */}

                <div
                    className={`
                        fixed
                        inset-y-0
                        left-0
                        z-50
                        transform
                        transition-transform
                        duration-300
                        lg:sticky
                        lg:top-0
                        lg:translate-x-0
                        ${
                            sidebarOpen
                                ? "translate-x-0"
                                : "-translate-x-full"
                        }
                    `}
                >

                    <Sidebar />

                </div>


                {/* ============================== */}
                {/* MAIN */}
                {/* ============================== */}

                <div className="
                    flex
                    min-w-0
                    flex-1
                    flex-col
                ">

                    <Navbar
                        onMenuClick={() =>
                            setSidebarOpen(true)
                        }
                    />


                    <main className="
                        flex-1
                        p-4
                        sm:p-6
                    ">
                        {children}
                    </main>

                </div>

            </div>

        </ProtectedRoute>

    );
}