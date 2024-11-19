// Verifica autenticação e permissões
const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
if (!loggedInUser || !loggedInUser.role) {
  alert("You must be logged in to access this page.");
  window.location.href = "login.html";
}

// Recupera o produto para edição
const productId = new URLSearchParams(window.location.search).get("id");
const products = JSON.parse(localStorage.getItem("products")) || [];
const product = products.find((p) => p.id === parseInt(productId, 10));

if (!product) {
  alert("Product not found.");
  window.location.href = "dashboard.html";
}

// Popula o formulário com dados do produto
function populateForm() {
  const fields = [
    "name",
    "shortDescription",
    "longDescription",
    "brand",
    "category",
    "price",
    "discount",
    "stock",
    "enabled",
  ];
  fields.forEach(
    (field) => (document.getElementById(field).value = product[field] || "")
  );

  // Restringe edição para "Sales Manager"
  if (loggedInUser.role === "Sales Manager") {
    fields.forEach((field) => (document.getElementById(field).disabled = true));
  }
}

// Função para salvar alterações
document
  .getElementById("editProductForm")
  .addEventListener("submit", (event) => {
    event.preventDefault();
    const updatedProduct = { ...product };

    const fields = [
      "name",
      "shortDescription",
      "longDescription",
      "brand",
      "category",
      "price",
      "discount",
      "stock",
      "enabled",
    ];
    fields.forEach((field) => {
      if (!document.getElementById(field).disabled) {
        updatedProduct[field] = document.getElementById(field).value;
      }
    });

    const productIndex = products.findIndex((p) => p.id === product.id);
    products[productIndex] = updatedProduct;
    localStorage.setItem("products", JSON.stringify(products));

    alert("Product updated successfully.");
    window.location.href = "dashboard.html";
  });

// Inicializa o formulário
populateForm();

// Evento de cancelamento para voltar ao dashboard
document.getElementById("cancelButton").addEventListener("click", () => {
  window.location.href = "dashboard.html";
});
