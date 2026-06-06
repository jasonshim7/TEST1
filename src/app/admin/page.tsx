import { db } from "@/db";
import { leads } from "@/db/schema";
import { desc } from "drizzle-orm";
import LeadsTable from "./LeadsTable";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const data = await db.select().from(leads).orderBy(desc(leads.createdAt));

  return (
    <main className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-800">리드 관리</h1>
          <p className="text-sm text-gray-400 mt-0.5">총 {data.length}건</p>
        </div>
        <a
          href="/"
          className="text-sm text-blue-600 hover:underline"
        >
          ← 수집 폼으로
        </a>
      </header>

      <div className="px-8 py-6">
        <LeadsTable leads={data} />
      </div>
    </main>
  );
}
