const API_URL = "http://localhost:8080";

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('logout').addEventListener('click', function () {
        
        localStorage.removeItem('token');
        window.location.href = './index.html';
    });
});