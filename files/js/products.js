// ============================================================
// products.js — Sistema centralizado de productos de Encanto
// ============================================================
// Todos los productos están centralizados aquí.
// Para agregar un nuevo producto, copia un objeto y modifícalo.
// Para cambiar una imagen, coloca el archivo en images/ con el
// nombre correspondiente y actualiza la propiedad "image".
// ============================================================

const products = [
  {
    id: 1,
    name: "Choco Chips",
    category: "cookies-grandes",
    size: "large",
    price: 3.00,
    // IMAGEN DEL PRODUCTO: Choco Chips
    // ARCHIVO: images/choco-chips.jpg
    // CONTENIDO: Fotografía de la New York Cookie de Choco Chips
    image: "images/choco-chips.jpg",
    description: "New York Cookie clásica con abundantes choco chips. Suave por dentro, dorada por fuera.",
    flavor: "chocolate",
    tags: ["🔥 Más vendido"],
    featured: false,
    special: false,
    popular: true,
    new: false
  },
  {
    id: 2,
    name: "Doble Choco",
    category: "cookies-grandes",
    size: "large",
    price: 3.30,
    // IMAGEN DEL PRODUCTO: Doble Choco
    // ARCHIVO: images/doble-choco.jpg
    // CONTENIDO: Fotografía de la New York Cookie Doble Choco
    image: "images/doble-choco.jpg",
    description: "Doble porción de chocolate para los amantes del sabor más intenso. Una cookie que derrite.",
    flavor: "chocolate",
    tags: ["⭐ Favorito", "🌟 Recomendado"],
    featured: true,
    special: true,
    popular: true,
    new: false
  },
  {
    id: 3,
    name: "Oreo",
    category: "cookies-grandes",
    size: "large",
    price: 3.30,
    // IMAGEN DEL PRODUCTO: Oreo
    // ARCHIVO: images/oreo.jpg
    // CONTENIDO: Fotografía de la New York Cookie de Oreo
    image: "images/oreo.jpg",
    description: "New York Cookie con trozos de galleta Oreo y crema. El clásico reencarnado en cookie.",
    flavor: "oreo",
    tags: ["⭐ Favorito", "🔥 Más vendido"],
    featured: true,
    special: false,
    popular: true,
    new: false
  },
  {
    id: 4,
    name: "Dúo",
    category: "cookies-grandes",
    size: "large",
    price: 3.00,
    // IMAGEN DEL PRODUCTO: Dúo
    // ARCHIVO: images/duo.jpg
    // CONTENIDO: Fotografía de la New York Cookie Dúo (mitad chocolate, mitad vainilla)
    image: "images/duo.jpg",
    description: "Mitad chocolate, mitad vainilla. Dos sabores en una sola cookie. ¿Por qué elegir?",
    flavor: "otros",
    tags: ["⭐ Favorito", "💚 Especial Encanto"],
    featured: true,
    special: true,
    popular: true,
    new: false
  },
  {
    id: 5,
    name: "Choco-Peanut",
    category: "cookies-grandes",
    size: "large",
    price: 3.00,
    // IMAGEN DEL PRODUCTO: Choco-Peanut
    // ARCHIVO: images/choco-peanut.jpg
    // CONTENIDO: Fotografía de la New York Cookie Choco-Peanut
    image: "images/choco-peanut.jpg",
    description: "Chocolate y maní en perfecta armonía. Crujiente, intensa y completamente irresistible.",
    flavor: "chocolate",
    tags: ["⭐ Favorito", "🌟 Recomendado"],
    featured: true,
    special: true,
    popular: false,
    new: false
  },
  {
    id: 6,
    name: "Smores",
    category: "cookies-grandes",
    size: "large",
    price: 2.50,
    // IMAGEN DEL PRODUCTO: Smores
    // ARCHIVO: images/smores.jpg
    // CONTENIDO: Fotografía de la New York Cookie Smores
    image: "images/smores.jpg",
    description: "Galleta, malvavisco y chocolate derretido. El sabor del campamento en cada mordida.",
    flavor: "otros",
    tags: ["✨ Nuevo", "🎁 Ideal para regalar"],
    featured: false,
    special: true,
    popular: false,
    new: true
  },
  {
    id: 7,
    name: "Red Velvet",
    category: "cookies-grandes",
    size: "large",
    price: 3.50,
    // IMAGEN DEL PRODUCTO: Red Velvet
    // ARCHIVO: images/red-velvet.jpg
    // CONTENIDO: Fotografía de la New York Cookie Red Velvet
    image: "images/red-velvet.jpg",
    description: "Red Velvet con chips de chocolate blanco. Suave, intensa y con ese toque rojo que enamora.",
    flavor: "red-velvet",
    tags: ["⭐ Favorito", "🎁 Ideal para regalar"],
    featured: true,
    special: true,
    popular: true,
    new: false
  },
  
  {
    id: 8,
    name: "Paquete de 5 Mini Cookies",
    category: "mini-cookies",
    size: "small",
    price: 1.00,
    // IMAGEN DEL PRODUCTO: Paquete de 5 Mini Cookies
    // ARCHIVO: images/mini-cookies-5.jpg
    // CONTENIDO: Fotografía del paquete de 5 mini cookies
    image: "images/mini-cookies-5.jpg",
    description: "Cinco mini cookies perfectas para un antojito rápido. Variedades: White & Dark, Choco Chips, Red Velvet.",
    flavor: "otros",
    tags: ["🔥 Más vendido"],
    featured: false,
    special: false,
    popular: true,
    new: false
  },
  
  {
    id: 9,
    name: "Paquete 5 Mini Cookies de chocolate",
    category: "mini-cookies",
    size: "small",
    price: 1.00,
    // IMAGEN DEL PRODUCTO: Bandeja de 25 Mini Cookies con dip
    // ARCHIVO: images/mini-cookies-25.jpg
    // CONTENIDO: Fotografía de la bandeja de 25 mini cookies con dip de chocolate
    image: "images/mini-chips.jpg",
    description: "Mini Cookies de vainilla con chips de chocolate negro. La versión encantadora y clasica..",
    flavor: "chocolate",
    tags: ["🎁 Ideal para regalar", "🌟 Recomendado"],
    featured: false,
    special: false,
    popular: false,
    new: false
  },
  
  {
    id: 10,
    name: "Paquete 5 Mini Cookies de Red velvet",
    category: "mini-cookies",
    size: "large",
    price: 1.00,
    // IMAGEN DEL PRODUCTO: Green Velvet
    // ARCHIVO: images/green-velvet.jpg
    // CONTENIDO: Fotografía de la New York Cookie Green Velvet
    image: "images/mini-red.jpg",
    description: "Red Velvet con chips de chocolate blanco. La versión favorita de muchos.",
    flavor: "green-velvet",
    tags: ["✨ Nuevo", "💚 Especial Encanto"],
    featured: false,
    special: false,
    popular: false,
    new: true
  },
  {
    id: 11,
    name: "Paquete 5 Mini Cookies de Green Velvet",
    category: "mini-cookies",
    size: "small",
    price: 1.00,
    // IMAGEN DEL PRODUCTO: Bandeja de 25 Mini Cookies con dip
    // ARCHIVO: images/mini-cookies-25.jpg
    // CONTENIDO: Fotografía de la bandeja de 25 mini cookies con dip de chocolate
    image: "images/green-velvet.jpg",
    description: "La version atrevida y unica te tus galletas Red Velvet favoritas",
    flavor: "chocolate",
    tags: ["🎁 Ideal para regalar", "🌟 Recomendado"],
    featured: false,
    special: false,
    popular: false,
    new: true,
    },
    {
    id: 12,
    name: "Paquete 5 Mini Cookies de Chocolate y Más Chocolate",
    category: "mini-cookies",
    size: "small",
    price: 1.00,
    // IMAGEN DEL PRODUCTO: Bandeja de 25 Mini Cookies con dip
    // ARCHIVO: images/mini-cookies-25.jpg
    // CONTENIDO: Fotografía de la bandeja de 25 mini cookies con dip de chocolate
    image: "images/mini-dark.jpg",
    description: "Mini Cookies con más chocolate que antes y chips de chotolate blanco",
    flavor: "chocolate",
    tags: ["🎁 Ideal para regalar", "🌟 Recomendado"],
    featured: false,
    special: false,
    popular: false,
    new: false
    },
    {
    id: 13,
    name: "Bandeja de 25 Mini Cookies con dip de chocolate",
    category: "mini-cookies",
    size: "small",
    price: 5.00,
    // IMAGEN DEL PRODUCTO: Bandeja de 25 Mini Cookies con dip
    // ARCHIVO: images/mini-cookies-25.jpg
    // CONTENIDO: Fotografía de la bandeja de 25 mini cookies con dip de chocolate
    image: "images/mini-cookies-25.png",
    description: "25 mini cookies con dip de chocolate incluido. Perfectas para compartir en cualquier reunión.",
    flavor: "chocolate",
    tags: ["🎁 Ideal para regalar", "🌟 Recomendado"],
    featured: false,
    special: false,
    popular: false,
    new: false
  },

];

