"use client";

import { useState, useTransition } from "react";
import { Alert, Button, Form, InputGroup } from "react-bootstrap";
import { addExpense } from "@/app/actions/expenses";

export default function AddExpenseForm() {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState(null);

  return (
    <Form
      id="add-expense-form"
      className="d-grid gap-3"
      action={(formData) => {
        setError(null);
        startTransition(async () => {
          try {
            await addExpense(formData);
            document.getElementById("add-expense-form")?.reset();
          } catch (e) {
            setError(e?.message || "Something went wrong.");
          }
        });
      }}
    >
      {error ? <Alert variant="danger" className="mb-0">{error}</Alert> : null}

      <Form.Group>
        <Form.Label className="small text-secondary">Category</Form.Label>
        <Form.Control
          name="category"
          placeholder="e.g., Groceries"
          className="rounded-3"
          required
        />
      </Form.Group>

      <Form.Group>
        <Form.Label className="small text-secondary">Amount</Form.Label>
        <InputGroup>
          <InputGroup.Text className="rounded-start-3">₹</InputGroup.Text>
          <Form.Control
            name="amount"
            type="number"
            step="0.01"
            min="0.01"
            placeholder="e.g., 50"
            className="rounded-end-3"
            required
          />
        </InputGroup>
        <div className="form-text">Must be greater than 0.</div>
      </Form.Group>

      <Form.Group>
        <Form.Label className="small text-secondary">Description (optional)</Form.Label>
        <Form.Control
          name="description"
          placeholder="e.g., Vegetables & fruits"
          className="rounded-3"
        />
      </Form.Group>

      <Button
        type="submit"
        disabled={isPending}
        className="rounded-3 fw-semibold py-2"
        variant="primary"
      >
        {isPending ? "Adding..." : "Add Expense"}
      </Button>
    </Form>
  );
}
