
//Esta funcion es para mostrar los foros en una seccion nueva
function mostrar(elemento) {
    document.querySelectorAll('.d').forEach(discusion => {
        discusion.classList.remove('temaAbierto');
        discusion.classList.add('oculto');
    });

    const discusion = elemento.nextElementSibling;
    if (discusion) {
        discusion.classList.remove('oculto');
        discusion.classList.add('temaAbierto');
    }
}
//Cerrar el foro
function cerrar(elemento) {
    const discusion = elemento.closest('.d');
    if (discusion) {
        discusion.classList.remove('temaAbierto');
        discusion.classList.add('oculto');
    }
}

//Crear un nuevo tema
function abrirP() {
    const panel = document.getElementById('panel');
    const info = document.getElementById('IR');
    const conve = document.getElementById('coment');
    const legend = document.getElementById('legend');


    // Alternar las clases para el panel
    panel.classList.toggle('oculto');
    panel.classList.toggle('panelcontrol');

    // Alternar las clases para el mensaje
    info.classList.toggle('mssg');
    info.classList.toggle('oculto');

    conve.classList.toggle('oculto');
    conve.classList.toggle('commit');

    legend.classList.toggle('oculto');
    legend.classList.toggle('legend');




}





// function publicar() {

//     const fechaActual = new Date();
//     const dia = fechaActual.getDate();
//     const mes = fechaActual.getMonth() + 1; // Los meses empiezan desde 0
//     const año = fechaActual.getFullYear();

//     // Formatear la fecha en formato "DD/MM/YYYY"
//     const fechaFormateada = `${dia < 10 ? '0' + dia : dia}/${mes < 10 ? '0' + mes : mes}/${año}`;

//     const categoria = document.getElementById('opciones').value;
//     const titulo = document.getElementById('tema').value;
//     const mensaje = document.getElementById('mensaje').value;

//     // Asegurarse de que se haya seleccionado una categoría y que el título y el mensaje no estén vacíos
//     if (!titulo || !mensaje) {
//         alert("Por favor, completa todos los campos.");
//         return;
//     }

//     // Crear el HTML que se va a añadir
//     const nuevoForoHTML = `
//         <div class="foro">
//             <div class="tema" onclick="mostrar(this)">
//                 <h3>${titulo}</h3>
//                 <span class="nomensajes">
//                       No. Mensajes: 
//                 </span>
//                 <span class="usuario">
//                     <img src="../Assets/img/svg/icons/User.svg">
//                     <p>Nombre Usuario</p>
//                 </span>
//             </div>
//             <div class="d oculto">
//                 <img class="bookmark" src="../Assets/img/png/bookmark.png" onclick="cerrar(this)">
//                 <div class="title">
//                     <h3>${titulo}</h3>
//                 </div>
//                 <div class="discusion">
//                     <div class="user">
//                         <img src="../Assets/img/svg/icons/User.svg" alt="">
//                         <h4>Nombre usuario</h4>
//                     </div>
//                     <div class="message">
//                         <div class="fecha">
//                             <p id="fecha"><b>Fecha de Publicación: ${fechaFormateada}</b></p>
//                         </div>
//                         <div class="mensaje">
//                             <p>${mensaje}</p>
//                         </div>
//                     </div>
//                 </div>

//                 <div class="oculto">
//                     <input type="text" placeholder="Responder">
//                     <button class="send">
//                         <img src="../Assets/img/png/play-button.png" alt="">
//                     </button>
//                 </div>
//                 <div class="legend">
//                     <p>
//                         <b>
//                             <a class="linkcuentaB" href="../HTML/iniciarsesion.html">Inicia sesión</a> o
//                             <a class="linkcuentaB" href="../HTML/registro.html">regístrate</a>
//                         </b> para poder guardar este foro y participar en él.
//                     </p>
//                 </div>
//             </div>
//         </div>
//     `;

//     // Verificar la categoría seleccionada y agregar el foro al contenedor correspondiente
//     if (categoria === '1') {
//         const plantas = document.getElementById('Cuidadodeplantas');
//         plantas.innerHTML += nuevoForoHTML; // Agregar el nuevo foro al final del contenido existente
//     }
//     else if (categoria === '2') {
//         const manualidades = document.getElementById('Manualidades');
//         manualidades.innerHTML += nuevoForoHTML; // Agregar el nuevo foro al final del contenido existente
//     }
//     else if (categoria === '3') {
//         const tresR = document.getElementById('3R');
//         tresR.innerHTML += nuevoForoHTML; // Agregar el nuevo foro al final del contenido existente
//     }
// }



// //Crear un comentario

// function agregarMensaje() {
//     const fechaActual = new Date();
//     const dia = fechaActual.getDate();
//     const mes = fechaActual.getMonth() + 1; // Los meses empiezan desde 0
//     const año = fechaActual.getFullYear();

//     // Formatear la fecha en formato "DD/MM/YYYY"
//     const fechaFormateada = `${dia < 10 ? '0' + dia : dia}/${mes < 10 ? '0' + mes : mes}/${año}`;

//     //const nombreUsuario = document.getElementById('nombreUsuario').value;  // Suponiendo que tienes un input con id="nombreUsuario"
//     const mensaje = document.getElementById('comentario').value; // Suponiendo que tienes un textarea o input con id="mensaje"

//     // Validación para asegurarse de que los campos no estén vacíos
//     if (!mensaje) {
//         alert("Por favor, completa todos los campos.");
//         return;
//     }

//     // Crear el HTML del nuevo mensaje
//     const nuevoMensajeHTML = `
//      <div class="discusion">
//          <div class="user">
//            <img src="../Assets/img/svg/icons/User.svg" alt="">
//                <h4>Nombre usuario</h4>
//             </div>
//             <div class="message">
//                  <div class="fecha">
//                 <p id="fecha"><b>Fecha de Publicación: ${fechaFormateada} </b></p>
//             </div>
//             <div class="mensaje">
//                 <p>${mensaje}</p>
//             </div>
//         </div>
//     </div>
//     `;

//     // Obtener el contenedor donde agregar el nuevo mensaje
//     const contenedorConversaciones = document.getElementById('conve');

//     // Asegúrate de que el contenedor exista
//     if (contenedorConversaciones) {
//         contenedorConversaciones.innerHTML += nuevoMensajeHTML; // Agregar el nuevo mensaje al final del contenido existente
//     }
// }
