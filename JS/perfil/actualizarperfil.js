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

let username = '';
let password = "";
let email = "";

const NUS = document.getElementById("NUS");
const navname = document.getElementById('nameN');
const Cusuario = document.getElementById('username');
const Ccorreo = document.getElementById('email');
const Ccontra = document.getElementById('password');

auth.onAuthStateChanged((user) => {
    if (user) {
        const uid = user.uid; // Obtener UID de Firebase Authentication

        // Obtener directamente el documento de Firestore usando el UID
        const docRef = doc(db, 'usuarios', uid);
        getDoc(docRef).then(docSnap => {
            if (docSnap.exists()) {
                const data = docSnap.data();
                username = data.username;
                password = data.password;
                email = data.email;

                // Actualizar la interfaz con los datos del usuario
                NUS.textContent = username;
                navname.textContent = username;
                Cusuario.placeholder = username;
                Ccorreo.placeholder = email;
                Ccontra.placeholder = password;
            } else {
                console.log("El documento no existe en Firestore");
            }
        }).catch(error => {
            console.error("Error al obtener el documento de Firestore: ", error);
        });
    } else {
        console.log("No está logueado");
    }
});

let Nusername = '';
let Npassword = "";
let Nemail = "";

// Esta es la función para hacer que los campos sean editables
document
    .getElementById("Form")
    .addEventListener("click", function (e) {
        if (e.target && e.target.classList.contains("edit")) {
            let svg = e.target;
            let input = svg.closest('.form-group').querySelector('input');
            input.readOnly = false;

            Nusername = document.getElementById("username").value;
            Nemail = document.getElementById("email").value;
            Npassword = document.getElementById("password").value;

            console.log("Campos cargados:", { Nusername, Nemail, Npassword });
        }
    });

// Asumiendo que tienes un botón para guardar los cambios
document.getElementById("saveButton").addEventListener("click", saveChanges);

async function saveChanges(event) {
    event.preventDefault();

    const usernameN = Nusername;
    const emailN = Nemail;
    const passwordN = Npassword;

    const user = auth.currentUser;

    if (user) {
        try {
            const uid = user.uid;
            const docRef = doc(db, 'usuarios', uid);

            // Obtener el documento desde Firestore
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                const data = docSnap.data();

                // Verificar que el uid de Firebase Authentication coincide con el uid de Firestore
                if (data.uid === uid) {
                    // Actualizamos los datos en Firestore
                    const updatedData = {
                        username: usernameN,
                        email: emailN,
                    };

                    await updateDoc(docRef, updatedData);
                    console.log("Documento actualizado con éxito en Firestore");

                    // Actualizamos la contraseña en Firebase Authentication, si es necesario
                    if (passwordN) {
                        await user.updatePassword(passwordN);
                        console.log("Contraseña actualizada con éxito en Firebase Authentication");
                    }

                    // Actualizamos el correo electrónico en Firebase Authentication, si es necesario
                    if (emailN && emailN !== user.email) {
                        await user.updateEmail(emailN);
                        console.log("Correo electrónico actualizado con éxito en Firebase Authentication");
                    }

                    // Actualizar la interfaz sin recargar la página
                    NUS.textContent = usernameN;
                    navname.textContent = usernameN;
                    Cusuario.placeholder = usernameN;
                    Ccorreo.placeholder = emailN;
                    Ccontra.placeholder = passwordN || Ccontra.placeholder;

                    console.log("Datos actualizados en la interfaz de usuario");

                } else {
                    console.log("UID no coincide entre Firestore y Firebase Authentication.");
                }
            } else {
                console.log("El documento no existe en Firestore");
            }
        } catch (error) {
            console.error("Error al actualizar el documento: ", error);
        }
    } else {
        console.log("Usuario no autenticado");
    }
}


// Verificar formato de correo
function VerificarEM(email) {
    const papa = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return papa.test(email);
}





//Funcion de logout
const logout = document.querySelector("#logout");

logout.addEventListener('click', e => {
    e.preventDefault();
    auth.signOut().then(() => {
        const fuga = confirm('¿Estás seguro que deseas salir?');
        if (fuga) {
            // window.location.href = "../index.html";
            window.location.reload();
            console.log("Sirvio")
        }
    })

});




































// // //Se entiende por si solo, solo habilita el campo para editar
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

// //Funcion para guardar los cambios de los datos
// function saveChanges(event) {
//     event.preventDefault();
//     //     //Aqui nomas recupera los datos de los campos, facil? Lo es jajaja

//     //     //SI y solo SI se cambiaron los valores en los campos, aqui los recupera
//     //     //si no hay valores nuevos, nomas toma los valores de ahi
//     const newUsername = Cusuario.value;
//     const newEmail = Ccorreo.value;
//     const newPassword = Ccontra.value;

//     //     //Aqui checa si cambio algun dato, una comparacion entre los nuevos datos
//     //     //y los viejitos y los guarda en una constante (es una mousequeherramienta que nos ayudara mas tarde)
//     const usernameChanged = newUsername !== originalUsername;
//     const emailChanged = newEmail !== originalEmail;
//     const passwordChanged = newPassword !== originalPassword;

//     //     // Revisa el correo si es valido para que no nos salgan con datos
//     //     // falsos y despues no puedan ingresar a su cuenta otra vez.
//     if (emailChanged && !VerficarEM(newEmail)) {
//         alert('Por favor ingresa un correo electrónico válido.');
//         correo.focus();
//         return;
//     }
//     //     //Facil y sencillo, revisa si hubo cambios y si no hay lo regresa y todo sigue igual
//     if (!usernameChanged && !emailChanged && !passwordChanged) {
//         alert('No se han realizado cambios. Haga clic en el icono de lápiz para realizarlos y luego presione este botón para guardar.');
//         return;
//     }
//     //     //Aqui la verdad no es como que los guarde en la base de datos (porque pues falta eso)
//     //     //Pero aqui te pregunta si quieres guardar los cambios porque ya ves que uno se equivoca,
//     const confirmation = confirm('¿Deseas guardar los cambios?');
//     //     //Si le da a okay, entonces le dice que se guardaron los datos
//     if (confirmation) {
//         alert('Cambios guardados correctamente. Se volvera a cargar la página para reflejar los cambios, todo bien:)');
//         //Y diras, Mars para que es esto, pues no se NTC JAJAJA
//         //         //Vuelve a "Bloquear" los campos para que no los pueda editar y por ultimo...
//         Cusuario.readOnly = true;
//         Ccorreo.readOnly = true;
//         Ccontra.readOnly = true;
//         //         //En teoria actualiza los datos, pero reitero, falta ver todo es pedo de la base de datos.
//         originalUsername = newUsername;
//         originalEmail = newEmail;
//         originalPassword = newPassword;

//         profileHeader.textContent = originalUsername;
//         navname.textContent = originalUsername;


//         //         //Vuelve a cargar la pagina simulando que se guardan los cambios.

//     }
// }

