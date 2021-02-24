'use strict';

const calcButton = document.getElementById('start'),
  resetButton = document.getElementById('cancel'),
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
  addExpensesInput = document.querySelector('input.additional_expenses-item'),
  targetInput = document.querySelector('input.target-amount'),
  periodInput = document.querySelector('input.period-select'),
  periodAmount = document.querySelector('.period-amount'),
  inputWithText = document.querySelectorAll('[placeholder="Наименование"]'),
  inputWithNumber = document.querySelectorAll('[placeholder="Сумма"]'),
  items = {
    income: document.querySelectorAll('.income-items'),
    expenses: document.querySelectorAll('.expenses-items'),
  },
  depositBank = document.querySelector('.deposit-bank'),
  depositAmount = document.querySelector('.deposit-amount'),
  depositPercent = document.querySelector('.deposit-percent');

class AppData {
  constructor() {

    this.checkCoockie();
    const storage = JSON.parse(localStorage.getItem('appData')) ? JSON.parse(localStorage.getItem('appData')) : {};

    this.date = new Date(Date.now() + 86400e3);
    this.date = this.date.toUTCString();

    this.income = storage.income ? storage.income : {};
    this.incomeMonth = storage.incomeMonth ? storage.incomeMonth : 0;
    this.addIncome = storage.addIncome ? storage.addIncome : [];
    this.expenses = storage.expenses ? storage.expenses : {};
    this.addExpenses = storage.addExpenses ? storage.addExpenses : [];
    this.deposit = storage.deposit ? storage.deposit : false;
    this.percentDeposit = storage.percentDeposit ? storage.percentDeposit : 0;
    this.moneyDeposit = storage.moneyDeposit ? storage.moneyDeposit : 0;
    this.budget = storage.budget ? storage.budget : 0;
    this.budgetDay = storage.budgetDay ? storage.budgetDay : 0;
    this.budgetMonth = storage.budgetMonth ? storage.budgetMonth : 0;
    this.expensesMonth = storage.expensesMonth ? storage.expensesMonth : 0;
    this.targetMonth = storage.targetMonth ? storage.targetMonth : 0;
    this.eventsListeners();

    if (document.cookie) {
      this.showResult();
      this.blockInput();
      this.showReset();
    }

  }

  //проверяет наличие куки и его совпадение с локальным хранилищем

  checkCoockie() {
    if (document.cookie) {
      const loadCookie = {};
      document.cookie.split('; ').forEach(item => {
        loadCookie[item.split('=')[0]] = JSON.parse(item.split('=')[1]);
      });
      const storage = JSON.parse(localStorage.getItem('appData')) ? JSON.parse(localStorage.getItem('appData')) : {};

      for (let key in storage) {
        if (JSON.stringify(loadCookie[key]) !== JSON.stringify(storage[key])) {
          this.reset();
          this.unlockInput();
          this.eventsListeners();
        }
      }
    } else {
      localStorage.clear();
    }
  }

  //запускает обработку введённых данных на кнопку рассчитать и сохраняет в хранилище и куки

