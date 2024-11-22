//Alternar entre las pestañas de publicaciones hechas y guardados
function toggleTab(tabIndex) {
    const tabs = document.querySelectorAll('.tab');
    const posts = document.querySelector('.posts');
    const guardados = document.querySelector('.guardados');

    tabs.forEach(tab => tab.classList.remove('active'));
    if (tabIndex === 0) { 
        posts.classList.add('active');
        guardados.classList.remove('active');
    } else { 
        guardados.classList.add('active');
        posts.classList.remove('active');
    }
    tabs[tabIndex].classList.add('active');
}
toggleTab(0);
