'use strict';

let calcButton = document.getElementById('start'),
  addIncomeButton = document.getElementsByTagName('button')[0],
  addExpensesButton = document.getElementsByTagName('button')[1],
  depositCheck = document.querySelector('#deposit-check'),
  addIncomeInput = document.querySelectorAll('.additional_income-item'),
  budgetMonthOutput = document.getElementsByClassName('budget_month-value')[0],
  budgetDayOutput = document.getElementsByClassName('budget_day-value')[0],
  expensesMonthhOutput = document.getElementsByClassName('expenses_month-value')[0],
  addIncomethOutput = document.getElementsByClassName('additional_income-value')[0],
  addExpenseshOutput = document.getElementsByClassName('additional_expenses-value')[0],
  savedMoneyOutput = document.getElementsByClassName('income_period-value')[0],
  targetMonthOutput = document.getElementsByClassName('target_month-value')[0],
  moneyInput = document.querySelector('input.salary-amount'),
  incomeItems = document.querySelectorAll('.income-items'),
  expensesItems = document.querySelectorAll('.expenses-items'),
  addExpensesInput = document.querySelector('input.additional_expenses-item'),
  targetInput = document.querySelector('input.target-amount'),
  periodInput = document.querySelector('input.period-select'),
  periodAmount = document.querySelector('.period-amount'),
  inputWithText = document.querySelectorAll('[placeholder="Наименование"]'),
  inputWithNumber = document.querySelectorAll('[placeholder="Сумма"]');

let appData = {
  income: {},
  incomeMonth: 0,
  addIncome: [],
  expenses: {},
  addExpenses: [],
  deposit: false,
  percentDeposit: 0,
  moneyDeposit: 0,
  budget: 0,
  budgetDay: 0,
  budgetMonth: 0,
  expensesMonth: 0,

  start: function () {

    appData.budget = +moneyInput.value;

    appData.getIncome();
    appData.getExpenses();
    appData.getAddIncome();
    appData.getAddExpenses();
    appData.getExpensesMonth();
    appData.getBudget();
    appData.getInfoDeposit();

    appData.showResult();
  },

  showResult: function () {
    budgetMonthOutput.value = appData.budgetMonth;
    budgetDayOutput.value = Math.floor(appData.budgetDay);
    expensesMonthhOutput.value = appData.expensesMonth;
    addIncomethOutput.value = appData.addIncome.join(', ');
    addExpenseshOutput.value = appData.addExpenses.join(', ');
    savedMoneyOutput.value = appData.calcSavedMoney();

    periodInput.addEventListener('input', () => {
      savedMoneyOutput.value = appData.calcSavedMoney();
    });

    targetMonthOutput.value = appData.getTargetMonth();
  },

  addExpensesBlock: function () {

    let cloneExpensesItem = expensesItems[0].cloneNode(true);

    cloneExpensesItem.querySelector('.expenses-title').value = '';
    cloneExpensesItem.querySelector('.expenses-amount').value = '';

    addExpensesButton.before(cloneExpensesItem);

    expensesItems = document.querySelectorAll('.expenses-items');

    if (expensesItems.length === 3) {
      addExpensesButton.style.display = 'none';
    }
  },

  getExpenses: function () {
    expensesItems.forEach(item => {
      let itemExpenses = item.querySelector('.expenses-title').value;
      let cashExpenses = +item.querySelector('.expenses-amount').value;

      if (itemExpenses !== '' && cashExpenses !== '') {
        appData.expenses[itemExpenses] = cashExpenses;
      }
    });
  },

  addIncomeBlock: function () {

    let cloneIncomeItem = incomeItems[0].cloneNode(true);

    cloneIncomeItem.querySelector('.income-title').value = '';
    cloneIncomeItem.querySelector('.income-amount').value = '';

    addIncomeButton.before(cloneIncomeItem);

    incomeItems = document.querySelectorAll('.income-items');

    if (incomeItems.length === 3) {
      addIncomeButton.style.display = 'none';
    }
  },

  getIncome: function () {
    incomeItems.forEach(item => {
      let itemIncome = item.querySelector('.income-title').value;
      let cashIncome = +item.querySelector('.income-amount').value;

      if (itemIncome !== '' && cashIncome !== '') {
        appData.income[itemIncome] = cashIncome;
      }
    });

    for (let key in appData.income) {
      appData.incomeMonth += +appData.income[key];
    }

  },

  getAddExpenses: function () {
    let addExpenses = addExpensesInput.value.split(',');
    addExpenses.forEach(item => {
      item = item.trim();
      if (item !== '') {
        appData.addExpenses.push(item);
      }
    });
  },

  getAddIncome: function () {
    addIncomeInput.forEach(item => {
      let itemValue = item.value.trim();
      if (itemValue !== '') {
        appData.addIncome.push(itemValue);
      }
    });
  },


  checkInputText: function (char) {

    if (/[а-я]/i.test(char) || char === ',' || char === ' ' || char === '.' || char === ';') {
      return true;
    } else {
      return false;
    }
  },

  isNumber: function (number) {
    return !isNaN(parseFloat(number)) && isFinite(number);
  },


  getExpensesMonth: function () {
    for (let key in appData.expenses) {
      appData.expensesMonth += appData.expenses[key];
    }
  },

  getBudget: function () {
    appData.budgetMonth = appData.budget + appData.incomeMonth - appData.expensesMonth;
    appData.budgetDay = appData.budgetMonth / 30;
  },

  getTargetMonth: function () {
    if (targetInput.value / appData.budgetMonth >= 0) {
      return Math.ceil(targetInput.value / appData.budgetMonth);
    } else {
      return 'Цель недостижима!';
    }
  },

  getStatusIncome: function () {
    switch (true) {
      case (appData.budgetDay >= 1200):
        return ('У вас высокий уровень дохода');

      case (appData.budgetDay >= 600):
        return ('У вас средний уровень дохода');

      case (appData.budgetDay >= 0):
        return ('К сожалению у вас уровень дохода ниже среднего');

      default:
        return ('Что то пошло не так');
    }
  },

  getInfoDeposit: function () {
    if (appData.deposit) {
      appData.percentDeposit = appData.checkInputNumber('Какой годовой процент?', 10);
      appData.moneyDeposit = appData.checkInputNumber('Какая сумма заложена', 10000)
    }
  },

  calcSavedMoney: function () {
    return appData.budgetMonth * periodInput.value;
  },

  getExpensesInString: function () {
    for (let i in appData.addExpenses) {
      appData.addExpenses[i] = appData.addExpenses[i].trim();
    }
    let string = '';
    for (let elem of appData.addExpenses) {
      string += (elem.replace(elem[0], elem[0].toUpperCase()) + ', ');
    }
    string = string.slice(0, -2);
    return string;
  },

  changePeriodValue: function () {
    periodAmount.textContent = periodInput.value;
  },
};

