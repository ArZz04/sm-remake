import { getProductsBySubfamilyId } from "../js/api.js";

class Screen {
    static renderProducts(products) {
        const container = document.createElement('div');
        container.classList.add('products-container');

        products.forEach(product => {
            const productElement = document.createElement('div');
            productElement.classList.add('product');
            productElement.innerHTML = `
                <div class="product-info">
                    <p class="product-name m0">${product.name}</p>
                    <p class="product-dots m0">${'.'.repeat(product.dots)}</p>
                    <p class="product-price m0">$${product.price}</p>
                    <p class="product-format m0">${product.format}</p>
                </div>
            `;
            container.appendChild(productElement);
        });

        return container;
    }
}

async function loadProducts() {


    const products1 = await getProductsBySubfamilyId(16);
    const products2 = await getProductsBySubfamilyId(17);

    const s1 = document.getElementById('s16');
    const s2 = document.getElementById('s17');

    s1.appendChild(Screen.renderProducts(products1));
    s2.appendChild(Screen.renderProducts(products2));
}

loadProducts();