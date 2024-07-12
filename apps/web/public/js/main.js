// Definir lista de canciones (simulado)
let playlist = [
    { name: 'Flaco', url: 'public/music/Virlán García - Flaco.mp3' },
    { name: 'Gente de las 4', url: 'public/music/Virlán García - Gente de las 4.mp3' },
    { name: 'Hoy Voy a Olvidarte', url: 'public/music/Virlán García - Hoy Voy a Olvidarte.mp3' }
];

// Variables para el reproductor y la canción actual
const audioPlayer = document.getElementById('audio');
const currentSongInfo = document.getElementById('currentSongInfo');
const playPauseButton = document.getElementById('playPauseButton');
const addSongButton = document.getElementById('addSongButton');

let currentSongIndex = 0;
let isPlaying = false;

// Función para reproducir la canción actual
function playSong() {
    if (playlist.length === 0) {
        currentSongInfo.textContent = 'No songs in playlist.';
        return;
    }

    const currentSong = playlist[currentSongIndex];
    audioPlayer.src = currentSong.url;

    // Intenta reproducir la canción
    const playPromise = audioPlayer.play();

    if (playPromise !== undefined) {
        playPromise.then(_ => {
            // La reproducción inició correctamente
            currentSongInfo.textContent = `Now playing: ${currentSong.name}`;
            isPlaying = true;
        }).catch(error => {
            // Error al intentar reproducir
            console.error('Playback error:', error);
        });
    }
}

// Función para pausar la canción actual
function pauseSong() {
    audioPlayer.pause();
    isPlaying = false;
}

// Event listener para el botón de play/pause
playPauseButton.addEventListener('click', function() {
    if (isPlaying) {
        pauseSong();
    } else {
        playSong();
    }
});

// Event listener para el botón de agregar canción (simulado)
addSongButton.addEventListener('click', function() {
    // Simular agregar una canción nueva a la playlist
    const newSong = { name: `Song ${playlist.length + 1}`, url: `url_de_la_cancion_${playlist.length + 1}.mp3` };
    playlist.push(newSong);
    alert(`Added ${newSong.name} to playlist.`);
});

// Reproducir la primera canción automáticamente al cargar la página
window.addEventListener('load', function() {
    playSong();
});