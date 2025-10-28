import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import DashboardForm from "@/components/DashboardForm";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return <main><h1 className="text-2xl font-semibold">Please log in to access the dashboard.</h1></main>;
  }
  return (
    <main>
      <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
      <DashboardForm />
    </main>
  );
}
