import { fetchDataAndUpdateCookie } from './cookies.js';
const API_URL =  'https://api-sm-rrzt.onrender.com';

export async function getProducts() {
    const url = `${API_URL}/api/products/all`;

    return fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error al obtener los productos');
        }
        return response.json();
    })
    .then(data => {
        return data;
    })
    .catch(error => {
        console.error('Error al conectar con la api:', error);
    });
}

export async function getProductsByFamilyId(familyId) {
    const url = `${API_URL}/api/products/family/${familyId}`;

    return fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error al obtener los productos');
        }
        return response.json();
    })
    .then(data => {
        return data;
    })
    .catch(error => {
        console.error('Error al conectar con la api:', error);
    });
}

export async function getProductById(productId) {
    const url = `${API_URL}/api/products/byplu/${productId}`;

    return fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error al obtener el producto');
        }
        return response.json();
    })
    .then(data => {
        return data;
    })
    .catch(error => {
        console.error('Error al conectar con la api:', error);
    });

}

export async function getProductsBySubfamilyId(subfamilyId) {
    const url = `${API_URL}/api/products/subfamily/${subfamilyId}`;
    const cookieName = `productsSubfamily${subfamilyId}`;

    return fetchDataAndUpdateCookie(url, cookieName);
}

export async function getFamilies() {
    const url = `${API_URL}/api/families/all`;

    return fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error al obtener las familias');
        }
        return response.json();
    })
    .then(data => {
        return data;
    })
    .catch(error => {
        console.error('Error al conectar con la api:', error);
    });


}

export async function getLatestProducts() {
    const url = `${API_URL}/api/products/recent`;

    return fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error al obtener los productos más recientes');
        }
        return response.json();
    })
    .then(data => {
        return data;
    })
    .catch(error => {
        console.error('Error al conectar con la api:', error);
    });
}

export async function updateProductapi(productId, updatedProductData) {
    const url = `${API_URL}/api/products/update/${productId}`;

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedProductData)
        });

        if (!response.ok) {
            throw new Error('Error al actualizar el producto');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error al conectar con la API:', error);
        throw error; // Propaga el error para que se maneje donde se llame a la función
    }
}