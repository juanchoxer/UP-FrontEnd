window.onload = async function () {
    await getPedidos(10,0); // hay que implementar la paginacion
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
            const pedidos = await response.json();
            pedidos.forEach(pedido => {

                let imgPeluche = document.createElement("img");
                imgPeluche.src = "images\\" + pedido.modelo + "-" + pedido.color + ".jpg";
                imgPeluche.classList.add("imagenPedido")  

                let imgAccesorio = document.createElement("img");
                imgAccesorio.src = GetImagenAccesorio(pedido.accesorio);
                imgAccesorio.classList.add("imagenPedido")

                let divImagenes = document.createElement("div");
                divImagenes.setAttribute("class", "divImagenes");
                divImagenes.appendChild(imgPeluche);
                divImagenes.appendChild(imgAccesorio);

                let listaTexto = document.createElement('li');
                listaTexto.setAttribute("class", "listaPedidos");
                listaTexto.textContent = pedido.modelo + " " + pedido.color + " con " + pedido.accesorio; 

                let btnEliminar = document.createElement('button');
                btnEliminar.setAttribute("class", "btnEliminar");
                btnEliminar.textContent = 'Eliminar';

                btnEliminar.addEventListener('click', async function () {
                    let  confirmacion = confirm('¿Confirma eliminar su pedido?');
                    if (confirmacion) {
                        await EliminarPedido(pedido._id); 
                    }
                });

                listaPedidos.appendChild(listaTexto);
                listaPedidos.appendChild(divImagenes);
                listaPedidos.appendChild(btnEliminar);
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

function GetImagenAccesorio(accesorio)
{
    var imagen = "";
    switch (accesorio) {
        case "notebook":
            imagen = "notebook";
            break;
        case "camiseta y pelota de futbol":
            console.log("switch2");
            imagen = "futbol";
            break;
        case "guitarra electrica":
            console.log("switch3");
            imagen = "guitarra";
            break;
    }
    return "images\\" + imagen + ".jpg";
}

async function EliminarPedido(pedidoId) {
    const API_URL = "http://localhost:8080";
    let token = localStorage.getItem('token');

    try {
        const response = await fetch(`${API_URL}/pedidos`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({pedidoId: pedidoId})
        });

        if (response.ok) {
            alert('Pedido eliminado correctamente');
            window.location.href = './perfil.html';
        } else {
            const errorData = await response.text();
            alert(errorData);
            console.log(errorData);
        }
    } catch (error) {
        console.log(error);
    }
}


