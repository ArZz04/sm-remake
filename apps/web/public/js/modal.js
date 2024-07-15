
const modalBox = document.getElementById('modal-div');
const modalErrorBox = document.getElementById('modal-error-div');
const counterDiv = document.getElementById('counter-div');

export function openModal() {
    modalBox.classList.remove('hidden');
}

export function cancelModal() {
    modalBox.classList.add('hidden');
}   

export function openErrorModal() {
    let i = 0;
    const interval = setInterval(() => {
        modalErrorBox.classList.remove('hidden');
        counterDiv.textContent = 5 - i;
        i++;
        if (i > 5) {
            clearInterval(interval);
            modalErrorBox.classList.add('hidden');
        }
    }, 1000);
}
