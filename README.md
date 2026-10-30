# Code Quality AI findings sample

This repository is a small fixture for exercising GitHub Code Quality AI findings.
The existing greeting entry point remains available with `node index.js`.

## Order summary sample

`samples/order-summary.js` exports `summarizeOrders(orders)`. Each order has a
string `customerId`, an integer `amountCents`, and a `status` such as `"paid"` or
`"pending"`. It returns each customer's order count, total amount, and pending
amount, in first-seen customer order. Amounts are represented in cents.

The sample deliberately filters the entire order list repeatedly for each
customer. This is a low-risk code-quality/performance smell: work grows
quadratically when each order belongs to a different customer, and intermediate
arrays are allocated unnecessarily. A single-pass aggregation would avoid these
scans. The sample is not called by the greeting entry point and should not be used
as a production implementation.

Run the sample's correctness tests with Node.js 18 or later:

```sh
npm test
```

AI findings are probabilistic; this fixture does not guarantee a finding.
Evaluating it on the default branch requires an explicitly authorized push and
merge, and the repository's Code Quality analysis must be enabled.

Small change
