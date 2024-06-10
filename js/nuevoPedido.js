window.onload = async function () {
    const API_URL = "http://localhost:8080";
    

    let formPedido = document.getElementById("formPedido");
    formPedido.setAttribute("method", "post");
    formPedido.setAttribute("onsubmit", "generarPedido(event)");

    var selectModelos = document.createElement("select");
    selectModelos.setAttribute("id", "modelos");
    selectModelos.setAttribute("name", "modelos");

    var selectColores = document.createElement("select");
    selectColores.setAttribute("id", "colores");
    selectColores.setAttribute("name", "colores");

    var selectAccesorios = document.createElement("select");
    selectAccesorios.setAttribute("id", "accesorios");
    selectAccesorios.setAttribute("name", "accesorios");

    var submit = document.createElement("input");
    submit.setAttribute("type", "submit");
    submit.setAttribute("value", "Generar");
    

    formPedido.appendChild(selectModelos);
    formPedido.appendChild(selectColores);
    formPedido.appendChild(selectAccesorios);
    formPedido.appendChild(submit);

    
    fetch(API_URL + '/peluches')
    .then(response => response.json())
    .then(data => {
        data.forEach(peluche => {
        var option = document.createElement("option");
        option.value = peluche.modelo;
        option.text = peluche.modelo;
        selectModelos.appendChild(option);
        });
    });

    fetch(API_URL + '/colores')
    .then(response => response.json())
    .then(data => {
        data.forEach(color => {
        var option = document.createElement("option");
        option.value = color.nombre;
        option.text = color.nombre;
        selectColores.appendChild(option);
        });
    });

    fetch(API_URL + '/accesorios')
    .then(response => response.json())
    .then(data => {
        data.forEach(accesorio => {
        var option = document.createElement("option");
        option.value = accesorio.nombre;
        option.text = accesorio.nombre;
        selectAccesorios.appendChild(option);
        });
    });
};

async function generarPedido(event){
    event.preventDefault();

    let divGrupo = document.getElementById('divGrupo')
    if(divGrupo !== null)
    {
        divGrupo.remove();
    }

    divGrupo = document.createElement('div');
    divGrupo.setAttribute("id", "divGrupo");

    var modelo = document.getElementById('modelos').value;
    var color = document.getElementById('colores').value;
    var accesorio = document.getElementById('accesorios').value;

    let divTexto = document.createElement('h2');
    divTexto.setAttribute("class", "textoPedido");
    divTexto.textContent = modelo + " " + color + " con " + accesorio; 

    let imgPeluche = document.createElement("img");
    imgPeluche.src = "images\\" + modelo + "-" + color + ".jpg";
    imgPeluche.classList.add("imagenPedido")  

    let imgAccesorio = document.createElement("img");
    imgAccesorio.src = GetImagenAccesorio(accesorio);
    imgAccesorio.classList.add("imagenPedido")

    let divImagenes = document.createElement("div");
    divImagenes.setAttribute("class", "divImagenes");
    divImagenes.appendChild(imgPeluche);
    divImagenes.appendChild(imgAccesorio);

    let btnCrear = document.createElement('button');
    btnCrear.setAttribute("class", "btnCrear");
    btnCrear.textContent = 'Crear pedido';

    btnCrear.addEventListener('click', async function () {
        let  confirmacion = confirm('¿Confirma solicitar su pedido?');
        if (confirmacion) {
            await CrearPedido(event); 
        }
    });


    let divPreview = document.getElementById("divPreview");
    divGrupo.appendChild(divTexto);
    divGrupo.appendChild(divImagenes);
    divGrupo.appendChild(btnCrear);
    divPreview.appendChild(divGrupo);
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

async function CrearPedido(event) {
    event.preventDefault();

    const API_URL = "http://localhost:8080";

    const resultadoDiv = document.getElementById('resultado');
    let token = localStorage.getItem('token');

    var modelo = document.getElementById('modelos').value;
    var color = document.getElementById('colores').value;
    var accesorio = document.getElementById('accesorios').value;

    try {
        const response = await fetch(API_URL + '/pedidos', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                modelo: modelo,
                color: color,
                accesorio: accesorio
            })
        })

        if (response.ok) {
            alert('Pedido creado');
            window.location.href = './perfil.html';
        } else {
            const errorData = await response.text();
            alert(errorData);
            console.log(errorData);    
        }
    } catch (error) {
        console.log(error);
        resultadoDiv.textContent = error.message;
        resultadoDiv.style.color = 'red';
    }
}