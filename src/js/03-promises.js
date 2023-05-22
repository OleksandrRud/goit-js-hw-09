import Notiflix from 'notiflix';

const refs = {
  form: document.querySelector('.form'),
  button: document.querySelector('button'),
};

refs.form.addEventListener('input', handleForm);

let delay = 0;
let step = 0;
let amount = 0;
let firstDelay = 0;

function handleForm(e) {
  delay = Number(e.currentTarget.elements.delay.value);
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

  for (let i = 1; i <= amount; i += 1) {
    firstDelay = delay;
    createPromise(i, delay)
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

    delay += step;
  }
}
