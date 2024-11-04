function register() {
    window.location.href = "HTML/registro.html";
}
function closePopup() {
    document.getElementById("PBienvenida").style.display = "none";
}
window.onload = function() {
    document.getElementById("PBienvenida").classList.add("fade-in");
};