  start() {

    this.budget = +moneyInput.value;

    this.getExpInc();
    this.getAddExpInc();
    this.getExpensesMonth();
    this.getInfoDeposit();
    this.getBudget();

    this.showResult();

    this.blockInput();
    this.showReset();

    document.cookie = `income=${JSON.stringify(this.income)}; expires=${this.date}`;
    document.cookie = `incomeMonth=${this.incomeMonth}; expires=${this.date}`;
    document.cookie = `addIncome=${JSON.stringify(this.addIncome)}; expires=${this.date}`;
    document.cookie = `expenses=${JSON.stringify(this.expenses)}; expires=${this.date}`;
    document.cookie = `addExpenses=${JSON.stringify(this.addExpenses)}; expires=${this.date}`;
    document.cookie = `deposit=${this.deposit}; expires=${this.date}`;
    document.cookie = `percentDeposit=${this.percentDeposit}; expires=${this.date}`;
    document.cookie = `moneyDeposit=${this.moneyDeposit}; expires=${this.date}`;
    document.cookie = `budget=${this.budget}; expires=${this.date}`;
    document.cookie = `budgetDay=${this.budgetDay}; expires=${this.date}`;
    document.cookie = `budgetMonth=${this.budgetMonth}; expires=${this.date}`;
    document.cookie = `expensesMonth=${this.expensesMonth}; expires=${this.date}`;
    document.cookie = `targetMonth=${this.targetMonth}; expires=${this.date}`;
    document.cookie = `isLoad=${true}; expires=${this.date}`;

    localStorage.setItem('appData', JSON.stringify({
      income: this.income,
      incomeMonth: this.incomeMonth,
      addIncome: this.addIncome,
      expenses: this.expenses,
      addExpenses: this.addExpenses,
      deposit: this.deposit,
      percentDeposit: this.percentDeposit,
      moneyDeposit: this.moneyDeposit,
      budget: this.budget,
      budgetDay: this.budgetDay,
      budgetMonth: this.budgetMonth,
      expensesMonth: this.expensesMonth,
      targetMonth: this.targetMonth,
      isLoad: true,
    }));
  }

  //выводит результат обработки в заблокированные инпуты

  showResult() {
    budgetMonthOutput.value = this.budgetMonth;
    budgetDayOutput.value = Math.floor(this.budgetDay);
    expensesMonthhOutput.value = this.expensesMonth;
    addIncomethOutput.value = this.addIncome.join(', ');
    addExpenseshOutput.value = this.addExpenses.join(', ');
    savedMoneyOutput.value = this.calcSavedMoney();

    periodInput.addEventListener('input', () => {
      savedMoneyOutput.value = this.calcSavedMoney();
    });

    targetMonthOutput.value = this.targetMonth;
  }

  // добавление новых полей ввода по кнопке +

  addExpIncBlock(event) {

    const selector = event.target.className.split(' ')[1].split('_')[0],
      cloneItem = event.target.parentNode.querySelectorAll(`.${selector}-items`)[0].cloneNode(true);

    cloneItem.querySelector(`.${selector}-title`).value = '';
    cloneItem.querySelector(`.${selector}-amount`).value = '';

    event.target.before(cloneItem);

    items[selector] = document.querySelectorAll(`.${selector}-items`);

    if (items[selector].length === 3) {
      event.target.style.display = 'none';
    }


  }

  // получение значений дополнительного дохода и обязательных расходов

  getExpInc() {

    const count = item => {
      const selectorStr = item.className.split('-')[0];
      const itemTitle = item.querySelector(`.${selectorStr}-title`).value;
      const cashAmount = +item.querySelector(`.${selectorStr}-amount`).value;

      if (itemTitle !== '' && cashAmount !== '') {
        this[selectorStr][itemTitle] = cashAmount;
      }
    };

    for (let key in items) {

      items[key].forEach(count);
    }

    for (let key in this.income) {
      this.incomeMonth += +this.income[key];
    }
  }

  // получение списков возможных доходов и возможных расходов

  getAddExpInc() {
    const add = {
      expenses: addExpensesInput.value.split(','),
      income: []
    };

    addIncomeInput.forEach(item => {
      add.income.push(item.value);
    });

    for (let key in add) {
      add[key].forEach((item) => {
        const itemValue = item.trim();
        if (itemValue !== '') {
          switch (key) {
            case 'expenses':
              this.addExpenses.push(itemValue);
              break;
            case 'income':
              this.addIncome.push(itemValue);
              break;
          }
        }
      });
    }
  }

  // проверка буквы на рускоязычность и знак припинания

  checkInputText(char) {

    if (/[а-я]/i.test(char) || char === ',' || char === ' ' || char === '.' || char === ';') {
      return true;
    } else {
      return false;
    }
  };

