
import { getSchendule } from '../js/api.js';

const labelApiStatus = document.getElementById('api-status');

const tUp = document.getElementById('tUp');
const tDown = document.getElementById('tDown');
const btSave = document.getElementById('btn-schendule');

async function fetchSchendule() {
    try {

        labelApiStatus.innerText = '  Waiting';
        labelApiStatus.style.color = 'orange'; 

        const data = await getSchendule();

    } catch (error) {
        labelApiStatus.innerText = '  Offline';
        labelApiStatus.style.color = 'red';
        console.error('Error al obtener productos:', error);
    }
}

// Llama a la función para obtener los productos más recientes
fetchSchendule();