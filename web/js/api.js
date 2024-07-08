const API_URL =  'http://localhost:8000';

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

export async function getProductsByCategory(categoryId) {
    const url = `${API_URL}/api/products/category/${categoryId}`;

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
    const url = `${API_URL}/api/products/byid/${productId}`;

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

export async function getFamilies() {
    const url = `${API_URL}/api/categories/all`;

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

async function updateProduct(productId, updatedProductData) {
    const url = `${API_URL}/api/products/update/${productId}`;

    try {
        const response = await fetch(url, {
            method: 'PUT',
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