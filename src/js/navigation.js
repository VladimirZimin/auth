const nav = document.querySelector('.navi__list');
nav.querySelector('.navi__item').classList.add('navi__item--active');

nav.addEventListener('click', navClickHandler);

function navClickHandler(e) {
  e.preventDefault();
  if (e.target === e.currentTarget) {
    return;
  }

  const currentActiveLink = nav.querySelector('.navi__item--active');
  currentActiveLink && currentActiveLink.classList.remove('navi__item--active');
  e.target.classList.add('navi__item--active');
}
