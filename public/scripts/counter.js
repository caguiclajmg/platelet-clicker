var divRoot = document.getElementById('div-root');

var snd_react = [new Audio('public/sounds/react1.ogg'), new Audio('public/sounds/react2.ogg')];

var imageNormal = document.getElementById('image-normal');
var imagePoke = document.getElementById('image-poke');

var audioMusic = document.getElementById('audio-music');
var audioPoke = document.getElementById('audio-poke');

var clicks = 0;

function toggleImage(down) {
    imageNormal.style.display = down ? 'none' : 'block';
    imagePoke.style.display = down ? 'block' : 'none';
}

function pok(e) {
    if(audioMusic.paused) audioMusic.play();

    audioPoke.play();

    toggleImage(true);

    if(++clicks % 3 === 0) {
        var index = Math.floor(Math.random() * snd_react.length);
        snd_react[index].play();
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