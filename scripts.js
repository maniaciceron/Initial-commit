document.addEventListener("DOMContentLoaded", () => {
  /* --------- CARRUSEL --------- */
  const slides = document.querySelectorAll(".slide");
  const prevBtn = document.querySelector(".prev");
  const nextBtn = document.querySelector(".next");
  let currentIndex = 0;

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.toggle("active", i === index);
    });
  }

  function nextSlide() {
    currentIndex = (currentIndex + 1) % slides.length;
    showSlide(currentIndex);
  }

  showSlide(currentIndex);
  setInterval(nextSlide, 3000);

  if (prevBtn && nextBtn) {
    prevBtn.addEventListener("click", () => {
      currentIndex = (currentIndex - 1 + slides.length) % slides.length;
      showSlide(currentIndex);
    });

    nextBtn.addEventListener("click", () => {
      nextSlide();
    });
  }

  /* --------- PRODUCTOS Y CARRITO --------- */
  const productos = [
    { nombre: "Almohada Personalizada", precio: 20, imagen: "img/alm1.jpg" },
    { nombre: "Almohada Corazón", precio: 18, imagen: "img/alm2.jpg" },
    { nombre: "Almohada con Foto", precio: 22, imagen: "img/alm3.jpg" }
  ];

  const catalogo = document.getElementById("catalogo");
  const lista = document.getElementById("listaCarrito");
  const iconoCarrito = document.getElementById("iconoCarrito");
  const contador = document.getElementById("contador");
  const menuToggle = document.getElementById("menuToggle");
  const listaMenu = document.querySelector("nav.menu-principal ul");

  let carrito = [];

  productos.forEach(p => {
    const card = document.createElement("div");
    card.className = "producto";
    card.innerHTML = `
      <img src="${p.imagen}" alt="${p.nombre}">
      <h3>${p.nombre}</h3>
      <p>$${p.precio.toFixed(2)}</p>
      <button class="agregar-carrito">Añadir a la bolsa</button>
    `;
    catalogo.appendChild(card);

    card.querySelector(".agregar-carrito").addEventListener("click", () => {
      agregarAlCarrito(p.nombre, p.precio);
    });
  });

  function agregarAlCarrito(nombre, precio) {
    carrito.push({ nombre, precio });
    actualizarCarrito();
    alert(`Agregaste "${nombre}" al carrito por $${precio.toFixed(2)}.`);
  }

  function actualizarCarrito() {
    lista.innerHTML = "";
    contador.textContent = carrito.length;

    carrito.forEach((item, index) => {
      const div = document.createElement("div");
      div.className = "item-carrito";
      div.innerHTML = `
        <span>${item.nombre} - $${item.precio.toFixed(2)}</span>
        <button onclick="eliminarItem(${index})">❌</button>
      `;
      lista.appendChild(div);
    });

    if (carrito.length) {
      const btnVaciar = document.createElement("button");
      btnVaciar.className = "boton-vaciar";
      btnVaciar.textContent = "Vaciar carrito 🗑️";
      btnVaciar.onclick = vaciarCarrito;
      lista.appendChild(btnVaciar);

      const btnResumen = document.createElement("button");
      btnResumen.className = "boton-resumen";
      btnResumen.textContent = "Resumen de compra 🧾";
      btnResumen.onclick = mostrarResumen;
      lista.appendChild(btnResumen);
    }
  }

  window.eliminarItem = function(index) {
    carrito.splice(index, 1);
    actualizarCarrito();
  };

  function vaciarCarrito() {
    carrito = [];
    actualizarCarrito();
  }

  function mostrarResumen() {
    const total = carrito.reduce((s, p) => s + p.precio, 0);
    let resumen = "Resumen de compra:\n\n";
    carrito.forEach(p => {
      resumen += `• ${p.nombre} - $${p.precio.toFixed(2)}\n`;
    });
    resumen += `\nTOTAL: $${total.toFixed(2)}`;
    alert(resumen);
  }

  /* --------- Mostrar/Ocultar Carrito --------- */
  iconoCarrito.addEventListener("click", () => {
    lista.classList.toggle("visible");
  });

  /* --------- Menú móvil --------- */
  menuToggle.addEventListener("click", () => {
    listaMenu.classList.toggle("show");
  });

  /* --------- Submenús --------- */
  document.querySelectorAll(".submenu > a").forEach(enlace => {
    enlace.addEventListener("click", e => {
      e.preventDefault();
      enlace.parentElement.classList.toggle("open");
    });
  });

  document.addEventListener("click", e => {
    document.querySelectorAll(".submenu.open").forEach(li => {
      if (!li.contains(e.target)) li.classList.remove("open");
    });
  });
});







