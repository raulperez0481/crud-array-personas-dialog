const adminCredentials = [
    { username: 'admin', password: 'password123' },
    { username: 'superuser', password: 'superpass' }
];

const loginForm = document.querySelector('#loginForm');
const usernameInput = document.querySelector('#username');
const passwordInput = document.querySelector('#pass');
const errorMessage = document.querySelector('#errorMessage');
const eye = document.querySelector(".eye");
        

eye.addEventListener("click", () => {
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
    eye.classList.toggle('fa-eye-slash');
    eye.classList.toggle('fa-eye');
});

loginForm.addEventListener('submit', (event) =>{
    event.preventDefault();

    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();

    const inputs = document.querySelectorAll('input[type="text"], input[type="password"]');

    let hasError = false;
    inputs.forEach(input => {
        const errorInput = input.nextElementSibling;
        if (input.value.trim() === "") {
            event.preventDefault();
            input.classList.add("error");
            errorInput.textContent = "Required field";
            hasError = true;
        } else {
            input.classList.remove("error");
            errorInput.textContent = "";
        }
    });

    if (!hasError) {
        const isValid = adminCredentials.some(credential => 
            credential.username === username && credential.password === password
        );

        if (isValid) {
            localStorage.setItem('isLoggedIn', 'true');
            window.location.href = 'gestion.html';
        } else {
            errorMessage.textContent = 'Invalid username or password.';
        }
    } else {
        errorMessage.textContent = '';
    }
});