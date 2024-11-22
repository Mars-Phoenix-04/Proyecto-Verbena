// Importa Firestore y Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import {
    getFirestore,
    collection,
    addDoc,
    updateDoc,
    doc,
    deleteDoc,
  } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyBXtX2P6IsJZRwiuQqodz9yPT7c4V1zQQI",
    authDomain: "autenticacionusuariov.firebaseapp.com",
    projectId: "autenticacionusuariov",
    storageBucket: "autenticacionusuariov.firebasestorage.app",
    messagingSenderId: "1029837611168",
    appId: "1:1029837611168:web:a11062824a15f7d68169c5"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


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
  





  document.getElementById("cancel").addEventListener("click", function () {
    // Limpiar los campos del formulario
    document.getElementById("id").value = "";
    document.getElementById("tema").value = "";
    document.getElementById("Mensaje").value = "";
    document.getElementById("opciones").value = "1";

   
  });



// Esta función genera un bloque de HTML para mostrar los productos
function mostrartema({ opciones, tema, mensaje }) {
  return `
   <div class="d oculto">
                            <img class="bookmark" src="../Assets/img/png/bookmark.png" onclick="cerrar(this)">
                            <div class="title">
                                <h3>${tema}</h3>
                            </div>
                            <div id="conve">
                                <div class="discusion">
                                    <div class="user">
                                        <img src="../Assets/img/svg/icons/User.svg" alt="">
                                        <h4>Nombre usuario</h4>
                                    </div>
                                    <div class="message">
                                        <div class="fecha">
                                            <p id="fecha"><b>Fecha de Publicación: 00/00/2024 </b></p>
                                        </div>
                                        <div class="mensaje">
                                            <p>${mensaje}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div id="coment" class="oculto">
                                <input id="comentario" type="text" placeholder="Responder">
                                <button class="send" onclick="agregarMensaje()"><img
                                        src="../Assets/img/png/play-button.png" alt=""></button>
                            </div>
                            <div id="legend" class="legend ">
                                <p>
                                    <b>
                                        <a class="linkcuentaB" href="../HTML/iniciarsesion.html">Inicia sesión</a> o
                                        <a class="linkcuentaB" href="../HTML/registro.html">regístrate</a>
                                    </b> para poder guardar este foro y participar en él.
                                </p>
                            </div>
                        </div>
    `;
}











  import { onSnapshot } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";
onSnapshot(colecforos, (snapshot) => {
  const body = document.querySelector(".foro");
  body.innerHTML = ""; // Limpiar la tabla antes de agregar los productos actualizados
  snapshot.forEach((doc) => {
    const tr = document.createElement("div");
    tr.id = doc.id; // Asigna el id del documento
    tr.innerHTML = mostrarProductos(doc.data()); // Asigna el contenido con la información del producto
    body.appendChild(tr);
  });
});