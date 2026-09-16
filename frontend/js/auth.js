import { api, saveSession } from './api.js';

const form = document.querySelector('#authForm');
const loginTab = document.querySelector('#loginTab');
const registerTab = document.querySelector('#registerTab');
const title = document.querySelector('#authTitle');
const subtitle = document.querySelector('#authSubtitle');
const submitButton = document.querySelector('#submitButton');
const message = document.querySelector('#authMessage');
const registerFields = [...document.querySelectorAll('.register-only')];
const password = document.querySelector('#password');

let mode = 'login';

function setMode(nextMode) {
  mode = nextMode;
  const isRegister = mode === 'register';

  loginTab.classList.toggle('active', !isRegister);
  registerTab.classList.toggle('active', isRegister);
  registerFields.forEach((field) => field.classList.toggle('hidden', !isRegister));
  title.textContent = isRegister ? 'Create account' : 'Sign in';
  subtitle.textContent = isRegister
    ? 'Create your GamesVauch profile and start building your library.'
    : 'Access your personal game library.';
  submitButton.textContent = isRegister ? 'Create account' : 'Sign in';
  password.autocomplete = isRegister ? 'new-password' : 'current-password';
  message.textContent = '';
}

function showMessage(text, type = 'error') {
  message.textContent = text;
  message.className = `form-message ${type}`;
}

loginTab.addEventListener('click', () => setMode('login'));
registerTab.addEventListener('click', () => setMode('register'));

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  showMessage('');
  submitButton.disabled = true;

  const data = new FormData(form);
  const payload = {
    email: data.get('email')?.trim(),
    password: data.get('password')
  };

  if (mode === 'register') {
    payload.displayName = data.get('displayName')?.trim();
    payload.username = data.get('username')?.trim();
  }

  try {
    const result = mode === 'register'
      ? await api.register(payload)
      : await api.login(payload);

    saveSession(result);
    showMessage(mode === 'register' ? 'Account created. Redirecting...' : 'Signed in. Redirecting...', 'success');
    window.setTimeout(() => { window.location.href = './'; }, 500);
  } catch (error) {
    showMessage(error.message);
  } finally {
    submitButton.disabled = false;
  }
});

setMode('login');
