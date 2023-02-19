import axios from 'axios';
import infoTemplate from '../../templates/info.hbs';

const BASE_URL = 'https://auth-a925a-default-rtdb.firebaseio.com';

const info = {
  message: '',
};

const getData = async () => {
  try {
    const token = JSON.parse(localStorage.getItem('token'));
    const data = await axios.get(`${BASE_URL}/info.json?auth=${token}`);

    console.log('data', data);
  } catch (error) {
    console.log(error);
  }
};

const postData = async evt => {
  evt.preventDefault();
  try {
    const token = JSON.parse(localStorage.getItem('token'));
    const data = await axios.post(`${BASE_URL}/info.json?auth=${token}`, info);

    console.log('data', data);
  } catch (error) {
    console.log(error);
  }
  info.message = '';
  evt.target.reset();
};

const createNewData = () => {
  const infoForm = document.forms.formInfo;
  info.message = infoForm.info.value;

  console.log(infoForm);
};

export const addListenerInfoPage = () => {
  const infoForm = document.forms.formInfo;
  const dataGetButton = document.querySelector('.dataGetButton');
  infoForm.addEventListener('input', createNewData);
  infoForm.addEventListener('submit', postData);
  dataGetButton.addEventListener('click', getData);
};

export default function getInfo() {
  return infoTemplate();
}
