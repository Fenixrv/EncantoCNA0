// ============================================================
// filters.js — Búsqueda, filtros y ordenamiento
// ============================================================

const filterState = {
  type: "all",       // all | cookies-grandes | mini-cookies
  flavor: "all",      // all | chocolate | oreo | red-velvet | green-velvet | otros
  sort: "default",   // default | price-asc | price-desc | popular | featured | new
  search: "",
  favoritesOnly: false
};

function setFilterType(type) {
  filterState.type = type;
  document.querySelectorAll("[data-filter-type]").forEach(btn => {
    btn.classList.toggle("active", btn.getAttribute("data-filter-type") === type);
  });
  renderCatalog();
}

function setFilterFlavor(flavor) {
  filterState.flavor = flavor;
  document.querySelectorAll("[data-filter-flavor]").forEach(btn => {
    btn.classList.toggle("active", btn.getAttribute("data-filter-flavor") === flavor);
  });
  renderCatalog();
}

function setSort(sort) {
  filterState.sort = sort;
  renderCatalog();
}

function setSearch(query) {
  filterState.search = query.toLowerCase().trim();
  renderCatalog();
}

function toggleFavoritesOnly() {
  filterState.favoritesOnly = !filterState.favoritesOnly;
  const btn = document.getElementById("fav-filter-btn");
  if (btn) {
    btn.classList.toggle("active", filterState.favoritesOnly);
  }
  renderCatalog();
}

function getFilteredProducts() {
  let result = [...products];

  // Filtro de tipo
  if (filterState.type !== "all") {
    result = result.filter(p => p.category === filterState.type);
  }

  // Filtro de sabor
  if (filterState.flavor !== "all") {
    result = result.filter(p => p.flavor === filterState.flavor);
  }

  // Filtro de favoritos
  if (filterState.favoritesOnly) {
    const favs = getFavorites();
    result = result.filter(p => favs.includes(p.id));
  }

  // Búsqueda
  if (filterState.search) {
    const q = filterState.search;
    result = result.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.flavor.toLowerCase().includes(q)
    );
  }

  // Ordenamiento
  switch (filterState.sort) {
    case "price-asc":
      result.sort((a, b) => (a.price || 0) - (b.price || 0));
      break;
    case "price-desc":
      result.sort((a, b) => (b.price || 0) - (a.price || 0));
      break;
    case "popular":
      result.sort((a, b) => (b.popular ? 1 : 0) - (a.popular ? 1 : 0));
      break;
    case "featured":
      result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
      break;
    case "new":
      result.sort((a, b) => (b.new ? 1 : 0) - (a.new ? 1 : 0));
      break;
  }

  return result;
}

window.filterState = filterState;
window.setFilterType = setFilterType;
window.setFilterFlavor = setFilterFlavor;
window.setSort = setSort;
window.setSearch = setSearch;
window.toggleFavoritesOnly = toggleFavoritesOnly;
window.getFilteredProducts = getFilteredProducts;
