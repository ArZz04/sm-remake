
import { getAPIUrl, getSchendule, getTimeInterval } from "./config.controller.js";

const inputDays = document.getElementById('dias');
const inputHours = document.getElementById('horas');
const inputInterval = document.getElementById('intervalo');
const labelApiURL = document.getElementById('api-url');
const labelApiStatus = document.getElementById('api-status');

const invalidSchendule = document.getElementById('schendule-invalid');
const invalidInterval = document.getElementById('interval-invalid');

function convertToMs(ms) {
    return ms * 1000;
}

function convertToSeconds(ms) {
    return ms / 1000;
}

function showError(message) {
    // Aquí puedes actualizar el texto del mensaje de error en el HTML
    const errorElement = document.getElementById('error-message');
    if (errorElement) {
        errorElement.innerText = message;
        errorElement.classList.remove('hidden');
        
        // Ocultar el mensaje después de 5 segundos
        setTimeout(() => {
            errorElement.classList.add('hidden');
        }, 5000);
    }
}

function checkStatusApi(apiUrl) {
        // Establecer estado inicial como "Waiting" en color naranja
    labelApiStatus.innerText = '  Waiting';
    labelApiStatus.style.color = 'orange';
        
    fetch(apiUrl)
        .then(res => {
            if (!res.ok) {
                labelApiStatus.innerText = '  Offline';
                labelApiStatus.style.color = 'red';
            } else {
                labelApiStatus.innerText = '  Online';
                labelApiStatus.style.color = 'green';
            }
        })
        .catch(error => {
            console.error('Error checking API status:', error);
            labelApiStatus.innerText = '  Offline';
            labelApiStatus.style.color = 'red';
        });
}

async function populateInputs() {
    try {
        const schedule = await getSchendule();
        const interval = await getTimeInterval();
        const apiUrl = await getAPIUrl();

        if (schedule) {
            inputDays.value = schedule.dias;
            inputHours.value = schedule.horario;
        } else {
            console.error('Failed to retrieve schedule');
        }

        if (interval) {
            inputInterval.value = convertToSeconds(interval);
        } else {
            console.error('Failed to retrieve time interval');
        }

        if (apiUrl) {
            labelApiURL.innerText += ` ${apiUrl}`;
            checkStatusApi(apiUrl);
        }

    } catch (error) {
        console.error('Error populating inputs:', error);
    }
}

function validateSchedule() {
    const days = inputDays.value.trim();
    const hours = inputHours.value.trim();

    if (days === '' || hours === '') {
        invalidSchendule.classList.remove('hidden'); // Llama al método remove
    } else {
        invalidSchendule.classList.add('hidden'); // Llama al método add
    }
}

function validateInterval() {
    const interval = inputInterval.value.trim();

    
    if (interval === '') {
        // Si el campo está vacío, muestra el mensaje de error
        invalidInterval.classList.remove('hidden');
    } else {
        // Verifica si el valor es un número entero mayor a 0
        const intervalNumber = Number(interval);
        if (isNaN(intervalNumber) || intervalNumber <= 0 || !Number.isInteger(intervalNumber)) {
            // Si no es un número entero mayor a 0, muestra el mensaje de error
            invalidInterval.classList.remove('hidden');
        } else {
            // Si es válido, oculta el mensaje de error
            invalidInterval.classList.add('hidden');
        }
    }
}

inputDays.addEventListener('change', validateSchedule);
inputHours.addEventListener('change', validateSchedule);

inputInterval.addEventListener('change', validateInterval);

populateInputs();