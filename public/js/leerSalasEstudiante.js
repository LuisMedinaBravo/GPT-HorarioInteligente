/* CONEXION FIREBASE */
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import { getFirestore, collection, getDocs, query, where, orderBy, startAt, endAt, doc, updateDoc, arrayUnion, getDoc } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js";
import { AlertaAceptada } from "./alertas.js";


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
        /**Hacemos que los dias se filtren bien */
        "columnDefs": [{
            "targets": 3,
            "render": function (data, type, row, meta) {
                if (type === 'sort') {
                    console.log(dias[data])
                    var dia = dias[data]
                    return '' + dia;
                } else {
                    return dias[dias[data]];
                }
            }
        }],
        "order": [
            [3, "asc"],
            [0, "asc"],
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
            // {
            //     extend: 'csv',
            //     className: 'btn btn-primary',
            //     text: '<i class="fas fa-file-csv"></i> Exportar a CSV',
            // },
            // {
            //     extend: 'excel',
            //     className: 'btn btn-primary',
            //     text: '<i class="fas fa-file-excel"></i> Exportar a Excel',
            // },
            {
                extend: 'pdf',
                className: 'btn btn-primary',
                text: '<i class="fas fa-file-pdf"></i> Exportar a PDF',
            },
            {
                text: 'Guardar my busqueda',
                className: 'btn btn-primary',
                action: function (e, dt, node, config) {
                    var data = table.rows({ search: 'applied' }).data().toArray()
                    console.log(localStorage.key(0))
                    data.forEach((dato, index) => actualizarEstudiante(dato, horarios[0].edificio+' '+horarios[0].sala));


                }
            },
            // {
            //     extend: 'print',
            //     className: 'btn btn-primary',
            //     text: '<i class="fas fa-print"></i> Imprimir',
            // }
        ]
    });

    // Obtener el parámetro de sala de la URL
    var urlParams = new URLSearchParams(window.location.search);
    var c = urlParams.get('sala');
    //Verificamos que haya busqueda
    if (c == '' || c == undefined || c == null) {
        return 0;
    }
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
        7: 'Domingo',
        'Lunes': 1,
        'Martes': 2,
        'Miércoles': 3,
        'Jueves': 4,
        'Viernes': 5,
        'Sábado': 6,
        'Domingo': 7,
    };
    // Mapear bloques
    var bloques_inicio = {
        '08:30:00': 1,
        '09:40:00': 2,
        '10:50:00': 3,
        '12:00:00': 4,
        '13:10:00': 5,
        '14:20:00': 6,
        '15:30:00': 7,
        '16:40:00': 8,
        '17:50:00': 9,
        '19:00:00': 10,
        '20:10:00': 11,
        '21:20:00': 12,
    };
    var bloques_fin = {
        '09:30:00': 1,
        '10:40:00': 2,
        '11:50:00': 3,
        '13:00:00': 4,
        '14:10:00': 5,
        '15:20:00': 6,
        '16:30:00': 7,
        '17:40:00': 8,
        '18:50:00': 9,
        '20:00:00': 10,
        '21:10:00': 11,
        '22:20:00': 12,
    };

    //Enviar Sala y Edificio a la vista
    const elem_edificio_sala = document.getElementById('edificio_sala');
    elem_edificio_sala.innerHTML = `<h1>` + horarios[0].edificio + `: ` + horarios[0].sala + `</h1>`

    // Obtener los datos filtrados por sala y llenar la tabla
    horarios.forEach(data =>
        rellenarTabla(data)
    );
    function rellenarTabla(data) {
        var row;
        row = [
            bloques_inicio[data.hora_inicio] + " a " + bloques_fin[data.hora_fin],
            data.hora_inicio,
            data.hora_fin,
            dias[data.dia], // Obtener el nombre del día correspondiente
            data.asignatura,
            data.carrera,
            data.profesor,

        ]
        table.row.add(row)
    }
    table.draw();

    async function actualizarEstudiante(data, index) {
        // Atomically increment the population of the city by 50.
        const doc_usuario = doc(db, "estudiante", localStorage.key(0));
        console.log(data)

        await updateDoc(doc_usuario, {
            busquedas: arrayUnion({ id: index, datos: data })
        }).then(function () {
            console.log("Document successfully updated!");
            actualizarLocalStorage(doc_usuario);
        })
            .catch(function (error) {
                // The document probably doesn't exist.
                console.error("Error updating document: ", error);
            });


    }
    async function actualizarLocalStorage(ref) {
        //de la referencia sacamos el doc
        const docSnap = await getDoc(ref);
        //Actualizamos el localstorage 
        localStorage.setItem(localStorage.key(0), JSON.stringify(docSnap.data()));
        AlertaAceptada("Busqueda guardada", "Revisa tu pagina inicial");
    }

});