let carrito = [];
let total = 0;

function agregarAlCarrito(nombre, precio) {
  carrito.push({ nombre, precio });
  total += precio;
  actualizarCarrito();
}

function actualizarCarrito() {
  const lista = document.getElementById("lista-carrito");
  const totalTexto = document.getElementById("total");

  // Limpiar el carrito actual
  lista.innerHTML = "";

  // Mostrar productos
  carrito.forEach(producto => {
    const item = document.createElement("li");
    item.textContent = `${producto.nombre} - $${producto.precio}`;
    lista.appendChild(item);
  });

  // Actualizar total
  totalTexto.textContent = `Total: $${total}`;
}









function agregarAlCarrito(nombre, precio) {
  carrito.push({ nombre, precio });
  total += precio;
  actualizarCarrito();
}

function eliminarDelCarrito(index) {
  total -= carrito[index].precio;
  carrito.splice(index, 1);
  actualizarCarrito();
}

function actualizarCarrito() {
  const lista = document.getElementById("lista-carrito");
  const totalTexto = document.getElementById("total");

  // Limpiar lista actual
  lista.innerHTML = "";

  // Mostrar productos del carrito
  carrito.forEach((producto, index) => {
    const item = document.createElement("li");
    item.textContent = `${producto.nombre} - $${producto.precio} `;

    // Botón de eliminar
    const botonEliminar = document.createElement("button");
    botonEliminar.textContent = "❌";
    botonEliminar.className = "eliminar";
    botonEliminar.onclick = () => eliminarDelCarrito(index);

    item.appendChild(botonEliminar);
    lista.appendChild(item);
  });

  // Actualizar total
  totalTexto.textContent = `Total: $${total}`;
}












const listaCarrito = document.getElementById('lista-carrito');
const totalCarrito = document.getElementById('total');
const contadorCarrito = document.getElementById('contador-carrito');



function agregarAlCarrito(nombre, precio) {
  const productoExistente = carrito.find(item => item.nombre === nombre);
  if (productoExistente) {
    productoExistente.cantidad++;
  } else {
    carrito.push({ nombre, precio, cantidad: 1 });
  }
  actualizarCarrito();
}

function eliminarDelCarrito(nombre) {
  carrito = carrito.filter(item => item.nombre !== nombre);
  actualizarCarrito();
}

function actualizarCarrito() {
  listaCarrito.innerHTML = '';
  let total = 0;
  let cantidadTotal = 0;
  carrito.forEach(item => {
    total += item.precio * item.cantidad;
    cantidadTotal += item.cantidad;

    const li = document.createElement('li');
    li.textContent = `${item.nombre} x${item.cantidad} - $${item.precio * item.cantidad}`;

    const btnEliminar = document.createElement('button');
    btnEliminar.textContent = 'X';
    btnEliminar.classList.add('eliminar');
    btnEliminar.onclick = () => eliminarDelCarrito(item.nombre);

    li.appendChild(btnEliminar);
    listaCarrito.appendChild(li);
  });
  totalCarrito.textContent = `Total: $${total}`;
  contadorCarrito.textContent = cantidadTotal;
}










