'use strict';

let money = Number(prompt('Ваш месячный доход'));
let income = 'фриланс';
let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 'Квартплата, проездной, кредит');
let deposit = Boolean(prompt('Есть ли у вас депозит в банке?'));
let mission = 999999999;
let period = 1;


let expenses1 = prompt('Введите обязательную статью расходов');
let amount1 = prompt('Во сколько это обойдется?');
let expenses2 = prompt('Введите обязательную статью расходов');
let amount2 = prompt('Во сколько это обойдется?');
let budgetMonth = money - amount1 - amount2;
let budgetDay = budgetMonth / 30;

console.log(typeof(money));
console.log(typeof(income));
console.log(typeof(deposit));
console.log(addExpenses.length);
console.log('Период равен ' + period + ' месяц(ев)');
console.log('Цель заработать ' + mission + ' долларов');
console.log(addExpenses.toLowerCase().split(', '));

console.log('Бюджет на месяц: ' + budgetMonth);
console.log('Цель будет достигнута за ' + Math.ceil(mission / budgetMonth) + ' месяцев(-а)');
console.log('Бюджет на день: ' + Math.floor(budgetDay));

switch(true) {
  case (budgetDay >= 1200):
    alert('У вас высокий уровень дохода');
    break;
  case (budgetDay >= 600):
    alert('У вас средний уровень дохода');
    break;
  case (budgetDay >= 0):
    alert('К сожалению у вас уровень дохода ниже среднего');
    break;
  default:
    alert('Что то пошло не так');
}