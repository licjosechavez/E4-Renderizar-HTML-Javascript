//Elementos HTML
const menu = document.querySelector(".hamburger");
const buscador = document.querySelector("#buscador");
const catalogoNames = document.querySelector(".catalogo__pizzasNames");
const searchBTN = document.querySelector(".lupaicon");
const result = document.querySelector(".result");

console.log(buscador);
///----------------------------------------------------------------
//Menu
function toggleMenu(event) {
  this.classList.toggle("is-active");
  document.querySelector(".menuppal").classList.toggle("is_active");
  event.preventDefault();
}
menu.addEventListener("click", toggleMenu, false);
///----------------------------------------------------------------
//Array pizzas
let pizzas = [
  {
    id: 1,
    nombre: "Napolitana",
    ingredientes: [
      "salsa de tomate",
      "muzzarella",
      "tomate",
      "ajo",
      "aceitunas verdes",
    ],
    precio: 1200,
    img: "../assets/img/napolitana.jpg",
  },
  {
    id: 2,
    nombre: "Margarita",
    ingredientes: [
      "salsa de tomate",
      "muzzarella",
      "anana",
      "aceitunas negras",
    ],
    precio: 1300,
    img: "../assets/img/muzza.jpg",
  },
  {
    id: 3,
    nombre: "Muzzarella",
    ingredientes: ["salsa de tomate", "muzzarella", "aceitunas verdes"],
    precio: 500,
    img: "../assets/img/morrones.jpg",
  },
  {
    id: 4,
    nombre: "Morrones",
    ingredientes: ["salsa de tomate", "muzzarella", "morrones", "ajo"],
    precio: 1200,
    img: "../assets/img/morrones.jpg",
  },
  {
    id: 5,
    nombre: "Cuatro Quesos",
    ingredientes: [
      "salsa de tomate",
      "muzzarella",
      "provolone",
      "parmesano",
      "fontina",
    ],
    precio: 1400,
    img: "../assets/img/cuatroquesos.jpg",
  },
  {
    id: 6,
    nombre: "Fugazzeta",
    ingredientes: [
      "salsa de tomate",
      "muzzarella",
      "cebolla",
      "aceitunas verdes",
    ],
    precio: 1200,
    img: "../assets/img/fugazeta.jpg",
  },
];
///----------------------------------------------------------------
//Carga y descarga base de datos
let baseDeDatos = [];
function sendLocal() {
  localStorage.setItem("baseDeDatos", JSON.stringify(pizzas));
}
sendLocal();
function localStorageAct() {
  if (localStorage.getItem(`baseDeDatos`)) {
    baseDeDatos = JSON.parse(localStorage.getItem(`baseDeDatos`));
  }
}
localStorageAct();
///----------------------------------------------------------------
//Recorro la base de datos, y pinto en el HTML los nombres de las pizzas cargadas
function pintarNombres() {
  baseDeDatos.forEach((pizza) => {
    const p = document.createElement("p");
    p.classList.add("pizzaName");
    p.innerHTML = `${pizza.nombre}`;
    catalogoNames.appendChild(p);
  });
}
pintarNombres();
///----------------------------------------------------------------
//Buscador de pizzas y pinto el contenido buscado

function showError(error) {
  const msgError = document.createElement("p");
  msgError.textContent = error;
  msgError.classList.add("errores");
  result.appendChild(msgError);
  setTimeout(() => {
    msgError.remove();
  }, 2000);
}

function buscarPizza(e) {
  e.preventDefault();
  const pizzaName = buscador.value;
  if (pizzaName === "") {
    showError("Por favor ingresa el nombre de la pizza");
    return;
  }
  createHTML();
  buscador.value = "";
}

function createHTML() {
  result.innerHTML = "";
  const valor = buscador.value;
  if (baseDeDatos.some((pizza) => pizza.nombre === valor)) {
    baseDeDatos.forEach((pizza) => {
      if (pizza.nombre === buscador.value) {
        const div = document.createElement("div");
        div.classList.add("pizzaBox");
        result.appendChild(div);
        div.innerHTML = ` <h3 class="nombre">${pizza.nombre} </h3>
        <span class="cerrar" id="cerrar" data-id="${pizza.id}">X</span>
        <p class="ingredientes">
          Ingredientes: ${pizza.ingredientes}
        </p>
        <div class="priceIMG">
          <img
            class="fotoPizza"
            src="${pizza.img}"
            alt="fotoPizza"
          />
          <h3 class="precio">$${pizza.precio} </h3>
        </div>`;
        const cerrarBTN = document.querySelector("#cerrar");
        cerrarBTN.addEventListener("click", () => {
          result.innerHTML = "";
        });
      } else {
        return;
      }
    });
  } else {
    showError("No hay ninguna pizza con ese nombre");
    return;
  }
}
searchBTN.addEventListener("click", buscarPizza);