document.addEventListener("DOMContentLoaded", () => {
  /* --------- CARRUSEL --------- */
  const slides = document.querySelectorAll(".slide");
  const prevBtn = document.querySelector(".prev");
  const nextBtn = document.querySelector(".next");
  let currentIndex = 0;

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.toggle("active", i === index);
    });
  }

  function nextSlide() {
    currentIndex = (currentIndex + 1) % slides.length;
    showSlide(currentIndex);
  }

  showSlide(currentIndex);
  setInterval(nextSlide, 3000);

  if (prevBtn && nextBtn) {
    prevBtn.addEventListener("click", () => {
      currentIndex = (currentIndex - 1 + slides.length) % slides.length;
      showSlide(currentIndex);
    });

    nextBtn.addEventListener("click", () => {
      nextSlide();
    });
  }

  /* --------- PRODUCTOS Y CARRITO --------- */
  const productos = [
    { nombre: "Almohada Personalizada", precio: 20, imagen: "img/alm1.jpg" },
    { nombre: "Almohada Corazón", precio: 18, imagen: "img/alm2.jpg" },
    { nombre: "Almohada con Foto", precio: 22, imagen: "img/alm3.jpg" }
  ];

  const catalogo = document.getElementById("catalogo");
  const listaCarrito = document.getElementById("lista-carrito");
  const iconoCarrito = document.getElementById("iconoCarrito");
  const contadorCarrito = document.getElementById("contador-carrito");
  const totalCarrito = document.getElementById("total");
  const carritoContainer = document.querySelector(".carrito");

  let carrito = [];

  function actualizarCarrito() {
    listaCarrito.innerHTML = "";
    let total = 0;
    let cantidadTotal = 0;

    carrito.forEach((item, index) => {
      total += item.precio * item.cantidad;
      cantidadTotal += item.cantidad;

      const li = document.createElement("li");
      li.textContent = `${item.nombre} x${item.cantidad} - $${(item.precio * item.cantidad).toFixed(2)} `;

      const btnEliminar = document.createElement("button");
      btnEliminar.textContent = "❌";
      btnEliminar.className = "eliminar";
      btnEliminar.onclick = () => {
        carrito.splice(index, 1);
        actualizarCarrito();
      };

      li.appendChild(btnEliminar);
      listaCarrito.appendChild(li);
    });

    totalCarrito.textContent = `Total: $${total.toFixed(2)}`;
    contadorCarrito.textContent = cantidadTotal;

    // Mostrar u ocultar carrito si está vacío
    carritoContainer.style.display = carrito.length > 0 ? "block" : "none";
  }

  productos.forEach(p => {
    const card = document.createElement("div");
    card.className = "card producto";
    card.innerHTML = `
      <img src="${p.imagen}" alt="${p.nombre}">
      <h3>${p.nombre}</h3>
      <p>$${p.precio.toFixed(2)}</p>
      <button class="agregar-carrito">Añadir a la bolsa</button>
    `;
    catalogo.appendChild(card);

    card.querySelector(".agregar-carrito").addEventListener("click", () => {
      const productoExistente = carrito.find(item => item.nombre === p.nombre);
      if (productoExistente) {
        productoExistente.cantidad++;
      } else {
        carrito.push({ nombre: p.nombre, precio: p.precio, cantidad: 1 });
      }
      actualizarCarrito();
      alert(`Agregaste "${p.nombre}" al carrito por $${p.precio.toFixed(2)}.`);
    });
  });

  iconoCarrito.addEventListener("click", () => {
    carritoContainer.classList.toggle("visible");
  });

  // Opcional: Agregar botones vaciar carrito y resumen de compra

  const btnVaciar = document.createElement("button");
  btnVaciar.textContent = "Vaciar carrito 🗑️";
  btnVaciar.className = "boton-vaciar";
  btnVaciar.onclick = () => {
    carrito = [];
    actualizarCarrito();
  };

  const btnResumen = document.createElement("button");
  btnResumen.textContent = "Resumen de compra 🧾";
  btnResumen.className = "boton-resumen";
  btnResumen.onclick = () => {
    if (carrito.length === 0) {
      alert("El carrito está vacío.");
      return;
    }
    let resumen = "Resumen de compra:\n\n";
    let total = 0;
    carrito.forEach(item => {
      resumen += `• ${item.nombre} x${item.cantidad} - $${(item.precio * item.cantidad).toFixed(2)}\n`;
      total += item.precio * item.cantidad;
    });
    resumen += `\nTOTAL: $${total.toFixed(2)}`;
    alert(resumen);
  };

  carritoContainer.appendChild(btnVaciar);
  carritoContainer.appendChild(btnResumen);

  // Inicializar carrito oculto
  carritoContainer.style.display = "none";
  actualizarCarrito();

});






















// Variables
const btnCarrito = document.getElementById('btnCarrito');

const cerrarCarritoBtn = document.getElementById('cerrar-carrito');
const vaciarCarritoBtn = document.getElementById('vaciar-carrito');

const buscador = document.getElementById('buscador');
const productosContainer = document.getElementById('productos');

let carritoItems = [];

// Mostrar/Ocultar carrito
btnCarrito.addEventListener('click', () => {
    carrito.classList.toggle('activo');
});

