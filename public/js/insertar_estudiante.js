/* CONEXION FIREBASE */
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  query,
  where,
} from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js";

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

/* FIN CONEXION FIREBASE */

const auth = firebase.auth();
auth.useDeviceLanguage();

var flag=false;


  export const saveTask = (nombre,correo,clave)=>{

    try{
      addDoc(collection(db, 'estudiante'),{nombre,correo,clave});
      // Obtiene el botón y la pantalla de carga
            
      AlertaBien(); // Llama a la función AlertaBien() después de ocultar la pantalla de carga
     

    }catch{
      AlertaMal();
    }
  }
    
  const taskForm = document.getElementById('taskFormRegistroEst')
  
  const nombre = taskForm['username']
  const correo = taskForm['email']
  const clave = taskForm['password']
  const reingresoclave = taskForm['password2']


  let botonRegistroEst = document.getElementById("button");
  botonRegistroEst.addEventListener("click", validaciones);

  function validaciones(){

    var listo2=0;
    var no=0;

      //validar campos vacios
      if(nombre.value=='' || correo.value=='' || clave.value=='' || reingresoclave.value == '' && listo2==0){
    
        AlertaCamposVacios();

      }else{
        
        if(no==0 && listo2==0){
          

          if (/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test((correo.value))){
                    
            if(clave.value.length >= 8){
                
                //saveTask(nombre.value, matricula.value , carrera.value, correo.value, clave.value)
                
                signUp();
                listo2=1;
                //taskForm.reset()
            }else{
              AlertaContraseñaMal();
            }

            

          }else{
            AlertaMal2();
          }
        }else if(users[n]['correo'] == correo.value){


          AlertaCorreosIguales();
          listo2=1;
        
        }
      
      }


  }
  

    // Función para registrar un nuevo usuario
    function signUp() {
    // var email = document.getElementById("email").value;
    // var password = document.getElementById("password").value;
  
    // Crear un usuario con correo electrónico y contraseña
    auth.createUserWithEmailAndPassword(correo.value, clave.value)
      .then(function (user) {
        // Enviar correo electrónico de verificación
        
        sendVerificationEmail();
        botonRegistrar();
     
        // Verificar si el usuario está autenticado
        
      })
      .catch(function (error) {
   
        // Manejar errores
        var errorCode = error.code;
        var errorMessage = error.message;
        console.error(errorMessage);
        AlertaCorreoMal();
      });

      // var user = firebase.auth().currentUser;
        // if (user) {
        //   // Esperar a que se complete la verificación de correo electrónico
        //   firebase.auth().onAuthStateChanged(function(user) {
        //     if (user.emailVerified) {
        //       console.log("El correo electrónico ha sido verificado");
        //     } else {
        //       console.log("El correo electrónico no ha sido verificado");
        //     }
        //   });
        // } else {
        //   console.log("No hay usuario autenticado");
        // }
      

     
  }
  
  // Función para enviar correo electrónico de verificación
  function sendVerificationEmail() {
    // Obtener el usuario actualmente autenticado
    var user = firebase.auth().currentUser;
  
    // Verificar siel usuario está autenticado antes de enviar el correo electrónico de verificación
    if (user) {
      // Enviar correo electrónico de verificación
      user.sendEmailVerification()
        .then(function () {
          // Mostrar mensaje de éxito en la consola
          //alert("Correo electrónico de verificación enviado con éxito");
          flag=true;
          
       
         
          //window.location.href = "iniciarSesionEst.html";
          // Redirigir al usuario a una página de éxito

          
          
        })
        .catch(function (error) {
          // Manejar errores
          //console.log('Correo ya fue enviado...')
          AlertaMal();
          var errorCode = error.code;
          var errorMessage = error.message;
          console.error(errorMessage);
          
          //alert('El emal ya fue enviado, tiene que verificarlo');
        });
    } else {
      console.error("No hay usuario autenticado");
    }

    
  }


  

 function botonRegistrar(){


      saveTask(nombre.value, correo.value, clave.value)
    
}





function AlertaBien(){

  Swal.fire({
    title: 'Registrado!',
    text: 'Mensaje de verificación enviado a tu correo',
    icon: 'success',
    allowOutsideClick: false,
    confirmButtonText: 'Iniciar sesión'
  }).then((result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {
      //Swal.fire('Saved!', '', 'success')
      //window.open('iniciosesion.html','_blank');
      window.location.href='loginUsuario.html';
    } 
  })
}

function AlertaMal(){
  
  Swal.fire({
    title: 'Algo salió mal',
    icon: 'error',
    confirmButtonText: 'Ok'
  })
}

function AlertaMal2(){
  
  Swal.fire({
    title: 'Correo mal ingresado',
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
    text: 'Correo ya está en uso',
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