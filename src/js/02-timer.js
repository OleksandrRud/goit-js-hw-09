import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const myInput = document.querySelector('#datetime-picker');
const button = document.querySelector('[data-start]');

const amountOfDays = document.querySelector('[data-days]');
const amountOfHours = document.querySelector('[data-hours]');
const amountOfMinutes = document.querySelector('[data-minutes]');
const amountOfSeconds = document.querySelector('[data-seconds]');

const currentDate = new Date();

let targetDate = 0;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0].getTime() < currentDate.getTime()) {
      window.alert('Please choose a date in the future');
    } else {
      button.removeAttribute('disabled');
      targetDate = selectedDates[0].getTime();
    }
  },
};

const fp = flatpickr(myInput, options);

const startCountdown = () => {
  timerId = setInterval(() => {
    let delta = targetDate - Date.now();
    function convertMs(ms) {
      const second = 1000;
      const minute = second * 60;
      const hour = minute * 60;
      const day = hour * 24;

      const days = addLeadingZero(Math.floor(ms / day));
      const hours = addLeadingZero(Math.floor((ms % day) / hour));
      const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
      const seconds = addLeadingZero(
        Math.floor((((ms % day) % hour) % minute) / second)
      );

      updateClockFace({ days, hours, minutes, seconds });
      return { days, hours, minutes, seconds };
    }
    convertMs(delta);

    if (delta < 1000) {
      clearInterval(timerId);
    }
  }, 1000);
};

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function updateClockFace({ days, hours, minutes, seconds }) {
  amountOfDays.textContent = days;
  amountOfHours.textContent = hours;
  amountOfMinutes.textContent = minutes;
  amountOfSeconds.textContent = seconds;
}

button.addEventListener('click', startCountdown);
