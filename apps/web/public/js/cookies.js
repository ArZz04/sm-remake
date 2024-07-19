
export async function fetchDataAndUpdateCookie(apiUrl, cookieName) {
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

            const currentCookie = getCookie(cookieName);

            if (currentCookie !== apiData) {
                setCookie(cookieName, apiData, 7);
                return data;  // Devuelve los datos actualizados
            } else {
                return JSON.parse(currentCookie);  // Devuelve los datos actuales de la cookie
            }
        } else {
            throw new Error('Error en la respuesta de la API');
        }
    } catch (error) {
        console.error('Error en la solicitud a la API:', error);

        // Si hay un error en la conexión, usa los datos almacenados en la cookie
        const cachedData = getCookie(cookieName);
        if (cachedData) {
            return JSON.parse(cachedData);  // Devuelve los datos almacenados en la cookie
        } else {
            return null;  // O maneja el caso en que no hay datos disponibles
        }
    }
}

// Función para obtener el valor de una cookie
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

// Función para establecer una cookie
function setCookie(name, value, days) {
    const d = new Date();
    d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = "expires=" + d.toUTCString();
    document.cookie = `${name}=${value}; ${expires}; path=/`;
}