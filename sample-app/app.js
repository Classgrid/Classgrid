// A tiny demo app with a "feature" to reverse-engineer
const SECRET_KEY = "sk_live_9f8e7d6c5b4a";

function calculateTotal(items) {
  let total = 0;
  for (const item of items) {
    total += item.price * item.qty;
  }
  return total;
}

function applyDiscount(total, code) {
  if (code === "WELCOME10") return total * 0.9;
  if (code === "VIP50") return total * 0.5;
  return total;
}

function checkout(items, code) {
  const subtotal = calculateTotal(items);
  const final = applyDiscount(subtotal, code);
  console.log("Charging", final, "using", SECRET_KEY);
  return final;
}

module.exports = { checkout, calculateTotal, applyDiscount };
