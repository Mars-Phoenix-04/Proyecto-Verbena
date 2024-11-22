function mostrar() {
    document.querySelector('html').classList.remove('desbloquear');
    document.querySelector('html').classList.add('bloquear');
    document.querySelector('#popup').classList.remove('oculto');
    document.querySelector('#popup').classList.add('mostrar');
}


function validarCorreo(correo) {
    const regex = /^[a-zA-Z0-9._-]{2,}@[a-zA-Z]{2,}\.[a-zA-Z]{2,}$/;
    return regex.test(correo);
}

function register(e){
    e.preventDefault();
    const email = document.getElementById("email");
    const password = document.getElementById("password").value;
    const password2 = document.getElementById("password2").value;
    const checked = document.getElementById("checkbox").checked; // Cambiado a .checked en lugar de .value

    try {
        if (!validarCorreo(email.value)) {
            alert("Ingrese una dirección de correo válida");
            return;
        }
        if (password !== password2) {
            alert("Las contraseñas no coinciden, por favor intente de nuevo");
            return;
        }
        if (password.length < 6) {
            alert("Ingrese una contraseña de más de 5 caracteres");
            return;
        }
        if (!checked) {
            alert("Revise los términos y condiciones");
            return;
        }

        
       mostrar();
        setTimeout(() => {
            window.location.href = "../HTML/perfil.html";
            document.getElementById("form").reset();
        }, 10000);
    } catch (error) {
        console.error("Ocurrió un error en el registro:", error);
    }
};

function cerrar() {
    document.querySelector('html').classList.remove('bloquear');
    document.querySelector('html').classList.add('desbloquear');
    document.querySelector('#popup').classList.remove('mostrar');
    document.querySelector('#popup').classList.add('oculto');
    window.location.href = "../HTML/perfil.html"; 
  
    window.onload = function() {
        // Verificar si los datos existen en localStorage
        const nombreUsuarioGuardado = localStorage.getItem('nombreUsuario').value;
        const correoElectronicoGuardado = localStorage.getItem('correoElectronico');
    
        // Si los datos existen, cargarlos en los campos correspondientes
        if (nombreUsuarioGuardado && correoElectronicoGuardado) {
            const usernameElement = document.getElementById('username');
            const profileHeader = document.querySelector('.profile-header h2');
            const emailElement = document.querySelector('.profile-info #email');
    
            // Asignar los valores al perfil
            if (usernameElement && profileHeader && emailElement) {
                usernameElement.placeholder = nombreUsuarioGuardado;
                profileHeader.textContent = nombreUsuarioGuardado;
                emailElement.placeholder = correoElectronicoGuardado;
            }
        }
    };
    
}
