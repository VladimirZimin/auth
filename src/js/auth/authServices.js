import axios from 'axios';

const BASE_URL_SINSUP =
  'https://identitytoolkit.googleapis.com/v1/accounts:signUp';
const BASE_URL_SINSIN =
  'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword';
const API_KEY = 'AIzaSyDdloBwDz4pcCJbF8ZAJu_7wxU2Anwxn9w';

const user = {
  email: '',
  password: '',
};

const onUserInfo = evt => {
  user[evt.target.name] = evt.target.value;
};

const resetData = evt => {
  evt.currentTarget.reset();

  user.email = '';
  user.password = '';
};

const authWithEmailAndPass = async evt => {
  console.log(evt.submitter.dataset.action);

  switch (evt.submitter.dataset.action) {
    case 'singup':
      try {
        const response = await axios.post(`${BASE_URL_SINSUP}?key=${API_KEY}`, {
          ...user,
          returnSecureToken: true,
        });
        localStorage.setItem('token', JSON.stringify(response.data.idToken));
      } catch (error) {
        console.error(error);
      }
      break;

    case 'singin':
      try {
        const response = await axios.post(`${BASE_URL_SINSIN}?key=${API_KEY}`, {
          ...user,
          returnSecureToken: true,
        });
        localStorage.setItem('token', JSON.stringify(response.data.idToken));
      } catch (error) {
        console.error(error);
      }
      break;
    default:
      break;
  }
};

const submitData = evt => {
  evt.preventDefault();
  console.log('evt', evt.submitter);
  authWithEmailAndPass(evt);
  resetData(evt);
};

export const addAuthFormListeners = () => {
  const authForm = document.forms.authForm;
  console.log('authForm', authForm);

  authForm.addEventListener('input', onUserInfo);
  authForm.addEventListener('submit', submitData);
};
