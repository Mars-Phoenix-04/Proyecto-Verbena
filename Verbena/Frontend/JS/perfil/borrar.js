//Cambiar el color de fondo de la publicacion cuando se hace hover en el icono de borrar
const posts = document.querySelectorAll('.post');
const deleteButtons = document.querySelectorAll('.delete-button');
const saves = document.querySelectorAll('.save');
const desaves = document.querySelectorAll('.guard-button');

deleteButtons.forEach((button, index) => {
const post = posts[index]; 

button.addEventListener('mouseenter', () => {
post.style.backgroundColor = 'var(--color5)'; 
});
button.addEventListener('mouseleave', () => {
post.style.backgroundColor = 'var(--color1)'; 
});
});
//lo mismo pero para los guardados
desaves.forEach((button, index) => {
const save = saves[index]; 
    
button.addEventListener('mouseenter', () => {
save.style.backgroundColor = 'var(--color13)'; 
});
button.addEventListener('mouseleave', () => {
save.style.backgroundColor = 'var(--color12)'; 
});
});


//Funcion para borrar nuestras publicaciones, aun falta vincular con la base de datos
function borrarpost(postId) {
    const confirmarborro = confirm("¿Estás seguro de que deseas eliminar esta publicación? No hay vuelta atrás, una vez eliminada dejará de existir.");
        if (confirmarborro) {
        const post = document.getElementById(postId);
        if (post) {
            post.remove(); 
            alert("¡Publicación eliminada! Esperamos sigas comentando y participando :)");
        }
    }
}
//Funcion para desguardad publicaciones, aun falta vincular con la base de datos
function desguardar(saveId) {
    const confirmarborro2 = confirm("¿Deseas quitar esta publicación? Una vez hecho, ya no podrás recuperarlo y tendrás que buscarlo y guardarlo de nuevo.");
        if (confirmarborro2) {
        const save = document.getElementById(saveId);
        if (save) {
            save.remove(); 
            alert("¡La publicación ha sido eliminada de tu lista de guardados! Continúa explorando los foros y busca los más importantes para ti :) ");
        }
    }
}