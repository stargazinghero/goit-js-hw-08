import throttle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-form-state';

const refs = {
  form: document.querySelector('.feedback-form'),
  email: document.querySelector('input'),
  message: document.querySelector('textarea'),
};

checkDataForm();

refs.form.addEventListener('submit', onFormSubmit);
refs.form.addEventListener('input', throttle(onFormInput, 500));

function onFormSubmit(e) {
  e.preventDefault();
  const userData = {};
  const formData = new FormData(e.currentTarget);
  const formElements = e.currentTarget.elements;
  const email = formElements.email.value;
  const message = formElements.message.value;
  if (!email || !message) {
    alert('Заповніть всі поля будь ласка');
    return;
  }
  formData.forEach((value, name) => (userData[name] = value));
  console.log(userData);
  e.currentTarget.reset();
  localStorage.removeItem(STORAGE_KEY);
}

function onFormInput(e) {
  let dataValue = localStorage.getItem(STORAGE_KEY);
  dataValue = dataValue ? JSON.parse(dataValue) : {};
  dataValue[e.target.name] = e.target.value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(dataValue));
}

function checkDataForm() {
  let dataValue = localStorage.getItem(STORAGE_KEY);
  if (dataValue) {
    dataValue = JSON.parse(dataValue);
    Object.entries(dataValue).forEach(([name, value]) => {
      refs.form.elements[name].value = value;
    });
  }
}
