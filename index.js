const inputEl = document.querySelector('input');
const buttonEl = document.querySelector('button');
const timerEl = document.querySelector('span');

// Напишите реализацию createTimerAnimator
// который будет анимировать timerEl
const setTime = (num) =>{
  const hours = Math.floor(num / 3600); 
  const min = Math.floor((num % 3600) / 60); 
  const sec = Math.floor(num) % 60;
  let renderedHours = (hours < 10 ? "0" : "") + hours;
  let renderedMin = (min < 10 ? "0" : "") + min;
  let renderedSec = (sec < 10 ? "0" : "") + sec;
  return String(`${renderedHours}:${renderedMin}:${renderedSec}`);
}

const createTimerAnimator = () => {
  let val = null;
  return (seconds) => {
    seconds = Math.floor(seconds);

    if(seconds==NaN || seconds<=0){ return; }
    
    timerEl.innerText = setTime(seconds);
    clearInterval(val);

    val = setInterval(() => {
      seconds--;
      
      if (seconds <= 0){
        clearInterval(val);
        timerEl.innerText = '00:00:00';
        return;
      }
      timerEl.innerText = setTime(seconds);
    }, 1000);
  };
};

const animateTimer = createTimerAnimator();

inputEl.addEventListener('input', () => {
  // Очистите input так, чтобы в значении
  // оставались только числа
  let value = inputEl.value;
  value = value.replace(/\D/g, '');
  inputEl.value = value;
});

buttonEl.addEventListener('click', () => {
  const seconds = Number(inputEl.value);

  animateTimer(seconds);

  inputEl.value = '';
});
