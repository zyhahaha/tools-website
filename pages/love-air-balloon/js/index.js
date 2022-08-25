import './common/device-init.js';
import animate from './common/animateplus.js';
import './air-balloon.js';
import './envelope.js';
import paperPlay from './paper.js';

var heartEl = document.getElementsByClassName('heart')[0];

heartEl.style.animation = 'pound 0.25s infinite alternate';
const heartPlay = async () => {
  heartEl.style.animation = '';
  setTimeout(paperPlay, 600);
  await animate({
    elements: heartEl,
    easing: 'out-elastic 1 .7',
    duration: 3000,
    opacity: [1, 0],
    transform: ['scale(1)', 9]
  });
};
heartEl.addEventListener('click', heartPlay);
