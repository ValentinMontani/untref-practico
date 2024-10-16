// 1. Al cargar el DOM, ejecutar las siguientes funciones
document.addEventListener('DOMContentLoaded', () => {
    const tablaBody = document.querySelector('tbody');
    const clearButton = document.getElementById('clearHistorial');

// 2. Leer las cotizaciones guardadas en el localStorage y parsearlas a un array de objetos
    const cargarHistorial = () => {
        const historialCotizaciones = JSON.parse(localStorage.getItem('historialCotizaciones')) || [];
// 3. Obtener referencia al cuerpo de la tabla (elemento tbody)
        tablaBody.innerHTML = '';
// 4. Recorrer las cotizaciones y añadirlas a la tabla
//    a. Crear una fila para cada cotización
//    b. Añadir celdas a la fila con los datos de la cotización (fecha, propiedad, ubicación, metros cuadrados, póliza mensual)
//    c. Añadir la fila al tbody
        historialCotizaciones.forEach(cotizacion => {
            const fila = document.createElement('tr');
            fila.innerHTML = `
                <td>${cotizacion.fecha}</td>
                <td>${cotizacion.propiedad}</td>
                <td>${cotizacion.ubicacion}</td>
                <td>${cotizacion.metros}</td>
                <td>$${cotizacion.poliza}</td>
            `;
            tablaBody.appendChild(fila);
        });
    };

 // Limpiar cualquier contenido anterior de la tabla
    clearButton.addEventListener('click', () => {
        localStorage.removeItem('historialCotizaciones');
// 6. Event listener para el botón de limpiar historial
//    a. Limpiar el localStorage
//    b. Limpiar el contenido del tbody (eliminar todas las filas)
        tablaBody.innerHTML = '';
    });

    // Cargar historial al inicio
    cargarHistorial();
});
