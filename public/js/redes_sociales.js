function Instagram() {


  window.open('https://www.instagram.com/ingenieriautalca/', '_blank');
}

function Facebook() {


  window.open('https://www.facebook.com/ingenieriautalcacurico', '_blank');
}

function Youtube() {


  window.open('https://www.youtube.com/user/canalUtalca', '_blank');
}

function Twitter() {


  window.open('https://twitter.com/ingUtalca', '_blank');
}

function Utalca() {


  window.open('https://www.utalca.cl/', '_blank');
}

// Cerrar sesión
/* 
  let Cerrar = document.getElementById("CerrarSesion");
  Cerrar.addEventListener("click", CerrarSesion); */


function CerrarSesion() {
  Swal.fire({

    title: 'Cerrar Sesión',
    text: '¿estás seguro(a)?',
    icon: 'warning',
    confirmButtonText: 'Sí',
    showCancelButton: true,
    cancelButtonText: 'No',

  }).then((result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {

      localStorage.clear();
      window.location.href = 'index.html';

    }

  })
}

function inicio() {
  //Obtenemos la ultima parte de la url
  const location = window.location.href.substring(window.location.href.lastIndexOf('/') + 1);
  //Si no estamos en el inicio nos movemos al inicio
  if (location != 'perfilEstudiante.html'){
    console.log("caca")
    window.location.href = 'perfilEstudiante.html';
  }

}

function inicio2() {
  
    window.location.href = 'perfilEstudiante.html';

}