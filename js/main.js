'use strict';

function isNumber(number) {
  return !isNaN(parseFloat(number)) && isFinite(number);
}

function start() {
  let money = 0.0;
  do {
    money = parseFloat(prompt('Ваш месячный доход', '150000'));
  }
  while (!isNumber(money));
  return money;
}

let money = start();


let appData = {
  income: {},
  addIncome: [],
  expenses: {},
  addExpenses: [],
  deposit: false,
  percentDeposit: 0,
  moneyDeposit: 0,
  mission: 50000,
  period: 3,
  budget: money,
  budgetDay: 0,
  budgetMonth: 0,
  expensesMonth: 0,

  checkInputText: function (message, defaultMessage = '') {
    let text = '';
    do {
      text = prompt(message, defaultMessage);
    }
    while (!isNaN(text));
    return text;
  },

  checkInputNumber: function (message, defaultMessage = '') {
    let number = '';
    do {
      number = prompt(message, defaultMessage);
    }
    while (!isNumber(number));
    return parseFloat(number);
  },

  asking: function () {

    if (confirm('Есть ли у вас дополнительный источник заработка?')) {
      let itemIncome = appData.checkInputText('Какой у вас дополнительный заработок?', 'Таксую');

      let cashIncome = appData.checkInputNumber('Сколько в месяц вы на этом зарабатываете?', 10000);

      appData.income[itemIncome] = cashIncome;
    }

    let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 'Квартплата, проездной, кредит');
    appData.addExpenses = addExpenses.toLowerCase().split(', ');
    appData.deposit = confirm('Есть ли у вас депозит в банке?');
    for (let i = 0; i < 2; i++) {

      let expenses = appData.checkInputText('Введите обязательную статью расходов');

      let amount = appData.checkInputNumber('Во сколько это обойдется?');

      appData.expenses[expenses] = amount;
    }
  },

  getExpensesMonth: function () {
    for (let key in appData.expenses) {
      appData.expensesMonth += appData.expenses[key];
    }
  },

  getBudget: function () {
    appData.budgetMonth = appData.budget - appData.expensesMonth;
    appData.budgetDay = appData.budgetMonth / 30;
  },

  getTargetMonth: function () {
    if (appData.mission / appData.budgetMonth >= 0) {
      return Math.ceil(appData.mission / appData.budgetMonth);
    } else {
      return false;
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
    return appData.budgetMonth * appData.period;
  },

  getExpensesInString: function () {
    let string = '';
    for (let elem of appData.addExpenses) {
      string += (elem.replace(elem[0], elem[0].toUpperCase()) + ', ');
    }
    string = string.slice(0, -2);
    return string;
  }

}

appData.asking();
appData.getExpensesMonth();
appData.getBudget();
appData.getInfoDeposit();

console.log('Расходы за месяц: ' + appData.expensesMonth);

if (appData.getTargetMonth()) {
  console.log('Цель будет достигнута за ' + appData.getTargetMonth() + ' месяцев(-а)');
} else {
  console.log('Цель не будет достигнута');
}

console.log(appData.getStatusIncome());

console.log('Наша программа включает в себя данные: ');

for (let key in appData) {
  console.log(key, appData[key]);
}

console.log(appData.getExpensesInString());