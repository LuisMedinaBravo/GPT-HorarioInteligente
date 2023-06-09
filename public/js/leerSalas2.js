/* CONEXION FIREBASE */
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import {getFirestore,collection, getDocs,query, where, orderBy, startAt, endAt, limit, limitToLast} from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js";



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

$(document).ready(async function () {
    $('#mydatatable tfoot th').each(function () {
        var title = $(this).text();
        $(this).html('<input type="text" placeholder="Filtrar.." />');
    });

    var table = $('#mydatatable').DataTable({
        "dom": 'B<"float-left"i><"float-right"f>t<"float-left"l><"float-right"p><"clearfix">',
        "responsive": false,
        "language": {
            "url": "https://cdn.datatables.net/plug-ins/1.10.19/i18n/Spanish.json"
        },
        "order": [
            [0, "desc"]
        ],
        "initComplete": function () {
            this.api().columns().every(function () {
                var that = this;

                $('input', this.footer()).on('keyup change', function () {
                    if (that.search() !== this.value) {
                        that
                            .search(this.value)
                            .draw();
                    }
                });
            });
        },
        "buttons": [
            {
                extend: 'csv',
                className: 'btn btn-primary',
                text: '<i class="fas fa-file-csv"></i> Exportar a CSV',
            },
            {
                extend: 'excel',
                className: 'btn btn-primary',
                text: '<i class="fas fa-file-excel"></i> Exportar a Excel',
            },
            {
                extend: 'pdf',
                className: 'btn btn-primary',
                text: '<i class="fas fa-file-pdf"></i> Exportar a PDF',
            },
            {
                extend: 'print',
                className: 'btn btn-primary',
                text: '<i class="fas fa-print"></i> Imprimir',
            }
        ]
    });

    // Obtener el parámetro de sala de la URL
    var urlParams = new URLSearchParams(window.location.search);
    var c = urlParams.get('sala');
    console.log(c)

    //Verificamos de adelante hacia atras
    let q = query(collection(db, "horario"), orderBy("sala"), startAt(c), endAt(c + "\uf8ff"));
    let querySnapshot = await getDocs(q);
    // Obtener los horarios como un arreglo de objetos
    let horarios = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    console.log(horarios);
    //Verificamos de atras hacia adelante, pero tiene que ser exacto
    if (horarios.length == 0) {
        console.log("nada desde adelante hacia atras")
        q = query(collection(db, "horario"), where("sala", "==", "SALA " + c));
        querySnapshot = await getDocs(q);
        // Obtener los horarios como un arreglo de objetos
        horarios = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        //Aveces obtenemos más de los que necesitamos porque no busca bien desde atras hacia adelante... Lo filtramos en js nomas
        const horarioFiltrado = horarios.filter(sala => sala.sala.includes(c));
        console.log(horarioFiltrado);
        horarios = horarioFiltrado;
    }

    if (horarios.length == 0) {
        console.log("nada exacto")
        q = query(collection(db, "horario"), orderBy("sala"), startAt("SALA "), endAt(c), limitToLast(30));
        querySnapshot = await getDocs(q);
        // Obtener los horarios como un arreglo de objetos
        horarios = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        //Aveces obtenemos más de los que necesitamos porque no busca bien desde atras hacia adelante... Lo filtramos en js nomas
        const horarioFiltrado = horarios.filter(sala => sala.sala.includes(c));
        console.log(horarioFiltrado);
        horarios = horarioFiltrado;
    }

    // Mapear los números de día a los nombres correspondientes
    var dias = {
        1: 'Lunes',
        2: 'Martes',
        3: 'Miércoles',
        4: 'Jueves',
        5: 'Viernes',
        6: 'Sábado',
        7: 'Domingo'
    };

    // Obtener los datos filtrados por sala desde Firestore y llenar la tabla
    horarios.forEach(data =>
        rellenarTabla(data)
    );
    function rellenarTabla(data){
        var row;
        row = [
            data.asignatura,
            data.carrera,
            dias[data.dia], // Obtener el nombre del día correspondiente
            data.edificio,
            data.hora_inicio,
            data.hora_fin,
            data.profesor,
            data.sala
        ]
        table.row.add(row)
    }
    table.draw();
});
