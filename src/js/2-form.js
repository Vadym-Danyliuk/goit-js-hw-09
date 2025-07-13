let formData = {
  email: '',
  message: '',
};

const STORAGE_KEY = 'feedback-form-state';

const form = document.querySelector('.feedback-form');

function saveToLocalStorage() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function loadFromLocalStorage() {
  try {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      formData = { ...formData, ...parsedData };

      const emailInput = form.querySelector('input[name="email"]');
      const messageTextarea = form.querySelector('textarea[name="message"]');

      if (formData.email) {
        emailInput.value = formData.email;
      }
      if (formData.message) {
        messageTextarea.value = formData.message;
      }
    }
  } catch (error) {
    console.error('Помилка завантаження з локального сховища:', error);
  }
}

function clearForm() {
  formData = { email: '', message: '' };
  localStorage.removeItem(STORAGE_KEY);
  form.reset();
}

form.addEventListener('input', event => {
  const { name, value } = event.target;

  if (name === 'email' || name === 'message') {
    formData[name] = value.trim();
    saveToLocalStorage();
  }
});

form.addEventListener('submit', event => {
  event.preventDefault();

  if (!formData.email || !formData.message) {
    alert('Fill please all fields');
    return;
  }

  console.log('Дані форми:', formData);

  clearForm();
});

document.addEventListener('DOMContentLoaded', loadFromLocalStorage);
