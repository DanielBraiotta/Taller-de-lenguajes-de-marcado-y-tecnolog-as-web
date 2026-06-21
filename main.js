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

/*===========================================================
    FORMULARIO DE CONTACTO — validación básica
    (agregado por Luca, no toque nada de lo anterior)
===========================================================*/

const formContacto = document.getElementById("formContacto");

if (formContacto) {

    const campoNombre = document.getElementById("nombre");
    const campoEmail = document.getElementById("email");
    const campoAsunto = document.getElementById("asunto");
    const campoMensaje = document.getElementById("mensaje");
    const campoTerminos = document.getElementById("terminos");

    const errorNombre = document.getElementById("error-nombre");
    const errorEmail = document.getElementById("error-email");
    const errorAsunto = document.getElementById("error-asunto");
    const errorMensaje = document.getElementById("error-mensaje");
    const errorTerminos = document.getElementById("error-terminos");

    const contadorMensaje = document.getElementById("contador-mensaje");
    const confirmacion = document.getElementById("formConfirmacion");
    const btnLimpiar = document.getElementById("btnLimpiar");

    // Contador de caracteres en vivo para el mensaje
    campoMensaje.addEventListener("input", () => {
        contadorMensaje.textContent = campoMensaje.value.length + " caracteres";
    });

    // Quita el estado de error mientras el usuario escribe
    [campoNombre, campoEmail, campoAsunto, campoMensaje].forEach((campo) => {
        campo.addEventListener("input", () => {
            campo.classList.remove("campo-invalido");
        });
    });

    function mostrarError(campo, elementoError, mensaje) {
        campo.classList.add("campo-invalido");
        elementoError.textContent = mensaje;
    }

    function limpiarError(campo, elementoError) {
        campo.classList.remove("campo-invalido");
        elementoError.textContent = "";
    }

    function emailValido(valor) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor);
    }

    formContacto.addEventListener("submit", (evento) => {
        evento.preventDefault();

        let formularioValido = true;

        // Nombre: al menos 3 caracteres
        if (campoNombre.value.trim().length < 3) {
            mostrarError(campoNombre, errorNombre, "Ingresá tu nombre completo (mínimo 3 caracteres).");
            formularioValido = false;
        } else {
            limpiarError(campoNombre, errorNombre);
        }

        // Email: formato válido
        if (!emailValido(campoEmail.value.trim())) {
            mostrarError(campoEmail, errorEmail, "Ingresá un correo electrónico válido.");
            formularioValido = false;
        } else {
            limpiarError(campoEmail, errorEmail);
        }

        // Asunto: debe estar seleccionado
        if (campoAsunto.value === "") {
            mostrarError(campoAsunto, errorAsunto, "Seleccioná un asunto.");
            formularioValido = false;
        } else {
            limpiarError(campoAsunto, errorAsunto);
        }

        // Mensaje: al menos 10 caracteres
        if (campoMensaje.value.trim().length < 10) {
            mostrarError(campoMensaje, errorMensaje, "Tu mensaje debe tener al menos 10 caracteres.");
            formularioValido = false;
        } else {
            limpiarError(campoMensaje, errorMensaje);
        }

        // Términos: debe estar marcado
        if (!campoTerminos.checked) {
            errorTerminos.textContent = "Debés aceptar para poder enviar el mensaje.";
            formularioValido = false;
        } else {
            errorTerminos.textContent = "";
        }

        if (!formularioValido) {
            confirmacion.classList.remove("visible");
            return;
        }

        // Si todo está OK, mostramos confirmación
        confirmacion.textContent = "¡Gracias! Tu mensaje fue enviado correctamente. Te responderemos a la brevedad.";
        confirmacion.classList.add("visible");

        formContacto.reset();
        contadorMensaje.textContent = "0 caracteres";
    });

    // Al limpiar el formulario, también se limpian errores y confirmación
    btnLimpiar.addEventListener("click", () => {
        [campoNombre, campoEmail, campoAsunto, campoMensaje].forEach((campo) => {
            campo.classList.remove("campo-invalido");
        });
        errorNombre.textContent = "";
        errorEmail.textContent = "";
        errorAsunto.textContent = "";
        errorMensaje.textContent = "";
        errorTerminos.textContent = "";
        contadorMensaje.textContent = "0 caracteres";
        confirmacion.classList.remove("visible");
    });
}