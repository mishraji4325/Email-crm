"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuthStore } from "@/store/auth.store";


export default function ProtectedRoute({
    children,
}: {
    children: React.ReactNode;
}) {

    const router = useRouter();

    const token = useAuthStore(
        (state) => state.token
    );

    const [checking, setChecking] =
        useState(true);


    useEffect(() => {

        const storedToken =
            localStorage.getItem("token");


        if (!storedToken && !token) {

            router.replace("/login");

            return;

        }


        setChecking(false);

    }, [router, token]);


    if (checking) {

        return (
            <div className="
                min-h-screen
                bg-[#080e1a]
                flex
                items-center
                justify-center
                text-gray-400
            ">
                Checking authentication...
            </div>
        );

    }


    return <>{children}</>;

}