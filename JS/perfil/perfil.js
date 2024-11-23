 import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
 import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile, updateEmail, updatePassword, reauthenticateWithCredential, EmailAuthProvider } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
 import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";
 
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


// Función para cargar los datos del perfil
// Función para cargar los datos del usuario en el perfil
firebase.auth().onAuthStateChanged(async function(user) {
    if (user) {
        try {
            // Consultar la colección de usuarios en Firestore usando el correo del usuario
            const q = query(collection(db, "usuarios"), where("email", "==", user.email));
            const querySnapshot = await getDocs(q);
            
            querySnapshot.forEach((doc) => {
                const userData = doc.data();

                // Asignar los valores al formulario con datos desde Firestore
                document.getElementById('username').value = userData.username;
                document.getElementById('email').value = userData.email ;
                document.getElementById('password').value = '';  // No se debe mostrar la contraseña
            

                // Actualizar el nombre de usuario en la cabecera
                document.querySelector('.profile-header h2').textContent = userData.username;

                // Actualizar la sección de usuario
                document.getElementById('nameN').textContent = userData.username;
            });

        } catch (error) {
            console.error("Error al cargar los datos del usuario:", error);
            alert("Hubo un problema al cargar los datos. Inténtalo de nuevo.");
        }
    } else {
        // Si no hay un usuario logueado, redirigir a la página de login
        window.location.href = "../HTML/iniciarsesion.html";
    }
});

// Verificar la autenticación al cargar la página
window.onload = async function() {
    // Verifica si el usuario está autenticado
    const user = auth.currentUser;

    if (user) {
        // Si está logueado, cargar los datos del usuario
        cargarDatosUsuario();
    } else {
        // Si no está logueado, redirigir al login
        window.location.href = "../HTML/iniciarsesion.html";
    }
};


document.addEventListener('DOMContentLoaded', cargarDatosUsuario);
// Verificar la autenticación al cargar la página
window.onload = async function () {
    // Verifica si el usuario está autenticado
    const user = auth.currentUser;

    if (user) {
        // Si está logueado, cargar los datos del usuario
        cargarDatosUsuario();
    } else {
        // Si no está logueado, redirigir al login
        window.location.href = "../HTML/iniciarsesion.html";
    }
};


// Habilitar la edición de un campo
function enableEdit(fieldId) {
    const field = document.getElementById(fieldId);
    field.readOnly = false;  //Deshabilita el campo de solo lectura, para que lo puedas cambiar, facil y sencillo
    field.focus();           //Enfoca el campo xd
    //EN TEORIA, esta cosa no es necesaria ya que lo unico que hace es
    //verificar que los datos viejitos esten guardados y si no lo estan, los guarda
    //Esto es solo para prevenir, porque ahorita paso un pedo donde se borraron y aun ni
    //esta la base de datos.
    if (fieldId === 'username' && !originalUsername) originalUsername = field.value;
    else if (fieldId === 'email' && !originalEmail) originalEmail = field.value;
    else if (fieldId === 'password' && !originalPassword) originalPassword = field.value;
}


function VerficarEM(email) {
         const papa = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
         return papa.test(email);
}


// Función para guardar cambios en el perfil
async function saveChanges(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const user = auth.currentUser;

    if (user) {
        try {
            // Consultar la colección para obtener el documento del usuario logueado
            const q = query(collection(db, "usuarios"), where("email", "==", user.email));
            const querySnapshot = await getDocs(q);
            
            querySnapshot.forEach(async (doc) => {
                const userData = doc.data();
                const docId = doc.id; // Obtener el ID del documento para actualizarlo

                // Actualizar datos en Firestore
                await updateDoc(doc(db, "usuarios", docId), {
                    username: username !== userData.username ? username : userData.username,
                    email: email !== userData.email ? email : userData.email,
                    password: password ? password : userData.password,
                });

                alert('Los cambios se guardaron correctamente');
            });
        } catch (error) {
            console.error('Error al guardar los cambios:', error);
            alert('Hubo un problema al guardar los cambios. Inténtalo de nuevo.');
        }
    }
}





























