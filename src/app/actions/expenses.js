"use server";

import { revalidatePath } from "next/cache";
import { dbConnect } from "@/lib/mongodb";
import Expense from "@/models/Expense";

export async function addExpense(formData) {
  const category = formData.get("category")?.trim();
  const amount = Number(formData.get("amount"));
  const description = formData.get("description")?.trim();

  if (!category || amount <= 0) {
    throw new Error("Invalid input");
  }

  await dbConnect();
  await Expense.create({
    category,
    amountCents: Math.round(amount * 100),
    description,
  });

  revalidatePath("/");
}

export async function deleteExpense(id) {
  await dbConnect();
  await Expense.findByIdAndDelete(id);
  revalidatePath("/");
}
