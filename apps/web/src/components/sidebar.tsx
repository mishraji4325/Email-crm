export default function Sidebar() {
  return (
    <div className="w-64 h-screen border-r p-4">

      <h1 className="text-2xl font-bold">
        AI CRM
      </h1>

      <div className="mt-8 flex flex-col gap-4">

        <a href="/dashboard">
          Dashboard
        </a>

        <a href="/dashboard/leads">
          Leads
        </a>

        <a href="/dashboard/campaigns">
          Campaigns
        </a>

      </div>

    </div>
  );
}