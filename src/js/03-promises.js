import Notiflix from 'notiflix';

const refs = {
  form: document.querySelector('.form'),
  // delay: document.querySelector('[name="delay"]'),
  // step: document.querySelector('[name="step"]'),
  // amount: document.querySelector('[name="amount"]'),
  button: document.querySelector('button'),
};

refs.form.addEventListener('input', handleForm);

let positionByPromise = 0;
let noteFromFieldDelay = 0;
let noteFromFieldStep = 0;
let noteFromFieldAmount = 0;

function handleForm(e) {
  noteFromFieldDelay = Number(e.currentTarget.elements.delay.value);
  noteFromFieldStep = Number(e.currentTarget.elements.step.value);
  noteFromFieldAmount = Number(e.currentTarget.elements.amount.value);

  // if (target === refs.step) {
  //   noteFromFieldStep = Number(target.value);
  // } else if (target === refs.delay) {
  //   noteFromFieldDelay = Number(target.value);
  // } else target === refs.amount;
  // noteFromFieldAmount = Number(target.value);
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
    }, noteFromFieldDelay);
  });
}

function start(event) {
  event.preventDefault();
  const interval = setInterval(() => {
    positionByPromise += 1;
    createPromise(positionByPromise, noteFromFieldDelay)
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
    if (positionByPromise === noteFromFieldAmount) {
      clearInterval(interval);
      positionByPromise = 0;
    }
    console.log(noteFromFieldAmount);
    noteFromFieldDelay += noteFromFieldStep;
  }, noteFromFieldStep);
}

refs.form.addEventListener('submit', start);
