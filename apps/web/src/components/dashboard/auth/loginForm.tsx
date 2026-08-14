"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useAuthStore } from "@/store/auth.store";
import { loginUser } from "@/services/auth.service";



interface LoginFormData {
    email: string;
    password: string;
}

export default function LoginForm() {

    const router = useRouter();

    const [loading, setLoading] =
        useState(false);

    const [error, setError] =
        useState("");

    const {
        register,
        handleSubmit,
        formState: {
            errors,
        },
    } = useForm<LoginFormData>();

    const setAuth =
        useAuthStore(
            (state) => state.setAuth
        );


    async function onSubmit(
        data: LoginFormData
    ) {

        try {

            setLoading(true);
            setError("");

            const response =
                await loginUser(data);

            setAuth(
                response.user,
                response.token
            );

            localStorage.setItem(
                "token",
                response.token
            );

            router.push("/dashboard");

        } catch (error: any) {

            console.log(error);

            setError(
                error?.response?.data?.message ||
                "Invalid email or password"
            );

        } finally {

            setLoading(false);

        }
    }


    return (
        <div className="w-full">

            {/* Heading */}

            <div className="mb-8 text-center lg:text-left">

                <h1 className="font-serif text-[2rem] font-medium leading-tight tracking-tight text-white sm:text-[2.25rem]">
                    Welcome back
                </h1>

                <p className="mt-2.5 text-[15px] leading-relaxed text-gray-400">
                    Sign in to pick up where your assistant left off.
                </p>

            </div>


            {/* CARD */}

            <div className="w-full rounded-2xl border border-white/10 bg-[#0d1526]/85 p-7 shadow-[0_24px_80px_rgba(0,0,0,0.45)] backdrop-blur-xl sm:p-8">

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-5"
                >

                    {/* EMAIL */}

                    <div>

                        <label className="block text-[11px] font-semibold uppercase tracking-[0.16em] text-gray-400">
                            Work Email
                        </label>


                        <div className="
                            relative
                            mt-2
                        ">

                            <span className="
                                pointer-events-none
                                absolute
                                left-4
                                top-1/2
                                -translate-y-1/2
                                text-gray-500
                            ">
                                ✉
                            </span>

                            <input
                                type="email"
                                placeholder="you@company.com"
                                className="
                                    h-12
                                    w-full
                                    rounded-xl
                                    border
                                    border-white/10
                                    bg-[#111a2b]
                                    px-11
                                    text-sm
                                    text-white
                                    outline-none
                                    placeholder:text-gray-600
                                    focus:border-[#f4bb4f]/60
                                    focus:ring-1
                                    focus:ring-[#f4bb4f]/30
                                "
                                {...register(
                                    "email",
                                    {
                                        required:
                                            "Email is required",
                                    }
                                )}
                            />

                        </div>

                        {errors.email && (
                            <p className="
                                mt-2
                                text-xs
                                text-red-400
                            ">
                                {errors.email.message}
                            </p>
                        )}

                    </div>


                    {/* PASSWORD */}

                    <div>

                        <div className="
                            flex
                            items-center
                            justify-between
                        ">

                            <label className="text-[11px] font-semibold uppercase tracking-[0.16em] text-gray-400">
                                Password
                            </label>

                            <button
                                type="button"
                                className="
                                    text-xs
                                    text-[#f4bb4f]
                                    hover:underline
                                "
                            >
                                Forgot?
                            </button>

                        </div>


                        <div className="
                            relative
                            mt-2
                        ">

                            <span className="
                                pointer-events-none
                                absolute
                                left-4
                                top-1/2
                                -translate-y-1/2
                                text-gray-500
                            ">
                                🔒
                            </span>

                            <input
                                type="password"
                                placeholder="••••••••"
                                className="
                                    h-12
                                    w-full
                                    rounded-xl
                                    border
                                    border-white/10
                                    bg-[#111a2b]
                                    px-11
                                    text-sm
                                    text-white
                                    outline-none
                                    placeholder:text-gray-600
                                    focus:border-[#f4bb4f]/60
                                    focus:ring-1
                                    focus:ring-[#f4bb4f]/30
                                "
                                {...register(
                                    "password",
                                    {
                                        required:
                                            "Password is required",
                                    }
                                )}
                            />

                        </div>

                        {errors.password && (
                            <p className="
                                mt-2
                                text-xs
                                text-red-400
                            ">
                                {errors.password.message}
                            </p>
                        )}

                    </div>


                    {/* REMEMBER */}

                    <label className="
                        flex
                        cursor-pointer
                        items-center
                        gap-3
                        text-sm
                        text-gray-400
                    ">

                        <input
                            type="checkbox"
                            className="
                                h-4
                                w-4
                                accent-[#f4bb4f]
                            "
                        />

                        Keep me signed in

                    </label>


                    {/* ERROR */}

                    {error && (
                        <div className="
                            rounded-lg
                            border
                            border-red-500/20
                            bg-red-500/10
                            px-4
                            py-3
                            text-sm
                            text-red-400
                        ">
                            {error}
                        </div>
                    )}


                    {/* SIGN IN */}

                    <button
                        type="submit"
                        disabled={loading}
                        className="
                            h-12
                            w-full
                            rounded-xl
                            bg-gradient-to-r
                            from-[#f6ca62]
                            to-[#e99b28]
                            text-sm
                            font-bold
                            text-black
                            transition
                            hover:brightness-105
                            disabled:cursor-not-allowed
                            disabled:opacity-50
                        "
                    >

                        {loading
                            ? "Signing in..."
                            : "Sign in  →"
                        }

                    </button>

                </form>


                {/* OR */}

                <div className="my-6 flex items-center gap-4">
                    <div className="h-px flex-1 bg-white/10" />
                    <span className="text-[10px] tracking-widest text-gray-600">
                        OR
                    </span>
                    <div className="h-px flex-1 bg-white/10" />
                </div>


                {/* GOOGLE */}

                <button
                    type="button"
                    className="
                        h-12
                        w-full
                        rounded-xl
                        border
                        border-white/10
                        bg-[#111a2b]
                        text-sm
                        font-medium
                        text-gray-300
                        transition
                        hover:bg-[#172238]
                    "
                >
                    Continue with Google Workspace
                </button>


                {/* REGISTER */}

                <p className="
                    mt-6
                    text-center
                    text-sm
                    text-gray-500
                ">

                    New to AI CRM?{" "}

                    <button
                        type="button"
                        onClick={() =>
                            router.push("/register")
                        }
                        className="
                            text-[#f4bb4f]
                            hover:underline
                        "
                    >
                        Request access
                    </button>

                </p>

            </div>


            {/* FOOTER */}

            <p className="
                mt-5
                text-center
                text-xs
                text-gray-500
            ">
                Your CRM data stays private and secure.
            </p>

        </div>
    );
}