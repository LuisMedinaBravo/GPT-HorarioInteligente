/* CONEXION FIREBASE */

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  where,
} from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js";
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
/* FIN CONEXION FIREBASE */

const auth = firebase.auth();
auth.useDeviceLanguage();


const taskForm = document.getElementById('taskFormAdmin')


try {

  const correo = taskForm['username']
  const contraseña = taskForm['password']
  let botonUsuario = document.getElementById("button");
  botonUsuario.addEventListener("click", listar);


  // Función para registrar un nuevo usuario
  function signUp() {
    // var email = document.getElementById("email").value;
    // var password = document.getElementById("password").value;
  
    // Crear un usuario con correo electrónico y contraseña
    auth.createUserWithEmailAndPassword(correo.value, contraseña.value)
      .then(function (user) {
        // Enviar correo electrónico de verificación
        //sendVerificationEmail();
        // Verificar si el usuario está autenticado
        
      })
      .catch(function (error) {

        // Manejar errores
        var errorCode = error.code;
        var errorMessage = error.message;
        console.error(errorMessage);
      });

      var user = firebase.auth().currentUser;
      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          user.reload().then(function() {
            if (user.emailVerified) {

              AlertaBien();
              // El correo electrónico del usuario ha sido verificado
            } else {
              AlertaNoVerificado();
              // El correo electrónico del usuario aún no ha sido verificado
            }
          });
        }
      });
        
    
  }





  let users = [];

  async function listar() {

    var loader = document.getElementById("loader");
    taskForm.classList.toggle("fade"); //Ocultamos el formulario
    loader.style.display = "block"; // Muestra el loader 
    const q = query(collection(db, "estudiante"), where("correo", "==", correo.value), where("clave", "==", contraseña.value));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.size == 0) {
      
      AlertaMal();
      loader.style.display = "none"; // Quitamos loader
      taskForm.classList.toggle("fade"); //Mostramos formulario
      return 0;

    }

    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
      // Guardamos en el local storage el nombre y todo lo del usuario.
      localStorage.setItem(doc.id, JSON.stringify(doc.data()));
      localStorage.setItem('nombre', doc.data().nombre);

    });
    loader.style.display = "none"; // Quitamos loader
    signUp();
    
    taskForm.classList.toggle("fade"); //Mostramos formulario

  }

} catch (error) {

}


function AlertaBien(){

  Swal.fire({
      title: 'Sesión iniciada!',
      text: 'Bienvenido(a)',
      allowOutsideClick: false,
      icon: 'success',
      confirmButtonText: 'Continuar'
      //denyButtonText: `Don't save`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        //Swal.fire('Saved!', '', 'success')
        //window.location.href='miperfil.html';
        const ventana = window.open("perfilEstudiante.html");
        ventana.addEventListener("DOMContentLoaded", function () {
        //this.alert("Ventana abierta lista!" + nombre);
        ventana.establecerMensaje(nombre,matricula,carrera,correo);


        
        });
        
      } 
    })
}

function AlertaMal(){

  Swal.fire({
      title: 'No se pudo iniciar sesión!',
      text: 'Usuario y/o contraseña incorrectos',
      icon: 'error',
      confirmButtonText: 'Ok'
    })

}

function AlertaCamposVacios(){

  Swal.fire({
      title: 'No se pudo iniciar sesión!',
      text: 'Campo(s) vacío(s)',
      icon: 'error',
      confirmButtonText: 'Ok'
    })
}


function AlertaNoVerificado(){

Swal.fire({
    title: 'No se pudo iniciar sesión!',
    text: 'No has verificado tu correo',
    icon: 'error',
    confirmButtonText: 'Ok'
  })
}