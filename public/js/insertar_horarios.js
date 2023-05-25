/* CONEXION FIREBASE */


import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";

import {
  getFirestore,
  collection,
  addDoc
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

//Cargar EXCEL
var fileInput = document.getElementById('excel-file');
var importButton = document.getElementById('import-btn');
var deleteButton = document.getElementById('delete-btn');
var previewDiv = document.getElementById('preview');
fileInput.addEventListener('change', function () {
  previewDiv.innerHTML = '';
  importButton.disabled = false;
  deleteButton.disabled = true;
  fileInput.disabled = false;

});

importButton.addEventListener('click', function (e) {
  var file = fileInput.files[0];

  if (file) {
    var reader = new FileReader();

    reader.onload = function (e) {
      var data = new Uint8Array(e.target.result);
      var workbook = XLSX.read(data, { type: 'array' });
      var worksheet = workbook.Sheets[workbook.SheetNames[0]];
      var html = XLSX.utils.sheet_to_html(worksheet);
      var array = XLSX.utils.sheet_to_row_object_array(worksheet);
      previewDiv.innerHTML = html;

      fileInput.disabled = true;
      importButton.disabled = true;
      deleteButton.disabled = false;
      console.log(array[0])

      var nombre_sala;
      var carrera;
      var nombre_asignatura;
      var profesor;
      var dia;
      var hora_inicio;
      var hora_fin;
      for (let index = 0; index < array.length; index++) {
        nombre_sala = array[index]['SALA'];
        carrera = array[index]['CARRERA'];
        nombre_asignatura = array[index]['NOMBRE']
        profesor = "Sin Asignar";
        dia = array[index]['DIA'];
        hora_inicio = array[index]['HORA INICIO'].toString();
        hora_fin = array[index]['HORA FIN'].toString();
        alert(hora_inicio);
        console.log("index: "+index +" Insertaremos: " + array[index]["NOMBRE"] + " " + array[index]["CARRERA"] + " " + array[index]["DIA"] + " Sin asignar " + " " + array[index]["SALA"])
        if (nombre_sala == "" || nombre_sala == null) {
          nombre_sala = "-";
        }
        if (nombre_sala == "" || nombre_sala == null) {
          nombre_sala = "-";
        }
        if (carrera != "" && carrera != null) {
          addHorario(nombre_asignatura, carrera, dia, profesor, nombre_sala, hora_inicio, hora_fin);

        }

      }

    };

    reader.readAsArrayBuffer(file);
    fileInput.value = file.name;
    alert("FINALIZÓ LA CARGA DE HORARIOS")
  }
});

deleteButton.addEventListener('click', function () {
  previewDiv.innerHTML = '';
  importButton.disabled = true;
  deleteButton.disabled = true;
  fileInput.disabled = false;
  fileInput.value = '';
});

//Añadir un horario a la bd
function addHorario(in_asignatura, in_carrera, in_dia, in_profesor, in_sala, in_hora_inicio, in_hora_fin) {
  // Add a new document with a generated id.
  const docRef = addDoc(collection(db, "horario"), {
    asignatura: in_asignatura,
    carrera: in_carrera,
    dia: in_dia,
    profesor: in_profesor,
    sala: in_sala,
    hora_inicio: in_hora_inicio,
    hora_fin: in_hora_fin
  });
  console.log("Document written with ID: ", docRef.id);
}

/**
 ​
asignatura: ""
 ​
carrera: ""
 ​
dia: ""
 ​
id: "0gOlyyqOl7RHSPMP4VF1"
 ​
profesor: ""
 ​
sala: "0" */