// authHandler.js
import {
    auth,
    db,
    USERS,
    usersSnap,
    getDoc,
    doc,
    updateDoc,
    setDoc,
    getDocs,
    // Importando métodos de autenticación de Firebase
    getAuth,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    updateProfile,
    updateEmail,
    updatePassword,
    reauthenticateWithCredential,
    EmailAuthProvider,
    onAuthStateChanged,
    signOut,
    // Importando métodos de Firestore
    getFirestore,
    collection,
    addDoc,
    deleteDoc,
    onSnapshot,
    query,
    where,
    orderBy,
    limit,
    startAfter,
    startAt,
    endAt,
    endBefore
} from './firebaseConfig.js';





auth.onAuthStateChanged(user => {
    if (user) {
        console.log("auth: signed in");
        // Mostrar los datos de todos los usuarios

        loginCheck(user);
    } else {
        console.log("auth: signed out");
        loginCheck(user);
    }
});


const inicio = document.getElementById("iniciosesion");
const crear = document.getElementById("crearcuenta");
const Lusuario = document.getElementById("userLogin");

const loginlinks = document.querySelectorAll(".login");
const panel = document.getElementById('panel');
const info = document.getElementById('IR');
const conve = document.getElementById('coment');
const legend = document.getElementById('legend');

const loginCheck = (user) => {
    if (user) {
        // Si hay un usuario autenticado
        inicio.style.display = "none";  // Ocultar "Iniciar sesión"
        crear.style.display = "none";   // Ocultar "Crear cuenta"
        Lusuario.style.display = "";  // Mostrar el usuario logueado

        // Alternar clases para los elementos relacionados con la sesión activa

    } else {
        // Si no hay usuario autenticado
        inicio.style.display = "block"; // Mostrar "Iniciar sesión"
        crear.style.display = "block";  // Mostrar "Crear cuenta"
        Lusuario.style.display = "none"; // Ocultar el usuario logueado


    }
}




let username = 'aun no hay cambios';


const navname = document.getElementById('nameN');



auth.onAuthStateChanged((user) => {
    if (user) {
        // Iterar sobre los documentos de usuarios
        const uid = user.email;

        usersSnap.forEach(doc => {
            const data = doc.data();
            if (data.email === uid) {
                username = data.username; // Guardar el nombre de usuario

            }
        });

        navname.textContent = username
    } else {
        console.log("NO esta logeado")
    };
});



