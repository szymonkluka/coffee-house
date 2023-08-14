export const select = {
  templateOf: {
    productList: '#template-products',
  },
  brand: {
    rights: '#brandright a',
  },
  containerOf: {
    homeProduct: '#homeproducts',
    productList: '#product-list',
    sides: '#sides',
    discoverBtn: '.maintitle a',
    contact: '#contact',
    submitBtn: 'form button',
    newForm: '.newForm',
    names: '#name',
    titles: '[messages="title"]',
    messages: '[name="message"]',
  },
  db: {
    url: window.location.protocol + '//' + window.location.hostname + ':3131',
    products: 'products',
    bestSellers: 'bestSellers',
    messages: 'messages',
  },
};

export const showElements = {
  home: ['bestSellers', 'home'],
  products: ['products'],
  contact: ['contact'],
};

export const classNames = {
  sides: {
    active: 'active',
  },
};

export const templates = {
  product: Handlebars.compile(
    document.querySelector(select.templateOf.productList).innerHTML
  ),
};
