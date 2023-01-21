const BASE_URL = "https://ecommce-be.herokuapp.com/ecomm/api/v1";

const logoutBtn = document.getElementById('logoutBtn');
const userIntro = document.getElementById('userIntro');

logoutBtn.addEventListener('click', logoutFn)

function logoutFn() {
    localStorage.removeItem('username');
    window.location.href = "login.html";
}

if (localStorage.getItem('username')) {
    wimdow.location.href = 'login.html'
} else {
    userIntro.innerText = "Hi " + localStorage.getItem("username");
}
