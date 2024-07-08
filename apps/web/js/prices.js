import { getFamilies, getProductsByCategory, getProductById, updateProductapi } from './api.js';
import { openModal, cancelModal } from './modal.js';

const selectFamily = document.getElementById('select-family');
const selectProduct = document.getElementById('select-product');
const inputDots = document.getElementById('input-dots');
const inputPrice = document.getElementById('input-price');
const confirmModalButton = document.getElementById('confirm-modal');
const updateButton = document.getElementById('update-button');
const cancelModalButton = document.getElementById('cancel-modal');


function toggleInputFields(enable) {
    inputDots.disabled = !enable;
    inputPrice.disabled = !enable;
}

function clearInputFields() {
    inputDots.value = '';
    inputPrice.value = '';
}

getFamilies()
    .then(data => {
        if (data) {
            //console.log('Familias:', data);

            for (let i = 0; i < data.length; i++) {
                const optionFamily = document.createElement('option');
                optionFamily.value = data[i].id;
                optionFamily.textContent = data[i].category;
                selectFamily.appendChild(optionFamily);
            }
        }
    });

// Función para manejar cambios en selectFamily
function handleSelectFamilyChange() {
    if (selectFamily.value && selectFamily.value !== '0') {
        getProductsByCategory(selectFamily.value)
            .then(data => {
                // Limpiamos selectProduct antes de añadir nuevas opciones
                selectProduct.innerHTML = '<option value="0">Seleccionar Producto</option>';

                // Iteramos sobre los datos y creamos opciones para selectProduct
                data.forEach(product => {
                    const optionProduct = document.createElement('option');
                    optionProduct.value = product.id;
                    optionProduct.textContent = product.name;
                    selectProduct.appendChild(optionProduct);
                });
                
                // Llamamos a handleSelectProductChange para actualizar el precio si ya hay un producto seleccionado
                handleSelectProductChange();

            })
            .catch(error => {
                console.error('Error al obtener productos:', error);
                clearInputFields(); // Limpiamos los campos si hay un error
                toggleInputFields(false); // Deshabilitamos los campos si hay un error
            });
    } else {
        // Si no hay ninguna opción seleccionada o es '0', mostramos el mensaje por defecto
        selectProduct.innerHTML = '<option value="0">Seleccionar Producto</option>';
        clearInputFields(); // Limpiamos los campos
        toggleInputFields(false); // Deshabilitamos los campos
    }
}

// Función para manejar cambios en selectProduct
function handleSelectProductChange() {
    const selectedProductId = selectProduct.value;
    if (selectedProductId !== '0') {
        console.log('Producto seleccionado:', selectedProductId);
        getProductById(selectedProductId)
            .then(selectedProduct => {
                if (selectedProduct) {
                    inputDots.value = selectedProduct.dots; // Actualizamos inputDots con los puntos del producto seleccionado
                    inputPrice.value = selectedProduct.price; // Actualizamos inputPrice con el precio del producto seleccionado
                    toggleInputFields(true); // Habilitamos los campos
                } else {
                    clearInputFields(); // Limpiamos los campos si no se encuentra el producto
                    toggleInputFields(false); // Deshabilitamos los campos
                }
            })
            .catch(error => {
                console.error('Error al obtener el producto por ID:', error);
                clearInputFields(); // Limpiamos los campos en caso de error
                toggleInputFields(false); // Deshabilitamos los campos en caso de error
            });
    } else {
        clearInputFields(); // Limpiamos los campos si se selecciona 'Seleccionar Producto'
        toggleInputFields(false); // Deshabilitamos los campos
    }
}

function confirmModal() {
    const selectedProductId = selectProduct.value;

    const updatedProductData = {
        name: document.getElementById('select-product').options[document.getElementById('select-product').selectedIndex].text,
        price: parseFloat(document.getElementById('input-price').value),
        format: 'kg',
        dots: parseInt(document.getElementById('input-dots').value)
    };

    updateProductapi(selectedProductId, updatedProductData)
        .then(updatedProduct => {
            console.log('Producto actualizado:', updatedProduct);
            // Aquí puedes actualizar selectProduct con los datos actualizados si es necesario
            handleSelectProductChange();
        })
        .catch(error => {
            console.error('Error al actualizar el producto:', error);
        });
}

// Agregar listener de evento 'change' a selectFamily
selectFamily.addEventListener('change', handleSelectFamilyChange);

// Agregar listener de evento 'change' a selectProduct
selectProduct.addEventListener('change', handleSelectProductChange);

// Escucha el evento 'click' en el botón de ACTUALIZAR y llama a openModal
updateButton.addEventListener('click', openModal);

// Agregar listener de evento 'change' a modal
confirmModalButton.addEventListener('click', confirmModal);
cancelModalButton.addEventListener('click', cancelModal);

// Llamamos a handleSelectFamilyChange inicialmente para cargar productos cuando se carga la página o cambia selectFamily inicialmente
handleSelectFamilyChange();