// ============================================================
// app.js — Inicialización, renderizado, eventos, modal, navegación
// ============================================================

let modalProductId = null;
let modalQuantity = 1;

// ============================================================
// Renderizado de tarjetas de producto
// ============================================================

function createProductCard(product) {
  const isFav = isFavorite(product.id);
  const priceHtml = product.price !== null
    ? `<span class="product-price">${formatUSD(product.price)} USD</span>`
    : `<span class="product-price-soon">Precio próximamente</span>`;

  let tagsHtml = "";
  if (product.tags && product.tags.length > 0) {
    tagsHtml = product.tags.map(tag => `<span class="product-tag">${tag}</span>`).join("");
  }

  // IMAGEN DEL PRODUCTO: ${product.name}
  // ARCHIVO: ${product.image}
  // CONTENIDO: Fotografía del producto ${product.name}
  return `
    <article class="product-card" data-product-id="${product.id}" tabindex="0" role="button" aria-label="Ver detalles de ${product.name}">
      <div class="product-card-img-wrap">
        <img src="${product.image}" alt="${product.name}" class="product-card-img" loading="lazy" />
        <div class="product-tags">${tagsHtml}</div>
        <button class="fav-btn ${isFav ? "active" : ""}" data-fav-id="${product.id}" onclick="event.stopPropagation(); toggleFavorite(${product.id}); updateFavoriteButtons();" aria-label="Favorito">
          ${isFav ? "♥" : "♡"}
        </button>
      </div>
      <div class="product-card-body">
        <h3 class="product-card-name">${product.name}</h3>
        <p class="product-card-desc">${product.description}</p>
        <div class="product-card-footer">
          ${priceHtml}
          ${product.price !== null
            ? `<button class="btn btn-primary btn-sm" onclick="event.stopPropagation(); addToCart(${product.id})">Agregar</button>`
            : `<button class="btn btn-outline btn-sm" disabled>Próximamente</button>`}
        </div>
      </div>
    </article>
  `;
}

function renderSection(containerId, productList) {
  const container = document.getElementById(containerId);
  if (!container) return;
  if (productList.length === 0) {
    container.innerHTML = '<p class="empty-state">🔎 No encontramos ese pequeño Encanto.</p>';
    return;
  }
  container.innerHTML = productList.map(createProductCard).join("");
  updateFavoriteButtons();
}

// ============================================================
// Renderizado del catálogo con filtros
// ============================================================

function renderCatalog() {
  const filtered = getFilteredProducts();
  const container = document.getElementById("catalog-grid");
  if (!container) return;

  if (filtered.length === 0) {
    container.innerHTML = '<p class="empty-state">🔎 No encontramos ese pequeño Encanto.</p>';
    return;
  }

  container.innerHTML = filtered.map(createProductCard).join("");
  updateFavoriteButtons();
  observeCards();
}

// ============================================================
// Modal de producto
// ============================================================

function openProductModal(productId) {
  const product = products.find(p => p.id === productId);
  if (!product) return;
  modalProductId = productId;
  modalQuantity = 1;

  const isFav = isFavorite(product.id);
  const priceHtml = product.price !== null
    ? `<span class="modal-price-usd">${formatUSD(product.price)} USD</span>`
    : `<span class="product-price-soon">Precio próximamente</span>`;

  let bdvHtml = "";
  if (product.price !== null) {
    bdvHtml = `<div class="modal-bdv" data-bdv-price="${product.price}"></div>`;
  }

  let tagsHtml = "";
  if (product.tags && product.tags.length > 0) {
    tagsHtml = `<div class="modal-tags">${product.tags.map(t => `<span class="product-tag">${t}</span>`).join("")}</div>`;
  }

  // IMAGEN EN MODAL: ${product.name}
  // ARCHIVO: ${product.image}
  // CONTENIDO: Fotografía grande del producto ${product.name}
  const html = `
    <div class="modal-product">
      <div class="modal-product-img-wrap">
        <img src="${product.image}" alt="${product.name}" class="modal-product-img" />
      </div>
      <div class="modal-product-info">
        ${tagsHtml}
        <h2 class="modal-product-name">${product.name}</h2>
        <p class="modal-product-desc">${product.description}</p>
        <div class="modal-product-meta">
          <span class="meta-label">Categoría:</span>
          <span class="meta-value">${product.category === "cookies-grandes" ? "Cookies Grandes" : "Mini Cookies"}</span>
          <span class="meta-label">Tamaño:</span>
          <span class="meta-value">${product.size === "large" ? "Grande" : "Pequeña"}</span>
        </div>
        <div class="modal-price-row">
          ${priceHtml}
          ${bdvHtml}
        </div>
        <div class="modal-rate-info" data-current-rate></div>
        ${product.price !== null ? `<button class="btn btn-outline btn-sm" onclick="showRateModal()">💵 Ver precio en BDV</button>` : ""}
        <div class="modal-quantity-row">
          <label>Cantidad:</label>
          <div class="modal-quantity-controls">
            <button class="qty-btn" onclick="changeModalQty(-1)" aria-label="Disminuir">−</button>
            <span id="modal-qty-display">${modalQuantity}</span>
            <button class="qty-btn" onclick="changeModalQty(1)" aria-label="Aumentar">+</button>
          </div>
        </div>
        <div class="modal-actions">
          <button class="fav-btn ${isFav ? "active" : ""}" data-fav-id="${product.id}" onclick="toggleFavorite(${product.id}); updateFavoriteButtons();" aria-label="Favorito">
            ${isFav ? "♥" : "♡"}
          </button>
          ${product.price !== null
            ? `<button class="btn btn-primary" onclick="addToCart(${product.id}, modalQuantity); closeProductModal();">Agregar al carrito</button>`
            : `<button class="btn btn-outline" disabled>Próximamente</button>`}
        </div>
      </div>
    </div>
  `;

  document.getElementById("modal-content").innerHTML = html;
  document.getElementById("product-modal").classList.add("active");
  updateAllBDVPrices();
}