inputWithText.forEach(item => {
  item.addEventListener('input', event => {
    let correctString = '';
    for (let char of event.target.value) {
      if (appData.checkInputText(char)) {
        correctString += char;
      }
    }
    event.target.value = correctString;
  });
});

inputWithNumber.forEach(item => {
  item.addEventListener('input', event => {
    let correctNumber = '';
    for (let num of event.target.value) {
      if (appData.isNumber(num)) {
        correctNumber += num;
      }
    }
    event.target.value = correctNumber;
  });
});

calcButton.setAttribute('disabled', 'disabled');
calcButton.removeEventListener('click', appData.start);

moneyInput.addEventListener('input', () => {
  if (moneyInput.value !== '') {
    calcButton.removeAttribute('disabled');
    calcButton.addEventListener('click', appData.start);
  } else {
    calcButton.setAttribute('disabled', 'disabled');
    calcButton.removeEventListener('click', appData.start);
  }
});

addIncomeButton.addEventListener('click', appData.addIncomeBlock);
addExpensesButton.addEventListener('click', appData.addExpensesBlock);

periodInput.addEventListener('input', appData.changePeriodValue);

// console.log('Расходы за месяц: ' + appData.expensesMonth);

// if (appData.getTargetMonth()) {
//   console.log('Цель будет достигнута за ' + appData.getTargetMonth() + ' месяцев(-а)');
// } else {
//   console.log('Цель не будет достигнута');
// }

// console.log(appData.getStatusIncome());

// console.log('Наша программа включает в себя данные: ');

// for (let key in appData) {
//   console.log(key, appData[key]);
// }

// console.log(appData.getExpensesInString());