// Função de criação de produto
document.getElementById("createProductForm").addEventListener("submit", (e) => {
  e.preventDefault();

  const fields = [
    "name",
    "shortDescription",
    "longDescription",
    "brand",
    "category",
    "price",
    "discount",
    "inStock",
    "dimensions",
    "weight",
  ];
  const newProduct = { id: Date.now() };
  fields.forEach(
    (field) => (newProduct[field] = document.getElementById(field).value.trim())
  );

  // Validação básica
  if (
    !newProduct.name ||
    !newProduct.brand ||
    !newProduct.category ||
    isNaN(newProduct.price) ||
    isNaN(newProduct.inStock)
  ) {
    alert("Please fill out all required fields.");
    return;
  }

  // Salva o produto no localStorage
  const products = JSON.parse(localStorage.getItem("products")) || [];
  products.push(newProduct);
  localStorage.setItem("products", JSON.stringify(products));

  alert("Product created successfully!");
  window.location.href = "dashboard.html";
});
// Função para cancelar e voltar ao dashboard
document.getElementById("cancel").addEventListener("click", () => {
  window.location.href = "dashboard.html";
});
