document.addEventListener("DOMContentLoaded", () => {

  'use strict';

  function DomElement(selector, height, width, bg, fontSize) {
    this.selector = selector;
    this.height = height;
    this.width = width;
    this.bg = bg;
    this.fontSize = fontSize;
    this.position = 'absolute';
    this.positionX = 0;
    this.positionY = 0;
    this.element = '';
  }

  DomElement.prototype.create = function () {

    if (this.selector[0] === '.') {
      this.element = document.createElement('div');
      this.element.classList.add(this.selector.slice(1));
    }

    if (this.selector[0] === '#') {
      this.element = document.createElement('p');
      this.element.id = this.selector.slice(1);
    }

    this.element.style.height = this.height;
    this.element.style.width = this.width;
    this.element.style.background = this.bg;
    this.element.style.fontSize = this.fontSize;

    this.element.style.position = this.position;
    this.element.style.left = this.positionX + 'px';
    this.element.style.top = this.positionY + 'px';

    this.element.textContent = 'Hello World!';
    this.element.style.display = 'flex';
    this.element.style.alignItems = 'center';
    this.element.style.justifyContent = 'center';

    document.addEventListener('keydown', this.move.bind(this));

    document.querySelector('body').append(this.element);

  };

  DomElement.prototype.reDrow = function () {
    this.element.remove();
    this.element.style.left = this.positionX + 'px';
    this.element.style.top = this.positionY + 'px';
    document.querySelector('body').append(this.element);
  };

  DomElement.prototype.move = function (event) {
    switch (event.key) {
      case 'ArrowRight':
        this.positionX += 10;
        break;
      case 'ArrowUp':
        this.positionY -= 10;
        break;
      case 'ArrowDown':
        this.positionY += 10;
        break;
      case 'ArrowLeft':
        this.positionX -= 10;
        break;
    }
    this.reDrow();
  };

  let createDiv = new DomElement(prompt('Введите селектор', '.magic'), prompt('Введите высоту', '100px'), prompt('Введите ширину', '100px'), prompt('Введите цвет', 'red'), prompt('Введите размер шрифта', '15px'));
  createDiv.create();



});