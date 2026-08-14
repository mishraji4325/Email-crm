"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { useAuthStore } from "@/store/auth.store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { deleteAccount, updateProfile } from "@/services/auth.service";


export default function SettingsPage() {

    const router = useRouter();

    const user = useAuthStore(
        (state) => state.user
    );

    const logout = useAuthStore(
        (state) => state.logout
    );


    const [editing, setEditing] =
        useState(false);

    const [name, setName] =
        useState(user?.name || "");

    const [email, setEmail] =
        useState(user?.email || "");


    const handleLogout = () => {

        logout();

        localStorage.removeItem("token");

        router.replace("/login");

    };


    const handleCancel = () => {

        setName(user?.name || "");
        setEmail(user?.email || "");

        setEditing(false);

    };


    const handleSave = async () => {

        try {
    
            const response =
                await updateProfile({
                    name,
                    email,
                });
    
            useAuthStore.setState({
                user: response.user,
            });
    
            setEditing(false);
    
            alert("Profile updated successfully.");
    
        } catch (error) {
    
            console.log(error);
    
            alert("Failed to update profile.");
    
        }
    
    };


    const handleDeleteAccount = async () => {

        const confirmed =
            window.confirm(
                "Are you sure you want to delete your account? This action cannot be undone."
            );
    
        if (!confirmed) {
            return;
        }
    
    
        try {
    
            await deleteAccount();
    
            logout();
    
            localStorage.removeItem("token");
    
            router.replace("/login");
    
        } catch (error) {
    
            console.log(error);
    
            alert(
                "Failed to delete account."
            );
    
        }
    
    };


    return (

        <div className="
            max-w-4xl
            space-y-8
        ">

            {/* ================= HEADER ================= */}

            <div>

                <h1 className="
                    text-3xl
                    font-bold
                    text-white
                ">
                    Settings
                </h1>

                <p className="
                    mt-2
                    text-sm
                    text-gray-500
                ">
                    Manage your account and preferences.
                </p>

            </div>


            {/* ================= PROFILE ================= */}

            <section className="
                rounded-2xl
                border
                border-white/10
                bg-[#0d1526]
                p-6
            ">

                <div className="
                    flex
                    items-start
                    justify-between
                    gap-4
                ">

                    <div>

                        <h2 className="
                            text-lg
                            font-semibold
                            text-white
                        ">
                            Profile
                        </h2>

                        <p className="
                            mt-1
                            text-sm
                            text-gray-500
                        ">
                            Manage your personal information.
                        </p>

                    </div>


                    {!editing && (

                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                                setEditing(true)
                            }
                        >
                            ✏️ Edit Profile
                        </Button>

                    )}

                </div>


                <div className="
                    mt-6
                    space-y-5
                ">

                    {/* NAME */}

                    <div>

                        <label className="
                            mb-2
                            block
                            text-sm
                            font-medium
                            text-gray-400
                        ">
                            Name
                        </label>


                        {editing ? (

                            <Input
                                value={name}
                                onChange={(e) =>
                                    setName(
                                        e.target.value
                                    )
                                }
                                placeholder="Your name"
                            />

                        ) : (

                            <div className="
                                rounded-xl
                                border
                                border-white/10
                                bg-[#111a2b]
                                px-4
                                py-3
                                text-sm
                                text-white
                            ">
                                {user?.name ||
                                    "Not available"}
                            </div>

                        )}

                    </div>


                    {/* EMAIL */}

                    <div>

                        <label className="
                            mb-2
                            block
                            text-sm
                            font-medium
                            text-gray-400
                        ">
                            Email
                        </label>


                        {editing ? (

                            <Input
                                type="email"
                                value={email}
                                onChange={(e) =>
                                    setEmail(
                                        e.target.value
                                    )
                                }
                                placeholder="Email"
                            />

                        ) : (

                            <div className="
                                rounded-xl
                                border
                                border-white/10
                                bg-[#111a2b]
                                px-4
                                py-3
                                text-sm
                                text-white
                            ">
                                {user?.email ||
                                    "Not available"}
                            </div>

                        )}

                    </div>


                    {/* USER ID */}

                    <div>

                        <label className="
                            mb-2
                            block
                            text-sm
                            font-medium
                            text-gray-400
                        ">
                            User ID
                        </label>

                        <div className="
                            rounded-xl
                            border
                            border-white/10
                            bg-[#111a2b]
                            px-4
                            py-3
                            font-mono
                            text-xs
                            text-gray-500
                            break-all
                        ">
                            {user?.id ||
                                "Not available"}
                        </div>

                    </div>


                    {/* EDIT ACTIONS */}

                    {editing && (

                        <div className="
                            flex
                            justify-end
                            gap-3
                            pt-2
                        ">

                            <Button
                                variant="ghost"
                                onClick={
                                    handleCancel
                                }
                            >
                                Cancel
                            </Button>


                            <Button
                                onClick={
                                    handleSave
                                }
                            >
                                Save Changes
                            </Button>

                        </div>

                    )}

                </div>

            </section>


            {/* ================= ACCOUNT ================= */}

            <section className="
                rounded-2xl
                border
                border-white/10
                bg-[#0d1526]
                p-6
            ">

                <div>

                    <h2 className="
                        text-lg
                        font-semibold
                        text-white
                    ">
                        Account
                    </h2>

                    <p className="
                        mt-1
                        text-sm
                        text-gray-500
                    ">
                        Manage your current session.
                    </p>

                </div>


                <div className="
                    mt-6
                    flex
                    flex-col
                    gap-4
                    sm:flex-row
                    sm:items-center
                    sm:justify-between
                ">

                    <div>

                        <p className="
                            font-medium
                            text-white
                        ">
                            Sign out
                        </p>

                        <p className="
                            mt-1
                            text-sm
                            text-gray-500
                        ">
                            Sign out from this device.
                        </p>

                    </div>


                    <Button
                        variant="outline"
                        onClick={
                            handleLogout
                        }
                    >
                        🚪 Logout
                    </Button>

                </div>

            </section>


            {/* ================= DANGER ZONE ================= */}

            <section className="
                rounded-2xl
                border
                border-red-500/20
                bg-red-500/[0.03]
                p-6
            ">

                <div>

                    <h2 className="
                        text-lg
                        font-semibold
                        text-red-400
                    ">
                        Danger Zone
                    </h2>

                    <p className="
                        mt-1
                        text-sm
                        text-gray-500
                    ">
                        Permanent account actions.
                    </p>

                </div>


                <div className="
                    mt-6
                    flex
                    flex-col
                    gap-4
                    sm:flex-row
                    sm:items-center
                    sm:justify-between
                    rounded-xl
                    border
                    border-red-500/10
                    bg-red-500/[0.03]
                    p-4
                ">

                    <div>

                        <p className="
                            font-medium
                            text-white
                        ">
                            Delete Account
                        </p>

                        <p className="
                            mt-1
                            text-sm
                            text-gray-500
                        ">
                            Permanently remove your account
                            and associated data.
                        </p>

                    </div>


                    <Button
                        variant="danger"
                        onClick={
                            handleDeleteAccount
                        }
                    >
                        🗑️ Delete Account
                    </Button>

                </div>

            </section>

        </div>

    );
}