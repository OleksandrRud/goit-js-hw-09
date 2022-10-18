const btnStart = document.querySelector('[data-start]');
const btnStop = document.querySelector('[data-stop]');
const colorBody = document.querySelector('body');

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function startChangingColol() {
  btnStart.setAttribute('disabled', '');
  btnStop.removeAttribute('disabled');

  const intervalId = setInterval(() => {
    const color = getRandomHexColor();
    colorBody.style.background = color;
  }, 1000);

  function stopChangingColol() {
    btnStop.setAttribute('disabled', '');
    btnStart.removeAttribute('disabled');
    clearInterval(intervalId);
  }

  btnStop.addEventListener('click', stopChangingColol);
}

btnStart.addEventListener('click', startChangingColol);
