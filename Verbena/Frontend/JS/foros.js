function mostrar(elemento) {
    // Cerramos cualquier tema abierto antes de abrir el nuevo
    document.querySelectorAll('.d').forEach(discusion => {
        discusion.classList.remove('temaAbierto');
        discusion.classList.add('oculto');
    });

    // Abrimos el tema relacionado con el botón clicado
    const discusion = elemento.nextElementSibling;
    if (discusion) {
        discusion.classList.remove('oculto');
        discusion.classList.add('temaAbierto');
    }
}

function cerrar(elemento) {
    // Cerrar solo el tema específico
    const discusion = elemento.closest('.d');
    if (discusion) {
        discusion.classList.remove('temaAbierto');
        discusion.classList.add('oculto');
    }
}