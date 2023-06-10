export function AlertaBien() {

    Swal.fire({
        title: 'Sesión iniciada!',
        text: 'Bienvenido(a)',
        icon: 'success',
        allowOutsideClick: false,
        confirmButtonText: 'Continuar'
    }).then((result) => {
        if (result.isConfirmed) {
            window.location.href = 'perfilEstudiante.html';


        }
    })
};

export function AlertaMal() {

    Swal.fire({
        title: 'No se pudo iniciar sesión!',
        text: 'Usuario y/o contraseña incorrectos',
        icon: 'error',
        allowOutsideClick: false,
        confirmButtonText: 'Ok'
    })

};

export function AlertaCamposVacios() {

    Swal.fire({
        title: 'No se pudo iniciar sesión!',
        text: 'Campo(s) vacío(s)',
        icon: 'error',
        allowOutsideClick: false,
        confirmButtonText: 'Ok'
    })
};
export function AlertaCorreosIguales() {

    Swal.fire({
        title: 'No Registrado!',
        text: 'Correo ya existe, ingrese otro correo institucional...',
        icon: 'error',
        confirmButtonText: 'Ok'
    })

};

export function AlertaAceptada(titulo, texto) {

    Swal.fire({
        title: titulo,
        text: texto,
        icon: 'success',
        allowOutsideClick: false,
        confirmButtonText: 'Continuar'
    })
};