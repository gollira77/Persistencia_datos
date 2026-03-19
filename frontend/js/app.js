    const STORAGE_KEY = "alumnos";

    const formulario = document.getElementById("alumno-form");
    const tablaAlumnos = document.getElementById("tabla-alumnos");
    const mensaje = document.getElementById("mensaje");

    function obtenerAlumnos() {
    const datos = localStorage.getItem(STORAGE_KEY);

    if (!datos) {
        return [];
    }

    try {
        return JSON.parse(datos);
    } catch (error) {
        return [];
    }
    }

    function guardarAlumnos(alumnos) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(alumnos));
    }

    function crearAlumno(nombre, edad, nota) {
    return {
        nombre: nombre.trim(),
        edad: Number(edad),
        nota: Number(nota)
    };
    }

    function validarAlumno(alumno) {
    if (alumno.nombre === "") {
        return "El nombre no puede estar vacío.";
    }

    if (Number.isNaN(alumno.edad) || alumno.edad <= 0) {
        return "La edad debe ser un número mayor que 0.";
    }

    if (Number.isNaN(alumno.nota) || alumno.nota < 0 || alumno.nota > 10) {
        return "La nota debe estar entre 0 y 10.";
    }

    return null;
    }

    function ordenarAlumnos(alumnos) {
    return [...alumnos].sort(function (a, b) {
        if (b.nota !== a.nota) {
        return b.nota - a.nota;
        }

        return a.nombre.localeCompare(b.nombre);
    });
    }

    function mostrarMensaje(texto, color) {
    mensaje.textContent = texto;
    mensaje.style.color = color;
    }

    function renderizarAlumnos() {
    const alumnos = obtenerAlumnos();
    const alumnosOrdenados = ordenarAlumnos(alumnos);

    tablaAlumnos.innerHTML = "";

    if (alumnosOrdenados.length === 0) {
        tablaAlumnos.innerHTML = `
        <tr>
            <td colspan="3">No hay alumnos cargados.</td>
        </tr>
        `;
        return;
    }

    for (let i = 0; i < alumnosOrdenados.length; i++) {
        const alumno = alumnosOrdenados[i];

        const fila = document.createElement("tr");
        fila.innerHTML = `
        <td>${alumno.nombre}</td>
        <td>${alumno.edad}</td>
        <td>${alumno.nota}</td>
        `;

        tablaAlumnos.appendChild(fila);
    }
    }

    formulario.addEventListener("submit", function (event) {
    event.preventDefault();

    const nombre = document.getElementById("nombre").value;
    const edad = document.getElementById("edad").value;
    const nota = document.getElementById("nota").value;

    const alumno = crearAlumno(nombre, edad, nota);
    const error = validarAlumno(alumno);

    if (error) {
        mostrarMensaje(error, "red");
        return;
    }

    const alumnos = obtenerAlumnos();
    alumnos.push(alumno);
    guardarAlumnos(alumnos);

    formulario.reset();
    mostrarMensaje("Alumno guardado correctamente.", "green");
    renderizarAlumnos();
    });

    renderizarAlumnos();