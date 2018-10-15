'use strict';

var divRoot = document.getElementById('div-root');

var imageNormal = document.getElementById('image-normal');
var imagePoke = document.getElementById('image-poke');

var audioMusic = createAudioElement({
    'audio/ogg': 'public/sounds/music.ogg',
    'audio/mpeg': 'public/sounds/music.mp3'
})
audioMusic.loop = true;
audioMusic.volume = 0.8;

var audioPoke = createAudioElement({
    'audio/ogg': 'public/sounds/poke.ogg',
    'audio/mpeg': 'public/sounds/poke.mp3'
});

var reactionFiles = [
    {
        'audio/ogg': 'public/sounds/react1.ogg',
        'audio/mpeg': 'public/sounds/react1.mp3'
    },
    {
        'audio/ogg': 'public/sounds/react2.ogg',
        'audio/mpeg': 'public/sounds/react2.mp3'
    }
]

var audioReact = reactionFiles.map(createAudioElement);
var clicks = 0;

function createAudioElement(source) {
    var audioElement = document.createElement('audio');
    Object.keys(source).forEach(function(key) {
        var sourceElement = document.createElement('source');
        sourceElement.type = key;
        sourceElement.src = source[key];
        audioElement.appendChild(sourceElement);
    });
    return audioElement;
}

function toggleImage(down) {
    imageNormal.style.display = down ? 'none' : 'block';
    imagePoke.style.display = down ? 'block' : 'none';
}

function pok(e) {
    if(audioMusic.paused) audioMusic.play();

    audioPoke.play();

    toggleImage(true);

    if(++clicks % 6 === 0) {
        var index = Math.floor(Math.random() * audioReact.length);
        audioReact[index].play();
    }
}

function releas(e) {
    toggleImage(false);
}

toggleImage(false);

divRoot.addEventListener('mousedown', function(e) { if(e.button !== 0) return; pok(e); });
divRoot.addEventListener('mouseup', function(e) { if(e.button !== 0) return; releas(e); });
divRoot.addEventListener('touchstart', function(e) { pok(e); e.preventDefault(); });
divRoot.addEventListener('touchmove', function(e) { e.preventDefault(); });
divRoot.addEventListener('touchend', function(e) { releas(e); });
divRoot.addEventListener('touchcancel', function(e) { releas(e); });