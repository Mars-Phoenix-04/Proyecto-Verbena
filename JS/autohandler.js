// authHandler.js
import { auth, getUsers, signOut } from './firebaseConfig.js';

const loginCheck = (user) => {
    const inicio = document.getElementById("iniciosesion");
    const crear = document.getElementById("crearcuenta");
    const Lusuario = document.getElementById("userLogin");
    const panel = document.getElementById('panel');
    const info = document.getElementById('IR');
    const conve = document.getElementById('coment');
    const legend = document.getElementById('legend');

    if (user) {
        inicio.style.display = "none";
        crear.style.display = "none";
        Lusuario.style.display = "block";
        panel.classList.toggle('panelcontrol');
        conve.classList.toggle('commit');
        legend.classList.toggle('legend');
        info.classList.toggle('mssg');
    } else {
        inicio.style.display = "block";
        crear.style.display = "block";
        Lusuario.style.display = "none";
        panel.classList.toggle('oculto');
        info.classList.toggle('oculto');
        conve.classList.toggle('oculto');
        legend.classList.toggle('oculto');
    }
}

// Obtener los usuarios desde Firestore
async function showUsers() {
    const usersSnap = await getUsers();
    usersSnap.forEach((doc) => {
        console.log("Document data:", doc.data());
    });
}

// Manejar el evento de logout
const logout = document.querySelector("#logout");
logout.addEventListener('click', e => {
    e.preventDefault();
    signOut(auth).then(() => {
        const fuga = confirm('¿Estás seguro que deseas salir?');
        if (fuga) {
            window.location.href = "../index.html"; // Redirigir a la página principal después de hacer logout
        }
    });
});

// Función para manejar cambios de estado de autenticación
function handleAuthState() {
    onAuthStateChanged(auth, user => {
        if (user) {
            console.log("auth: signed in");
            showUsers();
            loginCheck(user);
        } else {
            console.log("auth: signed out");
            loginCheck(user);
        }
    });
}

// Llamar a la función para manejar el estado de autenticación
handleAuthState();