function closeProductModal() {
  document.getElementById("product-modal").classList.remove("active");
  modalProductId = null;
}

function changeModalQty(delta) {
  modalQuantity = Math.max(1, modalQuantity + delta);
  const display = document.getElementById("modal-qty-display");
  if (display) display.textContent = modalQuantity;
}

// ============================================================
// Categorías
// ============================================================

function renderCategories() {
  const categories = [
    { id: "cookies-grandes", name: "Cookies Grandes", icon: "🍪", desc: "New York Cookies llenas de sabor.", target: "section-cookies-grandes" },
    { id: "mini-cookies", name: "Mini Cookies", icon: "🤏", desc: "Pequeñitas y perfectas para compartir.", target: "section-mini-cookies" },
    { id: "especiales", name: "Especiales", icon: "✨", desc: "Productos con características únicas.", target: "section-especiales" },
    { id: "ofertas", name: "Ofertas", icon: "🔥", desc: "Pequeños Encantos a buen precio.", target: "section-ofertas" }
  ];

  const container = document.getElementById("categories-grid");
  if (!container) return;
  container.innerHTML = categories.map(cat => `
    <div class="category-card" onclick="scrollToSection('${cat.target}')" tabindex="0" role="button">
      <div class="category-icon">${cat.icon}</div>
      <h3 class="category-name">${cat.name}</h3>
      <p class="category-desc">${cat.desc}</p>
      <button class="btn btn-outline btn-sm">Explorar</button>
    </div>
  `).join("");
}

// ============================================================
// Eventos / Temporadas
// ============================================================

function renderEventBanner() {
  const activeEvent = specialEvents.find(e => e.active);
  if (!activeEvent) return;

  const banner = document.getElementById("event-banner");
  if (!banner) return;

  // Calcular cuenta regresiva
  const targetDate = new Date(activeEvent.date + "T00:00:00");
  const now = new Date();
  const diff = targetDate - now;

  let countdownHtml = "";
  if (diff > 0) {
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    countdownHtml = `
      <div class="event-countdown" id="event-countdown">
        <span>Faltan:</span>
        <div class="countdown-units">
          <div class="countdown-unit"><strong>${String(days).padStart(2, "0")}</strong><span>días</span></div>
          <div class="countdown-unit"><strong>${String(hours).padStart(2, "0")}</strong><span>horas</span></div>
          <div class="countdown-unit"><strong>${String(minutes).padStart(2, "0")}</strong><span>minutos</span></div>
        </div>
      </div>
    `;
  } else {
    countdownHtml = '<div class="event-arrived">✨ ¡El momento ha llegado! ✨</div>';
  }

  // IMAGEN DEL EVENTO: ${activeEvent.title}
  // ARCHIVO: ${activeEvent.image}
  // CONTENIDO: Imagen representativa del evento ${activeEvent.title}
  banner.innerHTML = `
    <div class="event-banner-content event-theme-${activeEvent.theme}">
      <div class="event-banner-text">
        <span class="event-badge">🌻 Temporada de ${activeEvent.title}</span>
        <p class="event-desc">${activeEvent.description}</p>
        ${countdownHtml}
      </div>
      <img src="${activeEvent.image}" alt="${activeEvent.title}" class="event-banner-img" loading="lazy" />
    </div>
  `;
  banner.style.display = "block";

  // Iniciar animación de temporada
  startSeasonAnimation(activeEvent.theme);
}

function startSeasonAnimation(theme) {
  if (theme === "yellow") {
    createFloatingParticles("🌻", 15);
  }
}

