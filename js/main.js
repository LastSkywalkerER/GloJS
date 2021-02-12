'use strict';

document.querySelector('.adv').remove(); //бесит

let books = document.querySelectorAll('.book');

books[0].before(books[1]);
books = document.querySelectorAll('.book');
books[2].before(books[4]);
books = document.querySelectorAll('.book');
books[3].before(books[4]);
books = document.querySelectorAll('.book');
books[4].before(books[5]);
books = document.querySelectorAll('.book');

document.querySelector('body').style.backgroundImage = 'url("./image/you-dont-know-js.jpg")';

books[2].querySelector('h2>a').textContent = 'Книга 3. this и Прототипы Объектов';

let chapters2 = books[1].querySelectorAll('li');

chapters2[4].before(chapters2[6]);
chapters2 = books[1].querySelectorAll('li');
chapters2[5].before(chapters2[8]);
chapters2 = books[1].querySelectorAll('li');
chapters2[10].before(chapters2[2]);
chapters2 = books[1].querySelectorAll('li');

let chapters5 = books[4].querySelectorAll('li');

chapters5[2].before(chapters5[9]);
chapters5 = books[4].querySelectorAll('li');
chapters5[3].before(chapters5[5]);
chapters5 = books[4].querySelectorAll('li');
chapters5[3].before(chapters5[5]);
chapters5 = books[4].querySelectorAll('li');
chapters5[9].before(chapters5[6]);
chapters5 = books[4].querySelectorAll('li');

let chapters6 = books[5].querySelectorAll('li');

let chapter8 = document.createElement('li');
chapter8.textContent = 'Глава 8: За пределами ES6';

chapters6[8].after(chapter8);