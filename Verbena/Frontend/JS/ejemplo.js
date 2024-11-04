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

//Funciones de autenticacion
//login
export async function login(email,password) {
    try {
        await signInWithEmailAndPassword(auth, email, password);
        return true;
    } catch (error) {
        if (error.code === 'auth/invalid-credential') {
            throw new Error("El correo electronico y/o la contraseña son incorrectas, intenta de nuevo");
        }
        throw new Error("Error: " + error.message);
        
    }
}
//sign up
export async function signup(email,password) {
    try {
        await signInWithEmailAndPassword(auth, email, password);
        return true;
    } catch (error) {
        if (error.code === 'auth/email-already-in-use') {
            throw new Error("El correo electronico ya ha sido registrado");
        }
        throw new Error("Error: " + error.message);   
    }
}
//Agregar informacion a la base de datos
export async function addData(collectionName, data) {
    try {
        await addDoc(collection(db,collectionName),data);
    } catch (error) {
        throw new Error("Error: " + error.message);   
    }
}