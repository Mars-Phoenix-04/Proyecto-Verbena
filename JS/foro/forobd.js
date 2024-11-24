// Importa Firestore y Firebase
import { initializeApp, } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import {
    getAuth,                         // Obtiene la instancia del servicio de autenticación.
    signInWithEmailAndPassword,       // Método para iniciar sesión con email y contraseña.
    createUserWithEmailAndPassword,   // Método para crear un nuevo usuario con email y contraseña.
    updateProfile,                    // Método para actualizar el perfil del usuario (como nombre y foto).
    updateEmail,                      // Método para actualizar el correo electrónico del usuario.
    updatePassword,                   // Método para actualizar la contraseña del usuario.
    reauthenticateWithCredential,     // Método para volver a autenticar al usuario con sus credenciales.
    EmailAuthProvider,                // Proveedor de autenticación por email y contraseña.
    onAuthStateChanged,               // Método para escuchar cambios en el estado de autenticación (login/logout).
    signOut                           // Método para cerrar sesión del usuario.
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import {
    getFirestore,            // Obtiene la instancia de Firestore
    collection,              // Hace referencia a una colección
    addDoc,                  // Agrega un documento
    doc,                     // Hace referencia a un documento
    getDoc,                  // Obtiene un documento
    getDocs,                 // Obtiene todos los documentos en una colección
    setDoc,                  // Establece o crea un documento
    updateDoc,               // Actualiza un documento
    deleteDoc,               // Elimina un documento
    onSnapshot,              // Escucha cambios en tiempo real
    query,                   // Crea una consulta
    where,                   // Filtra documentos en una consulta
    orderBy,                 // Ordena los resultados de la consulta
    limit,                   // Limita los resultados de la consulta
    startAfter,              // Paginación: filtra después de un valor específico
    startAt,                 // Paginación: filtra desde un valor específico
    endAt,                   // Paginación: filtra hasta un valor específico
    endBefore                // Paginación: filtra antes de un valor específico
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";






// Configuración de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBXtX2P6IsJZRwiuQqodz9yPT7c4V1zQQI",
    authDomain: "autenticacionusuariov.firebaseapp.com",
    projectId: "autenticacionusuariov",
    storageBucket: "autenticacionusuariov.firebasestorage.app",
    messagingSenderId: "1029837611168",
    appId: "1:1029837611168:web:a11062824a15f7d68169c5"
};

const app = initializeApp(firebaseConfig);

// Inicializar Firestore y Firebase Auth
const db = getFirestore(app);
const auth = getAuth(app);



const colecforos = collection(db, "foros"); //Colección de foros.

document.querySelector ("#publi").addEventListener("click", async function (e) {
    e.preventDefault();
    const id = document.querySelector("#id").value; // id que se utiliza en Firebase.
    const categoria = document.querySelector("#opciones").value;
    const tema = document.querySelector("#tema").value;
    const mensaje = document.querySelector("#mensaje").value;
  
    const data = { categoria, tema, mensaje }; // Crea un objeto data que contiene los valores del formulario.
  
    if (id === "") {
      // Si no hay id, agregamos un nuevo documento.
      await addDoc(colecforos, data);
    } else {
      // Si hay id, actualizamos el documento.
      const docRef = doc(db, "foros", id);
      await updateDoc(docRef, data);
    }
  
    // Limpiar los campos del formulario
    document.querySelector("#id").value = "";
    //document.querySelector("#form").reset();
  
   
  });
  




