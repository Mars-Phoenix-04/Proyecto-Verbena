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




const colecforos = collection(db, "foros"); // Colección de foros.

document.querySelector("#publi").addEventListener("click", async function (e) {
  e.preventDefault();

  const id = document.querySelector("#id").value; // id que se utiliza en Firebase.
  const categoria = document.querySelector("#opciones").value;
  const tema = document.querySelector("#tema").value;
  const mensaje = document.querySelector("#mensaje").value;

  // Obtener el usuario actual de Firebase Authentication
  const user = auth.currentUser;
  if (!user) {
    alert("No estás autenticado.");
    return; // Salir si no hay usuario autenticado.
  }

  // Obtener el nombre de usuario desde la colección "usuarios" en Firestore
  const userDocRef = doc(db, "usuarios", user.uid);
  const userDocSnap = await getDoc(userDocRef);

  if (userDocSnap.exists()) {
    const usuario = userDocSnap.data().username; // Asumimos que el campo es "username"

    const data = { categoria, tema, mensaje, usuario }; // Crea un objeto data que contiene los valores del formulario.

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
    document.querySelector("#opciones").value = "";
    document.querySelector("#tema").value = "";
    document.querySelector("#mensaje").value = "";
    // document.querySelector("#form").reset(); // Puedes usar esta línea si deseas limpiar el formulario completo
  } else {
    console.error("El documento de usuario no existe.");
  }
});












const panel = document.getElementById('panel');
const info = document.getElementById('IR');
const conve = document.querySelectorAll('#coment');
const legend = document.querySelectorAll('.legend');





const loginCheck = (user) => {
  if (user) {
    // Si hay un usuario autenticado
    panel.classList.remove("oculto");
    panel.classList.add("panelcontrol");

    info.classList.remove("mssg");
    info.classList.add("oculto");

    // Iterar sobre los elementos de conve y aplicar las clases
    conve.forEach((coment) => {
      coment.classList.remove("oculto");
      coment.classList.add("commit");
    });

    // Iterar sobre los elementos de legend y aplicar las clases
    legend.forEach((leg) => {
      leg.classList.remove("legend");
      leg.classList.add("oculto");
    });

  } else {
    // Si hay un usuario autenticado (invertido)
    panel.classList.remove("panelcontrol");
    panel.classList.add("oculto");

    info.classList.remove("oculto");
    info.classList.add("mssg");

    // Iterar sobre los elementos de conve y aplicar las clases invertidas
    conve.forEach((coment) => {
      coment.classList.remove("commit");
      coment.classList.add("oculto");
    });

    // Iterar sobre los elementos de legend y aplicar las clases invertidas
    legend.forEach((leg) => {
      leg.classList.remove("oculto");
      leg.classList.add("legend");
    });



  }
}