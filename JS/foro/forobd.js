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
} from '../firebaseConfig.js';

const panel = document.getElementById('panel');
const info = document.getElementById('IR');






window.onload = () => {
  auth.onAuthStateChanged(user => {
    // Obtener los elementos con las clases relevantes
    const conve = document.querySelectorAll(".conve");
    const legend = document.querySelectorAll(".legend");

    if (user) {
      console.log("auth: signed in");

      // Mostrar elementos de comentarios y ocultar leyenda
      conve.forEach((coment) => {
        coment.classList.remove("oculto");
        coment.classList.add("commit");
      });

      legend.forEach((leg) => {
        leg.classList.remove("legend");
        leg.classList.add("oculto");
      });

      panel.classList.remove("oculto");
      panel.classList.add("panelcontrol");
  
      info.classList.remove("mssg");
      info.classList.add("oculto");
    } else {
      console.log("auth: signed out");

      // Ocultar elementos de comentarios y mostrar leyenda
      conve.forEach((coment) => {
        coment.classList.remove("commit");
        coment.classList.add("oculto");
      });

      legend.forEach((leg) => {
        leg.classList.remove("oculto");
        leg.classList.add("legend");
      });

      panel.classList.remove("panelcontrol");
      panel.classList.add("oculto");
  
      info.classList.remove("oculto");
      info.classList.add("mssg");
    }
  });
};



const colecforos = collection(db, "foros"); // Colección de foros.

document.querySelector("#publi").addEventListener("click", async function (e) {
  e.preventDefault();

  const id = document.querySelector("#id").value; // ID de documento (si se quiere actualizar un foro existente)
  const categoria = document.querySelector("#opciones").value; // Categoría seleccionada en el formulario
  const tema = document.querySelector("#tema").value; // Título del foro
  const mensaje = document.querySelector("#mensaje").value; // Mensaje del foro

  // Obtener la fecha actual
  const fechaActual = new Date();
  const dia = fechaActual.getDate();
  const mes = fechaActual.getMonth() + 1; // Los meses empiezan desde 0
  const año = fechaActual.getFullYear();
  const fechaFormateada = `${dia < 10 ? '0' + dia : dia}/${mes < 10 ? '0' + mes : mes}/${año}`;

  // Obtener el usuario actual de Firebase Authentication
  const user = auth.currentUser;
  if (!user) {
    alert("No estás autenticado.");
    return; // Salir si no hay usuario autenticado
  }

  // Obtener el nombre de usuario desde la colección "usuarios" en Firestore
  const userDocRef = doc(db, "usuarios", user.uid);
  const userDocSnap = await getDoc(userDocRef);

  if (userDocSnap.exists()) {
    const usuario = userDocSnap.data().username; // Asumimos que el campo es "username"

    // Crear el objeto data con los campos del foro
    const data = {
      categoria,
      tema,
      mensaje,
      usuario,
      fecha: fechaFormateada, // Fecha de publicación
      numMensajes: 0 // Puedes agregar un contador de mensajes si lo deseas
    };

    let foroRef;
    if (id === "") {
      // Si no hay ID, agregamos un nuevo foro a la colección
      foroRef = await addDoc(colecforos, data);
    } else {
      // Si hay ID, actualizamos el foro existente
      const docRef = doc(db, "foros", id);
      await updateDoc(docRef, data);
      foroRef = docRef; // Para agregar el foro ya actualizado al DOM
    }

    // Limpiar los campos del formulario
    document.querySelector("#id").value = "";
    document.querySelector("#opciones").value = "";
    document.querySelector("#tema").value = "";
    document.querySelector("#mensaje").value = "";

    // Obtener el foro recién creado para agregarlo al DOM
    const nuevoForo = await getDoc(foroRef);
    const foroData = nuevoForo.data();

    // Crear el HTML que se va a añadir al DOM
    const nuevoForoHTML = `
      <div class="foro">
        <div class="tema" onclick="mostrar(this)">
          <h3>${foroData.tema}</h3>
          <span class="nomensajes">
            No. Mensajes: ${foroData.numMensajes}
          </span>
          <span class="usuario">
            <img src="../Assets/img/svg/icons/User.svg">
            <p>${foroData.usuario}</p>
          </span>
        </div>
        <div class="d oculto">
          <img class="bookmark" src="../Assets/img/png/bookmark.png" onclick="cerrar(this)">
          <div class="title">
            <h3>${foroData.tema}</h3>
          </div>
          <div class="discusion">
            <div class="user">
              <img src="../Assets/img/svg/icons/User.svg" alt="">
              <h4>${foroData.usuario}</h4>
            </div>
            <div class="message">
              <div class="fecha">
                <p id="fecha"><b>Fecha de Publicación: ${foroData.fecha}</b></p>
              </div>
              <div class="mensaje">
                <p>${foroData.mensaje}</p>
              </div>
            </div>
          </div>
          <div class="oculto">
            <input type="text" placeholder="Responder">
            <button class="send">
              <img src="../Assets/img/png/play-button.png" alt="">
            </button>
          </div>
          <div class="legend">
            <p>
              <b>
                <a class="linkcuentaB" href="../HTML/iniciarsesion.html">Inicia sesión</a> o
                <a class="linkcuentaB" href="../HTML/registro.html">regístrate</a>
              </b> para poder guardar este foro y participar en él.
            </p>
          </div>
        </div>
      </div>
    `;

    // Verificar la categoría seleccionada y agregar el foro al contenedor correspondiente
    let contenedor;
    if (categoria === '1') {
      contenedor = document.getElementById('Cuidadodeplantas');
    } else if (categoria === '2') {
      contenedor = document.getElementById('Manualidades');
    } else if (categoria === '3') {
      contenedor = document.getElementById('3R');
    }

    if (contenedor) {
      contenedor.innerHTML += nuevoForoHTML; // Agregar el nuevo foro al final del contenido existente
    }

    alert("Foro publicado correctamente.");
  } else {
    console.error("El documento de usuario no existe.");
  }
});


