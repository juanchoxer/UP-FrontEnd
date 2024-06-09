window.onload = async function () {
    await getPedidos(5,0);
};

async function getPedidos(limit, offset) {
    const API_URL = "http://localhost:8080";

    const datos = {
        limit: limit,
        offset: offset
    };
    
    let listaPedidos = document.getElementById("listaPedidos");
    let listaResultado = document.getElementById("listaResultado")

    let token = localStorage.getItem('token');

    try {
        const response = await fetch(`${API_URL}/pedidos?limit=${datos.limit}&offset=${datos.offset}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        if (response.ok) {
            const respuesta = await response.json();
            respuesta.pedidos.forEach(pedido => {
                const li = document.createElement('li');
                li.textContent = pedido.modelo + " " + pedido.color + " con " + pedido.accesorio; 
                listaPedidos.appendChild(li);
            });
        } else {
            const errorText = await response.text();
            listaResultado.textContent = 'Error al cargar los pedidos: ' + errorText;
            listaResultado.style.color = 'red';
        }
    } catch (error) {
        console.log(error);
        listaResultado.textContent = 'Error al solicitar los pedidos.' + error;
        listaResultado.style.color = 'red';
    }
}


