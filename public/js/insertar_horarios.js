/* CONEXION FIREBASE */


import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  query,
  where,
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

// const q = query(collection(db, "horario"), where("dia", ">", "0"));
// const querySnapshot = await getDocs(q);
// console.log(querySnapshot.size)

//Cargar EXCEL
var fileInput = document.getElementById('excel-file');
var importButton = document.getElementById('import-btn');
//var deleteButton = document.getElementById('delete-btn');
var previewDiv = document.getElementById('preview');
fileInput.addEventListener('change', function () {
  previewDiv.innerHTML = '';
  //importButton.disabled = false;
  //deleteButton.disabled = true;
  //fileInput.disabled = false;

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
      //con raw:false hacemos que todos sea entregado como string
      var array = XLSX.utils.sheet_to_row_object_array(worksheet, { raw: false });
      var json = XLSX.utils.sheet_to_json(worksheet);

      previewDiv.innerHTML = html;

      //fileInput.disabled = true;
      //importButton.disabled = true;
      //deleteButton.disabled = false;

      var nombre_sala;
      var carrera;
      var nombre_carrera;
      var nombre_asignatura;
      var profesor;
      var dia;
      var hora_inicio;
      var hora_fin;
      var edificio;
      //console.log(array);

       // Mostrar la capa de superposición o spinner
      const container = document.getElementById('container');
      container.style.display = 'none';
      const loader = document.getElementById('loader');
      loader.style.display = 'block';
      
      for (let index = 0; index < array.length; index++) {
        nombre_sala = array[index]['Sala'];
        //Codigo
        carrera = parseInt(array[index]['CARRERA']);
        //Lo pasamos a nombre
        nombre_carrera = codcarrera_A_nombrecarrera(carrera);
        nombre_asignatura = array[index]['NOMBRE']
        profesor = "Sin Asignar";
        dia = array[index]['DIA'];
        hora_inicio = array[index]['HORA INICIO']
        hora_fin = array[index]['HORA FIN']
        edificio = array[index]['Edificio'];

        if (nombre_sala == "" || nombre_sala == null) {
          nombre_sala = "-";
        }
        if (nombre_sala == "" || nombre_sala == null) {
          nombre_sala = "-";
        }
        if (nombre_carrera != "" && nombre_carrera != null && edificio != "" && edificio != null) {
          addHorario(nombre_asignatura, nombre_carrera, dia, profesor, nombre_sala, hora_inicio, hora_fin, edificio);

        }

      }
      
        // Ocultar la capa de superposición o spinner
        loader.style.display = 'none';
        container.style.display = 'block';
    
        // Mostrar el botón de continuar y agregar el evento click
        const botonContinuar = document.getElementById('continuar');
        botonContinuar.style.display = 'block';
        botonContinuar.addEventListener('click', Continuar);
    
        // Ocultar el botón de importar
        const botonImportar = document.getElementById('import-btn');
        botonImportar.style.display = 'none';
    
        function Continuar(){
          window.location.href = "vistaSalas_administrador.html?&sala=SALA%2011";
        }

    };

    reader.readAsArrayBuffer(file);
    fileInput.value = file.name;
    alert("FINALIZÓ LA CARGA DE HORARIOS")
  }
});

// deleteButton.addEventListener('click', function () {
//   previewDiv.innerHTML = '';
//   importButton.disabled = true;
//   deleteButton.disabled = true;
//   fileInput.disabled = false;
//   fileInput.value = '';
// });



const usuariosCollection = collection(db, "horario");
    //Añadir un horario a la bd
    function addHorario(in_asignatura, in_carrera, in_dia, in_profesor, in_sala, in_hora_inicio, in_hora_fin, in_edificio) {
     
    
      // Agregar el documento a la base de datos
      const docRef = addDoc(collection(db, "horario"), {
        asignatura: in_asignatura,
        carrera: in_carrera,
        dia: in_dia,
        profesor: in_profesor,
        sala: in_sala,
        hora_inicio: in_hora_inicio,
        hora_fin: in_hora_fin,
        edificio: in_edificio
      }).then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
    
      })
        .catch((error) => {
          console.error("Error adding document: ", error);
        });
    }


function codcarrera_A_nombrecarrera(codigo) {
  //console.log(typeof(codigo)+" "+codigo)
  if (codigo == 3406) return "INGENIERÍA CIVIL INDUSTRIAL"
  if (codigo == 3407) return "INGENIERÍA CIVIL EN COMPUTACION"
  if (codigo == 3437) return "INGENIERÍA CIVIL EN OBRAS"
  if (codigo == 3438) return "INGENIERÍA CIVIL MECATRÓNICA"
  if (codigo == 3439) return "INGENIERÍA CIVIL MECÁNICA"
  if (codigo == 3468) return "INGENIERÍA CIVIL DE MINAS"
  if (codigo == 3478) return "INGENIERÍA CIVIL ELÉCTRICA"
  return 0;
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