"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { useForm } from "react-hook-form";

import { useAuthStore } from "../../../store/auth.store";
import { loginUser } from "../../../services/auth.service";


interface LoginForm {
    email: string;
    password: string;
}


export default function LoginPage() {

    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: {
            errors,
            isSubmitting,
        },
    } = useForm<LoginForm>();


    const setAuth =
        useAuthStore(
            (state) => state.setAuth
        );


    const [
        errorMessage,
        setErrorMessage,
    ] = useState("");


    const [
        showPassword,
        setShowPassword,
    ] = useState(false);


    async function onSubmit(
        data: LoginForm
    ) {

        setErrorMessage("");

        try {

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


            router.push(
                "/dashboard"
            );


        } catch (error: any) {

            console.error(
                "Login error:",
                error
            );


            const message =
                error?.response?.data?.message ||
                error?.message ||
                "Invalid email or password.";


            setErrorMessage(
                message
            );

        }

    }


    return (

        <div className="
            min-h-screen
            bg-[#080e1a]
            flex
            items-center
            justify-center
            px-4
        ">

            <div className="
                w-full
                max-w-md
            ">


                {/* ================================= */}
                {/* BRAND */}
                {/* ================================= */}

                <div className="
                    mb-8
                    text-center
                ">

                    <div className="
                        mx-auto
                        mb-4
                        flex
                        h-12
                        w-12
                        items-center
                        justify-center
                        rounded-xl
                        bg-[#f4bb4f]/10
                        text-xl
                    ">
                        ✦
                    </div>


                    <h1 className="
                        text-2xl
                        font-semibold
                        text-white
                    ">
                        Welcome back
                    </h1>


                    <p className="
                        mt-2
                        text-sm
                        text-gray-500
                    ">
                        Sign in to your AI CRM
                    </p>

                </div>


                {/* ================================= */}
                {/* LOGIN CARD */}
                {/* ================================= */}

                <div className="
                    rounded-2xl
                    border
                    border-white/10
                    bg-[#0d1526]
                    p-6
                    shadow-2xl
                    sm:p-8
                ">


                    {/* ERROR */}

                    {errorMessage && (

                        <div className="
                            mb-5
                            rounded-xl
                            border
                            border-red-500/20
                            bg-red-500/10
                            px-4
                            py-3
                            text-sm
                            text-red-400
                        ">
                            {errorMessage}
                        </div>

                    )}


                    <form
                        onSubmit={
                            handleSubmit(
                                onSubmit
                            )
                        }
                        className="
                            space-y-5
                        "
                    >


                        {/* EMAIL */}

                        <div>

                            <label className="
                                mb-2
                                block
                                text-sm
                                font-medium
                                text-gray-300
                            ">
                                Email
                            </label>


                            <input

                                type="email"

                                placeholder="you@example.com"

                                autoComplete="email"

                                {...register(
                                    "email",
                                    {
                                        required:
                                            "Email is required",
                                    }
                                )}

                                className="
                                    h-11
                                    w-full
                                    rounded-xl
                                    border
                                    border-white/10
                                    bg-[#111a2b]
                                    px-4
                                    text-sm
                                    text-white
                                    outline-none
                                    transition
                                    placeholder:text-gray-600
                                    focus:border-[#f4bb4f]/60
                                    focus:ring-2
                                    focus:ring-[#f4bb4f]/10
                                "
                            />


                            {errors.email && (

                                <p className="
                                    mt-2
                                    text-xs
                                    text-red-400
                                ">
                                    {
                                        errors.email
                                            .message
                                    }
                                </p>

                            )}

                        </div>


                        {/* PASSWORD */}

                        <div>

                            <div className="
                                mb-2
                                flex
                                items-center
                                justify-between
                            ">

                                <label className="
                                    text-sm
                                    font-medium
                                    text-gray-300
                                ">
                                    Password
                                </label>


                                <Link
                                    href="/forgot-password"
                                    className="
                                        text-xs
                                        text-[#f4bb4f]
                                        hover:underline
                                    "
                                >
                                    Forgot password?
                                </Link>

                            </div>


                            <div className="
                                relative
                            ">

                                <input

                                    type={
                                        showPassword
                                            ? "text"
                                            : "password"
                                    }

                                    placeholder="Enter your password"

                                    autoComplete="current-password"

                                    {...register(
                                        "password",
                                        {
                                            required:
                                                "Password is required",
                                        }
                                    )}

                                    className="
                                        h-11
                                        w-full
                                        rounded-xl
                                        border
                                        border-white/10
                                        bg-[#111a2b]
                                        px-4
                                        pr-12
                                        text-sm
                                        text-white
                                        outline-none
                                        transition
                                        placeholder:text-gray-600
                                        focus:border-[#f4bb4f]/60
                                        focus:ring-2
                                        focus:ring-[#f4bb4f]/10
                                    "
                                />


                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowPassword(
                                            !showPassword
                                        )
                                    }
                                    className="
                                        absolute
                                        right-3
                                        top-1/2
                                        -translate-y-1/2
                                        text-xs
                                        text-gray-500
                                        hover:text-gray-300
                                    "
                                >
                                    {showPassword
                                        ? "Hide"
                                        : "Show"
                                    }
                                </button>

                            </div>


                            {errors.password && (

                                <p className="
                                    mt-2
                                    text-xs
                                    text-red-400
                                ">
                                    {
                                        errors.password
                                            .message
                                    }
                                </p>

                            )}

                        </div>


                        {/* LOGIN BUTTON */}

                        <button

                            type="submit"

                            disabled={
                                isSubmitting
                            }

                            className="
                                h-11
                                w-full
                                rounded-xl
                                bg-[#f4bb4f]
                                px-4
                                text-sm
                                font-semibold
                                text-[#080e1a]
                                transition
                                hover:bg-[#ffd276]
                                disabled:cursor-not-allowed
                                disabled:opacity-50
                            "
                        >

                            {isSubmitting
                                ? "Signing in..."
                                : "Sign in"
                            }

                        </button>

                    </form>


                    {/* SIGNUP */}

                    <div className="
                        mt-6
                        border-t
                        border-white/10
                        pt-6
                        text-center
                    ">

                        <p className="
                            text-sm
                            text-gray-500
                        ">

                            Don't have an account?{" "}

                            <Link
                                href="/signup"
                                className="
                                    font-medium
                                    text-[#f4bb4f]
                                    hover:underline
                                "
                            >
                                Create one
                            </Link>

                        </p>

                    </div>

                </div>


                {/* FOOTER */}

                <p className="
                    mt-6
                    text-center
                    text-xs
                    text-gray-600
                ">
                    AI CRM · Intelligent outreach
                    management
                </p>

            </div>

        </div>

    );
}