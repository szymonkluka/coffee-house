import Product from './Product.js';
import { select } from './settings.js';

export function renderBestSellers(app) {
  console.log('Rendering bestSellers');
  const productContainer = document.querySelector(select.containerOf.homeProduct);
  productContainer.innerHTML = ''; // Clear existing content

  for (let bestSeller of app.data.bestSellers) {
    new Product(bestSeller);
  }
}

export function initBestSellers(app) {
  const homeLink = document.querySelector(select.brand.rights + '[href="#home"]');

  homeLink.addEventListener('click', function (event) {
    event.preventDefault();
    renderBestSellers(app);
    app.activatePage('home');
  });

  // Default rendering based on hash
  if (window.location.hash === '#home') {
    console.log('Default rendering: bestSellers');
    renderBestSellers(app);
  }
}
