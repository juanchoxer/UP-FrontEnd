window.onload = async function () {
    const API_URL = "http://localhost:8080";

    fetch(API_URL + '/ranking')
    .then(response => response.json())
    .then(json => mostrarRanking(json))
    .catch(err => console.log('Solicitud fallida', err));
};

function mostrarRanking(json){
    let repolist = document.getElementById("rankingLista");
    json.forEach((element,index) => {

        let li = document.createElement("li");
        li.setAttribute("id","lineaRanking");

        div = document.createElement("div");
       
        let img = document.createElement("img");
        img.src = "images\\" + element.modelo.toLowerCase() + ".jpg";
        img.classList.add("imagenesRanking")
        div.appendChild(img);

        li.appendChild(div);

        divTexto = document.createElement("div");
        
        divTexto.textContent = "pedido " + element.contadorPedidos + " veces"; 
        divTexto.style.fontSize = '180%';
        divTexto.style.paddingLeft = '10px';  
        divTexto.style.marginBottom = '35px';  

        li.appendChild(divTexto);

        repolist.appendChild(li);
    });
}