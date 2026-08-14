"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { useForm } from "react-hook-form";

import { registerUser } from "../../../services/auth.service";


interface SignupForm {
    name: string;
    email: string;
    password: string;
}


export default function SignupPage() {

    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: {
            errors,
            isSubmitting,
        },
    } = useForm<SignupForm>();


    const [
        errorMessage,
        setErrorMessage,
    ] = useState("");


    const [
        showPassword,
        setShowPassword,
    ] = useState(false);


    async function onSubmit(
        data: SignupForm
    ) {

        setErrorMessage("");

        try {

            await registerUser(data);

            router.push("/login");

        } catch (error: any) {

            console.error(
                "Signup error:",
                error
            );

            const message =
                error?.response?.data?.message ||
                error?.message ||
                "Unable to create your account.";

            setErrorMessage(message);

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
            py-10
        ">

            <div className="
                w-full
                max-w-md
            ">


                {/* BRAND */}

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
                        Create your account
                    </h1>


                    <p className="
                        mt-2
                        text-sm
                        text-gray-500
                    ">
                        Start managing your outreach
                        with AI CRM.
                    </p>

                </div>


                {/* CARD */}

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


                        {/* NAME */}

                        <div>

                            <label className="
                                mb-2
                                block
                                text-sm
                                font-medium
                                text-gray-300
                            ">
                                Full Name
                            </label>


                            <input
                                type="text"
                                placeholder="Your name"
                                autoComplete="name"

                                {...register(
                                    "name",
                                    {
                                        required:
                                            "Name is required",
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
                                    placeholder:text-gray-600
                                    focus:border-[#f4bb4f]/60
                                    focus:ring-2
                                    focus:ring-[#f4bb4f]/10
                                "
                            />


                            {errors.name && (

                                <p className="
                                    mt-2
                                    text-xs
                                    text-red-400
                                ">
                                    {
                                        errors.name.message
                                    }
                                </p>

                            )}

                        </div>


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
                                        errors.email.message
                                    }
                                </p>

                            )}

                        </div>


                        {/* PASSWORD */}

                        <div>

                            <label className="
                                mb-2
                                block
                                text-sm
                                font-medium
                                text-gray-300
                            ">
                                Password
                            </label>


                            <div className="
                                relative
                            ">

                                <input
                                    type={
                                        showPassword
                                            ? "text"
                                            : "password"
                                    }
                                    placeholder="Create a password"
                                    autoComplete="new-password"

                                    {...register(
                                        "password",
                                        {
                                            required:
                                                "Password is required",

                                            minLength: {
                                                value: 6,
                                                message:
                                                    "Password must be at least 6 characters",
                                            },
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


                        {/* SUBMIT */}

                        <button
                            type="submit"
                            disabled={isSubmitting}
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
                                ? "Creating account..."
                                : "Create account"
                            }
                        </button>

                    </form>


                    {/* LOGIN LINK */}

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

                            Already have an account?{" "}

                            <Link
                                href="/login"
                                className="
                                    font-medium
                                    text-[#f4bb4f]
                                    hover:underline
                                "
                            >
                                Sign in
                            </Link>

                        </p>

                    </div>

                </div>


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