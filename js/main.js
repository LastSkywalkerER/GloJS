'use strict';

let todoControl = document.querySelector('.todo-control'),
  headerInput = document.querySelector('.header-input'),
  todoList = document.querySelector('.todo-list'),
  todoCompleted = document.querySelector('.todo-completed');

let dataArray = JSON.parse(localStorage.getItem("data")) ? JSON.parse(localStorage.getItem("data")) : [];

function render() {
  todoList.textContent = '';
  todoCompleted.textContent = '';
  for (let key in dataArray) {
    let li = document.createElement('li');
    li.classList.add('todo-item');
    li.innerHTML = '<span class="text-todo">' + dataArray[key].value + '</span>' +
      '<div class="todo-buttons">' +
      '<button class="todo-remove"></button>' +
      '<button class="todo-complete"></button>' +
      '</div>';
    if (dataArray[key].completed) {
      todoCompleted.append(li);
    } else {
      todoList.append(li);
    }

    li.querySelector('.todo-remove ').addEventListener('click', () => {
      dataArray.splice(key, 1);
      render();
    });

    li.querySelector('.todo-complete').addEventListener('click', () => {
      dataArray[key].completed = !dataArray[key].completed;
      render();
    });
  }

  localStorage.setItem("data", JSON.stringify(dataArray));
}

todoControl.addEventListener('submit', event => {
  event.preventDefault();

  if (headerInput.value) {
    let dataBlock = {
      value: headerInput.value,
      completed: false
    };

    dataArray.push(dataBlock);

    render();

  }

  headerInput.value = '';
});

render();