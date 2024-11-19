// Exibe os detalhes do produto
const productId = new URLSearchParams(window.location.search).get("id");
const products = JSON.parse(localStorage.getItem("products")) || [];
const product = products.find((p) => p.id === parseInt(productId, 10));

if (!product) {
  alert("Product not found.");
  window.location.href = "dashboard.html";
} else {
  document.getElementById("productName").textContent = product.name;
  document.getElementById("shortDescription").textContent =
    product.shortDescription || "No short description available.";
  document.getElementById("longDescription").textContent =
    product.longDescription || "No detailed description available.";
  document.getElementById("brand").textContent = product.brand || "Unknown";
  document.getElementById("category").textContent =
    product.category || "Uncategorized";
  document.getElementById("price").textContent = `$${product.price || 0}`;
  document.getElementById("discount").textContent = `${product.discount || 0}%`;
  document.getElementById("stock").textContent =
    product.stock || "Not specified";
  document.getElementById("enabled").textContent = product.enabled
    ? "Yes"
    : "No";
}

document.getElementById("backToDashboard").addEventListener("click", () => {
  window.location.href = "dashboard.html";
});
