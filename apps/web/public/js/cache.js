export async function fetchDataAndUpdateCache(apiUrl, cacheName) {
    try {
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });

        if (response.ok) {
            const data = await response.json();
            const apiData = JSON.stringify(data);

            const cachedResponse = await getCache(cacheName, apiUrl);

            if (!cachedResponse || cachedResponse !== apiData) {
                await setCache(cacheName, apiUrl, apiData);
                return data;  // Devuelve los datos actualizados
            } else {
                return JSON.parse(cachedResponse);  // Devuelve los datos actuales del caché
            }
        } else {
            throw new Error('Error en la respuesta de la API');
        }
    } catch (error) {
        console.error('Error en la solicitud a la API:', error);

        // Si hay un error en la conexión, usa los datos almacenados en el caché
        const cachedResponse = await getCache(cacheName, apiUrl);
        if (cachedResponse) {
            return JSON.parse(cachedResponse);  // Devuelve los datos almacenados en el caché
        } else {
            return null;  // O maneja el caso en que no hay datos disponibles
        }
    }
}

// Función para obtener los datos del caché
async function getCache(cacheName, url) {
    const cache = await caches.open(cacheName);
    const response = await cache.match(url);
    if (response) {
        return response.text();
    }
    return null;
}

// Función para establecer los datos en el caché
async function setCache(cacheName, url, data) {
    const cache = await caches.open(cacheName);
    const response = new Response(data, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
    await cache.put(url, response);
}
