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
export async function login(email, password) {
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
export async function signup(email, password) {
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
        await addDoc(collection(db, collectionName), data);
    } catch (error) {
        throw new Error("Error: " + error.message);
    }
}











//Base de datos por arreglar

const coleccionProductos = collection(db, "foros");//Coleccion de foros


//Variables
const publicacion = document.getElementById("panel")


document.querySelector("form").addEventListener("submit", async function (e) {
    e.preventDefault();
    const id = document.querySelector("#Categoria");





    const data = { codigo, descripcion, cantidad }; //Crea un objeto data que contiene los valores del formulario

    if (id === "") {
        await addDoc(publicacion, data)

    } else {
        const docRef = doc(db, "foros", id)
        await updateDoc(docRef, data);
    }

    //Limpiar campos del formulario
    document.querySelector("#id").value = "";




});


//Funcionalidad de los botones

//Boton de publicar
document.getElementById("publi").addEventListener("click", function () {
    //Limpiar formulario
    document.getElementById("#Id") = "";
    document.getElementById("#Tema") = "";
    document.getElementById("#mensaje") = "";
    document.getElementById("#Id") = "";

    //Añ




})


//Edicion de los datos
document.getElementById("foro").addEventListener("Click", function (e) {

    if (e.target && e.target.classList.contains("btnEditar")) {
        let tr = e.target.closet("tr"); //Es la fila de la tabla que pertenece ese boton
        let id = tr.id;
        let codigo = tr.querySelector("td:nthchild(1)").textContent;
        let descripcion = tr.querySelector("td:nthchild(2)").textContent;
        let cantidad = tr.querySelector("td:nthchild(3)").textContent;

        //Rellena los campos del formulario con los valores que se obtuvieron en la fila.
        document.getElementById("id").value = id;
        document.getElementById("codigo").value = id;
        document.getElementById("descripcion").value = id;
        document.getElementById("cantidad").value = id;

    }




})

//eliminacion de los datos de la tabla
document.getElementById("tablaProductos").addEventListener("click", async function (e) {

    if (e.target && e.target.classList.contains("btnBorrar")) {

        //Libreria para que me muestre bonito el que ya se elemino
        Swal.fire({
            title: "Estas seguro de eliminar el producto?",
            text: "Esta operacion no se puede revertir",
            icon: "Warning",
            showCancelButton: "#d33",
            CancelButtonColor: "#fff",
            confirmButtonText: "Borrar",

        }).then(async (result) => {
            if (result.isConfirm) {
                let tr = e.target.closest("tr");
                let id = tr.id;

                //Eliminar el producto de Firebase
                const docRef = doc(db, "productos", id);
                await deleteDoc(docRef);

                // Mostrar el mensaje de exitos con SweetAlert2
                Swal.fire("Elimindado", "El producto ha sido eliminado.", "success"

                );


            }

        })




    }



}

);


function mostrar({ codigo, descripcion, cantidad }) {
    return `
    <td>${codigo}</td>
    <td>${descripcion}</td>
    <td>${cantidad}</td>
    <td><button class="btnEditar btn btn-secondary" data-toggle="tooltip" title="Editar">${Iconodeeditar}</td>;
    <td><button class="btnBorrar btn btn-danger" data-toggle="tooltip" title="Borrar">${IconodeBorrar}</td>;




    `

}

//Escucha cuando un nuevo hijo (producto) se agrega a la base de datos de Firebase
import { onSnapshot } from "https.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

onSnapshot(coleccionProductos, (snapshop) => {
    const bodyProductos = document.getElementById("Bodyproductos")
    bodyProductos.innerHTML = ""; //Limpiar antes de agregar los producots actualizados
    snapshop.forEach((doc) => {
        const tr = document.createElement("tr");
        tr.id = doc.id;
        tr.innerHTML = mostrar(doc.data());
        bodyProductos.appendChild(tr);
    });

});