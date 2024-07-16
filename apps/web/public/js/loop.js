// Obtener todos los elementos con la clase "box"
var boxes = document.querySelectorAll('.box');

function showBox(index) {
    // Ocultar todos los elementos
    boxes.forEach(box => box.style.display = 'none');

    // Mostrar el elemento actual
    if (index < boxes.length) {
        boxes[index].style.display = 'block';
    }

    // Llamar a la función recursivamente después de 5 segundos
    setTimeout(() => showBox((index + 1) % boxes.length), 5000);
}

// Iniciar la animación mostrando el primer elemento
showBox(0);