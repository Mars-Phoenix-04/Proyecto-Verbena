function logout() {
    const fuga = confirm('¿Estás seguro que deseas salir?');
    if (fuga) {
        window.location.href = "../index.html";
    } 
}