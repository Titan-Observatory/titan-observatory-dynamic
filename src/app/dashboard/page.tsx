import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import DashboardForm from "@/components/DashboardForm";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return (
      <main className="titan-section space-y-4 p-8">
        <h1 className="text-2xl font-semibold">Please log in to access the dashboard.</h1>
      </main>
    );
  }
  return (
    <main className="space-y-6">
      <div className="titan-section p-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="mt-2 text-sm text-titan-text-muted">
          Publish announcements and mission updates for the observatory community.
        </p>
      </div>
      <DashboardForm />
    </main>
  );
}
