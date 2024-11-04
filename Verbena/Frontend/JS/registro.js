function mostrar() {
    document.querySelector('html').classList.remove('desbloquear');
    document.querySelector('html').classList.add('bloquear');
    document.querySelector('#popup').classList.remove('oculto');
    document.querySelector('#popup').classList.add('mostrar');
}



function cerrar() {
    document.querySelector('html').classList.remove('bloquear');
    document.querySelector('html').classList.add('desbloquear');
    document.querySelector('#popup').classList.remove('mostrar');
    document.querySelector('#popup').classList.add('oculto');
}
