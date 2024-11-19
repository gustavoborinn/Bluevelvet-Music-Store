// Produtos iniciais
const initialProducts = [
  {
    id: 1,
    name: "Head On Tour 1989",
    brand: "SonicEcho Merch",
    category: "Posters",
    image: "../images/our-band-could-be-your-life-book.jpeg",
  },
  {
    id: 2,
    name: "Psychocandy Artwork",
    brand: "RetroVibe Prints",
    category: "Collectibles",
    image: "../images/indie-101-book.jpg",
  },
  {
    id: 3,
    name: "Darklands Limited Edition",
    brand: "BlueVelvet Artworks",
    category: "Music Merchandise",
    image: "../images/jamc-poster.png",
  },
];

let loggedInUser = null;

// Autenticação do usuário
const loggedInUserRaw = localStorage.getItem("loggedInUser");
if (!loggedInUserRaw) {
  alert("You must be logged in to access the dashboard.");
  window.location.href = "login.html";
} else {
  try {
    loggedInUser = JSON.parse(loggedInUserRaw);
    if (!loggedInUser || !loggedInUser.email) throw new Error();
    document.getElementById(
      "welcome-message"
    ).textContent = `Welcome, ${loggedInUser.email}, ${loggedInUser.role}`;
  } catch (error) {
    alert("Session error. Please log in again.");
    window.location.href = "login.html";
  }
}

// Configurações de paginação
let currentPage = 1;
const itemsPerPage = 5;

// Inicializa produtos no localStorage
if (!localStorage.getItem("products")) {
  localStorage.setItem("products", JSON.stringify(initialProducts));
}

// Função para renderizar produtos na tabela
function renderProducts() {
  const productList = document.getElementById("product-list");
  const products = JSON.parse(localStorage.getItem("products")) || [];
  const search = document.getElementById("search-bar").value.toLowerCase();

  // Filtra e pagina os produtos
  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(search) ||
      product.brand.toLowerCase().includes(search) ||
      product.category.toLowerCase().includes(search)
  );
  const start = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = filteredProducts.slice(start, start + itemsPerPage);

  // Atualiza a tabela de produtos
  productList.innerHTML = paginatedProducts
    .map(
      (product) => `
          <tr>
            <td>${product.id}</td>
            <td><img src="${product.image}" alt="${product.name}" style="width: 50px; height: 50px;"/></td>
            <td>${product.name}</td>
            <td>${product.brand}</td>
            <td>${product.category}</td>
            <td>
              <button onclick="viewProduct(${product.id})">View</button>
              <button onclick="editProduct(${product.id})">Edit</button>
              <button onclick="deleteProduct(${product.id})">Delete</button>
            </td>
          </tr>`
    )
    .join("");
  document.getElementById("current-page").textContent = `Page ${currentPage}`;
}

// Controle de paginação
document.getElementById("prev-page").addEventListener("click", () => {
  if (currentPage > 1) currentPage--;
  renderProducts();
});

document.getElementById("next-page").addEventListener("click", () => {
  const products = JSON.parse(localStorage.getItem("products")) || [];
  if (currentPage * itemsPerPage < products.length) currentPage++;
  renderProducts();
});

// Pesquisa
document.getElementById("search-bar").addEventListener("input", renderProducts);

// Logout
document.getElementById("logout-button").addEventListener("click", () => {
  localStorage.removeItem("loggedInUser");
  window.location.href = "login.html";
});

// Verifica o usuário logado e configura o acesso ao botão de registro
const registerButton = document.getElementById("register-user");

if (loggedInUser && loggedInUser.role === "Administrator") {
  registerButton.style.display = "inline-block"; // Exibe o botão para administradores
  registerButton.addEventListener("click", () => {
    window.location.href = "register.html"; // Redireciona para a página de registro
  });
} else {
  registerButton.style.display = "none"; // Esconde o botão para não administradores
}

// Reset dos produtos
document.getElementById("reset-products").addEventListener("click", () => {
  localStorage.setItem("products", JSON.stringify(initialProducts));
  renderProducts();
});

// Funções de ação dos produtos
function viewProduct(id) {
  window.location.href = `view-product.html?id=${id}`;
}

function editProduct(id) {
  window.location.href = `edit-product.html?id=${id}`;
}

function deleteProduct(id) {
  if (
    !loggedInUser ||
    (loggedInUser.role !== "Administrator" && loggedInUser.role !== "Editor")
  ) {
    alert("Only admins or editors can delete products.");
    return;
  }

  const products = JSON.parse(localStorage.getItem("products"));
  const updatedProducts = products.filter((product) => product.id !== id);
  localStorage.setItem("products", JSON.stringify(updatedProducts));
  renderProducts();
}

document.getElementById("create-product").addEventListener("click", () => {
  window.location.href = "create-product.html";
});

// Inicializa a visualização de produtos
renderProducts();
