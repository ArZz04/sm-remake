import { getSchedule, updateText } from '../js/api.js';

const labelApiStatus = document.getElementById('api-status');
const tUp = document.getElementById('tUp');
const tDown = document.getElementById('tDown');
const btSave = document.getElementById('btn-schedule');

async function fetchSchedule() {
    try {
        labelApiStatus.textContent = '  Waiting';
        labelApiStatus.style.color = 'orange'; 

        const data = await getSchedule();
        if (data && data.length > 0) {
            labelApiStatus.textContent = '  Online';
            labelApiStatus.style.color = 'green';

            const schedule = data[0]; // Assuming you want the first schedule
            tUp.value = schedule.textUp || '';
            tDown.value = schedule.textDown || '';
        } else {
            labelApiStatus.textContent = '  No data available';
            labelApiStatus.style.color = 'gray';
        }
    } catch (error) {
        labelApiStatus.textContent = '  Offline';
        labelApiStatus.style.color = 'red';
        console.error('Error al obtener el horario:', error);
    }
}

btSave.addEventListener('click', async (event) => {
    event.preventDefault(); // Previene el envío del formulario y la recarga de la página

    const updatedTextData = {
        textUp: tUp.value,
        textDown: tDown.value
    };

    try {
        const data = await updateText(updatedTextData);
        console.log('Texto actualizado:', data);
        fetchSchedule();
    } catch (error) {
        console.error('Error al actualizar el texto:', error);
    }
});

// Llama a la función para obtener el horario más reciente
fetchSchedule();
