const loginTab = document.getElementById('login-tab');
const registerTab = document.getElementById('register-tab');
const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');
const homePage = 'HomeChoco.html';

// Toggle tabs
loginTab.addEventListener('click', () => {
    loginTab.classList.add('active');
    registerTab.classList.remove('active');
    loginForm.classList.add('active');
    registerForm.classList.remove('active');
});

registerTab.addEventListener('click', () => {
    registerTab.classList.add('active');
    loginTab.classList.remove('active');
    registerForm.classList.add('active');
    loginForm.classList.remove('active');
});

// Form validation helper function
function validateForm(form) {
    const inputs = form.querySelectorAll('input[required]');
    for (let input of inputs) {
        if (!input.value.trim()) {
            alert('Please fill out all required fields.');
            return false;
        }
    }
    return true;
}

// Login functionality
document.getElementById('loginForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    const email = document.getElementById('login-email').value.trim();
    const password = document.getElementById('login-password').value.trim();
    const error = document.getElementById('login-error');

    if (!validateForm(this)) {
        return;
    }

    try {
        const response = await fetch('http://localhost:3000/api/user/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (response.ok) {
            alert(`Welcome back, ${data.user.name}!`);
            localStorage.setItem('user', JSON.stringify(data));
            window.location.href = homePage;
        } else {
            alert(`Invalid Email or Password!`);
        }
    } catch (err) {
        error.textContent = 'An error occurred. Please try again later.';
        error.style.display = 'block';
    }
});

// Registration functionality
document.getElementById('registerForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    const name = document.getElementById('signup-name').value.trim();
    const email = document.getElementById('signup-email').value.trim();
    const password = document.getElementById('signup-password').value.trim();
    const error = document.getElementById('signup-error');

    if (!validateForm(this)) return;

    try {
        const response = await fetch('http://localhost:4000/api/user', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password }),
        });

        const data = await response.json();

        if (response.ok) {
            alert('Sign Up Successful! Redirecting to Login page...');
            document.getElementById('register-tab').click();
        } else {
            if (error) {
                error.textContent = data.message || 'Sign Up Failed!';
                error.style.display = 'block';
            } else {
                alert(data.message || 'Sign Up Failed!');
            }
        }
    } catch (err) {
        if (error) {
            error.textContent = 'An error occurred. Please try again later.';
            error.style.display = 'block';
        } else {
            alert('An error occurred. Please try again later.');
        }
    }
});
