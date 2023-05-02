
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

  export const saveTask = (nombre,matricula,carrera,correo,clave)=>{

    try{
      addDoc(collection(db, 'horario'),{nombre,matricula,carrera,correo,clave});
      AlertaBien();
    }catch{
      AlertaMal();
    }
  }
    
  const taskForm = document.getElementById('taskFormRegistroEst')
  
  
  const nombre = taskForm['nombreEst']
  const matricula = taskForm['matriculaEst']
  const carrera = taskForm['carreraEst']
  const correo = taskForm['correoEst']
  const clave = taskForm['contraseñaEst']


  let botonRegistroEst = document.getElementById("botonEstRegistro");
  botonRegistroEst.addEventListener("click", botonRegistrar);
  

 function botonRegistrar(){


  getDocs(collection(db, "horario")).then(docSnap => {
    
    let users = [];
    var n = 0
    var listo2=0;
    var no=0;

    docSnap.forEach((doc)=> {
      users.push({ ...doc.data(), id:doc.id })

      if(users[n]['correo'] == correo.value){
        no++;//este manda, dice que no se puede ingresar el email porque hay 'no' iguales
        
      }else{
  
      }
      n++;

    });
    docSnap.forEach((doc)=> {
        users.push({ ...doc.data(), id:doc.id })

     
        try{

        //validar campos vacios
          if(nombre.value=='' || matricula.value=='' || carrera.value=='' || correo.value=='' || clave.value=='' && listo2==0){
    
            AlertaCamposVacios();
    
          }else{
            
            if(no==0 && listo2==0){
              

              if (/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test((correo.value))){
                        
                if(clave.value.length >= 8){
                    
                    saveTask(nombre.value, matricula.value , carrera.value, correo.value, clave.value)
                    
                    listo2=1;
                    //taskForm.reset()
                }else{
                  AlertaContraseñaMal();
                }

                

              }else{
                AlertaCorreoMal();
              }
            }else if(users[n]['correo'] == correo.value){


              AlertaCorreosIguales();
              listo2=1;
            
            }
          
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
    title: 'Registrado!',
    text: 'Estudiante guardado correctamente',
    icon: 'success',
    confirmButtonText: 'Iniciar sesión'
  }).then((result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {
      //Swal.fire('Saved!', '', 'success')
      //window.open('iniciosesion.html','_blank');
      window.location.href='inicioSesionEst.html';
    } 
  })
}

function AlertaMal(){
  
  Swal.fire({
    title: 'No Registrado!',
    text: 'Algo salió mal',
    icon: 'error',
    confirmButtonText: 'Ok'
  })
}

function AlertaCamposVacios(){
  
  Swal.fire({
    title: 'No Registrado!',
    text: 'Campo(s) no rellenado(s)',
    icon: 'error',
    confirmButtonText: 'Ok'
  })
}

function AlertaCorreoMal(){

  Swal.fire({
    title: 'No Registrado!',
    text: 'Correo mal ingresado',
    icon: 'error',
    confirmButtonText: 'Ok'
  })
}

function AlertaContraseñaMal(){

  Swal.fire({
    title: 'No Registrado!',
    text: 'La contraseña debe tener al menos 8 caracteres ',
    icon: 'error',
    confirmButtonText: 'Ok'
  })
}

function AlertaCorreosIguales(){

  Swal.fire({
    title: 'No Registrado!',
    text: 'Correo ya existe, ingrese otro correo institucional...',
    icon: 'error',
    confirmButtonText: 'Ok'
  })

}