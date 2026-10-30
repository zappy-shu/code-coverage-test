const assert = require("node:assert/strict");
const { test } = require("node:test");
const { summarizeOrders } = require("./order-summary");

test("returns no summaries for an empty order list", () => {
  assert.deepEqual(summarizeOrders([]), []);
});

test("groups interleaved orders in first-seen customer order", () => {
  const orders = [
    { customerId: "b", amountCents: 1200, status: "paid" },
    { customerId: "a", amountCents: 500, status: "pending" },
    { customerId: "b", amountCents: 300, status: "pending" },
    { customerId: "a", amountCents: 700, status: "paid" },
    { customerId: "b", amountCents: 200, status: "pending" },
  ];

  assert.deepEqual(summarizeOrders(orders), [
    { customerId: "b", orderCount: 3, totalCents: 1700, pendingCents: 500 },
    { customerId: "a", orderCount: 2, totalCents: 1200, pendingCents: 500 },
  ]);
});

test("handles zero-value orders and customers with no pending orders", () => {
  assert.deepEqual(
    summarizeOrders([
      { customerId: "a", amountCents: 0, status: "paid" },
      { customerId: "a", amountCents: 100, status: "paid" },
    ]),
    [{ customerId: "a", orderCount: 2, totalCents: 100, pendingCents: 0 }],
  );
});

test("does not mutate the input orders", () => {
  const orders = Object.freeze([
    Object.freeze({ customerId: "a", amountCents: 400, status: "pending" }),
  ]);
  const original = structuredClone(orders);

  summarizeOrders(orders);

  assert.deepEqual(orders, original);
});
