const productos = document.querySelector('#lista-productos');
const formulario = document.querySelector('#formulario-producto');
const nombreInput = document.querySelector('#nombre');
const precioInput = document.querySelector('#precio');
const imagenInput = document.querySelector('#imagen');
const previewImagen = document.querySelector('#preview-imagen');

formulario.addEventListener('submit', e => {
    e.preventDefault();

    const nombre = nombreInput.value.trim();
    const precio = precioInput.value.trim();
    const imagen = imagenInput.files[0];

    if (nombre === '' || precio === '' || !imagen) {
        alert('Todos los campos son obligatorios');
        return;
    }

    const producto = document.createElement('article');
    producto.classList.add('producto');

    const imagenProducto = document.createElement('img');
    imagenProducto.src = URL.createObjectURL(imagen);
    imagenProducto.alt = nombre;
    imagenProducto.onload = () => {
        URL.revokeObjectURL(imagenProducto.src);
    };

    const nombreProducto = document.createElement('h2');
    nombreProducto.textContent = nombre;

    const precioProducto = document.createElement('p');
    precioProducto.textContent = `$${precio}`;

    producto.appendChild(imagenProducto);
    producto.appendChild(nombreProducto);
    producto.appendChild(precioProducto);

    productos.appendChild(producto);

    // Limpiar los campos del formulario
    nombreInput.value = '';
    precioInput.value = '';
    imagenInput.value = '';

    // Ocultar la vista previa
    previewImagen.style.display = 'none';
    previewImagen.src = '';
});

// Mostrar vista previa de la imagen seleccionada
imagenInput.addEventListener('change', () => {
    const imagen = imagenInput.files[0];
    if (imagen) {
        previewImagen.src = URL.createObjectURL(imagen);
        previewImagen.style.display = 'block';
        previewImagen.onload = () => {
            URL.revokeObjectURL(previewImagen.src);
        };
    } else {
        previewImagen.style.display = 'none';
        previewImagen.src = '';
    }
});
