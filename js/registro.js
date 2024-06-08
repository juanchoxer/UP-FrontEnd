const API_URL = "http://localhost:8080";

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('formRegistro').addEventListener('submit', async function (event) {
        event.preventDefault();

        const datos = {
            email: document.getElementById('email').value,
            password: document.getElementById('password').value
        };
        const resultadoDiv = document.getElementById('resultado');

        try {
            const response = await fetch(API_URL + '/usuarios', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(datos)
            });
            
            if (response.ok) {
                resultadoDiv.textContent = 'Usuario creado';
                resultadoDiv.style.color = 'green';
                alert('Usuario creado');
                window.location.href = './index.html'; // Actualizar con login
            } else {
                const errorData = await response.text();
                resultadoDiv.textContent = errorData;
                alert(errorData);
                resultadoDiv.style.color = 'red';
            }
        } catch (error) {
            console.log(error);
            resultadoDiv.textContent = error.message;
            resultadoDiv.style.color = 'red';
        }
    });
});