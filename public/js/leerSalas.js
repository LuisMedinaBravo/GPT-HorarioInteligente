/* CONEXION FIREBASE */
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import {getFirestore,collection,getDocs,query, where,} from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js";

// Configuración de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCKdwinLMIaVlJ6mkJuTo6aL4wy8J4tDEQ",
    authDomain: "gpt-horariointeligente.firebaseapp.com",
    projectId: "gpt-horariointeligente",
    storageBucket: "gpt-horariointeligente.appspot.com",
    messagingSenderId: "87795108895",
    appId: "1:87795108895:web:294c2c36d200e36c15d92a"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Obtener el parámetro "sala" de la URL
const c = new URLSearchParams(window.location.search).get("sala");
console.log(c);

// Consultar los horarios de la sala especificada
const q = query(collection(db, "horario"), where("sala", "==", parseInt(c)));
const querySnapshot = await getDocs(q);

// Obtener los horarios como un arreglo de objetos
const horarios = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
console.log(horarios);

// Mostrar el mensaje si no se encontraron horarios
const x = document.getElementById('mostrar');
if (horarios.length == 0) {
  x.innerHTML = `<h1>Sala no encontrada</h1>`;
} else {
  // Obtener el elemento tbody de la tabla donde se mostrarán los horarios
  const tbody = document.getElementById('course-body');

  // Mapear los horarios a un nuevo arreglo de objetos con nombres de propiedades más descriptivos
  const datos = horarios.map((horario) => ({
    nombre_sala: horario.sala ?? "Sin Asignar",
    asignatura: horario.asignatura,
    profesor: horario.profesor,
    dia: horario.dia,
    hora_inicio: horario.hora_inicio,
    hora_fin: horario.hora_fin,
    carrera: horario.carrera,
  }));

  // Insertar filas en la tabla con los datos de los horarios
  datos.forEach((dato) => {
    const fila = tbody.insertRow(); // Crear una nueva fila en el tbody

    // Insertar celdas en la fila
    const nombre_sala = fila.insertCell();
    const dia = fila.insertCell();
    const asignatura = fila.insertCell();
    const hora_inicio = fila.insertCell();
    const hora_fin = fila.insertCell();
    const profesor = fila.insertCell();
    const carrera = fila.insertCell();

    // Agregar los datos a las celdas
    nombre_sala.textContent = dato.nombre_sala;
    dia.textContent = dato.asignatura;
    asignatura.textContent = dato.profesor;
    hora_inicio.textContent = dato.dia;
    hora_fin.textContent = dato.hora_inicio;
    profesor.textContent = dato.hora_fin;
    carrera.textContent = dato.carrera;
  });
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


