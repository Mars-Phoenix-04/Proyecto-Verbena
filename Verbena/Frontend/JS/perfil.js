//Como aun no le se que pedo con la base de datos, aqui se guardan campos
//los datos viejitos del usuario
let originalUsername = '';
let originalEmail = '';
let originalPassword = '';

//Se entiende por si solo, solo habilita el campo para editar
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

//Lo mismo que en clase, checa el correo
function VerficarEM(email) {
    const papa = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return papa.test(email);
}

//Funcion para guardar los cambios de los datos
function saveChanges() {
    //Aqui nomas recupera los datos de los campos, facil? Lo es jajaja
    const Cusuario = document.getElementById('username');
    const Ccorreo = document.getElementById('email');
    const Ccontra = document.getElementById('password');

    //SI y solo SI se cambiaron los valores en los campos, aqui los recupera
    //si no hay valores nuevos, nomas toma los valores de ahi
    const newUsername = Cusuario.value;
    const newEmail = Ccorreo.value;
    const newPassword = Ccontra.value;

    //Aqui checa si cambio algun dato, una comparacion entre los nuevos datos
    //y los viejitos y los guarda en una constante (es una mousequeherramienta que nos ayudara mas tarde)
    const usernameChanged = newUsername !== originalUsername;
    const emailChanged = newEmail !== originalEmail;
    const passwordChanged = newPassword !== originalPassword;

    // Revisa el correo si es valido para que no nos salgan con datos
    // falsos y despues no puedan ingresar a su cuenta otra vez.
    if (emailChanged && !VerficarEM(newEmail)) {
        alert('Por favor ingresa un correo electrónico válido.');
        correo.focus();
        return;  
    }
    //Facil y sencillo, revisa si hubo cambios y si no hay lo regresa y todo sigue igual
    if (!usernameChanged && !emailChanged && !passwordChanged) {
        alert('No se han realizado cambios.');
        return;
    }
    //Aqui la verdad no es como que los guarde en la base de datos (porque pues falta eso)
    //Pero aqui te pregunta si quieres guardar los cambios porque ya ves que uno se equivoca,
    const confirmation = confirm('¿Deseas guardar los cambios?');
    //Si le da a okay, entonces le dice que se guardaron los datos
    if (confirmation) {
        alert('Cambios guardados correctamente.');
        //Y diras, Mars para que es esto, pues no se NTC JAJAJA
        //Vuelve a "Bloquear" los campos para que no los pueda editar y por ultimo...
        Cusuario.readOnly = true;
        Ccorreo.readOnly = true;
        Ccontra.readOnly = true;
        //En teoria actualiza los datos, pero reitero, falta ver todo es pedo de la base de datos.
        originalUsername = newUsername;
        originalEmail = newEmail;
        originalPassword = newPassword;
    }
}
