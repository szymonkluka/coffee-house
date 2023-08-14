import { select, templates } from './settings.js';
import utils from './utils.js';

class Product {
  constructor(data) {
    const thisProduct = this;

    thisProduct.data = data;
    thisProduct.render();
  }

  render() {
    const thisProduct = this;
    const generatedHTML = templates.product(thisProduct.data); //tworzymy tekst
    thisProduct.element = utils.createDOMFromHTML(generatedHTML); // tworzymy dom, który tworzy element html
    thisProduct.homeElement = utils.createDOMFromHTML(generatedHTML); //tworzymy dom, który tworzy html
    const productContainer = document.querySelector(
      select.containerOf.productList
    );
    const homeProductContainer = document.querySelector(select.containerOf.homeProduct); // wkładamy w container stworzony element
    homeProductContainer.appendChild(thisProduct.homeElement); //wkładamy w container stworzony element
    productContainer.appendChild(thisProduct.element); // wkładamy w container stworzony element 
  }
}

export default Product;
