import { dbConnect } from "@/lib/mongodb";
import Expense from "@/models/Expense";
import DashboardClient from "@/components/DashboardClient";

export default async function HomePage() {
  await dbConnect();

  const docs = await Expense.find().sort({ createdAt: -1 }).lean();

  const expenses = docs.map((d) => ({
    id: d._id.toString(),
    category: d.category,
    amountCents: d.amountCents,
    description: d.description || "",
  }));

  const totalCents = expenses.reduce((s, e) => s + e.amountCents, 0);

  return <DashboardClient expenses={expenses} totalCents={totalCents} />;
}
