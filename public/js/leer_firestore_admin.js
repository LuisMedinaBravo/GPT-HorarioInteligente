/* CONEXION FIREBASE */


import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";

import {
  getFirestore,
  collection,
  getDocs
} from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js";



// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCKdwinLMIaVlJ6mkJuTo6aL4wy8J4tDEQ",
  authDomain: "gpt-horariointeligente.firebaseapp.com",
  projectId: "gpt-horariointeligente",
  storageBucket: "gpt-horariointeligente.appspot.com",
  messagingSenderId: "87795108895",
  appId: "1:87795108895:web:294c2c36d200e36c15d92a"
};


const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
// FIN CONEXION FIREBASE


const taskForm = document.getElementById('taskFormAdmin')


try {

  const usuario = taskForm['username']
  const contraseña = taskForm['password']
  let botonAdm = document.getElementById("button");
  botonAdm.addEventListener("click", listar);


  function listar() {

    //get all data
    getDocs(collection(db, "admin")).then(docSnap => {

      let users = [];

      var listo = 0;
      var n = 0



      docSnap.forEach((doc) => {

        users.push({ ...doc.data(), id: doc.id })

        if (usuario.value == '' || contraseña.value == '') {
          AlertaCamposVacios();
        } else {

          if (usuario.value == users[n]['nombre'] && contraseña.value == users[n]['clave'] && listo == 0) {


            AlertaBien();
            listo = 1;

          } else {

            if (listo != 1) {
              //console.log("MALLLL");
              AlertaMal();
              
            }

          }
        }
        n++;
      });


    });
     
  }

} catch (error) {


}


function AlertaBien() {

  Swal.fire({
    title: 'Sesión iniciada!',
    text: 'Bienvenido(a)',
    icon: 'success',
    allowOutsideClick: false,
    confirmButtonText: 'Continuar'
    //denyButtonText: `Don't save`,
  }).then((result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {
      //Swal.fire('Saved!', '', 'success')
      window.location.href = 'testTabla.html';


    }
  })
}

function AlertaMal() {

  Swal.fire({
    title: 'No se pudo iniciar sesión!',
    text: 'Usuario y/o contraseña incorrectos',
    icon: 'error',
    allowOutsideClick: false,
    confirmButtonText: 'Ok'
  })

}

function AlertaCamposVacios() {

  Swal.fire({
    title: 'No se pudo iniciar sesión!',
    text: 'Campo(s) vacío(s)',
    icon: 'error',
    allowOutsideClick: false,
    confirmButtonText: 'Ok'
  })
}

