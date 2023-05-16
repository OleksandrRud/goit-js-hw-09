import Notiflix from 'notiflix';

const refs = {
  form: document.querySelector('.form'),
  button: document.querySelector('button'),
};

refs.form.addEventListener('input', handleForm);

let positionOfPromise = 0;
let firstDelay = 0;
let step = 0;
let amount = 0;

function handleForm(e) {
  firstDelay = Number(e.currentTarget.elements.delay.value);
  step = Number(e.currentTarget.elements.step.value);
  amount = Number(e.currentTarget.elements.amount.value);
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, firstDelay);
  });
}

function start(event) {
  event.preventDefault();
  const interval = setInterval(() => {
    positionOfPromise += 1;
    createPromise(positionOfPromise, firstDelay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
    if (positionOfPromise === amount) {
      clearInterval(interval);
      positionOfPromise = 0;
      firstDelay = firstDelay - step * amount;
    }
    firstDelay += step;
  }, step);
}

refs.form.addEventListener('submit', start);
