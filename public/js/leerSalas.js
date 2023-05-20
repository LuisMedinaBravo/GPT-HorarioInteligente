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


// const taskForm = document.getElementById('MostrarSala')
// const sala = taskForm['leerSala']

// alert(sala.value)

var url_string = window.location.href; 
var url = new URL(url_string);
var c = url.searchParams.get("sala");
console.log(c);



//get all data
getDocs(collection(db, "horario")).then(docSnap => {
       
    let users = [];
    
    var listo = 0;
    var n = 0

    docSnap.forEach((doc)=> {

        users.push({ ...doc.data(), id:doc.id })


            if( c == users[n]['nombre'] && listo==0){
               
              
                //AlertaBien();
                //alert("Sala encontrada, su información es: "+ users[n]['nombre']+ " "+ users[n]['piso']);
                
                
                var z = document.getElementById('mostrar');
                z.innerHTML= `
                                        
                  
                    <span id="leerSala" class="section-light section-title">${c}</span>
                    <h1>La info de esta sala es:<h1/>
                                    
                    <h2>Nombre: ${users[n]['nombre']}</h2>
                    <h2>Asignatura: ${users[n]['asignatura']}</h2>
                
                `;
                
                listo=1;
      
             }else{
                
                 if(listo!=1){
                     //console.log("MALLLL");
                     //AlertaMal();
                     //alert("Sala no encontrada")
                     var x = document.getElementById('mostrar');
                     x.innerHTML= `
                                                
                        <h1>Sala no encontrada<h1/>
                                            
                    `;
                 }
                
             }
                   
        n++;
});

    
});

				
