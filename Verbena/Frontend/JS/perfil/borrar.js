//Cambiar el color de fondo de la publicacion cuando se hace hover en el icono de borrar
const posts = document.querySelectorAll('.post');
const deleteButtons = document.querySelectorAll('.delete-button');
deleteButtons.forEach((button, index) => {
const post = posts[index]; 
button.addEventListener('mouseenter', () => {
post.style.backgroundColor = 'var(--color5)'; 
});
button.addEventListener('mouseleave', () => {
post.style.backgroundColor = 'var(--color1)'; 
});
});
//Funcion para borrar nuestras publicaciones, aun falta vincular con la base de datos
function borrarpost(postId) {
    const confirmarborro = confirm("¿Estás seguro de que deseas eliminar esta publicación? No hay vuelta atrás, una vez eliminada dejará de existir.");
        if (confirmarborro) {
        const post = document.getElementById(postId);
        if (post) {
            post.remove(); 
            alert("¡Publicación eliminada! Esperamos sigas comentando y participando:)");
        }
    }
}