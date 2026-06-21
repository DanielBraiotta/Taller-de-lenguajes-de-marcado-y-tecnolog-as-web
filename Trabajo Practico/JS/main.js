const btnModoOscuro = document.getElementById("btnModoOscuro");
const contenedor = document.getElementById("estrellas");

let intervaloEstrellas = null;
let intervaloFugaces = null;

function crearEstrella(){

    const estrella = document.createElement("div");

    estrella.classList.add("estrella");

    const tamaño = Math.random() * 4 + 2;

    estrella.style.width = tamaño + "px";
    estrella.style.height = tamaño + "px";

    estrella.style.left = Math.random() * 100 + "vw";
    estrella.style.top = Math.random() * 100 + "vh";

    estrella.style.animationDuration =
        (2 + Math.random() * 3) + "s";

    contenedor.appendChild(estrella);

    setTimeout(() => {
        estrella.remove();
    }, 5000);
}

function crearEstrellaFugaz(){

    const fugaz = document.createElement("div");

    fugaz.classList.add("estrella-fugaz");

    fugaz.style.top =
        Math.random() * 40 + "vh";

    fugaz.style.left =
        (60 + Math.random() * 40) + "vw";

    contenedor.appendChild(fugaz);

    setTimeout(() => {
        fugaz.remove();
    }, 2000);
}

btnModoOscuro.addEventListener("click", () => {

    document.body.classList.toggle("dark-mode");

    if(document.body.classList.contains("dark-mode")){

        intervaloEstrellas = setInterval(
            crearEstrella,
            150
        );

        intervaloFugaces = setInterval(
            crearEstrellaFugaz,
            5000
        );

    }else{

        clearInterval(intervaloEstrellas);
        clearInterval(intervaloFugaces);

        contenedor.innerHTML = "";
    }
});