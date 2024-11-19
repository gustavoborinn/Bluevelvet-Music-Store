// Verifica se o usuário atual é um administrador
const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
if (!loggedInUser || loggedInUser.role !== "Administrator") {
  alert("Access denied. Only administrators can register new users.");
  window.location.href = "login.html";
}

// Lida com o registro do novo usuário
document
  .getElementById("registerForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const role = document.getElementById("role").value;
    const errorMessage = document.getElementById("error-message");

    // Validação básica
    if (!name || !email || !password || !role) {
      errorMessage.textContent = "All fields are required.";
      errorMessage.style.display = "block";
      return;
    }

    // Verifica se o email já está registrado
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const userExists = users.some((user) => user.email === email);

    if (userExists) {
      errorMessage.textContent = "This email is already registered.";
      errorMessage.style.display = "block";
      return;
    }

    // Salva o novo usuário
    users.push({ name, email, password, role });
    localStorage.setItem("users", JSON.stringify(users));

    alert("User registered successfully!");
    window.location.href = "dashboard.html"; // Redireciona para a tela inicial (opcional)
  });
