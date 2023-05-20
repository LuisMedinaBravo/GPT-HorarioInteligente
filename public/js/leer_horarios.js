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


//const taskForm = document.getElementById('taskFormAdmin')


try {
    //get all data from horario
    getDocs(collection(db, "horario")).then(docSnap => {

        let horarios = [];

        docSnap.forEach((doc) => {
            
            horarios.push({ ...doc.data(), id: doc.id })
        
        });
        console.log(horarios);



    });
}catch (error) {


}

/**
​​
asignatura: ""
​​
carrera: ""
​​
dia: ""
​​
id: "0gOlyyqOl7RHSPMP4VF1"
​​
profesor: ""
​​
sala: "0" */