cerrarCarritoBtn.addEventListener('click', () => {
    carrito.classList.remove('activo');
});

// Añadir producto al carrito
productosContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('btn-agregar')) {
        const card = e.target.closest('.card-producto');
        const nombre = card.getAttribute('data-nombre');
        const precio = parseFloat(card.getAttribute('data-precio'));
        agregarAlCarrito(nombre, precio);
    }
});

// Función para agregar producto al carrito
function agregarAlCarrito(nombre, precio) {
    const productoExistente = carritoItems.find(item => item.nombre === nombre);
    if (productoExistente) {
        productoExistente.cantidad++;
    } else {
        carritoItems.push({ nombre, precio, cantidad: 1 });
    }
    actualizarCarrito();
}

// Actualizar carrito visualmente
function actualizarCarrito() {
    listaCarrito.innerHTML = '';

    let total = 0;

    
    
    totalCarrito.textContent = total.toFixed(2);
}
// Vaciar carrito
vaciarCarritoBtn.addEventListener('click', () => {
    carritoItems = [];
    actualizarCarrito();
});

// Buscador de productos (filtro simple)
buscador.addEventListener('input', () => {
    const texto = buscador.value.toLowerCase();
    const cards = productosContainer.querySelectorAll('.card-producto');

    cards.forEach(card => {
        const nombre = card.getAttribute('data-nombre').toLowerCase();
        if (nombre.includes(texto)) {
            card.style.display = 'flex';
        } else {
            card.style.display = 'none';
        }
    });
});









// Contenedor de productos y carrito

const totalSpan = document.getElementById('total');
const btnVaciar = document.getElementById('vaciar-carrito');
const btnCerrar = document.getElementById('cerrar-carrito');


let carritoProductos = [];

// Función para renderizar carrito
function renderizarCarrito() {
    listaCarrito.innerHTML = '';
    let total = 0;
    carritoProductos.forEach(({ nombre, precio, cantidad }) => {
        const li = document.createElement('li');

        listaCarrito.appendChild(li);
        total += precio * cantidad;
    });
    totalSpan.textContent = total.toFixed(2);
}

// Añadir producto al carrito
productosContainer.addEventListener('click', e => {
    if (e.target.classList.contains('btn-agregar')) {
        const card = e.target.closest('.card-producto');
        const nombre = card.getAttribute('data-nombre');
        const precioTexto = card.querySelector('p').textContent;
        const precio = Number(precioTexto.replace(/[^\d]/g, ''));

        const productoExistente = carritoProductos.find(p => p.nombre === nombre);
        if (productoExistente) {
            productoExistente.cantidad++;
        } else {
            carritoProductos.push({ nombre, precio, cantidad: 1 });
        }
        renderizarCarrito();
        carrito.classList.remove('carrito-oculto');
    }
});

// Vaciar carrito
btnVaciar.addEventListener('click', () => {
    carritoProductos = [];
    renderizarCarrito();
});

// Cerrar carrito
btnCerrar.addEventListener('click', () => {
    carrito.classList.add('carrito-oculto');
});

// Mostrar carrito al hacer click en el botón
btnCarrito.addEventListener('click', () => {
    carrito.classList.toggle('carrito-oculto');
});












// Selecciona todos los botones "Añadir a la bolsa"
const botonesAgregar = document.querySelectorAll(".agregar-carrito");

// Elemento del contador en el carrito


// Inicializa el conteo
let totalProductos = 0;

// Función para actualizar el número del carrito
function actualizarCarrito() {
    contadorCarrito.textContent = totalProductos;
}

// Evento para cada botón
botonesAgregar.forEach(boton => {
    boton.addEventListener("click", () => {
        totalProductos++;
        actualizarCarrito();
    });
});

// Mostrar/ocultar el carrito (si deseas una funcionalidad futura)
const iconoCarrito = document.querySelector(".carrito-icono");
const contenedorCarrito = document.querySelector(".carrito-contenedor");

if (iconoCarrito && contenedorCarrito) {
    iconoCarrito.addEventListener("click", () => {
        contenedorCarrito.classList.toggle("visible");
    });
}












