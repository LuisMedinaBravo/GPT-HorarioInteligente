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

//Importar alertas
import { AlertaBien, AlertaMal, } from "./alertas.js"


const taskForm = document.getElementById('taskFormAdmin')


try {

  const correo = taskForm['username']
  const contraseña = taskForm['password']
  let botonAdm = document.getElementById("button");
  botonAdm.addEventListener("click", listar);
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
    AlertaBien();
    taskForm.classList.toggle("fade"); //Mostramos formulario

  }

} catch (error) {

}




/*     if (usuario.value == '' || contraseña.value == '') {
      alertas.AlertaCamposVacios();
      return 0;
    }
    //get all data
    getDocs(collection(db, "estudiante")).then(docSnap => {


      docSnap.forEach((doc) => {

        users.push({ ...doc.data(), id: doc.id })

      });


    });
    //recorrer data
    for (let index = 0; index < users.length; index++) {
      if (usuario.value == users[index]['correo'] && contraseña.value == users[index]['clave']) {

        localStorage.setItem('name', usuario.value);
        AlertaBien();

        return 1;

      }
      console.log("aaa " + users[index]['correo']);

    }
    AlertaMal();
*/