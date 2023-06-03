/* CONEXION FIREBASE */
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
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

const taskForm = document.getElementById('taskFormRegistroEst')
const nombre = taskForm['username']
const correo = taskForm['email']
const clave = taskForm['password']
const reingresoclave = taskForm['password2']

let botonRegistroEst = document.getElementById("button");
botonRegistroEst.addEventListener("click", botonRegistrar);

//Tiene que ser async para que espere las comprobaciones del email
async function botonRegistrar() {
  try {
    //Validamos campos
    if (campos_rellenados() &&
      email_formato_valido() &&
      clave_8chars() &&
      reingreso_clave_valido()) {
      //Validamos con la bd, esperamos la respuesta de la bd, asi que hay que hacerlo así o siempre entra al if
      const resultado_email_unico = await email_unico();
      if (resultado_email_unico) {
        addEstudiante(nombre.value, correo.value, password.value)
      }
    }
  } catch {
    AlertaMal();

  }
}

function addEstudiante(innombre, incorreo, inpass) {
  // Add a new document with a generated id.
  const docRef = addDoc(collection(db, "estudiante"), {
    nombre: innombre,
    correo: incorreo,
    clave: inpass
  }).then((docRef) => {
    console.log("Document written with ID: ", docRef.id);
    AlertaBien();

  })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
}
function campos_rellenados() {
  if (nombre.value == '' || correo.value == '' || clave.value == '' || reingresoclave.value == '') {
    console.log("vacios")
    AlertaCamposVacios();
    return false;
  }
  return true;
}
function email_formato_valido() {
  if (/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test((correo.value))) {
    return true;
  }
  AlertaCorreoMal();
  return false;

}
function clave_8chars() {
  if (clave.value.length >= 8) return true;
  console.log("contraseña corta")
  AlertaContraseñaMal();
  return false;
}
function reingreso_clave_valido() {
  if (clave.value == reingresoclave.value) return true;
  console.log("claves distintas")
  AlertaContraseñasDistintas();
  return false;
}
async function email_unico() {
  var loader = document.getElementById("loader");
  taskForm.classList.toggle("fade"); //Ocultamos el formulario
  loader.style.display = "block"; // Muestra el loader
  const q = query(collection(db, "estudiante"), where("correo", "==", correo.value));
  const querySnapshot = await getDocs(q);
  loader.style.display = "none"; // Quitamos loader
  taskForm.classList.toggle("fade"); //Mostramos formulario
  //Si el size del query es 0 es que no hay repetidos
  //console.log(querySnapshot.size == 0)
  if (querySnapshot.size == 0) return true;
  //console.log("repetido")
  AlertaCorreosIguales();
  return false;
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
      window.location.href = 'loginusuario.html';
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