"use client";

import { Container, Row, Col, Card, Badge } from "react-bootstrap";
import AddExpenseForm from "@/components/AddExpenseForm";
import ExpenseList from "@/components/ExpenseList";

function formatCurrency(cents) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(cents / 100);
}

export default function DashboardClient({ expenses, totalCents }) {
  return (
    <Container className="py-4">
      <Row className="g-4">
        <Col lg={5}>
          <Card className="shadow-sm border-0 rounded-4">
            <Card.Body className="p-4">
              <div className="d-flex align-items-start justify-content-between">
                <h1 className="h4 mb-2">Expense Tracker</h1>
                <Badge bg="dark" className="rounded-pill px-3 py-2">
                  MongoDB
                </Badge>
              </div>

              <Card className="bg-light border-0 rounded-4 mb-4">
                <Card.Body>
                  <div className="text-secondary small">Total Expenses</div>
                  <div className="display-6 fw-semibold">
                    {formatCurrency(totalCents)}
                  </div>
                </Card.Body>
              </Card>

              <AddExpenseForm />
            </Card.Body>
          </Card>
        </Col>

        <Col lg={7}>
          <Card className="shadow-sm border-0 rounded-4">
            <Card.Body className="p-4">
              <ExpenseList expenses={expenses} />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
