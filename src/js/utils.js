const utils = {};

utils.createDOMFromHTML = function (htmlString) {
  let div = document.createElement('div');
  div.innerHTML = htmlString.trim();
  return div.firstChild;
};

export default utils;