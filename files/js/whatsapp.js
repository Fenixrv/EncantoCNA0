// ============================================================
// whatsapp.js — Envío de pedidos por WhatsApp
// ============================================================

const whatsappNumber = "584128491656";

function getGreeting() {
  const hour = new Date().getHours();
  if (hour >= 7 && hour < 12) {
    return "Buenos días";
  }
  if (hour >= 12 && hour < 18) {
    return "Buenas tardes";
  }
  return "Buenas noches";
}

function buildOrderMessage() {
  const cart = getCart();
  const rate = getDollarRate();
  const total = getCartTotal();

  let message = getGreeting() + " ✨🍪\n\n";
  message += "¡Hola! Me gustaría hacer un pedido en Encanto 💚\n\n";
  message += "Mi pedido:\n\n";

  cart.forEach(item => {
    const product = products.find(p => p.id === item.id);
    if (!product) return;
    message += "- " + product.name + " x" + item.quantity + " — " + formatUSD(product.price) + " c/u\n";
  });

  message += "\nTotal: " + formatUSD(total) + " USD\n";

  if (rate) {
    message += "≈ " + formatBDV(convertToBDV(total)) + " Bs\n";
    message += "\nTasa utilizada: " + rate + " Bs/USD\n";
  }

  message += "\n¡Muchas gracias! ✨💚";

  return message;
}

function checkout() {
  const cart = getCart();
  if (cart.length === 0) {
    showNotification("Tu carrito está vacío ✨🍪 Agrega algún producto antes de enviar tu pedido.");
    return;
  }

  // Mostrar resumen del pedido
  showOrderSummary();
}

function showOrderSummary() {
  const cart = getCart();
  const rate = getDollarRate();
  const total = getCartTotal();

  let summaryHtml = '<div class="summary-items">';

  cart.forEach(item => {
    const product = products.find(p => p.id === item.id);
    if (!product) return;
    const subtotal = product.price * item.quantity;
    summaryHtml += `
      <div class="summary-item">
        <span class="summary-item-name">${product.name} ×${item.quantity}</span>
        <span class="summary-item-price">${formatUSD(subtotal)}</span>
      </div>
    `;
  });

  summaryHtml += '</div>';
  summaryHtml += '<div class="summary-divider"></div>';
  summaryHtml += `
    <div class="summary-total-row">
      <span>TOTAL:</span>
      <span class="summary-total-usd">${formatUSD(total)} USD</span>
    </div>
  `;
  if (rate) {
    summaryHtml += `<div class="summary-total-bdv">≈ ${formatBDV(convertToBDV(total))} Bs</div>`;
    summaryHtml += `<div class="summary-rate">Tasa utilizada: ${rate} Bs/USD</div>`;
  }

  document.getElementById("summary-content").innerHTML = summaryHtml;
  document.getElementById("summary-modal").classList.add("active");
}

function closeSummary() {
  document.getElementById("summary-modal").classList.remove("active");
}

function sendWhatsAppOrder() {
  const cart = getCart();
  if (cart.length === 0) {
    showNotification("Tu carrito está vacío ✨🍪 Agrega algún producto antes de enviar tu pedido.");
    return;
  }

  const message = buildOrderMessage();
  const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
  window.open(whatsappURL, "_blank");
}

window.whatsappNumber = whatsappNumber;
window.getGreeting = getGreeting;
window.buildOrderMessage = buildOrderMessage;
window.checkout = checkout;
window.showOrderSummary = showOrderSummary;
window.closeSummary = closeSummary;
window.sendWhatsAppOrder = sendWhatsAppOrder;
