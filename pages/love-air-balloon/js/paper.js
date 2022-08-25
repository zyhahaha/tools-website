import animate from './common/animateplus.js';
let paperEl = document.getElementsByClassName('paper-page')[0];

let str = `<h3>周年快乐</h3>
            <p>
              一段话，一段话 ~~~ <br />
              嘿嘿 <br />
            </p>
            <h5>爱你的  Z  2020.7.18</h5>`;
paperEl.innerHTML = str;

const paperPlay = async () => {
  await animate({
    elements: paperEl,
    duration: 1000,
    transform: ['scale(0)', 1]
  });
};

export default paperPlay;
