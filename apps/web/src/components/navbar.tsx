"use client";

interface NavbarProps {
  onMenuClick?: () => void;
}

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";

import NotificationBell from "./dashboard/notifications/notificationBell";
import { useAuthStore } from "@/store/auth.store";


const pageTitles: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/dashboard/leads": "Leads",
  "/dashboard/pipeline": "Pipeline",
  "/dashboard/campaigns": "Campaigns",
  "/dashboard/import": "Import Leads",
  "/dashboard/analytics": "Analytics",
  "/dashboard/workspace": "Workspace",
  "/dashboard/sequence": "Sequences",
};


export default function Navbar({
  onMenuClick
}: NavbarProps) {

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


  const [
    open,
    setOpen,
  ] = useState(false);


  /* ========================================= */
  /* PAGE TITLE */
  /* ========================================= */

  const matchedPath =
    Object.keys(pageTitles)
      .sort(
        (a, b) =>
          b.length - a.length
      )
      .find(
        (path) =>
          pathname === path ||
          (
            path !== "/dashboard" &&
            pathname.startsWith(path)
          )
      );


  const pageTitle =
    matchedPath
      ? pageTitles[matchedPath]
      : "Dashboard";


  /* ========================================= */
  /* LOGOUT */
  /* ========================================= */

  const handleLogout = () => {

    logout();

    localStorage.removeItem(
      "token"
    );

    router.push("/login");

  };


  return (

    <nav className="
            sticky
            top-0
            z-40
            flex
            h-16
            items-center
            justify-between
            border-b
            border-white/10
            bg-[#080f1e]/95
            px-4
            backdrop-blur
            sm:px-6
        ">


      {/* ================================= */}
      {/* LEFT */}
      {/* ================================= */}

      <div className="
                flex
                min-w-0
                items-center
                gap-3
            ">
        <button
          onClick={onMenuClick}
          className="
        flex
        h-9
        w-9
        items-center
        justify-center
        rounded-lg
        border
        border-white/10
        bg-[#0d1526]
        text-gray-300
        transition
        hover:bg-white/5
        lg:hidden
    "
          aria-label="Open navigation"
        >
          ☰
        </button>


        {/* Mobile brand */}

        <div className="
                    flex
                    h-8
                    w-8
                    shrink-0
                    items-center
                    justify-center
                    rounded-lg
                    bg-[#f4bb4f]
                    text-xs
                    font-bold
                    text-[#080f1e]
                    lg:hidden
                ">
          AI
        </div>


        <div className="
                    min-w-0
                ">

          <h2 className="
                        truncate
                        text-sm
                        font-semibold
                        text-white
                        sm:text-base
                    ">
            {pageTitle}
          </h2>


          <p className="
                        hidden
                        text-[10px]
                        text-gray-600
                        sm:block
                    ">
            AI CRM workspace
          </p>

        </div>

      </div>


      {/* ================================= */}
      {/* RIGHT */}
      {/* ================================= */}

      <div className="
                flex
                items-center
                gap-2
                sm:gap-3
            ">


        {/* Notification */}

        <div className="
                    flex
                    h-10
                    w-10
                    items-center
                    justify-center
                    rounded-xl
                    border
                    border-white/10
                    bg-[#0d1526]
                ">

          <NotificationBell />

        </div>


        {/* Divider */}

        <div className="
                    hidden
                    h-6
                    w-px
                    bg-white/10
                    sm:block
                " />


        {/* ================================= */}
        {/* PROFILE */}
        {/* ================================= */}

        <div className="
                    relative
                ">

          <button
            onClick={() =>
              setOpen(
                !open
              )
            }
            className="
                            flex
                            items-center
                            gap-2
                            rounded-xl
                            border
                            border-white/10
                            bg-[#0d1526]
                            px-2
                            py-1.5
                            transition
                            hover:border-white/20
                            sm:px-3
                        "
          >


            {/* Avatar */}

            <div className="
                            flex
                            h-8
                            w-8
                            shrink-0
                            items-center
                            justify-center
                            rounded-full
                            bg-[#f4bb4f]/10
                            text-xs
                            font-semibold
                            text-[#f4bb4f]
                        ">
              {user?.name
                ?.charAt(0)
                ?.toUpperCase() ||
                "U"}
            </div>


            {/* User */}

            <div className="
                            hidden
                            min-w-0
                            text-left
                            sm:block
                        ">

              <p className="
                                max-w-[110px]
                                truncate
                                text-xs
                                font-medium
                                text-white
                            ">
                {user?.name ||
                  "User"}
              </p>

            </div>


            <span className="
                            hidden
                            text-[10px]
                            text-gray-600
                            sm:block
                        ">
              {open
                ? "▲"
                : "▼"}
            </span>

          </button>


          {/* ================================= */}
          {/* DROPDOWN */}
          {/* ================================= */}

          {open && (

            <div className="
                            absolute
                            right-0
                            top-12
                            z-50
                            w-64
                            overflow-hidden
                            rounded-2xl
                            border
                            border-white/10
                            bg-[#0d1526]
                            shadow-2xl
                            shadow-black/40
                        ">


              {/* User */}

              <div className="
                                border-b
                                border-white/10
                                p-4
                            ">

                <div className="
                                    flex
                                    items-center
                                    gap-3
                                ">

                  <div className="
                                        flex
                                        h-10
                                        w-10
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
                                    ">

                    <p className="
                                            truncate
                                            text-sm
                                            font-semibold
                                            text-white
                                        ">
                      {user?.name ||
                        "User"}
                    </p>

                    <p className="
                                            truncate
                                            text-xs
                                            text-gray-600
                                        ">
                      {user?.email ||
                        ""}
                    </p>

                  </div>

                </div>

              </div>


              {/* Actions */}

              <div className="p-2">

                <button
                  onClick={() => {
                    setOpen(false);

                    router.push(
                      "/dashboard"
                    );
                  }}
                  className="
                                        flex
                                        w-full
                                        items-center
                                        gap-3
                                        rounded-xl
                                        px-3
                                        py-2.5
                                        text-left
                                        text-sm
                                        text-gray-400
                                        transition
                                        hover:bg-white/5
                                        hover:text-white
                                    "
                >
                  <span>
                    ⌂
                  </span>

                  Dashboard

                </button>


                <button
                  onClick={() => {
                    setOpen(false);

                    router.push(
                      "/dashboard/workspace"
                    );
                  }}
                  className="
                                        flex
                                        w-full
                                        items-center
                                        gap-3
                                        rounded-xl
                                        px-3
                                        py-2.5
                                        text-left
                                        text-sm
                                        text-gray-400
                                        transition
                                        hover:bg-white/5
                                        hover:text-white
                                    "
                >
                  <span>
                    ♧
                  </span>

                  Workspace

                </button>


                <button
                  onClick={() => {
                    setOpen(false);

                    router.push(
                      "/dashboard/settings"
                    );
                  }}
                  className="
                                        flex
                                        w-full
                                        items-center
                                        gap-3
                                        rounded-xl
                                        px-3
                                        py-2.5
                                        text-left
                                        text-sm
                                        text-gray-400
                                        transition
                                        hover:bg-white/5
                                        hover:text-white
                                    "
                >
                  <span>
                    ⚙
                  </span>

                  Settings

                </button>


                <div className="
                                    my-2
                                    h-px
                                    bg-white/10
                                " />


                {/* Logout */}

                <button
                  onClick={
                    handleLogout
                  }
                  className="
                                        flex
                                        w-full
                                        items-center
                                        gap-3
                                        rounded-xl
                                        px-3
                                        py-2.5
                                        text-left
                                        text-sm
                                        text-red-400
                                        transition
                                        hover:bg-red-500/10
                                    "
                >

                  <span>
                    ↪
                  </span>

                  Logout

                </button>

              </div>

            </div>

          )}

        </div>

      </div>

    </nav>

  );
}