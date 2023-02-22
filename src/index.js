import getAuthForm from './js/auth/authForm';
import { addAuthFormListeners } from './js/auth/authServices';
import getRefs from './js/get-refs';
import {
  addCartFormListener,
  createPaginationMarkup,
  createProductForm,
} from './js/pages/cartPage';
import { getNasaData, papaParse } from './js/pages/chartPage';
import { getHomePage, getNavigation } from './js/pages/homePage';
import getInfo, { addListenerInfoPage } from './js/pages/info';
import './sass/main.scss';

const refs = getRefs();

refs.content.innerHTML = getHomePage();

const getPage = evt => {
  if (evt.target.nodeName === 'LI') {
    setActiveLink(evt.target);
  }
  refs.paginationList.innerHTML = '';
  switch (evt.target.dataset.page) {
    case 'home':
      refs.content.innerHTML = getHomePage();
      break;
    case 'cart':
      (refs.content.innerHTML = createProductForm()),
        `<ul class="cart-list"></ul>`;
      addCartFormListener();
      break;
    case 'chart':
      refs.content.innerHTML = `<h1>Chart page</h1>`;
      break;
    case 'info':
      refs.content.innerHTML = getInfo();
      addListenerInfoPage();
      break;
    case 'singUp':
      refs.content.innerHTML = getAuthForm();
      addAuthFormListeners();
      break;
    case 'singOut':
      const home = document.querySelector('[data-page="home"]');
      refs.content.innerHTML = getHomePage();
      setActiveLink(home);
      localStorage.setItem('token', '');
      break;
    default:
      break;
  }
};

const setActiveLink = target => {
  const currentLink = document.querySelector('.nav__item--active');
  currentLink.classList.remove('nav__item--active');
  target.classList.add('nav__item--active');
};

refs.navList.addEventListener('click', getPage);
