function Instagram(){


    window.open('https://www.instagram.com/ingenieriautalca/','_blank');
  }

  function Facebook(){


    window.open('https://www.facebook.com/ingenieriautalcacurico','_blank');
  }

  function Youtube(){


    window.open('https://www.youtube.com/user/canalUtalca','_blank');
  }

  function Twitter(){


    window.open('https://twitter.com/ingUtalca','_blank');
  }

  function Utalca(){

   
    window.open('https://www.utalca.cl/','_blank');
  }

  // Cerrar sesión

  let Cerrar = document.getElementById("CerrarSesion");
  Cerrar.addEventListener("click", CerrarSesion);
    

  function CerrarSesion(){


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
          
          window.location.href='index.html';
          
          
        }
         
      })
}