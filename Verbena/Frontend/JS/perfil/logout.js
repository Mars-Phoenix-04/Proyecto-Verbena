function logout() {
    const fuga = confirm('¿Estás seguro que deseas salir?');
    if (fuga) {
        alert('Muy bien, ahora serás redirigido a la página de inicio. Esperamos verte de vuelta pronto:)');
        window.location.href = "../index.html";
    } 
}