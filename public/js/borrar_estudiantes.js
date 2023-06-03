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
const taskForm = document.getElementById('taskFormRegistroEst')
var loader = document.getElementById("loader");
taskForm.classList.toggle("fade"); //Ocultamos el formulario
loader.style.display = "block"; // Muestra el loader



//Borramos todos los estudiantes.
getDocs(collection(db, "estudiante")).then(docSnap => {
    docSnap.forEach((docu) => {
        deleteDoc(doc(db, "estudiante", docu.id))

    });
});
loader.style.display = "none"; // Quitamos loader
taskForm.classList.toggle("fade"); //Mostramos formulario
