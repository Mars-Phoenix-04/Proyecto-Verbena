// Importa Firestore y Firebase
import { db, auth } from "../credenciales";


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


// Eliminación de publicaciones de Firebase
document.getElementById("foro-publicacion").addEventListener("click", async function (e) {
  if (e.target && e.target.classList.contains("btnBorrar")) {
    Swal.fire({
      title: "¿Está seguro de eliminar la publicación?",
      text: "¡Esta operación no se puede revertir!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Borrar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        let tr = e.target.closest("div.foro"); // Identificar el contenedor del tema
        let id = tr.id; // Obtener el ID del tema (debe ser asignado en Firebase)

        // Eliminar la publicación de Firebase
        const docRef = doc(db, "publicaciones", id); // Asegúrate de tener la colección correcta
        await deleteDoc(docRef);

        // Mostrar el mensaje de éxito con SweetAlert2
        Swal.fire("¡Eliminado!", "La publicación ha sido eliminada.", "success");
      }
    });
  }
});

// Función para mostrar las publicaciones del foro
function mostrarPublicaciones({ tema, mensaje, usuario, fecha }) {
  return `
    <div class="tema" id="${tema.id}">
      <h3>${tema}</h3>
      <span class="nomensajes">No. Mensajes: ${mensaje.length}</span>
      <span class="usuario">
        <img src="../Assets/img/svg/icons/User.svg">
        <p>${usuario}</p>
      </span>
      <button class="btnBorrar btn btn-danger" data-toggle="tooltip" title="Borrar">Eliminar</button>
    </div>
  `;
}

// Escuchar cambios en las publicaciones en Firebase
import { onSnapshot, collection } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

const coleccionPublicaciones = collection(db, "publicaciones"); // Asegúrate de usar la colección de publicaciones

onSnapshot(coleccionPublicaciones, (snapshot) => {
  const foros = document.getElementById("foro-publicacion"); // Contenedor de foros en el HTML
  foros.innerHTML = ""; // Limpiar los foros antes de agregar los actualizados

  snapshot.forEach((doc) => {
    const foroDiv = document.createElement("div");
    foroDiv.id = doc.id; // Asigna el ID de la publicación
    foroDiv.innerHTML = mostrarPublicaciones(doc.data()); // Muestra la publicación usando la función
    foros.appendChild(foroDiv);
  });
});

// Función para agregar un nuevo mensaje (Ejemplo de cómo podrías implementar)
function agregarMensaje() {
  const comentario = document.getElementById("comentario").value;
  if (comentario.trim()) {
    // Aquí agregarías el código para subir el comentario a Firebase en la colección de mensajes
    // Ejemplo:
    // const nuevoComentario = {
    //   comentario: comentario,
    //   usuario: "Nombre Usuario",
    //   fecha: new Date().toLocaleDateString()
    // };
    // const docRef = await addDoc(collection(db, "comentarios"), nuevoComentario);
    console.log("Nuevo comentario agregado:", comentario);
  }
}

// Mostrar tema completo al hacer clic
function mostrar(elemento) {
  const contenedor = elemento.nextElementSibling; // El contenedor oculto con la discusión
  contenedor.classList.toggle("oculto"); // Alterna la visibilidad del contenido
  // Actualiza el estado del bookmark u otras interacciones aquí si es necesario
}

// Función para cerrar la discusión
function cerrar(elemento) {
  const contenedor = elemento.closest(".foro").querySelector(".d");
  contenedor.classList.add("oculto"); // Oculta la discusión
}