  // проверка является ли числом

  isNumber(number) {
    return !isNaN(parseFloat(number)) && isFinite(number);
  }

  // суммирование расходов

  getExpensesMonth() {
    for (let key in this.expenses) {
      this.expensesMonth += this.expenses[key];
    }
  }

  //вычисление месячного и дневного бюджета

  getBudget() {
    const monthDeposit = this.moneyDeposit * this.percentDeposit / 100;
    this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth + monthDeposit;
    this.budgetDay = this.budgetMonth / 30;
  }

  // расчёт времени в месяцах для достижения цели

  getTargetMonth() {
    if (targetInput.value / this.budgetMonth >= 0) {
      this.targetMonth = Math.ceil(targetInput.value / this.budgetMonth);
    } else {
      this.targetMonth = 'Цель недостижима!';
    }
  }

  // комментарий на кошелёк

  getStatusIncome() {
    switch (true) {
      case (this.budgetDay >= 1200):
        return ('У вас высокий уровень дохода');

      case (this.budgetDay >= 600):
        return ('У вас средний уровень дохода');

      case (this.budgetDay >= 0):
        return ('К сожалению у вас уровень дохода ниже среднего');

      default:
        return ('Что то пошло не так');
    }
  }

  // расчёт накоплений за период

  calcSavedMoney() {
    return this.budgetMonth * periodInput.value;
  }

  // оформление строки вывода возможных расходов

  getExpensesInString() {
    for (let i in this.addExpenses) {
      this.addExpenses[i] = this.addExpenses[i].trim();
    }
    let string = '';
    for (let elem of this.addExpenses) {
      string += (elem.replace(elem[0], elem[0].toUpperCase()) + ', ');
    }
    string = string.slice(0, -2);
    return string;
  }

  // изменение циферки под ползунком с периодом

  changePeriodValue() {
    periodAmount.textContent = periodInput.value;
  }

  // разблокирует инпуты

  unlockInput() {
    document.querySelector('.data').querySelectorAll('input[type="text"]').forEach(item => {
      item.removeAttribute('disabled');
    });

    addIncomeButton.removeAttribute('disabled');
    addExpensesButton.removeAttribute('disabled');
    depositCheck.removeAttribute('disabled');
  }

  // блокирует инпуты и снимает слушатели

  blockInput() {
    document.querySelector('.data').querySelectorAll('input[type="text"]').forEach(item => {
      item.setAttribute('disabled', '');
    });

    depositPercent.removeEventListener('input', this.checkPercent.bind(this));

    document.removeEventListener('input', () => {});


    calcButton.removeEventListener('click', this.start.bind(this));

    moneyInput.removeEventListener('input', () => {});

    addIncomeButton.removeEventListener('click', this.addExpIncBlock.bind(this));
    addExpensesButton.removeEventListener('click', this.addExpIncBlock.bind(this));

    addIncomeButton.setAttribute('disabled', '');
    addExpensesButton.setAttribute('disabled', '');
    depositCheck.setAttribute('disabled', '');

    depositCheck.removeEventListener('change', this.depositHandler.bind(this));
  }

  // заменяет кнопку расчитать на кнопку сбросить

  showReset() {
    calcButton.style.display = 'none';
    resetButton.style.display = 'block';

    resetButton.addEventListener('click', this.reset.bind(this));
  }

  // перезапуск объекта сброс полей, куки и лок.хран.

  reset() {
    this.clearFields();
    this.unlockInput();
    this.blockReset();
    this.eventsListeners();
    localStorage.clear();

    document.cookie = `income=${JSON.stringify(this.income)}; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
    document.cookie = `incomeMonth=${this.incomeMonth}; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
    document.cookie = `addIncome=${JSON.stringify(this.addIncome)}; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
    document.cookie = `expenses=${JSON.stringify(this.expenses)}; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
    document.cookie = `addExpenses=${JSON.stringify(this.addExpenses)}; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
    document.cookie = `deposit=${this.deposit}; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
    document.cookie = `percentDeposit=${this.percentDeposit}; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
    document.cookie = `moneyDeposit=${this.moneyDeposit}; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
    document.cookie = `budget=${this.budget}; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
    document.cookie = `budgetDay=${this.budgetDay}; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
    document.cookie = `budgetMonth=${this.budgetMonth}; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
    document.cookie = `expensesMonth=${this.expensesMonth}; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
    document.cookie = `targetMonth=${this.targetMonth}; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
    document.cookie = `isLoad=${true}; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
  }

