
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
                console.log(`Cookie ${cookieName} actualizada:`, apiData);
                return data;  // Devuelve los datos actualizados
            } else {
                console.log(`La cookie ${cookieName} no ha cambiado`);
                return JSON.parse(currentCookie);  // Devuelve los datos actuales de la cookie
            }
        } else {
            throw new Error('Error en la respuesta de la API');
        }
    } catch (error) {
        console.error('Error en la solicitud a la API:', error);
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