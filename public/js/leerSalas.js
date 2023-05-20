/* CONEXION FIREBASE */


import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";

import {
    getFirestore,
    collection,
    getDocs,
    query, 
    where,
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

//Sacar datos de la URL

var url_string = window.location.href;
var url = new URL(url_string);
var c = url.searchParams.get("sala");
console.log(c);

//Obtener horarios que son de la sala en la url
const q = query(collection(db, "horario"), where("sala", "==", parseInt(c)));

const querySnapshot = await getDocs(q);
let horarios = [];
querySnapshot.forEach((doc) => {
  // doc.data() is never undefined for query doc snapshots
  horarios.push({ ...doc.data(), id: doc.id })
});
console.log(horarios)

//Mostrar los datos en el html
if(horarios.length==0){
                
    //console.log("MALLLL");
    //AlertaMal();
    //alert("Sala no encontrada")
    var x = document.getElementById('mostrar');
    x.innerHTML= `
                               
       <h1>Sala no encontrada<h1/>
                           
   `;
}else{
var z = document.getElementById('mostrar');
z.innerHTML= "<h1>La info de esta sala es:<h1/>";       
for (let index = 0; index < horarios.length; index++) {
           
 

                //AlertaBien();
                //alert("Sala encontrada, su información es: "+ users[n]['nombre']+ " "+ users[n]['piso']);
                
                z.innerHTML += `          
                    <h2>Nombre de la sala: ${horarios[index]['sala']}</h2>
                    <h2>Asignatura: ${horarios[index]['asignatura']}</h2>
                    <h2>Profesor: ${horarios[index]['profesor']}</h2>
                    <h2>Dia: ${horarios[index]['dia']}</h2>
                    <h2>Hora inicio: ${horarios[index]['hora_inicio']}</h2>
                    <h2>Hora fin: ${horarios[index]['hora_fin']}</h2>
                
                `;
              
                    
             
             
}
}
//get all data
// getDocs(collection(db, "horario")).then(docSnap => {

    
//     let horarios = [];


//     docSnap.forEach.where((doc) => {

        
//         horarios.push({ ...doc.data(), id: doc.id })


//     });
//     console.log(horarios)
//     for (let index = 0; index < horarios.length; index++) {
//         var z = document.getElementById('mostrar');
//         z.innerHTML= `
                                    
              
//                 <span id="leerSala" class="section-light section-title">${index}</span>
//                 <h1>La info de esta sala es:<h1/>ç
//                 `;        
//         if( c == horarios[index]['sala']){
//             alert("a")
              
//             //AlertaBien();
//             //alert("Sala encontrada, su información es: "+ users[n]['nombre']+ " "+ users[n]['piso']);
            
//             z.innerHTML = z.innerHTML + `          
//                 <h2>Nombre: ${horarios[index]['sala']}</h2>
//                 <h2>Asignatura: ${horarios[index]['asignatura']}</h2>
            
//             `;
                
//          }else{
            
//                  //console.log("MALLLL");
//                  //AlertaMal();
//                  //alert("Sala no encontrada")
//                  var x = document.getElementById('mostrar');
//                  x.innerHTML= `
                                            
//                     <h1>Sala no encontrada<h1/>
                                        
//                 `;
            
//          }
        
//     }
    
           


// });