  // очистка полей

  clearFields() {
    document.querySelectorAll('input[type="text"]').forEach(item => {
      item.value = '';
    });
    periodInput.value = 1;
    this.changePeriodValue();
    depositCheck.checked = false;
    this.income = {};
    this.incomeMonth = 0;
    this.addIncome = [];
    this.expenses = {};
    this.addExpenses = [];
    this.deposit = false;
    this.percentDeposit = 0;
    this.moneyDeposit = 0;
    this.budget = 0;
    this.budgetDay = 0;
    this.budgetMonth = 0;
    this.expensesMonth = 0;
  }

  // заменяет кнпоку сбросить на расчитать

  blockReset() {
    calcButton.style.display = 'block';
    resetButton.style.display = 'none';
  }

  // получение значений по депозиту

  getInfoDeposit() {
    if (this.deposit) {
      this.percentDeposit = +depositPercent.value;
      this.moneyDeposit = +depositAmount.value;
    }
  }

  // проверка введённого числа на похохожесть с процентом (от 0 до 100)

  checkPercent(event) {

    if ((event.target.value > 100) && this.isNumber(event.target.value)) {
      event.target.value = 100;
    } else if ((event.target.value < 0) && this.isNumber(event.target.value)) {
      event.target.value = 0;
    } else if (!this.isNumber(event.target.value)) {
      event.target.value = '';
    }
  }

  // ввод процента в поле из списка или показ поля

  changePercent() {
    const selectValue = this.value;
    if (selectValue === 'other') {
      depositPercent.style.display = 'inline-block';

    } else {
      depositPercent.value = selectValue;
    }
  }

  // обработка клика галочки депозита

  depositHandler() {
    if (depositCheck.checked) {
      depositBank.style.display = 'inline-block';
      depositAmount.style.display = 'inline-block';
      this.deposit = true;
      depositBank.addEventListener('change', this.changePercent);
    } else {
      depositBank.style.display = 'none';
      depositAmount.style.display = 'none';
      depositPercent.style.display = 'none';
      depositBank.value = '';
      depositAmount.value = '';
      depositPercent.value = '';
      this.deposit = false;
      depositBank.removeEventListener('change', this.changePercent);
    }
  }

  // добавление слушателей

  eventsListeners() {



    depositPercent.addEventListener('input', this.checkPercent.bind(this));

    document.addEventListener('input', event => {
      if (event.target.placeholder === 'Наименование') {
        let correctString = '';
        for (let char of event.target.value) {
          if (this.checkInputText(char)) {
            correctString += char;
          }
        }
        event.target.value = correctString;
      }
      if (event.target.placeholder === 'Сумма') {
        let correctNumber = '';
        for (let num of event.target.value) {
          if (this.isNumber(num)) {
            correctNumber += num;
          }
        }
        event.target.value = correctNumber;
      }
    });



    calcButton.addEventListener('click', () => {
      if (moneyInput !== '') {
        this.start.bind(this)();
      }
    });

    resetButton.removeEventListener('click', this.reset.bind(this));

    addIncomeButton.addEventListener('click', this.addExpIncBlock.bind(this));
    addExpensesButton.addEventListener('click', this.addExpIncBlock.bind(this));

    periodInput.addEventListener('input', this.changePeriodValue.bind(this));

    depositCheck.addEventListener('change', this.depositHandler.bind(this));
  }
}

const appData = new AppData();