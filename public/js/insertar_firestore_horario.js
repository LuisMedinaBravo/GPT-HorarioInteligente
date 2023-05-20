
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";

// Importar base de datos CLOUD FIRESTORE
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
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

  export const saveTask = (asignatura,carrera,profesor,dia,sala)=>{

    try{
      addDoc(collection(db, 'horario'),{asignatura,carrera,profesor,dia,sala});
      AlertaBien();
    }catch{
      AlertaMal();
    }
  }
  

  horario();

 function horario(){


  getDocs(collection(db, "horario")).then(docSnap => {
    
    let users = [];
    var n = 0
    var listo2=0;


    docSnap.forEach((doc)=> {
        users.push({ ...doc.data(), id:doc.id })
     
        try{
           
            if(listo2==0){
          
              //SACAR DEL EXCEL LOS VALORES
              //CADA POSICION DEL ARRAY DE LOS DATOS DEL EXCEL PASAN POR "SAVETASK"
             
              
              //FOR{

                //TOKENIZAR EN 5 VARIABLES CADA POSICION DEL ARRAY DE FILAS DEL EXCEL
                
                var asignatura="GBD";
                var carrera="ICC"
                var profesor="PAVEZ";
                var dia="Martes"
                var sala="0"; //PASAR NOMBRE DE SALA NO REAL
                
                saveTask(asignatura,carrera,profesor,dia,sala);
            //}
              listo2=1;
              AlertaBien();
                    //taskForm.reset()
        
            }
        
    
      }catch{
        AlertaMal();
      }

        n++;
    });
        
});

}



function AlertaBien(){

  Swal.fire({
    title: 'Datos del excel!',
    text: 'Datos en la bd guardados',
    icon: 'success',
    confirmButtonText: 'Ok'
  })
}

function AlertaMal(){
  
  Swal.fire({
    title: 'Datos del excel!',
    text: 'Datos en la bd no guardados',
    icon: 'error',
    confirmButtonText: 'Ok'
  })
}
