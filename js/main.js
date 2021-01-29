let money = 999999;
let income = 'фриланс';
let addExpenses = 'интернет, такси, коммуналка';
let deposit = true;
let mission = 999999999;
let period = 1;
let budgetDay = money / 30;

console.log(typeof(money));
console.log(typeof(income));
console.log(typeof(deposit));
console.log(addExpenses.length);
console.log('Период равен ' + period + ' месяц(ев)');
console.log('Цель заработать ' + mission + ' долларов');
console.log(addExpenses.toLowerCase().split(', '));
console.log(budgetDay);