function mostrarForo({ tema, usuario, numMensajes, fecha, mensaje }) {
  return `
    <div class="foro">
      <div class="tema" onclick="mostrar(this)">
        <h3>${tema}</h3>
        <span class="nomensajes">No. Mensajes: ${numMensajes}</span>
        <span class="usuario">
          <img src="../Assets/img/svg/icons/User.svg">
          <p>${usuario}</p>
        </span>
      </div>
      <div class="d oculto">
        <img class="bookmark" src="../Assets/img/png/bookmark.png" onclick="cerrar(this)">
        <div class="title">
          <h3>${tema}</h3>
        </div>
        <div class="discusion">
          <div class="user">
            <img src="../Assets/img/svg/icons/User.svg" alt="">
            <h4>${usuario}</h4>
          </div>
          <div class="message">
            <div class="fecha">
              <p id="fecha"><b>Fecha de Publicación: ${fecha}</b></p>
            </div>
            <div class="mensaje">
              <p>${mensaje}</p>
            </div>
          </div>
        </div>
        <div id="coment" class="oculto">
          <input type="text" placeholder="Responder">
          <button class="send">
            <img src="../Assets/img/png/play-button.png" alt="">
          </button>
        </div>
        <div class="legend">
          <p>
            <b>
              <a class="linkcuentaB" href="../HTML/iniciarsesion.html">Inicia sesión</a> o
              <a class="linkcuentaB" href="../HTML/registro.html">regístrate</a>
            </b> para poder guardar este foro y participar en él.
          </p>
        </div>
      </div>
    </div>
  `;
}

// Función para escuchar cambios en los foros
onSnapshot(colecforos, (snapshot) => {
  snapshot.forEach((doc) => {
    const foroData = doc.data();
    const foroHTML = mostrarForo(foroData);

    let contenedor;
    if (foroData.categoria === '1') {
      contenedor = document.getElementById('Cuidadodeplantas');
    } else if (foroData.categoria === '2') {
      contenedor = document.getElementById('Manualidades');
    } else if (foroData.categoria === '3') {
      contenedor = document.getElementById('3R');
    }

    if (contenedor) {
      contenedor.innerHTML += foroHTML;

    }
  });
});

































const loginCheck = (user) => {
  if (user) {
    // Si hay un usuario autenticado
    panel.classList.remove("oculto");
    panel.classList.add("panelcontrol");

    info.classList.remove("mssg");
    info.classList.add("oculto");

    // Iterar sobre los elementos de conve y aplicar las clases




  } else {
    // Si el usuario no está autenticado
    panel.classList.remove("panelcontrol");
    panel.classList.add("oculto");

    info.classList.remove("oculto");
    info.classList.add("mssg");

    // Iterar sobre los elementos de conve y aplicar las clases invertidas


  }
}
