/* CONEXION FIREBASE */


import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";

import {
    getFirestore,
    collection,
    getDocs,
    deleteDoc,
    doc 
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

let botonBorrar = document.getElementById("delete-btn");
botonBorrar.addEventListener("click", Borrar);


//const taskForm = document.getElementById('taskFormAdmin')

function Borrar() {

  var container = document.getElementById("container");
  container.style.display = "none";
  var loader = document.getElementById("loader");
  loader.style.display = "block"; // Muestra la pantalla de carga
  loader.style.width = "100%";

  try {
    //get all data from horario
    getDocs(collection(db, "horario")).then(docSnap => {
      docSnap.forEach((docu) => {
          deleteDoc(doc(db, "horario", docu.id));
        
      });
    });

     // Ocultar la pantalla de carga y mostrar SweetAlert
     loader.style.display = "none";
     Swal.fire({
       title: 'Borrado con éxito!',
       text: 'Todos los datos han sido borrados',
       icon: 'success',
       confirmButtonText: 'Ok'
     }).then(() => {
       // Hacer cualquier otra cosa que necesites después de mostrar SweetAlert
       
     });
     //var container = document.getElementById("container");
     container.style.display = "block";
     //var loader = document.getElementById("loader");
     //loader.style.display = "none";
     // Mostrar el botón de continuar y agregar el evento click
     const botonContinuar = document.getElementById('continuar');
     botonContinuar.style.display = 'block';
     botonContinuar.addEventListener('click', Continuar);

     // Ocultar el botón de importar
     const botonBorrar = document.getElementById('delete-btn');
     botonBorrar.style.display = 'none';

     function Continuar(){
       window.location.href = "vistasSalas_administrador.html?&sala=SALA%2011";
     }
   
  } catch (error) {
    console.log(error);
  }
}
