import animate from './common/animateplus.js';
let envelopeEl = document.getElementsByClassName('envelope-page')[0];

const envelopePlay = async () => {
  await animate({
    elements: envelopeEl,
    duration: 8000,
    transform: ['translateY(-100vh)', 0]
  });
};

setTimeout(() => {
  envelopePlay();
}, 2000);

// export default envelopePlay;