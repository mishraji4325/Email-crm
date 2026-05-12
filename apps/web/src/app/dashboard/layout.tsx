import Sidebar from "@/components/sidebar";
import Navbar from "@/components/navbar";
import ProtectedRoute from "@/components/protected-route";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute>

      <div className="flex">

        <Sidebar />

        <div className="flex-1">

          <Navbar />

          <main className="p-6">
            {children}
          </main>

        </div>

      </div>

    </ProtectedRoute>
  );
}