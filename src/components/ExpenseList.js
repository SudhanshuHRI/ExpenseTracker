"use client";

import { useTransition } from "react";
import { Badge, Button, ListGroup } from "react-bootstrap";
import { deleteExpense } from "@/app/actions/expenses";

function formatCurrency(cents) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format((cents || 0) / 100);
}

function categoryVariant(category) {
  const c = (category || "").toLowerCase();
  if (c.includes("food") || c.includes("groc")) return "success";
  if (c.includes("travel") || c.includes("transport")) return "primary";
  if (c.includes("bill") || c.includes("rent")) return "warning";
  if (c.includes("health")) return "danger";
  return "secondary";
}

export default function ExpenseList({ expenses = [] }) {
  const [isPending, startTransition] = useTransition();

  if (!expenses.length) {
    return (
      <div className="text-center text-secondary py-5 px-3">
        <div className="fw-bold fs-5">No expenses yet</div>
        <div className="small">Add one from the form to see it here.</div>
      </div>
    );
  }

  return (
    <ListGroup variant="flush">
      {expenses.map((e) => (
        <ListGroup.Item
          key={e.id}
          className="py-3 px-3 px-lg-4 d-flex align-items-start justify-content-between gap-3"
        >
          <div className="min-w-0">
            <div className="d-flex align-items-center gap-2 flex-wrap">
              <span className="fw-semibold text-truncate">{e.category}</span>

              <Badge bg={"secondary"} className="pill">
                {formatCurrency(e.amountCents)}
              </Badge>

           
            </div>

        
          </div>

          <Button
            variant="outline-danger"
            className="rounded-3"
            disabled={isPending}
            onClick={() =>
              startTransition(async () => {
                await deleteExpense(e.id);
              })
            }
          >
            {isPending ? "..." : "Delete"}
          </Button>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
}
