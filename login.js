// ===============================
// Credenciales de administradores permitidos
// ===============================
const adminCredentials = [
    { username: 'admin', password: 'password123' },
    { username: 'superuser', password: 'superpass' }
];

// ===============================
// Selección de elementos del DOM
// ===============================
const loginForm = document.querySelector('#loginForm');
const usernameInput = document.querySelector('#username');
const passwordInput = document.querySelector('#pass');
const errorMessage = document.querySelector('#errorMessage');
const eye = document.querySelector(".eye");


// ===============================
// Mostrar/ocultar contraseña
// ===============================
eye.addEventListener("click", () => {
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
    eye.classList.toggle('fa-eye-slash');
    eye.classList.toggle('fa-eye');
});

// ===============================
// Validación y envío del formulario de login
// ===============================
loginForm.addEventListener('submit', (event) => {
    event.preventDefault();

    // Obtener valores de los campos
    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();

    // Validar campos vacíos
    const inputs = document.querySelectorAll('input[type="text"], input[type="password"]');
    let hasError = false;

    inputs.forEach(input => {
        const errorInput = input.nextElementSibling; // Elemento para mostrar el error
        if (input.value.trim() === "") {
            input.classList.add("error");
            errorInput.textContent = "Required field";
            hasError = true;
        } else {
            input.classList.remove("error");
            errorInput.textContent = "";
        }
    });

    // Si no hay errores de validación, comprobar credenciales
    if (!hasError) {
        const isValid = adminCredentials.some(credential =>
            credential.username === username && credential.password === password
        );

        if (isValid) {
            // Guardar estado de login y redirigir
            localStorage.setItem('isLoggedIn', 'true');
            window.location.href = 'gestion.html';
        } else {
            // Mostrar error de credenciales
            errorMessage.textContent = 'Invalid username or password.';
        }
    } else {
        // Limpiar mensaje de error general si hay errores de campos
        errorMessage.textContent = '';
    }
});