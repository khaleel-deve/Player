const audio = document.getElementById('audio');
const audioSource = document.getElementById('audioSource');
const playPauseButton = document.getElementById('playPause');
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');
const songName = document.getElementById('songName');
const songList = document.getElementById('songList');
const loginPage = document.getElementById('loginPage');
const musicPlayerPage = document.getElementById('musicPlayerPage');
const loginForm = document.getElementById('loginForm');
const loginError = document.getElementById('loginError');

let songs = [];
let currentSongIndex = 0;

// Login functionality
loginForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username === 'sk' && password === '6309434904') {
        loginPage.style.display = 'none';
        musicPlayerPage.style.display = 'block';
        fetchSongs(); // Load songs after login
    } else {
        loginError.textContent = 'Invalid username or password. Contact Khaleel.';
    }
});

function fetchSongs() {
    fetch('songs.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            songs = data;
            displaySongList();
            if (songs.length > 0) {
                loadSong(currentSongIndex);
            } else {
                console.warn('No songs found in songs.json');
            }
        })
        .catch(error => {
            console.error('Error loading song list:', error);
        });
}

function displaySongList() {
    songList.innerHTML = ''; // Clear existing list
    if (songs.length === 0) {
        songList.innerHTML = '<li>No songs available</li>';
        return;
    }
    songs.forEach((song, index) => {
        const li = document.createElement('li');
        li.textContent = song.name;
        li.addEventListener('click', () => {
            currentSongIndex = index;
            loadSong(currentSongIndex);
        });
        songList.appendChild(li);
    });
}

function loadSong(index) {
    if (songs.length === 0) return;
    audioSource.src = songs[index].src;
    songName.textContent = songs[index].name;
    audio.load();
    audio.play().catch(error => {
        console.error('Error playing the song:', error);
    });
}

function playPause() {
    if (audio.paused) {
        audio.play().catch(error => {
            console.error('Error playing the song:', error);
        });
        playPauseButton.textContent = 'Pause';
    } else {
        audio.pause();
        playPauseButton.textContent = 'Play';
    }
}

function prevSong() {
    if (songs.length === 0) return;
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    loadSong(currentSongIndex);
}

function nextSong() {
    if (songs.length === 0) return;
}