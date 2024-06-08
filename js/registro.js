const API_URL = "http://localhost:8080";

fetch(API_URL + '/ranking')
    .then(response => response.json())  // convertir a json
    .then(json => mostrarRepos(json))    //imprimir los datos en la consola
    .catch(err => console.log('Solicitud fallida', err)); // Capturar errores


function mostrarRepos(json){
    console.log(json);
    let repolist = document.getElementById("rankingLista");

    json.forEach((element,index) => {

        let li = document.createElement("li");
        li.setAttribute("id",index+1);

        div = document.createElement("div");

        li.appendChild(div);

        let img = document.createElement("img");
        img.src = "images\\" + element.modelo.toLowerCase() + ".jpg";
        img.classList.add("imagenesRanking")
        div.appendChild(img);

        repolist.appendChild(li);
    });
}