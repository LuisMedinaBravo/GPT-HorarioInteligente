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
    setTimeout(function() {
      loader.style.display = "none"; 
      container.style.display = "block";
      try {
        //get all data from horario
        getDocs(collection(db, "horario")).then(docSnap => {
          docSnap.forEach((docu) => {
            if (docu.id != "0gOlyyqOl7RHSPMP4VF1"){
              deleteDoc(doc(db, "horario", docu.id))
            }
          });
          Swal.fire({
            title: 'Borrado con éxito!',
            text: 'Todos los datos han sido borrados',
            icon: 'success',
            confirmButtonText: 'Ok'
          });
        });
      } catch (error) {
        console.log(error);
      }
    }, 10000);
  }
