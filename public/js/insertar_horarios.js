/* CONEXION FIREBASE */


import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  query,
  where,
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

// const q = query(collection(db, "horario"), where("dia", ">", "0"));
// const querySnapshot = await getDocs(q);
// console.log(querySnapshot.size)
var nDocs = 0;
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


function verificar(){


  getDocs(collection(db, "horario")).then(docSnap => {

    const numDocs = docSnap.size;
    nDocs = numDocs;
    console.log(`La colección tiene ${numDocs} documentos`);

    if(numDocs > 2){
      borrar();
    }
    //alert('hola');
    
    
  });
}


function verificar2(){


  
}

function borrar(){

  var container = document.getElementById("container");
  var infinityNav = document.getElementById("infinityNav");
  var menu = document.getElementById("menu");
  var loader = document.getElementById("error404_borrar");

  var db2 = firebase.firestore();
  var collectionRef = db2.collection('horario');

  // Eliminar todos los documentos de la colección
  collectionRef.get().then(function(querySnapshot) {
    var deletePromises = [];
    querySnapshot.forEach(function(doc) {
      deletePromises.push(doc.ref.delete());
      //console.log('La colección tiene más de 2 documentos');
      
      container.style.display = "none";
      infinityNav.style.display = "none";
      menu.style.display = "none";
     
      loader.style.display = "block"; // Muestra la pantalla de carga
      loader.style.width = "100%";

    });
  
    // Esperar a que se completen todas las promesas de eliminación
    Promise.all(deletePromises).then(function() {
      // Mostrar el alert después de que se hayan borrado todos los documentos
      //alert('Se han eliminado todos los documentos de la colección.');


      // Ocultar la pantalla de carga y mostrar SweetAlert
      loader.style.display = "none";
      // Swal.fire({
      //   title: 'Borrado con éxito!',
      //   text: 'Todos los datos han sido borrados',
      //   icon: 'success',
      //   confirmButtonText: 'Ok'
      // }).then(() => {
      //   // Hacer cualquier otra cosa que necesites después de mostrar SweetAlert
        
      // });
      //var container = document.getElementById("container");
      container.style.display = "block";
      infinityNav.style.display = "block";
      menu.style.display = "block";
      //var loader = document.getElementById("loader");
      //loader.style.display = "none";
      // Mostrar el botón de continuar y agregar el evento click
      const botonContinuar = document.getElementById('continuar');
      botonContinuar.style.display = 'block';
      botonContinuar.addEventListener('click', Continuar);
 
      // Ocultar el botón de importar
      const botonBorrar = document.getElementById('delete-btn');
      botonBorrar.style.display = 'none';
 
      function Continuar(){
        window.location.href = "vistaSalas_administrador.html?&sala=SALA%2011";
      }
    });
  });




    
  
    // try {
    //   //get all data from horario
    //   getDocs(collection(db, "horario")).then(docSnap => {
    //     docSnap.forEach((docu) => {
    //         deleteDoc(doc(db, "horario", docu.id));
          
    //     });
    //   });
  
       
     
    // } catch (error) {
    //   console.log(error);
    // }
  
}



importButton.addEventListener('click', function (e) {

  
  Swal.fire({
    title: '¿Sobrescribir archivo Excel actual?',
    text: 'Si tiene un archivo Excel ya importado, se borrará y se ingresarán datos del nuevo archivo Excel',
    icon: 'info',
    confirmButtonText: 'Confirmar',
    showCancelButton: true,
    //denyButtonText: `Don't save`,
  }).then((result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {
  

      verificar();
      borrar();
    
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
    
          var nombre_sala;
          var carrera;
          var nombre_carrera;
          var nombre_asignatura;
          var seccion;
          var profesor;
          var dia;
          var hora_inicio;
          var hora_fin;
          var edificio;
          //console.log(array);
    
        
          
          for (let index = 0; index < array.length; index++) {
            nombre_sala = array[index]['Sala'];
            //Codigo
            carrera = parseInt(array[index]['CARRERA']);
            //Lo pasamos a nombre
            nombre_carrera = codcarrera_A_nombrecarrera(carrera);
            nombre_asignatura = array[index]['NOMBRE'];
            seccion = array[index]['SECCION'];
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
              addHorario(nombre_asignatura, seccion, nombre_carrera, dia, profesor, nombre_sala, hora_inicio, hora_fin, edificio);
    
            }
    
          }
    
          getDocs(collection(db, "horario")).then(docSnap => {
    
            const nDocs = docSnap.size;
           
            if(nDocs > 2){
    
              swal.fire({
                text: 'Excel importado con éxito',
                icon: success
              })
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
              
            }else{
              swal.fire({
                text: 'Error al importar Excel',
                icon: error
              })
            }
            //alert('hola');
            
          });
        
            
    
        };
    
        reader.readAsArrayBuffer(file);
        fileInput.value = file.name;
        alert("FINALIZÓ LA CARGA DE HORARIOS")
      }


    }
  })
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
    function addHorario(in_asignatura, in_seccion, in_carrera, in_dia, in_profesor, in_sala, in_hora_inicio, in_hora_fin, in_edificio) {
     
    
      // Agregar el documento a la base de datos
      const docRef = addDoc(collection(db, "horario"), {
        asignatura: in_asignatura,
        seccion: in_seccion,
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