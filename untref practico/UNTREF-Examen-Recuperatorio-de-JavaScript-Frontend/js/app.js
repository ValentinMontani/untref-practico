document.addEventListener('DOMContentLoaded', () => {
    const selectPropiedad = document.getElementById('propiedad');
    const selectUbicacion = document.getElementById('ubicacion');
    const inputMetros = document.getElementById('metros2');
    const valorPoliza = document.getElementById('valorPoliza');
    const btnCotizar = document.querySelector('.button');
    const contenedorExito = document.createElement('div'); 

    contenedorExito.classList.add('contenedor-exito'); 
    document.body.appendChild(contenedorExito); 
    
    let factoresPropiedad = {};
    let factoresUbicacion = {};

    
    fetch('./datos.json')
        .then(response => response.json())
        .then(data => {
            data.forEach(item => {
                if (item.categoria === "propiedad") {
                    const option = document.createElement('option');
                    option.value = item.tipo;
                    option.textContent = item.tipo;
                    selectPropiedad.appendChild(option);
                    factoresPropiedad[item.tipo] = item.factor;
                } else if (item.categoria === "ubicacion") {
                    const option = document.createElement('option');
                    option.value = item.tipo;
                    option.textContent = item.tipo;
                    selectUbicacion.appendChild(option);
                    factoresUbicacion[item.tipo] = item.factor;
                }
            });
        })
        .catch(error => console.error('Error cargando los datos:', error));

   
    const calcularPoliza = () => {
        const propiedad = selectPropiedad.value;
        const ubicacion = selectUbicacion.value;
        const metros = parseInt(inputMetros.value) || 0;

        if (propiedad && ubicacion && metros > 0) {
            const factorPropiedad = factoresPropiedad[propiedad] || 1;
            const factorUbicacion = factoresUbicacion[ubicacion] || 1;
            const poliza = metros * factorPropiedad * factorUbicacion;
            return poliza;
        }
        return 0;
    };

    
    const mostrarAnimacion = () => {
        contenedorExito.innerHTML = `
            <div class="animacion-exito">
                <div class="checkmark-circle">
                    <div class="background"></div>
                    <div class="checkmark"></div>
                </div>
                <p>¡Cotización realizada con éxito!</p>
            </div>
        `;
        contenedorExito.style.display = 'block';  

        setTimeout(() => {
            contenedorExito.style.display = 'none'; 
        }, 2000);
    };

   
    btnCotizar.addEventListener('click', () => {
        const propiedad = selectPropiedad.value;
        const ubicacion = selectUbicacion.value;
        const metros = parseInt(inputMetros.value);
        const poliza = calcularPoliza();

        if (propiedad && ubicacion && metros && poliza) {
            
            mostrarAnimacion();

           
            const cotizacion = {
                fecha: new Date().toLocaleDateString(),
                propiedad,
                ubicacion,
                metros,
                poliza: poliza.toFixed(2)
            };

            const historialCotizaciones = JSON.parse(localStorage.getItem('historialCotizaciones')) || [];
            historialCotizaciones.push(cotizacion);
            localStorage.setItem('historialCotizaciones', JSON.stringify(historialCotizaciones));

            
            setTimeout(() => {
                valorPoliza.textContent = poliza.toFixed(2);
            }, 1000);
        } else {
            alert('Por favor, completa todos los campos correctamente.');
        }
    });
});
