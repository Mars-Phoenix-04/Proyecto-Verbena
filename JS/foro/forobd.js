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


const colecforos = collection(db, "foros"); //Colección de foros.

document.querySelector("#publi").addEventListener("click", async function (e) {
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





