import Product from './Product.js';
import Contact from './Contact.js';
import { classNames, select } from './settings.js';
import { initBestSellers, renderBestSellers } from './bestSellers.js'; // Import the functions

const app = {
  initData: function () {
    const thisApp = this;
    const productsUrl = select.db.url + '/' + select.db.products;
    const bestSellersUrl = select.db.url + '/' + select.db.bestSellers;

    thisApp.data = {
      products: [],
      bestSellers: [],
    };

    const fetchProducts = fetch(productsUrl).then(response => response.json());
    const fetchBestSellers = fetch(bestSellersUrl).then(response => response.json());

    Promise.all([fetchProducts, fetchBestSellers])
      .then(([productsData, bestSellersData]) => {
        thisApp.data.products = productsData;
        thisApp.data.bestSellers = bestSellersData;
        thisApp.initMenu();
      });
  },

  dataRendered: {
    home: false,
    products: false,
  },

  initMenu: function () {
    const thisApp = this;
    const productContainer = document.querySelector(select.containerOf.productList);
    const homeSection = document.querySelector('#home');
    const productsSection = document.querySelector('#products');
    const contactSection = document.querySelector('#contact');
    const homeSectionTitle = homeSection.querySelector('.productsmain h2');
    const productsRendered = thisApp.dataRendered.products;
    const bestSellersRendered = thisApp.dataRendered.bestSellers;

    if (!productsRendered) {
      thisApp.renderProducts(productContainer);
      thisApp.dataRendered.products = true;
    }

    if (!bestSellersRendered) {
      renderBestSellers(thisApp);
      thisApp.dataRendered.bestSellers = true;
    }

    const homeLink = document.querySelector(select.brand.rights + '[href="#home"]');
    const productsLink = document.querySelector(select.brand.rights + '[href="#products"]');
    const contactLink = document.querySelector(select.brand.rights + '[href="#contact"]');

    homeSectionTitle.textContent = 'Best Sellers';

    homeLink.addEventListener('click', function (event) {
      event.preventDefault();
      homeSectionTitle.textContent = 'Best Sellers';
      renderBestSellers(thisApp);
      thisApp.activatePage('home');
      homeSection.style.display = 'block';
      productsSection.style.display = 'none';
      contactSection.style.display = 'none';
      homeSection.scrollIntoView({ behavior: 'smooth' });
    });

    productsLink.addEventListener('click', function (event) {
      event.preventDefault();
      homeSectionTitle.textContent = 'Products';
      thisApp.renderProducts(productContainer);
      thisApp.activatePage('products');
      homeSection.style.display = 'none';
      productsSection.style.display = 'block';
      contactSection.style.display = 'none';
      productsSection.scrollIntoView({ behavior: 'smooth' });
    });

    contactLink.addEventListener('click', function (event) {
      event.preventDefault();
      thisApp.activatePage('contact');
      homeSection.style.display = 'none';
      productsSection.style.display = 'none';
      contactSection.style.display = 'block';
      contactSection.scrollIntoView({ behavior: 'smooth' });
    });


    if (window.location.hash === '#home') {
      console.log('Default rendering: bestSellers');
      renderBestSellers(thisApp);
      homeSection.scrollIntoView({ behavior: 'smooth' });
    } else if (window.location.hash === '#products') {
      console.log('Default rendering: products');
      thisApp.renderProducts(productContainer);
      productsSection.scrollIntoView({ behavior: 'smooth' });
    }
  },

  renderProducts: function (productContainer) {
    const thisApp = this;

    console.log('Rendering products');
    productContainer.innerHTML = ''; // Clear existing content
    for (let product of thisApp.data.products) {
      new Product(product);
    }
  },


  initSides: function () {
    const thisApp = this;
    thisApp.sides = document.querySelector(select.containerOf.sides).children;
    thisApp.brandRights = document.querySelectorAll(select.brand.rights);

    for (let right of thisApp.brandRights) {
      right.addEventListener('click', function (event) {
        const clickedElement = this;
        event.preventDefault();
        const id = clickedElement.getAttribute('href').replace('#', '');

        thisApp.activatePage(id);

        const targetSection = document.querySelector(`#${id}`);
        targetSection.scrollIntoView({ behavior: 'smooth' });

      });
    }

    let sidesHashtagId = thisApp.sides[0].id;
    thisApp.activatePage(sidesHashtagId);
  },

  activatePage: function (pageId) {
    const thisApp = this;

    for (let page of thisApp.sides) {
      if (page.id == pageId) {
        page.classList.add(classNames.sides.active);
      } else {
        page.classList.remove(classNames.sides.active);
      }
    }

    document.querySelector(select.containerOf.discoverBtn).setAttribute('href', '#' + [pageId][0]);
  },

  initContact: function () {
    const thisApp = this;
    const contactSubpage = document.querySelector(select.containerOf.contact);
    thisApp.contact = new Contact(contactSubpage);
  },

  init: function () {
    const thisApp = this;
    thisApp.initData();
    thisApp.initSides();
    thisApp.initContact();
    initBestSellers(thisApp);
  },
};

app.init();
