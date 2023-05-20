
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";

// Importar base de datos CLOUD FIRESTORE
import {
    getFirestore,
    collection,
    onSnapshot,
    deleteDoc,
    doc,
    updateDoc,
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


let botonEdit = document.getElementById("btnEditado");
botonEdit.addEventListener("click", Editando);



async function Editando(){

    
  const nombreNuevo = document.getElementById("nombreNuevo").value;
  const celularNuevo = document.getElementById("celularNuevo").value;
  const contraseñaNuevo = document.getElementById("contraseñaNuevo").value;

  const taskDocRef = doc(db, 'horario', id)

    try{
        
      await updateDoc(taskDocRef, {
        nombre: nombreNuevo,
        celular: celularNuevo,
        clave: contraseñaNuevo
      })
  
      Swal.fire({
        title: 'Editado correctamente!',
        text: 'Guardada la nueva información',
        icon: 'success',
        confirmButtonText: 'Ok'
        //denyButtonText: `Don't save`,
      }).then((result) => {
        
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          //Swal.fire('Cuenta borrada!', '', 'success')
          
          
          window.location.href='index.html';
          
        } 
      })
  
    
    } catch (err) {
      AlertaMal()
    } 


  }



  function AlertaMal(){

    Swal.fire({
        title: 'No se pudo guardar su información nueva',
        text: 'Algo salió mal',
        icon: 'error',
        confirmButtonText: 'Ok'
      })
  
  }