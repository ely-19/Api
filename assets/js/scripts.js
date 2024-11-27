// URL de APIs de los productos
const maquillaje = "https://dummyjson.com/products?limit=5";  // API para productos de maquillaje
const perfume = "https://dummyjson.com/products?limit=5&skip=5";  // API para productos de perfumes

// Función que se encarga de mostrar los productos en la página
const mostrarProductos = (productos, containerId, maxMostrar) => {
  const container = document.getElementById(containerId); // Obtenemos donde se mostrarán los productos
  container.innerHTML = ""; // Limpiamos antes de agregar los nuevos productos

  // Seleccionamos los primeros 'maxMostrar' productos para mostrar
  const productosAMostrar = productos.slice(0, maxMostrar);

  // Creamos una tarjeta para cada producto y la agregamos al contenedor
  productosAMostrar.forEach((p) => {
    const card = document.createElement("div");  // Creamos un contenedor para cada producto
    card.className = "col-md-4 mb-4"; 
    card.innerHTML = `  <!-- HTML para mostrar cada producto -->
      <div class="card">
        <img src="${p.thumbnail}" class="card-img-top" alt="${p.title}">
        <div class="card-body">
          <h5 class="card-title">${p.title}</h5>
          <p class="card-text">${p.description}</p>
          <p><i class="fas fa-dollar-sign"></i> ${p.price}</p>
        </div>
      </div>
    `;
    container.appendChild(card); // Añadimos la tarjeta creada al contenedor
  });
};

// Función para alternar entre mostrar y ocultar más productos
const alternarProductos = (productos, containerId, mostrar, maxInicial, botonMostrar, botonOcultar) => {
  if (mostrar) {
    // Si queremos mostrar todos los productos
    mostrarProductos(productos, containerId, productos.length); // Mostramos todos los productos disponibles
    botonMostrar.style.display = "none"; // Ocultamos el botón "Mostrar más"
    botonOcultar.style.display = "inline-block"; // Mostramos el botón "Ocultar"
  } else {
    // Si queremos mostrar solo los primeros 'maxInicial' productos
    mostrarProductos(productos, containerId, maxInicial); // Mostramos solo los primeros productos
    botonMostrar.style.display = "inline-block"; // Mostramos el botón "Mostrar más"
    botonOcultar.style.display = "none"; // Ocultamos el botón "Ocultar"
  }
};

// Función principal que carga los productos desde las APIs
const cargarProductos = async () => {
  try {
    // Solicitamos los productos de maquillaje desde la API
    const maquillaVenta = await fetch(maquillaje);  // Fetch para obtener los productos de maquillaje
    const maquillajeVenta = await maquillaVenta.json();  // Convertimos la respuesta a JSON

    // Solicitamos los productos de perfume desde la API
    const perfumen = await fetch(perfume);  // Fetch para obtener los productos de perfumes
    const perfumes = await perfumen.json();  // Convertimos la respuesta a JSON

    const maxInicial = 3;  // Número máximo de productos que se mostrarán inicialmente

    // Mostramos los primeros productos de cada categoría
    mostrarProductos(maquillajeVenta.products, "maquillajeContainer", maxInicial);
    mostrarProductos(perfumes.products, "perfumesContainer", maxInicial);

    // Obtenemos los botones para mostrar/ocultar productos
    const botonMostrarMaquillaje = document.getElementById("botonMostrarMaquillaje");
    const botonOcultarMaquillaje = document.getElementById("botonOcultarMaquillaje");
    const botonMostrarPerfumes = document.getElementById("botonMostrarPerfumes");
    const botonOcultarPerfumes = document.getElementById("botonOcultarPerfumes");

    // Asignamos las acciones a los botones de "Mostrar más" y "Ocultar"
    botonMostrarMaquillaje.onclick = () => alternarProductos(maquillajeVenta.products, "maquillajeContainer", true, maxInicial, botonMostrarMaquillaje, botonOcultarMaquillaje);
    botonOcultarMaquillaje.onclick = () => alternarProductos(maquillajeVenta.products, "maquillajeContainer", false, maxInicial, botonMostrarMaquillaje, botonOcultarMaquillaje);

    botonMostrarPerfumes.onclick = () => alternarProductos(perfumes.products, "perfumesContainer", true, maxInicial, botonMostrarPerfumes, botonOcultarPerfumes);
    botonOcultarPerfumes.onclick = () => alternarProductos(perfumes.products, "perfumesContainer", false, maxInicial, botonMostrarPerfumes, botonOcultarPerfumes);
  } catch (error) {
    console.error("Error al cargar los productos:", error);  // Si ocurre un error, lo mostramos en consola
  }
};

// Llamamos a la función para cargar los productos al cargar la página
cargarProductos();
