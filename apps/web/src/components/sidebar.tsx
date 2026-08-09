import Link from "next/dist/client/link";

export default function Sidebar() {
  return (
    <div className="w-64 h-screen border-r p-4">

      <h1 className="text-2xl font-bold">
        AI CRM
      </h1>

      <div className="mt-8 flex flex-col gap-4">

        <Link href="/dashboard">
          Dashboard
        </Link>

        <Link href="/dashboard/leads">
          Leads
        </Link>

        <Link href="/dashboard/pipeline">
          Pipeline
        </Link>

        <Link href="/dashboard/campaigns">
          Campaigns
        </Link>

        <Link href="/dashboard/import">
          Import Leads
        </Link>

        <Link href = '/dashboard/analytics'>
          Analytics
        </Link>

        <Link href = '/dashboard/workspace'>
          Workspace
        </Link>

        <Link href= '/dashboard/sequence'>
          Sequences
        </Link>
        

      </div>

    </div>
  );
}