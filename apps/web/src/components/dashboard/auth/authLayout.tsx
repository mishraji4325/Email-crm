"use client";

import React from "react";

interface AuthLayoutProps {
    children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
    return (
        <main className="min-h-screen w-full overflow-hidden bg-[#070d1c]">
            <div className="grid min-h-screen w-full lg:grid-cols-2">
                {/* LEFT IMAGE PANEL */}
                <section
                    className="relative min-h-screen w-full overflow-hidden bg-cover bg-center bg-no-repeat"
                    style={{
                        backgroundImage: "url('/images/download.jpg')",
                    }}
                >
                    <div className="absolute inset-0 bg-[#020817]/35" />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#020817]/80 via-[#020817]/20 to-transparent" />

                    {/* Logo — pinned top-left */}
                    <div className="absolute left-10 top-10 z-20 flex items-center gap-3 lg:left-12 lg:top-12">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#f4bb4f] text-base font-bold text-black">
                            ✉
                        </div>
                        <span className="text-lg font-semibold tracking-tight text-white">
                            AI CRM
                        </span>
                    </div>

                    {/* Hero — vertically centered */}
                    <div className="relative z-10 flex min-h-screen items-center px-10 py-24 lg:px-14">
                        <div className="max-w-xl">
                            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/25 px-4 py-2 backdrop-blur-sm">
                                <span className="text-[#f4bb4f]">✦</span>
                                <span className="text-[11px] font-medium uppercase tracking-[0.22em] text-gray-200">
                                    AI Email CRM
                                </span>
                            </div>

                            <h1 className="mt-6 max-w-2xl font-serif text-[2.75rem] font-medium leading-[1.08] tracking-tight text-white xl:text-[3.25rem]">
                                Your inbox,
                                <br />
                                quietly running
                                <br />
                                <span className="italic text-[#f4bb4f]">
                                    the entire pipeline.
                                </span>
                            </h1>

                            <p className="mt-5 max-w-md text-[15px] leading-relaxed text-gray-300/90">
                                AI CRM reads every thread, drafts personalized
                                replies, and helps you move every prospect
                                through your pipeline.
                            </p>

                            <div className="mt-10 grid max-w-lg grid-cols-3 border-t border-white/15 pt-6">
                                <div>
                                    <p className="font-serif text-2xl font-medium text-[#f4bb4f]">
                                        48k
                                    </p>
                                    <p className="mt-1 text-xs text-gray-400">
                                        threads managed
                                    </p>
                                </div>

                                <div className="border-l border-white/15 pl-6">
                                    <p className="font-serif text-2xl font-medium text-[#f4bb4f]">
                                        3.4x
                                    </p>
                                    <p className="mt-1 text-xs text-gray-400">
                                        faster outreach
                                    </p>
                                </div>

                                <div className="border-l border-white/15 pl-6">
                                    <p className="font-serif text-2xl font-medium text-[#f4bb4f]">
                                        99.2%
                                    </p>
                                    <p className="mt-1 text-xs text-gray-400">
                                        personalization
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* RIGHT IMAGE PANEL */}
                <section
                    className="relative min-h-screen w-full overflow-hidden bg-cover bg-center bg-no-repeat"
                    style={{
                        backgroundImage: "url('/images/auth-bg.jpg')",
                    }}
                >
                    <div className="absolute inset-0 bg-[#050b18]/45" />
                    <div className="absolute inset-0 bg-gradient-to-l from-[#050b18]/70 via-[#050b18]/25 to-transparent" />

                    {/* Login form — vertically centered */}
                    <div className="relative z-10 flex min-h-screen items-center justify-center px-6 py-16 sm:px-10">
                        <div className="w-full max-w-[420px]">{children}</div>
                    </div>
                </section>
            </div>
        </main>
    );
}
