'use strict';

function DomElement(selector, height, width, bg, fontSize) {
  this.selector = selector;
  this.height = height;
  this.width = width;
  this.bg = bg;
  this.fontSize = fontSize;
}

DomElement.prototype.createElement = function () {
  let element = '';

  if (this.selector[0] === '.') {
    element = document.createElement('div');
    element.classList.add(this.selector.slice(1));
  }

  if (this.selector[0] === '#') {
    element = document.createElement('p');
    element.id = this.selector.slice(1);
  }

  element.style.height = this.height;
  element.style.width = this.width;
  element.style.background = this.bg;
  element.style.fontSize = this.fontSize;

  element.textContent = 'Hello World!';
  element.style.display = 'flex';
  element.style.alignItems = 'center';
  element.style.justifyContent = 'center';

  document.querySelector('body').append(element);
};

let createDiv = new DomElement('.magic', '100px', '100px', 'red', '15px');
createDiv.createElement();

let createP = new DomElement('#magic', '150px', '150px', 'pink', '20px');
createP.createElement();