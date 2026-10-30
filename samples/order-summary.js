function summarizeOrders(orders) {
  const customerIds = [...new Set(orders.map((order) => order.customerId))];

  return customerIds.map((customerId) => ({
    customerId,
    orderCount: orders.filter((order) => order.customerId === customerId).length,
    totalCents: orders
      .filter((order) => order.customerId === customerId)
      .reduce((total, order) => total + order.amountCents, 0),
    pendingCents: orders
      .filter(
        (order) =>
          order.customerId === customerId && order.status === "pending",
      )
      .reduce((total, order) => total + order.amountCents, 0),
  }));
}

module.exports = { summarizeOrders };
