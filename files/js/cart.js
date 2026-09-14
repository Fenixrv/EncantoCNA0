// ============================================================
// cart.js — Carrito de compras
// ============================================================
// Controla agregar, eliminar, cantidades, totales,
// localStorage, cart drawer y notificaciones.
// ============================================================

const cartKey = "encanto_cart";
const favoritesKey = "encanto_favorites";

function getCart() {
  const stored = localStorage.getItem(cartKey);
  return stored ? JSON.parse(stored) : [];
}

function saveCart(cart) {
  localStorage.setItem(cartKey, JSON.stringify(cart));
  updateCartCounter();
}

function addToCart(productId, quantity = 1) {
  const cart = getCart();
  const existing = cart.find(item => item.id === productId);
  if (existing) {
    existing.quantity += quantity;
  } else {
    cart.push({ id: productId, quantity: quantity });
  }
  saveCart(cart);
  const product = products.find(p => p.id === productId);
  if (product) {
    showNotification("✨ ¡Agregaste " + product.name + " a tu Encanto!");
  }
  animateCartCounter();
  renderCart();
}

function removeFromCart(productId) {
  let cart = getCart();
  cart = cart.filter(item => item.id !== productId);
  saveCart(cart);
  renderCart();
}

function updateQuantity(productId, delta) {
  const cart = getCart();
  const item = cart.find(i => i.id === productId);
  if (item) {
    item.quantity += delta;
    if (item.quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    saveCart(cart);
    renderCart();
  }
}

function clearCart() {
  localStorage.removeItem(cartKey);
  updateCartCounter();
  renderCart();
}

function getCartTotal() {
  const cart = getCart();
  return cart.reduce((total, item) => {
    const product = products.find(p => p.id === item.id);
    return total + (product ? product.price * item.quantity : 0);
  }, 0);
}

function getCartCount() {
  const cart = getCart();
  return cart.reduce((sum, item) => sum + item.quantity, 0);
}

function updateCartCounter() {
  const counter = document.getElementById("cart-count");
  if (counter) {
    const count = getCartCount();
    counter.textContent = count;
    counter.style.display = count > 0 ? "flex" : "none";
  }
}

function animateCartCounter() {
  const counter = document.getElementById("cart-count");
  if (counter) {
    counter.classList.remove("bounce");
    void counter.offsetWidth;
    counter.classList.add("bounce");
  }
}

function openCart() {
  document.getElementById("cart-drawer").classList.add("open");
  document.getElementById("cart-overlay").classList.add("active");
  renderCart();
}

function closeCart() {
  document.getElementById("cart-drawer").classList.remove("open");
  document.getElementById("cart-overlay").classList.remove("active");
}

function renderCart() {
  const cartBody = document.getElementById("cart-body");
  const cartFooter = document.getElementById("cart-footer");
  const cart = getCart();
  const rate = getDollarRate();

  if (cart.length === 0) {
    cartBody.innerHTML = `
      <div class="cart-empty">
        <div class="cart-empty-icon">🍪</div>
        <p class="cart-empty-text">Tu carrito está esperando un pequeño Encanto ✨🍪</p>
        <button class="btn btn-primary" onclick="closeCart()">Seguir comprando</button>
      </div>
    `;
    cartFooter.style.display = "none";
    return;
  }

  let html = "";
  cart.forEach(item => {
    const product = products.find(p => p.id === item.id);
    if (!product) return;
    const subtotal = product.price * item.quantity;
    // IMAGEN EN CARRITO: ${product.name}
    // ARCHIVO: ${product.image}
    // CONTENIDO: Miniatura del producto en el carrito
    html += `
      <div class="cart-item">
        <img src="${product.image}" alt="${product.name}" class="cart-item-img" loading="lazy" />
        <div class="cart-item-info">
          <h4 class="cart-item-name">${product.name}</h4>
          <p class="cart-item-price">${formatUSD(product.price)} c/u</p>
          <div class="cart-item-controls">
            <button class="qty-btn" onclick="updateQuantity(${product.id}, -1)" aria-label="Disminuir cantidad">−</button>
            <span class="cart-item-qty">${item.quantity}</span>
            <button class="qty-btn" onclick="updateQuantity(${product.id}, 1)" aria-label="Aumentar cantidad">+</button>
            <button class="cart-item-remove" onclick="removeFromCart(${product.id})" aria-label="Eliminar producto">🗑</button>
          </div>
        </div>
        <div class="cart-item-subtotal">
          <span class="cart-subtotal-usd">${formatUSD(subtotal)}</span>
          ${rate ? `<span class="cart-subtotal-bdv">≈ ${formatBDV(convertToBDV(subtotal))} Bs</span>` : ""}
        </div>
      </div>
    `;
  });
  cartBody.innerHTML = html;

  const total = getCartTotal();
  let footerHtml = `
    <div class="cart-total-section">
      <div class="cart-total-row">
        <span>Total:</span>
        <span class="cart-total-usd">${formatUSD(total)} USD</span>
      </div>
      ${rate ? `<div class="cart-total-bdv">≈ ${formatBDV(convertToBDV(total))} Bs</div>` : ""}
      <div class="cart-rate-info" data-current-rate></div>
      <button class="btn btn-outline btn-sm" onclick="showRateModal()">💵 ${rate ? "Cambiar tasa BDV" : "Configurar tasa BDV"}</button>
    </div>
    <div class="cart-actions">
      <button class="btn btn-outline" onclick="clearCart()">Vaciar carrito</button>
      <button class="btn btn-primary" onclick="checkout()">Enviar pedido por WhatsApp</button>
    </div>
  `;
  cartFooter.innerHTML = footerHtml;
  cartFooter.style.display = "block";

  // Actualizar tasa info
  const rateInfo = cartFooter.querySelector("[data-current-rate]");
  if (rateInfo) {
    if (rate) {
      rateInfo.textContent = "Tasa utilizada: " + rate + " Bs/USD";
      rateInfo.style.display = "block";
    } else {
      rateInfo.style.display = "none";
    }
  }
}

// ============================================================
// Favoritos
// ============================================================

function getFavorites() {
  const stored = localStorage.getItem(favoritesKey);
  return stored ? JSON.parse(stored) : [];
}

function saveFavorites(favs) {
  localStorage.setItem(favoritesKey, JSON.stringify(favs));
  updateFavoritesCounter();
}

function toggleFavorite(productId) {
  const favs = getFavorites();
  const index = favs.indexOf(productId);
  if (index > -1) {
    favs.splice(index, 1);
  } else {
    favs.push(productId);
  }
  saveFavorites(favs);
  updateFavoriteButtons();
}

function isFavorite(productId) {
  return getFavorites().includes(productId);
}

function updateFavoritesCounter() {
  const counter = document.getElementById("fav-count");
  if (counter) {
    const count = getFavorites().length;
    counter.textContent = count;
    counter.style.display = count > 0 ? "flex" : "none";
  }
}

function updateFavoriteButtons() {
  document.querySelectorAll("[data-fav-id]").forEach(btn => {
    const id = parseInt(btn.getAttribute("data-fav-id"));
    if (isFavorite(id)) {
      btn.classList.add("active");
      btn.textContent = "♥";
    } else {
      btn.classList.remove("active");
      btn.textContent = "♡";
    }
  });
}

// ============================================================
// Notificaciones
// ============================================================

function showNotification(message) {
  let container = document.getElementById("notification-container");
  if (!container) {
    container = document.createElement("div");
    container.id = "notification-container";
    document.body.appendChild(container);
  }
  const notif = document.createElement("div");
  notif.className = "notification";
  notif.textContent = message;
  container.appendChild(notif);
  setTimeout(() => notif.classList.add("show"), 10);
  setTimeout(() => {
    notif.classList.remove("show");
    setTimeout(() => notif.remove(), 300);
  }, 3000);
}

window.getCart = getCart;
window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.updateQuantity = updateQuantity;
window.clearCart = clearCart;
window.getCartTotal = getCartTotal;
window.getCartCount = getCartCount;
window.updateCartCounter = updateCartCounter;
window.openCart = openCart;
window.closeCart = closeCart;
window.renderCart = renderCart;
window.getFavorites = getFavorites;
window.toggleFavorite = toggleFavorite;
window.isFavorite = isFavorite;
window.updateFavoritesCounter = updateFavoritesCounter;
window.updateFavoriteButtons = updateFavoriteButtons;
window.showNotification = showNotification;
