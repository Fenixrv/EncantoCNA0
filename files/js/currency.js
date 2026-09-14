// ============================================================
// currency.js — Conversión USD → BDV
// ============================================================
// Controla la tasa del dólar, validación, conversión,
// localStorage y mostrar/ocultar la conversión.
// ============================================================

const dollarRateKey = "encanto_dollar_rate";

function getDollarRate() {
  const stored = localStorage.getItem(dollarRateKey);
  return stored ? parseFloat(stored) : null;
}

function setDollarRate(rate) {
  localStorage.setItem(dollarRateKey, rate.toString());
}

function isValidRate(rate) {
  if (rate === null || isNaN(rate) || rate === "" || rate <= 0 || rate < 800) {
    return false;
  }
  return true;
}

function convertToBDV(usdPrice) {
  const rate = getDollarRate();
  if (!rate) return null;
  return usdPrice * rate;
}

function formatBDV(bs) {
  return bs.toLocaleString("es-VE", { minimumFractionDigits: 0, maximumFractionDigits: 2 });
}

function formatUSD(usd) {
  return "$" + usd.toFixed(2);
}

// Muestra el modal para introducir la tasa
function showRateModal() {
  const modal = document.getElementById("rate-modal");
  const input = document.getElementById("rate-input");
  const currentRate = getDollarRate();
  input.value = currentRate ? currentRate : "";
  modal.classList.add("active");
  setTimeout(() => input.focus(), 100);
}

function closeRateModal() {
  document.getElementById("rate-modal").classList.remove("active");
}

function handleRateSubmit() {
  const input = document.getElementById("rate-input");
  const error = document.getElementById("rate-error");
  const value = parseFloat(input.value);

  if (!isValidRate(value)) {
    error.textContent = "Introduce una tasa válida ✨";
    error.style.display = "block";
    return;
  }

  error.style.display = "none";
  setDollarRate(value);
  closeRateModal();
  updateAllBDVPrices();
  showNotification("✨ Tasa actualizada: " + value + " Bs/USD");
}

// Actualiza todos los precios BDV visibles
function updateAllBDVPrices() {
  const rate = getDollarRate();
  document.querySelectorAll("[data-bdv-price]").forEach(el => {
    const usd = parseFloat(el.getAttribute("data-bdv-price"));
    if (rate && usd !== null) {
      const bs = convertToBDV(usd);
      el.textContent = "≈ " + formatBDV(bs) + " Bs";
      el.style.display = "block";
    } else {
      el.style.display = "none";
    }
  });

  // Actualizar texto de tasa en el carrito y modal
  document.querySelectorAll("[data-current-rate]").forEach(el => {
    if (rate) {
      el.textContent = "Tasa utilizada: " + rate + " Bs/USD";
      el.style.display = "block";
    } else {
      el.style.display = "none";
    }
  });

  // Actualizar el carrito si está abierto
  if (typeof renderCart === "function") {
    renderCart();
  }
}

window.getDollarRate = getDollarRate;
window.setDollarRate = setDollarRate;
window.isValidRate = isValidRate;
window.convertToBDV = convertToBDV;
window.formatBDV = formatBDV;
window.formatUSD = formatUSD;
window.showRateModal = showRateModal;
window.closeRateModal = closeRateModal;
window.handleRateSubmit = handleRateSubmit;
window.updateAllBDVPrices = updateAllBDVPrices;
