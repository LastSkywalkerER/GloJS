'use strict';

function isNumber(number) {
  return !isNaN(parseFloat(number)) && isFinite(number);
}

function start(){
let money = 0.0;
  do {
    money = parseFloat(prompt('Ваш месячный доход'));
  } 
  while (!isNumber(money));
  return money;
}

function getExpensesMonth() {
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
}

function getAccumulatedMonth(espensesAmount, money) {
  return money - espensesAmount;
};

function getTargetMonth(budgetMonth, mission){
  if (mission / budgetMonth >= 0){
    return Math.ceil(mission / budgetMonth);
  } else {
    return false;
  }
};

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

function showTypeOf(variable){
  console.log(typeof variable);
};

let money = start(),
    income = 'фриланс',
    addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 'Квартплата, проездной, кредит'),
    deposit = confirm('Есть ли у вас депозит в банке?'),
    mission = 100000,
    period = 1,
    expenses = [],
    espensesAmount = getExpensesMonth(),
    accumulatedMonth = getAccumulatedMonth(espensesAmount, money),
    budgetDay = accumulatedMonth / 30;

showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);
console.log('Расходы за месяц: ' + espensesAmount);
console.log(addExpenses.toLowerCase().split(', '));

if (getTargetMonth(accumulatedMonth, mission)) {
  console.log('Цель будет достигнута за ' + getTargetMonth(accumulatedMonth, mission) + ' месяцев(-а)');
} else {
  console.log('Цель не будет достигнута');
}

console.log('Бюджет на день: ' + Math.floor(budgetDay));
console.log(getStatusIncome(budgetDay));