document.addEventListener("DOMContentLoaded", () => {
  const carrito = document.getElementById("carrito");
  const iconoCarrito = document.querySelector(".carrito-icono");
  const listaCarrito = document.getElementById("lista-carrito");
  const totalElemento = document.getElementById("total");
  const vaciarCarritoBtn = document.getElementById("vaciar-carrito");
  const cerrarCarritoBtn = document.getElementById("cerrar-carrito");
  const contadorCarrito = document.getElementById("contador-carrito");

  let carritoItems = [];

  // Mostrar/Ocultar carrito
  iconoCarrito.addEventListener("click", () => {
    carrito.classList.toggle("carrito-oculto");
  });

  // Cerrar carrito
  cerrarCarritoBtn.addEventListener("click", () => {
    carrito.classList.add("carrito-oculto");
  });

  // Agregar productos al carrito
  document.querySelectorAll(".btn-agregar").forEach((boton) => {
    boton.addEventListener("click", (e) => {
      const card = e.target.closest(".card-producto");
      const nombre = card.querySelector("h3").textContent;
      const precioTexto = card.querySelector("p").textContent;
      const precio = parseFloat(precioTexto.replace("Precio: RD$", "").trim());

      const producto = { nombre, precio };

      carritoItems.push(producto);
      actualizarCarrito();
    });
  });

  // Vaciar el carrito
  vaciarCarritoBtn.addEventListener("click", () => {
    carritoItems = [];
    actualizarCarrito();
  });

  // Función para actualizar la interfaz del carrito
  function actualizarCarrito() {
    listaCarrito.innerHTML = "";
    let total = 0;

    carritoItems.forEach((item, index) => {
      const li = document.createElement("li");
      li.textContent = `${item.nombre} - RD$ ${item.precio}`;
      
      const botonEliminar = document.createElement("button");
      botonEliminar.textContent = "❌";
      botonEliminar.style.marginLeft = "10px";
      botonEliminar.addEventListener("click", () => {
        eliminarDelCarrito(index);
      });

      li.appendChild(botonEliminar);
      listaCarrito.appendChild(li);
      total += item.precio;
    });

    totalElemento.textContent = total.toFixed(2);
    contadorCarrito.textContent = carritoItems.length;
  }

  function eliminarDelCarrito(index) {
    carritoItems.splice(index, 1);
    actualizarCarrito();
  }
});







document.addEventListener("DOMContentLoaded", function () {
  const btnsAgregar = document.querySelectorAll(".btn-agregar");
  const carritoIcono = document.querySelector(".carrito-icono");
  const carrito = document.getElementById("carrito");
  const listaCarrito = document.getElementById("lista-carrito");
  const totalElemento = document.getElementById("total");
  const contadorCarrito = document.getElementById("contador-carrito");
  const btnVaciar = document.getElementById("vaciar-carrito");
  const btnCerrar = document.getElementById("cerrar-carrito");

  let total = 0;
  let contador = 0;

  // Mostrar carrito al hacer clic en el ícono
  carritoIcono.addEventListener("click", () => {
    carrito.classList.toggle("carrito-oculto");
  });

  // Agregar producto
  btnsAgregar.forEach(btn => {
    btn.addEventListener("click", () => {
      const producto = btn.closest(".card-producto");
      const nombre = producto.querySelector("h3").textContent;
      const precioTexto = producto.querySelector("p").textContent;
      const precio = parseFloat(precioTexto.replace("Precio: RD$", "").trim());

      const li = document.createElement("li");
      li.textContent = `${nombre} - RD$ ${precio.toFixed(2)}`;
      const btnEliminar = document.createElement("button");
      btnEliminar.textContent = "Eliminar";
      btnEliminar.classList.add("btn-eliminar");

      btnEliminar.addEventListener("click", () => {
        li.remove();
        total -= precio;
        contador--;
        actualizarCarrito();
      });

      li.appendChild(btnEliminar);
      listaCarrito.appendChild(li);
      total += precio;
      contador++;
      actualizarCarrito();
    });
  });

  // Vaciar carrito
  btnVaciar.addEventListener("click", () => {
    listaCarrito.innerHTML = "";
    total = 0;
    contador = 0;
    actualizarCarrito();
  });

  // Cerrar carrito
  btnCerrar.addEventListener("click", () => {
    carrito.classList.add("carrito-oculto");
  });

  function actualizarCarrito() {
    totalElemento.textContent = total.toFixed(2);
    contadorCarrito.textContent = contador;
  }
});









