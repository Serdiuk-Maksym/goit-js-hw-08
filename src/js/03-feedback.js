import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const emailInput = form.elements.email;
const messageInput = form.elements.message;

const saveFormStateThrottled = throttle(function () {
  const formState = {
    email: emailInput.value,
    message: messageInput.value,
  };
  localStorage.setItem('feedback-form-state', JSON.stringify(formState));
}, 500); // Обмеження оновлення форми не частіше, ніж раз на 500 мілісекунд

// Перевірка та заповнення полів форми при завантаженні сторінки
const savedFormState = localStorage.getItem('feedback-form-state');
if (savedFormState) {
  const parsedFormState = JSON.parse(savedFormState);
  emailInput.value = parsedFormState.email;
  messageInput.value = parsedFormState.message;
}

// Відстеження події input на формі
form.addEventListener('input', function () {
  saveFormStateThrottled();
});

// Обробник події сабміту форми
form.addEventListener('submit', function (event) {
  event.preventDefault();

  const formState = {
    email: emailInput.value,
    message: messageInput.value,
  };

  console.log(formState); // Виведення об'єкту з полями email та message у консоль

  // Очищення сховища та полів форми
  localStorage.removeItem('feedback-form-state');
  emailInput.value = '';
  messageInput.value = '';
});
