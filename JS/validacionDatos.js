import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

//Credenciales
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

// Función para iniciar sesión con Firebase
//login
export async function login(email, password) {
    try {
        await signInWithEmailAndPassword(auth, email, password);
        return true;  // Si la autenticación fue exitosa
    } catch (error) {
        if (error.code === 'auth/invalid-credential') {
            throw new Error("El correo electrónico y/o la contraseña son incorrectos, intenta de nuevo");
        }
        throw new Error("Error: " + error.message);
    }
}



// Función para registrar al usuario y agregar sus datos a la base de datos
export async function signup(email, password, usuario) {
    try {
        // Crear el usuario en Firebase Authentication
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Definir la colección de usuarios (en Firestore)
        const colectusuarios = collection(db, "usuarios");

        // Ahora guardamos los datos del usuario en Firestore
        await addDoc(colectusuarios, {
            username: usuario,
            email: email,
            password: password,
           
            createdAt: new Date(),
        });

        return true;
    } catch (error) {
        if (error.code === 'auth/email-already-in-use') {
            throw new Error("El correo electrónico ya ha sido registrado");
        }
        if(error.code === 'auth/user-already-in-use'){
            throw new Error("El nombre de usuario ya ha sido registrado");
        }
        throw new Error("Error: " + error.message);
    }
}

// Agregar información a la base de datos - función reutilizable
export async function addData(colectusuarios, data) {
    try {
        await addDoc(colectusuarios, data);  // Usamos el parámetro 'colectusuarios'
    } catch (error) {
        throw new Error("Error: " + error.message);
    }
}











