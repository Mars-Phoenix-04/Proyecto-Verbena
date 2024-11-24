// function logout() {
//     const fuga = confirm('¿Estás seguro que deseas salir?');
//     if (fuga) {
//         window.location.href = "../index.html";
//     } 
// }

import { db, auth } from "../credenciales";

const logout = document.querySelector("#logout");

logout.addEventListener('click', e => 
{
    e.preventDefault();
    auth.signOut().then(()=>{
        const fuga = confirm('¿Estás seguro que deseas salir?');
             if (fuga) {
                window.location.href = "../index.html";
            } 
    })

});
