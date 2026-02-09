"use client";

import { useTransition } from "react";
import { Badge, Button, ListGroup } from "react-bootstrap";
import { deleteExpense } from "@/app/actions/expenses";

function formatCurrency(cents) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(cents / 100);
}

export default function ExpenseList({ expenses }) {
  const [isPending, startTransition] = useTransition();

  if (!expenses.length) {
    return (
      <div className="text-center text-secondary py-5">
        <div className="fw-semibold">No expenses yet</div>
        <div className="small">Add your first expense from the form.</div>
      </div>
    );
  }

  return (
    <ListGroup className="rounded-4 overflow-hidden">
      {expenses.map((e) => (
        <ListGroup.Item
          key={e.id}
          className="d-flex align-items-start justify-content-between gap-3 py-3"
        >
          <div className="min-w-0">
            <div className="d-flex align-items-center gap-2 flex-wrap">
              <span className="fw-semibold text-truncate">{e.category}</span>
              <Badge bg="light" text="dark" className="border rounded-pill">
                {formatCurrency(e.amountCents)}
              </Badge>
            </div>

            {e.description ? (
              <div className="text-secondary small mt-1 text-truncate">
                {e.description}
              </div>
            ) : null}
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
