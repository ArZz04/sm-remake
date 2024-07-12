import { getProductsBySubfamilyId } from "../js/api.js";

class Screen {
    static renderProducts(products) {
        const container = document.createElement('div');
        container.classList.add('products-container');

        products.forEach(product => {
            const productElement = document.createElement('div');
            productElement.classList.add('product');
            productElement.innerHTML = `
                <div class="product-info" style="display: flex; color: #1b1b1b">
                    <p class="product-name" style="font-size: 40px; margin: 0px">${product.name}</p>
                    <p class="product-dots" style="font-size: 35px; margin: 0px">${'.'.repeat(product.dots)}</p>
                    <p class="product-price" style="font-size: 40px; margin: 0px">$${product.price}</p>
                    <p class="product-format" style="font-size: 30px; margin: 0px">${product.format}</p>
                </div>
            `;
            container.appendChild(productElement);
        });

        return container;
    }
}

async function loadProducts() {


    const products1 = await getProductsBySubfamilyId(7);
    const products2 = await getProductsBySubfamilyId(8);
    const products3 = await getProductsBySubfamilyId(9);

    const s1 = document.getElementById('s7');
    const s2 = document.getElementById('s8');
    const s3 = document.getElementById('s9');

    s1.appendChild(Screen.renderProducts(products1));
    s2.appendChild(Screen.renderProducts(products2));
    s3.appendChild(Screen.renderProducts(products3));
}

loadProducts();