function createFloatingParticles(emoji, count) {
  let container = document.getElementById("particle-container");
  if (!container) {
    container = document.createElement("div");
    container.id = "particle-container";
    container.className = "particle-container";
    document.body.appendChild(container);
  }

  for (let i = 0; i < count; i++) {
    const particle = document.createElement("div");
    particle.className = "floating-particle";
    particle.textContent = emoji;
    particle.style.left = Math.random() * 100 + "%";
    particle.style.animationDelay = Math.random() * 10 + "s";
    particle.style.animationDuration = (8 + Math.random() * 8) + "s";
    particle.style.fontSize = (14 + Math.random() * 10) + "px";
    container.appendChild(particle);
  }
}

// ============================================================
// Navegación
// ============================================================

function scrollToSection(id) {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
  closeMobileMenu();
}

function toggleMobileMenu() {
  const menu = document.getElementById("mobile-menu");
  const overlay = document.getElementById("menu-overlay");
  menu.classList.toggle("open");
  overlay.classList.toggle("active");
}

function closeMobileMenu() {
  const menu = document.getElementById("mobile-menu");
  const overlay = document.getElementById("menu-overlay");
  menu.classList.remove("open");
  overlay.classList.remove("active");
}

// ============================================================
// Animaciones de scroll
// ============================================================

function setupScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll(".fade-in-up, .section-title, .section-subtitle").forEach(el => {
    observer.observe(el);
  });
}

function observeCards() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add("visible"), index * 80);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll(".product-card:not(.visible)").forEach(el => {
    observer.observe(el);
  });
}

// ============================================================
// Inicialización
// ============================================================

function init() {
  // Renderizar secciones
  renderCategories();
  renderSection("featured-grid", getFeaturedProducts());
  renderSection("cookies-grandes-grid", products.filter(p => p.category === "cookies-grandes"));
  renderSection("mini-cookies-grid", products.filter(p => p.category === "mini-cookies"));
  renderSection("especiales-grid", getSpecialProducts());
  renderSection("ofertas-grid", getOfferProducts());
  renderCatalog();
  renderEventBanner();

  // Renderizar variedades de mini cookies
  const varietiesContainer = document.getElementById("mini-varieties");
  if (varietiesContainer) {
    varietiesContainer.innerHTML = miniCookieVarieties.map(v =>
      `<span class="variety-tag">${v}</span>`
    ).join("");
  }

  // Actualizar contadores
  updateCartCounter();
  updateFavoritesCounter();
  updateAllBDVPrices();

  // Eventos de búsqueda
  const searchInput = document.getElementById("search-input");
  if (searchInput) {
    searchInput.addEventListener("input", (e) => setSearch(e.target.value));
  }

  // Click en tarjeta de producto abre modal
  document.addEventListener("click", (e) => {
    const card = e.target.closest(".product-card");
    if (card && !e.target.closest("button")) {
      const id = parseInt(card.getAttribute("data-product-id"));
      openProductModal(id);
    }
  });

  // Keyboard support para tarjetas
  document.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && e.target.classList.contains("product-card")) {
      const id = parseInt(e.target.getAttribute("data-product-id"));
      openProductModal(id);
    }
    if (e.key === "Escape") {
      closeProductModal();
      closeCart();
      closeRateModal();
      closeSummary();
      closeMobileMenu();
    }
  });

  // Click fuera de modales
  document.getElementById("product-modal").addEventListener("click", (e) => {
    if (e.target.id === "product-modal") closeProductModal();
  });
  document.getElementById("rate-modal").addEventListener("click", (e) => {
    if (e.target.id === "rate-modal") closeRateModal();
  });
  document.getElementById("summary-modal").addEventListener("click", (e) => {
    if (e.target.id === "summary-modal") closeSummary();
  });

  // Cart overlay
  const cartOverlay = document.getElementById("cart-overlay");
  if (cartOverlay) {
    cartOverlay.addEventListener("click", closeCart);
  }

  // Menu overlay
  const menuOverlay = document.getElementById("menu-overlay");
  if (menuOverlay) {
    menuOverlay.addEventListener("click", closeMobileMenu);
  }

  // Rate input Enter key
  const rateInput = document.getElementById("rate-input");
  if (rateInput) {
    rateInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") handleRateSubmit();
    });
  }

  // Header sticky shadow
  window.addEventListener("scroll", () => {
    const header = document.getElementById("header");
    if (header) {
      header.classList.toggle("scrolled", window.scrollY > 20);
    }
  });

  // Animaciones
  setupScrollAnimations();
  observeCards();

  // Actualizar contador del evento cada minuto
  setInterval(() => {
    renderEventBanner();
  }, 60000);
}

document.addEventListener("DOMContentLoaded", init);

window.openProductModal = openProductModal;
window.closeProductModal = closeProductModal;
window.changeModalQty = changeModalQty;
window.scrollToSection = scrollToSection;
window.toggleMobileMenu = toggleMobileMenu;
window.closeMobileMenu = closeMobileMenu;
window.renderCatalog = renderCatalog;
