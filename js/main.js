'use strict';

function isNumber(number) {
  return !isNaN(parseFloat(number)) && isFinite(number);
}

function start() {
  let money = 0.0;
  do {
    money = parseFloat(prompt('Ваш месячный доход'));
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
  },

  getExpensesMonth: function () {
    let sum = 0.0;
    for (let i = 0; i < 2; i++) {

      expenses[i] = prompt('Введите обязательную статью расходов');
      let amount = 0.0;
      do {
        amount = parseFloat(prompt('Во сколько это обойдется?'));
      }
      while (!isNumber(amount));
      sum += amount;
    }
    return sum;
  },

  getAccumulatedMonth: function (espensesAmount, money) {
    return money - espensesAmount;
  },

  getTargetMonth: function (budgetMonth, mission) {
    if (mission / budgetMonth >= 0) {
      return Math.ceil(mission / budgetMonth);
    } else {
      return false;
    }
  },

  getStatusIncome: function (budgetDay) {
    switch (true) {
      case (budgetDay >= 1200):
        return ('У вас высокий уровень дохода');

      case (budgetDay >= 600):
        return ('У вас средний уровень дохода');

      case (budgetDay >= 0):
        return ('К сожалению у вас уровень дохода ниже среднего');

      default:
        return ('Что то пошло не так');
    }
  },
}

let expenses = [],
  espensesAmount = appData.getExpensesMonth(),
  accumulatedMonth = appData.getAccumulatedMonth(espensesAmount, money),
  budgetDay = accumulatedMonth / 30;

console.log('Расходы за месяц: ' + espensesAmount);


if (appData.getTargetMonth(accumulatedMonth, appData.mission)) {
  console.log('Цель будет достигнута за ' + appData.getTargetMonth(accumulatedMonth, appData.mission) + ' месяцев(-а)');
} else {
  console.log('Цель не будет достигнута');
}

console.log('Бюджет на день: ' + Math.floor(budgetDay));
console.log(appData.getStatusIncome(budgetDay));