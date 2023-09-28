const login = () => {
    const loginForm = document.getElementById('loginForm')
    loginForm.addEventListener('submit', () => {
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        console.log(email,password);
    })
}
login()