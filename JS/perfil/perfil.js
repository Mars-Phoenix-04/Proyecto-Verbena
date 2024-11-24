import { initializeApp, } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile, updateEmail, updatePassword, reauthenticateWithCredential, EmailAuthProvider } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";
import { query, where } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";
// Configuración de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBXtX2P6IsJZRwiuQqodz9yPT7c4V1zQQI",
    authDomain: "autenticacionusuariov.firebaseapp.com",
    projectId: "autenticacionusuariov",
    storageBucket: "autenticacionusuariov.firebasestorage.app",
    messagingSenderId: "1029837611168",
    appId: "1:1029837611168:web:a11062824a15f7d68169c5"
};
//Inicializar Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { db, auth };  // Exporta los servicios de Firebase


async function obtenerDatosDeUsuario() {
    // Obtener el usuario autenticado
    const user = auth.currentUser;

    if (user) {
        // Si hay un usuario autenticado, obtenemos su UID
        console.log('Usuario autenticado:', user);

        // Crear una consulta para obtener los datos del usuario desde Firestore usando el UID
        const q = query(collection(db, 'usuarios'), where('uid', '==', user.uid));

        // Obtener los documentos de la consulta
        const querySnapshot = await getDocs(q); // Usar await para manejar la promesa

        if (!querySnapshot.empty) {
            querySnapshot.forEach((doc) => {
                const data = doc.data();

                // Asignar los valores obtenidos de Firestore a los campos del formulario
                document.getElementById('username').value = data.username;
                document.getElementById('email').value = user.email; // Usamos el email de Firebase Auth
                document.getElementById('password').value = data.password; // Asumiendo que la contraseña está almacenada
            });
        } else {
            console.log('No se encontró ningún usuario con ese UID');
        }
    } else {
        console.log('No hay usuario autenticado');
    }
}


window.addEventListener('load', obtenerDatosDeUsuario);


















