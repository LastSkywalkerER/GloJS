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
  mission: 50000,
  period: 3,
  budget: money,
  budgetDay: 0,
  budgetMonth: 0,
  expensesMonth: 0,

  asking: function () {
    let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 'Квартплата, проездной, кредит');
    appData.addExpenses = addExpenses.toLowerCase().split(', ');
    appData.deposit = confirm('Есть ли у вас депозит в банке?');
    for (let i = 0; i < 2; i++) {

      let expenses = prompt('Введите обязательную статью расходов');
      let amount = 0.0;
      do {
        amount = parseFloat(prompt('Во сколько это обойдется?'));
      }
      while (!isNumber(amount));
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
}

appData.asking();
appData.getExpensesMonth();
appData.getBudget();

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