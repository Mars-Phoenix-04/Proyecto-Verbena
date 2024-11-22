//ESTO ES PARA EL POPUP DE LA PAGINA DE INICIO
function register() {
    localStorage.setItem("popupClosed", "true");
    window.location.href = "HTML/registro.html";
}
function closePopup() {
    document.getElementById("PBienvenida").style.display = "none";
    localStorage.setItem("popupClosed", "true");
}
//SOLO VA A APARECER LA PRIMERA VEZ QUE ENTRAS, SI LE PICAS A CERRAR O REGISTRAR
//NO VOLVERA A APARECER
window.onload = function() {
    if (!localStorage.getItem("popupClosed")) {
        document.getElementById("PBienvenida").classList.add("fade-in");
    } else {
        document.getElementById("PBienvenida").style.display = "none";
    }
};

