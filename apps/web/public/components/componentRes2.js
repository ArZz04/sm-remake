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
                    <p class="product-name m0">${product.name}</p>
                    <p class="product-dots text-25 m0">${'.'.repeat(product.dots)}</p>
                    <p class="product-price m0">$${product.price}</p>
                    <p class="product-format text-20 m0">${product.format}</p>
                </div>
            `;
            container.appendChild(productElement);
        });

        return container;
    }
}

async function loadProducts() {


    const products1 = await getProductsBySubfamilyId(4);
    const products2 = await getProductsBySubfamilyId(5);
    const products3 = await getProductsBySubfamilyId(6);

    const s1 = document.getElementById('s4');
    const s2 = document.getElementById('s5');
    const s3 = document.getElementById('s6');

    s1.appendChild(Screen.renderProducts(products1));
    s2.appendChild(Screen.renderProducts(products2));
    s3.appendChild(Screen.renderProducts(products3));
}

loadProducts();