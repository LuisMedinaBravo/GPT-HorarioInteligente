import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import {getFirestore,collection, getDocs,query, where, orderBy, startAt, endAt, limit, limitToLast} from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js";
import {orderByChild} from "https://www.gstatic.com/firebasejs/9.6.10/firebase-database.js";

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

//Verificamos de adelante hacia atras
let q = query(collection(db, "horario"), orderBy("sala"), startAt(c),endAt(c+"\uf8ff"));
let querySnapshot = await getDocs(q);
// Obtener los horarios como un arreglo de objetos
let horarios = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
console.log(horarios);
//Verificamos de atras hacia adelante, pero tiene que ser exacto
if (horarios.length==0) {
  alert("nada desde adelante hacia atras")
  q = query(collection(db, "horario"), where("sala", "==", "SALA "+c));
  querySnapshot = await getDocs(q);
// Obtener los horarios como un arreglo de objetos
  horarios = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  //Aveces obtenemos más de los que necesitamos porque no busca bien desde atras hacia adelante... Lo filtramos en js nomas
  const horarioFiltrado = horarios.filter(sala => sala.sala.includes(c));
  console.log(horarioFiltrado);
  horarios = horarioFiltrado;
}

if (horarios.length==0) {
  alert("nada desde adelante hacia atras")
  q = query(collection(db, "horario"), orderBy("sala"),  startAt("SALA "), endAt(c), limitToLast(30));
  querySnapshot = await getDocs(q);
// Obtener los horarios como un arreglo de objetos
  horarios = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  //Aveces obtenemos más de los que necesitamos porque no busca bien desde atras hacia adelante... Lo filtramos en js nomas
  const horarioFiltrado = horarios.filter(sala => sala.sala.includes(c));
  console.log(horarioFiltrado);
  horarios = horarioFiltrado;
}

//Días de la semana
const diasSemana = {
  1: "Lunes",
  2: "Martes",
  3: "Miércoles",
  4: "Jueves",
  5: "Viernes",
  6: "Sábado"
};

// Obtener los elementos del buscador y la tabla
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const tableRows = document.querySelectorAll('tbody tr');

// Función que se ejecuta cuando se realiza una búsqueda
function search() {
  // Obtener el término de búsqueda
  const searchTerm = searchInput.value.toLowerCase();

  // Recorrer las filas de la tabla y ocultar las que no coinciden con el término de búsqueda
  tableRows.forEach(row => {
    const text = row.innerText.toLowerCase();
    if (text.includes(searchTerm)) {
      row.style.display = '';
    } else {
      row.style.display = 'none';
    }
  });
}


// Obtener el elemento tbody de la tabla donde se mostrarán los horarios
const tbody = document.getElementById('course-body');
// Limpiar el contenido actual del tbody
tbody.innerHTML = '';

// Mostrar el mensaje si no se encontraron horarios
if (horarios.length == 0) {
  const fila = document.createElement('tr'); // Crear una nueva fila en el tbody
  const sinDatosCell = document.createElement('td');
  sinDatosCell.textContent = 'Sin Datos';
  sinDatosCell.colSpan = 6; // Colspan para que ocupe todas las columnas

  fila.appendChild(sinDatosCell); // Agregar la celda a la fila
  tbody.appendChild(fila); // Agregar la fila al tbody
} else {
  // Mapear los horarios a un nuevo arreglo de objetos con nombres de propiedades más descriptivos
  const datos = horarios.map((horario) => ({
    asignatura: horario.asignatura,
    profesor: horario.profesor,
    dia: horario.dia,
    hora_inicio: horario.hora_inicio,
    hora_fin: horario.hora_fin,
    carrera: horario.carrera,
  }));

  // Insertar filas en la tabla con los datos de los horarios
  datos.forEach((dato) => {
    const fila = document.createElement('tr'); // Crear una nueva fila en el tbody

    // Insertar celdas en la fila
    const asignatura = document.createElement('td');
    const profesor = document.createElement('td');
    const dia = document.createElement('td');
    const hora_inicio = document.createElement('td');
    const hora_fin = document.createElement('td');
    const carrera = document.createElement('td');

    // Agregar los datos a las celdas
    asignatura.textContent = dato.asignatura;
    profesor.textContent = dato.profesor;
    dia.textContent = diasSemana[dato.dia]; // Utilizar el objeto para obtener el día correspondiente
    hora_inicio.textContent = dato.hora_inicio;
    hora_fin.textContent = dato.hora_fin;
    carrera.textContent = dato.carrera;

    // Agregar las celdas a la fila
    fila.appendChild(asignatura);
    fila.appendChild(profesor);
    fila.appendChild(dia);
    fila.appendChild(hora_inicio);
    fila.appendChild(hora_fin);
    fila.appendChild(carrera);

    // Agregar la fila al tbody
    tbody.appendChild(fila);
    
  });
  
}