// Variedades de mini cookies (para mostrar en la sección de Mini Cookies)
const miniCookieVarieties = [
  "White & Dark",
  "Choco Chips",
  "Red Velvet"
];

// Productos destacados (se generan desde el array principal con featured: true)
function getFeaturedProducts() {
  return products.filter(p => p.featured);
}

// Productos especiales (se generan desde el array principal con special: true)
function getSpecialProducts() {
  return products.filter(p => p.special);
}

// Productos de ofertas (se generan desde el array principal)
function getOfferProducts() {
  return products.filter(p => p.category === "mini-cookies");
}

// Eventos especiales (estructura preparada para agregar eventos posteriormente)
// Para activar un evento, cambia "active" a true y completa los datos.
const specialEvents = [
  // {
  //   id: 1,
  //   title: "Flores Amarillas",
  //   date: "2026-09-21",
  //   theme: "yellow",
  //   image: "images/event-flores-amarillas.jpg",
  //   description: "Regala un pequeño Encanto lleno de alegría.",
  //   active: true
  // }
];

// Combos de Encanto (estructura preparada para agregar combos posteriormente)
const combos = [
  // {
  //   id: 1,
  //   name: "Combo Dúo + Mini Cookies",
  //   products: [4, 9],
  //   price: 3.80,
  //   description: "Una cookie Dúo + un paquete de 5 mini cookies."
  // }
];

window.products = products;
window.miniCookieVarieties = miniCookieVarieties;
window.specialEvents = specialEvents;
window.combos = combos;
window.getFeaturedProducts = getFeaturedProducts;
window.getSpecialProducts = getSpecialProducts;
window.getOfferProducts = getOfferProducts;
