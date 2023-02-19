import cartCardTemplates from '../../templates/cartCard.hbs';
import cartFormTemplates from '../../templates/cartForm.hbs';
import getRefs from '../get-refs';

const refs = getRefs();

const cart = {
  items: [],
  paginationPage: 1,
  productCardOnPage: 2,

  quantity() {
    return this.items.length;
  },

  addProduct(product, price) {
    const item = {
      id: `${Date.now()}`,
      product,
      price,
    };

    this.items = [item, ...this.items];
    return item;
  },

  deleteProduct(id) {
    this.items = [...this.items.filter(item => item.id !== id)];
  },

  selectPaginationPage(paginationPage) {
    const currentArray = [
      ...this.items.filter((item, index) => {
        return (
          index < paginationPage * this.productCardOnPage &&
          index >=
            paginationPage * this.productCardOnPage - this.productCardOnPage
        );
      }),
    ];
    return currentArray;
  },
};

export function createProductForm() {
  return cartFormTemplates();
}

function onSubmitCartForm(evt) {
  evt.preventDefault();
  const cartList = document.querySelector('.cart-list');
  const productName = evt.target.elements.title.value;
  const productPrice = evt.target.elements.price.value;
  cart.addProduct(productName, productPrice);
  evt.currentTarget.reset();
  getProductCard();
  createPaginationMarkup();
  cartList.addEventListener('click', deleteProductItem);
}

function getProductCard() {
  const cartList = document.querySelector('.cart-list');
  cartList.innerHTML = cartCardTemplates(
    cart.selectPaginationPage(cart.paginationPage),
  );
}

function deleteProductItem(evt) {
  if (evt.target.nodeName !== 'BUTTON') {
    return;
  }
  const cardButton = evt.target.closest('.cart-item');
  const id = cardButton.dataset.id;

  cart.deleteProduct(id);
  getProductCard();
  createPaginationMarkup();
}

//////////////////////// Pagination ////////////////////////

export function createPaginationMarkup() {
  const page = Math.ceil(cart.quantity() / cart.productCardOnPage);

  let pages = '';

  for (let i = 1; i <= page; i += 1) {
    pages += getPageCount(i);
  }
  refs.paginationList.innerHTML = pages;

  const activePaginationPage = document.querySelector('.pagination-page__item');
  activePaginationPage.classList.add('pagination-page__item--active');

  return pages;
}

function getPageCount(num) {
  return `<li class="pagination-page__item" data-page="${num}">${num}</li>`;
}

function getPage(evt) {
  if (evt.target === evt.currentTarget) {
    return;
  }
  let currentPage = evt.target.dataset.page;
  cart.paginationPage = currentPage;

  const currentActiveControlItem = document.querySelector(
    '.pagination-page__item--active',
  );
  if (currentActiveControlItem) {
    currentActiveControlItem.classList.remove('pagination-page__item--active');
  }
  evt.target.classList.add('pagination-page__item--active');

  getProductCard();
}
//////////////////////// Listener //////////////////////////

export function addCartFormListener() {
  const productForm = document.querySelector('.product-form');
  productForm.addEventListener('submit', onSubmitCartForm);
}

refs.paginationList.addEventListener('click', getPage);
