
const modalBox = document.getElementById('modal-div');

export function openModal() {
    modalBox.classList.remove('hidden');
}

export function cancelModal() {
    modalBox.classList.add('hidden');
}   

