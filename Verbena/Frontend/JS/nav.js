// Función para alternar el dropdown
function toggleDropdown() {
    var dropdown = document.getElementById("forosDropdown");
    dropdown.classList.toggle("show");
    const flecha = document.getElementById("foroflecha");
    flecha.classList.toggle("active");
}

// Cierra el dropdown si se hace clic fuera del área de "Foros" o del mismo dropdown
document.addEventListener('click', function(event) {
    var dropdown = document.getElementById("forosDropdown");
    var forosButton = document.getElementById("foros");

    // Si el clic no es en el botón "Foros" o dentro del dropdown, cierra el dropdown
    if (!forosButton.contains(event.target) && !dropdown.contains(event.target)) {
        dropdown.classList.remove("show");
    }
});
