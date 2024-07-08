//'https://api-web.arzz.tech' || 

import { getLatestProducts } from './api.js';

function formatDateTime(dateTimeString) {
    const date = new Date(dateTimeString);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
}

getLatestProducts()
    .then(data => {
        if (data) {
            //console.log('Productos más recientes:', data);
            // Selecciona el tbody por su id
            const lastProductsBox = document.getElementById('last-products-box');

            // Crea una nueva fila
            for (let i = 0; i < data.length; i++){
                const rowProduct = document.createElement('tr');
                rowProduct.className = "border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600";
                rowProduct.innerHTML = `
                    <td class="whitespace-nowrap px-6 py-4 font-medium">${data[i].name}</td>
                    <td class="whitespace-nowrap px-6 py-4">${formatDateTime(data[i].last_changed)}</td>
                    <td class="whitespace-nowrap px-6 py-4">$${data[i].price}MXN</td>
                `;
    
                // Agrega la nueva fila al tbody
                lastProductsBox.appendChild(rowProduct);
            }
        }
    });

