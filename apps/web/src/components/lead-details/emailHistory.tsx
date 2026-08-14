"use client";

import { useState } from "react";
import { Button } from "../ui/button";

interface EmailHistoryProps {
    emails: any[];
    onSave: (
        emailId: string,
        content: string
    ) => void;
    onSend: (
        emailId: string
    ) => void;
}

export default function EmailHistory({
    emails,
    onSave,
    onSend,
}: EmailHistoryProps) {

    if (!emails.length) {

        return (
            <div className="
                rounded-2xl
                border
                border-white/10
                bg-[#0d1526]
                p-6
                mb-3
            ">

                <p className="
                    text-[10px]
                    font-medium
                    uppercase
                    tracking-[0.18em]
                    text-gray-600
                ">
                    Communication
                </p>

                <h2 className="
                    mt-1
                    text-xl
                    font-bold
                    text-white
                ">
                    Email History
                </h2>

                <div className="
                    mt-6
                    rounded-xl
                    border
                    border-dashed
                    border-white/10
                    bg-white/[0.02]
                    p-8
                    text-center
                ">

                    <div className="
                        mx-auto
                        flex
                        h-10
                        w-10
                        items-center
                        justify-center
                        rounded-xl
                        bg-white/[0.04]
                    ">
                        ✉
                    </div>

                    <p className="
                        mt-3
                        text-sm
                        text-gray-500
                    ">
                        No generated emails yet.
                    </p>

                </div>

            </div>
        );
    }

    return (
        <div className="
            rounded-2xl
            border
            border-white/10
            bg-[#0d1526]
            p-6
        ">

            <p className="
                text-[10px]
                font-medium
                uppercase
                tracking-[0.18em]
                text-gray-600
            ">
                Communication
            </p>

            <h2 className="
                mt-1
                text-xl
                font-bold
                text-white
            ">
                Email History
            </h2>


            <div className="
                mt-6
                space-y-4
            ">

                {emails.map((email: any) => (

                    <EmailItem
                        key={email.id}
                        email={email}
                        onSave={onSave}
                        onSend={onSend}
                    />

                ))}

            </div>

        </div>
    );
}


interface EmailItemProps {
    email: any;
    onSave: (
        emailId: string,
        content: string
    ) => void;
    onSend: (
        emailId: string
    ) => void;
}


function EmailItem({
    email,
    onSave,
    onSend,
}: EmailItemProps) {

    const [content, setContent] = useState(
        email.humanizedOutput || ""
    );

    return (
        <div className="
            rounded-2xl
            border
            border-white/10
            bg-[#111a2b]
            p-5
        ">

            {/* Email header */}

            <div className="
                flex
                flex-col
                gap-3
                sm:flex-row
                sm:items-start
                sm:justify-between
            ">

                <div className="min-w-0">

                    <p className="
                        truncate
                        text-sm
                        font-semibold
                        text-gray-200
                    ">
                        {email.subject || "No Subject"}
                    </p>

                    <p className="
                        mt-1
                        text-xs
                        text-gray-600
                    ">
                        {new Date(
                            email.createdAt
                        ).toLocaleString()}
                    </p>

                </div>


                <span className={`
                    w-fit
                    rounded-full
                    border
                    px-3
                    py-1
                    text-xs
                    font-medium
                    ${
                        email.isDraft
                            ? `
                                border-yellow-500/20
                                bg-yellow-500/10
                                text-yellow-400
                              `
                            : `
                                border-emerald-500/20
                                bg-emerald-500/10
                                text-emerald-400
                              `
                    }
                `}>
                    {email.isDraft ? "Draft" : "Sent"}
                </span>

            </div>


            {/* Email body */}

            <textarea
                value={content}
                onChange={(e) =>
                    setContent(e.target.value)
                }
                className="
                    mt-5
                    min-h-[180px]
                    w-full
                    resize-y
                    rounded-xl
                    border
                    border-white/10
                    bg-[#0d1526]
                    p-4
                    text-sm
                    leading-6
                    text-gray-300
                    outline-none
                    placeholder:text-gray-600
                    focus:border-[#f4bb4f]/60
                    focus:ring-1
                    focus:ring-[#f4bb4f]/20
                "
            />


            {/* Actions */}

            <div className="
                mt-4
                flex
                flex-wrap
                gap-3
            ">

                <Button
                    variant="secondary"
                    onClick={() =>
                        onSave(
                            email.id,
                            content
                        )
                    }
                    className="
                        rounded-xl
                    "
                >
                    Save Draft
                </Button>

                <Button
                    onClick={() =>
                        onSend(email.id)
                    }
                    disabled={email.isDraft === false}
                    className="
                        rounded-xl
                        bg-[#f4bb4f]
                        text-black
                        hover:bg-[#f4bb4f]/90
                    "
                >
                    ✉ Send Email
                </Button>

            </div>

        </div>
    );
}