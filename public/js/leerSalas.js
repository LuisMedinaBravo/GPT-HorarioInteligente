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
    var nombre_sala;
    var asignatura;
    var carrera;
    var profesor;
    var dia;
    var hora_inicio;
    var hora_fin;
    z.innerHTML = `
        <div class="filter">
            <label for="building">Edificio:</label>
            <select id="building">
            <option value="">Todos</option>
            <option value="edificio1">Edificio 1</option>
            <option value="edificio2">Edificio 2</option>
            <!-- Agrega más opciones de edificios aquí -->
            </select>
        </div>

        <div class="filter">
            <label for="day">Día:</label>
            <select id="day">
            <option value="">Todos</option>
            <option value="lunes">Lunes</option>
            <option value="martes">Martes</option>
            <!-- Agrega más opciones de días aquí -->
            </select>
        </div>

        <div class="filter">
            <label for="room">Sala:</label>
            <select id="room">
            <option value="">Todas</option>
            <option value="sala1">Sala 1</option>
            <option value="sala2">Sala 2</option>
            <!-- Agrega más opciones de salas aquí -->
            </select>
        </div>

        <table id="course-table">
        <thead>
        <tr>
            <th>Curso</th>
            <th>Edificio</th>
            <th>Día</th>
            <th>Sala</th>
            <th>x</th>
            <th>y</th>
            <th>z</th>
        </tr>
        </thead>

        <tbody>
    `;

    for (let index = 0; index < horarios.length; index++) {
            
        nombre_sala = horarios[index]['sala'];
        asignatura = horarios[index]['asignatura'];
        profesor = horarios[index]['profesor'];
        dia = horarios[index]['dia'];
        hora_inicio = horarios[index]['hora_inicio'];
        hora_fin = horarios[index]['hora_fin'];
        carrera = horarios[index]['carrera']
        if (nombre_sala == "") {
            nombre_sala = "-";
        }
        //AlertaBien();
        //alert("Sala encontrada, su información es: "+ users[n]['nombre']+ " "+ users[n]['piso']);
        
        z.innerHTML += `
            <tr>
                <td>${nombre_sala}</td>
                <td>${asignatura}</td>
                <td>${carrera}</td>
                <td>${dia}</td>
                <td>${profesor}</td>
                <td>${hora_inicio}</td>
                <td>${hora_fin}</td>
            </tr>
        `;
    }
    z.innerHTML += `
        </tbody>
        </table>
    `
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


