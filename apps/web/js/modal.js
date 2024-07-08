
const modalBox = document.getElementById('modal-div');

export function openModal() {
    console.log('Abriend');
    modalBox.classList.remove('hidden');
}

export function cancelModal() {
    console.log('Cancelando');
    modalBox.classList.add('hidden');
}   