// //Como aun no le se que pedo con la base de datos, aqui se guardan campos
// //los datos viejitos del usuario
// let originalUsername = '';
// let originalEmail = '';
// let originalPassword = '';

// //Se entiende por si solo, solo habilita el campo para editar
// function enableEdit(fieldId) {
//     const field = document.getElementById(fieldId);
//     field.readOnly = false;  //Deshabilita el campo de solo lectura, para que lo puedas cambiar, facil y sencillo
//     field.focus();           //Enfoca el campo xd
//     //EN TEORIA, esta cosa no es necesaria ya que lo unico que hace es
//     //verificar que los datos viejitos esten guardados y si no lo estan, los guarda
//     //Esto es solo para prevenir, porque ahorita paso un pedo donde se borraron y aun ni
//     //esta la base de datos.
//     if (fieldId === 'username' && !originalUsername) originalUsername = field.value;
//     else if (fieldId === 'email' && !originalEmail) originalEmail = field.value;
//     else if (fieldId === 'password' && !originalPassword) originalPassword = field.value;
// }

// //Lo mismo que en clase, checa el correo
// function VerficarEM(email) {
//     const papa = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return papa.test(email);
// }

// //Funcion para guardar los cambios de los datos
// function saveChanges(event) {
//     event.preventDefault();
//     //Aqui nomas recupera los datos de los campos, facil? Lo es jajaja
//     const Cusuario = document.getElementById('username');
//     const Ccorreo = document.getElementById('email');
//     const Ccontra = document.getElementById('password');
//     const profileHeader = document.querySelector('.profile-header h2');
//     const navname = document.getElementById('nameN')

//     //SI y solo SI se cambiaron los valores en los campos, aqui los recupera
//     //si no hay valores nuevos, nomas toma los valores de ahi
//     const newUsername = Cusuario.value;
//     const newEmail = Ccorreo.value;
//     const newPassword = Ccontra.value;

//     //Aqui checa si cambio algun dato, una comparacion entre los nuevos datos
//     //y los viejitos y los guarda en una constante (es una mousequeherramienta que nos ayudara mas tarde)
//     const usernameChanged = newUsername !== originalUsername;
//     const emailChanged = newEmail !== originalEmail;
//     const passwordChanged = newPassword !== originalPassword;

//     // Revisa el correo si es valido para que no nos salgan con datos
//     // falsos y despues no puedan ingresar a su cuenta otra vez.
//     if (emailChanged && !VerficarEM(newEmail)) {
//         alert('Por favor ingresa un correo electrónico válido.');
//         correo.focus();
//         return;
//     }
//     //Facil y sencillo, revisa si hubo cambios y si no hay lo regresa y todo sigue igual
//     if (!usernameChanged && !emailChanged && !passwordChanged) {
//         alert('No se han realizado cambios. Haga clic en el icono de lápiz para realizarlos y luego presione este botón para guardar.');
//         return;
//     }
//     //Aqui la verdad no es como que los guarde en la base de datos (porque pues falta eso)
//     //Pero aqui te pregunta si quieres guardar los cambios porque ya ves que uno se equivoca,
//     const confirmation = confirm('¿Deseas guardar los cambios?');
//     //Si le da a okay, entonces le dice que se guardaron los datos
//     if (confirmation) {
//         alert('Cambios guardados correctamente. Se volvera a cargar la página para reflejar los cambios, todo bien:)');
//         //Y diras, Mars para que es esto, pues no se NTC JAJAJA
//         //Vuelve a "Bloquear" los campos para que no los pueda editar y por ultimo...
//         Cusuario.readOnly = true;
//         Ccorreo.readOnly = true;
//         Ccontra.readOnly = true;
//         //En teoria actualiza los datos, pero reitero, falta ver todo es pedo de la base de datos.
//         originalUsername = newUsername;
//         originalEmail = newEmail;
//         originalPassword = newPassword;

//         profileHeader.textContent = originalUsername;
//         navname.textContent = originalUsername;


//         //Vuelve a cargar la pagina simulando que se guardan los cambios.
//         // location.reload();

//     }
// }
