'use strict';

let money = Number(prompt('Ваш месячный доход')),
    income = 'фриланс',
    addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 'Квартплата, проездной, кредит'),
    deposit = confirm('Есть ли у вас депозит в банке?'),
    mission = 999999999,
    period = 1,
    expenses1 = prompt('Введите обязательную статью расходов'),
    amount1 = Number(prompt('Во сколько это обойдется?')),
    expenses2 = prompt('Введите обязательную статью расходов'),
    amount2 = Number(prompt('Во сколько это обойдется?'));


function getExpensesMonth(a, b) {
  return (a + b);
};

function getAccumulatedMonth(a, b, money) {
  return money - getExpensesMonth(a, b);
};

let accumulatedMonth = getAccumulatedMonth(amount1, amount2, money);

function getTargetMonth(budgetMonth, mission){
  return Math.ceil(mission / budgetMonth);
};

let budgetDay = getTargetMonth(accumulatedMonth, mission) / 30;

function getStatusIncome(budgetDay) {
switch(true) {
  case (budgetDay >= 1200):
    return ('У вас высокий уровень дохода');
    break;
  case (budgetDay >= 600):
    return ('У вас средний уровень дохода');
    break;
  case (budgetDay >= 0):
    return ('К сожалению у вас уровень дохода ниже среднего');
    break;
  default:
    return ('Что то пошло не так');
}
};

console.log(typeof(money));
console.log(typeof(income));
console.log(typeof(deposit));
console.log('Расходы за месяц вызов getExpensesMonth: ' + getExpensesMonth(amount1, amount2));
console.log(addExpenses.toLowerCase().split(', '));
console.log('Цель будет достигнута за ' + getTargetMonth(accumulatedMonth, mission) + ' месяцев(-а)');
console.log('Бюджет на день: ' + Math.floor(budgetDay));
console.log(getStatusIncome(budgetDay));


