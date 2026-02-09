"use client";

import { Container, Row, Col, Card, Badge } from "react-bootstrap";
import AddExpenseForm from "@/components/AddExpenseForm";
import ExpenseList from "@/components/ExpenseList";

function formatCurrency(cents) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format((cents || 0) / 100);
}

export default function DashboardClient({ expenses = [], totalCents = 0 }) {
  return (
    <Container className="py-4 py-lg-5">
      <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-4">
        <div>
          <div className="d-flex align-items-center gap-2">
            <span className="fs-3 fw-bold brand-gradient">Expense Tracker</span>
          </div>
          <div className="text-secondary mt-1">
            Add, view, and delete expenses instantly.
          </div>
        </div>

        <div className="d-flex gap-3 flex-wrap">
         

          <Badge bg="success" className="pill px-4 py-3 fs-6 fw-semibold">
           <b>Total :</b>  &nbsp;
            <span className="fw-bold fs-5 ms-1">
              {formatCurrency(totalCents)}
            </span>
          </Badge>
        </div>
      </div>

      <Row className="g-4">
        <Col lg={5}>
          <Card className="soft-card rounded-4 border-0 overflow-hidden">
            <div className="p-3 p-lg-4 bg-primary bg-gradient text-white">
              <div className="d-flex align-items-center justify-content-between">
                <div className="fw-semibold">Add Expense</div>
             
              </div>
           
            </div>

            <Card.Body className="p-3 p-lg-4">
              <AddExpenseForm />
            </Card.Body>
          </Card>
        </Col>

        <Col lg={7}>
          <Card className="soft-card rounded-4 border-0 overflow-hidden">
            <div className="p-3 p-lg-4 bg-dark bg-gradient text-white">
              <div className="d-flex align-items-center justify-content-between">
                <div className="fw-semibold">Recent Expenses</div>
              
              </div>
            
            </div>

            <Card.Body className="p-0">
              <ExpenseList expenses={expenses} />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
