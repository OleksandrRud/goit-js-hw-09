const btnStart = document.querySelector('[data-start]');
const btnStop = document.querySelector('[data-stop]');
const colorBody = document.querySelector('body');

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function startChangingColol() {
  changingColol(btnStart, btnStop);

  const intervalId = setInterval(() => {
    const color = getRandomHexColor();
    colorBody.style.background = color;
  }, 1000);

  function stopChangingColol() {
    changingColol(btnStop, btnStart);
    clearInterval(intervalId);
  }

  btnStop.addEventListener('click', stopChangingColol);
}

function changingColol(active, notActive) {
  active.setAttribute('disabled', '');
  notActive.removeAttribute('disabled');
}

btnStart.addEventListener('click', startChangingColol);
