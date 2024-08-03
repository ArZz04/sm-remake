//'https://api-web.arzz.tech' || 

import { getLatestProducts } from './api.js';

const lastProductsBox = document.getElementById('last-products-box');

const labelApiStatus = document.getElementById('api-status');

function formatDateTime(dateTimeString) {
    const date = new Date(dateTimeString);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
}

function noConnection(){
    const rowProduct = document.createElement('tr');
    rowProduct.className = "border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600";
    rowProduct.innerHTML = `
        <td class="whitespace-nowrap px-6 py-4 font-medium">NO SE PUDO OBTENER INFORMACION</td>
    `;

    // Agrega la nueva fila al tbody
    lastProductsBox.appendChild(rowProduct);
}


async function fetchLatestProducts() {
    try {

        labelApiStatus.innerText = '  Waiting';
        labelApiStatus.style.color = 'orange'; 

        const data = await getLatestProducts();
        if (data && data.length > 0) {
            data.forEach(product => {
                const rowProduct = document.createElement('tr');
                labelApiStatus.innerText = '  Online';
                labelApiStatus.style.color = 'green';

                rowProduct.className = "border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600";
                rowProduct.innerHTML = `
                    <td class="whitespace-nowrap px-6 py-4 font-medium">${product.name}</td>
                    <td class="whitespace-nowrap px-6 py-4">${formatDateTime(product.last_changed)}</td>
                    <td class="whitespace-nowrap px-6 py-4">$${product.price}MXN</td>
                `;
                lastProductsBox.appendChild(rowProduct);

            });
        } else {
            noConnection();
        }
    } catch (error) {
        labelApiStatus.innerText = '  Offline';
        labelApiStatus.style.color = 'red';
        console.error('Error al obtener productos:', error);
        noConnection();
    }
}

// Llama a la función para obtener los productos más recientes
fetchLatestProducts();