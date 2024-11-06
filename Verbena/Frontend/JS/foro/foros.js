//Esta funcion es para mostrar los foros en una seccion nueva
function mostrar(elemento) {
    document.querySelectorAll('.d').forEach(discusion => {
        discusion.classList.remove('temaAbierto');
        discusion.classList.add('oculto');
    });

    const discusion = elemento.nextElementSibling;
    if (discusion) {
        discusion.classList.remove('oculto');
        discusion.classList.add('temaAbierto');
    }
}
//Cerrar el foro
function cerrar(elemento) {
    const discusion = elemento.closest('.d');
    if (discusion) {
        discusion.classList.remove('temaAbierto');
        discusion.classList.add('oculto');
    }
}