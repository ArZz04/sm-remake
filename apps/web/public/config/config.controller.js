async function getData() {
    return fetch('./config/config.json')
        .then(res => {
            if (!res.ok) {
                throw new Error('Network response was not ok');
            }
            return res.json();
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            return null; // Devolver null en caso de error
        });
}

// GETTERS

export async function getAPIUrlText() {
    const data = await getData(); // Usa await para esperar la resolución de getData
    if (data) {
        return data['api-url'];
    } else {
        console.error('No data available');
        return null; // Devolver null si no hay datos
    }
}

export async function getAPIUrl() {
    return getData().then(data => {
        if (data) {
            return data['api-url'];
        } else {
            console.error('No data available');
            return null; // Devolver null si no hay datos
        }
    });
}

export async function getTimeInterval() {
    return getData().then(data => {
        if (data) {
            return data['timeInterval'];
        } else {
            console.error('No data available');
            return null; // Devolver null si no hay datos
        }
    });
}

export async function getSchendule() {
    return getData().then(data => {
        if (data) {
            return data['schendule'];
        } else {
            console.error('No data available');
            return null; // Devolver null si no hay datos
        }
    });
}

