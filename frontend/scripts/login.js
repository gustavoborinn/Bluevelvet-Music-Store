// login.js
// Cria uma conta de administrador padrão, se não existir
const adminAccount = {
  name: "Admin User",
  email: "admin@admin.com",
  password: "admin123",
  role: "Administrator",
};

const users = JSON.parse(localStorage.getItem("users")) || [];
const adminExists = users.some((user) => user.email === adminAccount.email);

if (!adminExists) {
  users.push(adminAccount);
  localStorage.setItem("users", JSON.stringify(users));
  console.log("Admin account created:", adminAccount.email);
}

document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault(); // Evita recarregar a página

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;

  // Recupera os usuários do LocalStorage
  const users = JSON.parse(localStorage.getItem("users")) || [];

  // Verifica se as credenciais são válidas
  const user = users.find(
    (user) => user.email === email && user.password === password
  );

  // Adiciona o usuário logado ao localStorage
  if (user) {
    // Salva o usuário autenticado como JSON no localStorage
    localStorage.setItem("loggedInUser", JSON.stringify(user));

    alert(`Bem-vindo, ${user.email} (${user.role})!`);
    window.location.href = "dashboard.html"; // Redireciona para o painel
  } else {
    document.getElementById("error-message").textContent =
      "Incorrect email or password. Please try again.";
    document.getElementById("error-message").style.display = "block";
  }
});
