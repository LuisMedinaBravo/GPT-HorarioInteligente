
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";

// Importar base de datos CLOUD FIRESTORE
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
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

export const saveTask = (nombre, correo, clave) => {

  try {
    addDoc(collection(db, 'estudiante'), { nombre, correo, clave });
    AlertaBien();
  } catch {
    AlertaMal();
  }
}

const taskForm = document.getElementById('taskFormRegistroEst')


const nombre = taskForm['username']
const correo = taskForm['email']
const clave = taskForm['password']
const reingresoclave = taskForm['password2']



let botonRegistroEst = document.getElementById("button");
botonRegistroEst.addEventListener("click", botonRegistrar);


function botonRegistrar() {


  getDocs(collection(db, "estudiante")).then(docSnap => {

    let users = [];
    var n = 0
    var listo2 = 0;
    var no = 0;


    docSnap.forEach((doc) => {
      users.push({ ...doc.data(), id: doc.id })


      try {

        //validar campos vacios
        if (nombre.value == '' || correo.value == '' || clave.value == '' || reingresoclave.value == '' && listo2 == 0) {

          AlertaCamposVacios();

        } else {

          if (no == 0 && listo2 == 0) {


            if (/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test((correo.value))) {
              if (clave.value == reingresoclave.value) {
                if (clave.value.length >= 8) {
                  localStorage.setItem('name', nombre.value);
                  saveTask(nombre.value, correo.value, clave.value)

                  listo2 = 1;
                } else {
                  AlertaContraseñaMal();
                  taskForm.reset();

                }
              } else {
                AlertaContraseñasDistintas();
                taskForm.reset();

              }





            } else {
              AlertaCorreoMal();
              taskForm.reset();

            }
          } else if (users[n]['correo'] == correo.value) {


            AlertaCorreosIguales();
            listo2 = 1;
            taskForm.reset();


          }

        }


      } catch {
        AlertaMal();
        taskForm.reset();

      }

      n++;
    });

  });

}



function AlertaBien() {

  Swal.fire({
    title: 'Registrado!',
    text: 'Estudiante guardado correctamente',
    icon: 'success',
    confirmButtonText: 'Iniciar sesión'
  }).then((result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {
      //Swal.fire('Saved!', '', 'success')
      //window.open('iniciosesion.html','_blank');
      window.location.href = 'perfilEstudiante.html';
    }
  })
}

function AlertaMal() {

  Swal.fire({
    title: 'No Registrado!',
    text: 'Algo salió mal',
    icon: 'error',
    confirmButtonText: 'Ok'
  })
}

function AlertaCamposVacios() {

  Swal.fire({
    title: 'No Registrado!',
    text: 'Campo(s) no rellenado(s)',
    icon: 'error',
    confirmButtonText: 'Ok'
  })
}

function AlertaCorreoMal() {

  Swal.fire({
    title: 'No Registrado!',
    text: 'Correo mal ingresado',
    icon: 'error',
    confirmButtonText: 'Ok'
  })
}
function AlertaContraseñasDistintas() {

  Swal.fire({
    title: 'No Registrado!',
    text: 'Las contraseñas son distintas',
    icon: 'error',
    confirmButtonText: 'Ok'
  })
}

function AlertaContraseñaMal() {

  Swal.fire({
    title: 'No Registrado!',
    text: 'La contraseña debe tener al menos 8 caracteres ',
    icon: 'error',
    confirmButtonText: 'Ok'
  })
}

function AlertaCorreosIguales() {

  Swal.fire({
    title: 'No Registrado!',
    text: 'Correo ya existe, ingrese otro correo institucional...',
    icon: 'error',
    confirmButtonText: 'Ok'
  })

}