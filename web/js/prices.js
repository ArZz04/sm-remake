import { getFamilies, getProductsByCategory, getProductById } from './api.js';

const selectFamily = document.getElementById('select-family');
const selectProduct = document.getElementById('select-product');
const inputPrice = document.getElementById('input-price');

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
            });
    } else {
        // Si no hay ninguna opción seleccionada o es '0', mostramos el mensaje por defecto
        selectProduct.innerHTML = '<option value="0">Seleccionar Producto</option>';
        inputPrice.value = ''; // Limpiamos el valor de inputPrice
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
                    inputPrice.value = selectedProduct.price; // Actualizamos inputPrice con el precio del producto seleccionado
                } else {
                    inputPrice.value = ''; // Limpiamos el valor de inputPrice si no se encuentra el producto
                }
            })
            .catch(error => {
                console.error('Error al obtener el producto por ID:', error);
                inputPrice.value = ''; // Limpiamos el valor de inputPrice en caso de error
            });
    } else {
        inputPrice.value = ''; // Limpiamos el valor de inputPrice si se selecciona 'Seleccionar Producto'
    }
}

// Agregar listener de evento 'change' a selectFamily
selectFamily.addEventListener('change', handleSelectFamilyChange);

// Agregar listener de evento 'change' a selectProduct
selectProduct.addEventListener('change', handleSelectProductChange);

// Llamamos a handleSelectFamilyChange inicialmente para cargar productos cuando se carga la página o cambia selectFamily inicialmente
handleSelectFamilyChange();