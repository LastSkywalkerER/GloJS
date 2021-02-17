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
  inputWithNumber = document.querySelectorAll('[placeholder="Сумма"]');

let items = {
  income: document.querySelectorAll('.income-items'),
  expenses: document.querySelectorAll('.expenses-items'),
};

class AppData {
  constructor() {
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
    this.eventsListeners();
  }


  start() {


    this.budget = +moneyInput.value;
    this.deposit = depositCheck.checked;
    this.getExpInc();
    this.getAddExpInc();
    this.getExpensesMonth();
    this.getBudget();
    this.getInfoDeposit();

    this.showResult();

    this.blockInput();
    this.showReset();
  }

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

    targetMonthOutput.value = this.getTargetMonth();
  }

  // addExpensesBlock() {

  //   let cloneExpensesItem = expensesItems[0].cloneNode(true);

  //   cloneExpensesItem.querySelector('.expenses-title').value = '';
  //   cloneExpensesItem.querySelector('.expenses-amount').value = '';

  //   addExpensesButton.before(cloneExpensesItem);

  //   expensesItems = document.querySelectorAll('.expenses-items');

  //   if (expensesItems.length === 3) {
  //     addExpensesButton.style.display = 'none';
  //   }
  // }

  // addIncomeBlock() {

  //   let cloneIncomeItem = incomeItems[0].cloneNode(true);

  //   cloneIncomeItem.querySelector('.income-title').value = '';
  //   cloneIncomeItem.querySelector('.income-amount').value = '';

  //   addIncomeButton.before(cloneIncomeItem);

  //   incomeItems = document.querySelectorAll('.income-items');

  //   if (incomeItems.length === 3) {
  //     addIncomeButton.style.display = 'none';
  //   }
  // }

  addExpIncBlock(event) {

    const selector = event.target.className.split(' ')[1].split('_')[0],
      cloneItem = event.target.parentNode.querySelectorAll(`.${selector}-items`)[0].cloneNode(true);

    cloneItem.querySelector(`.${selector}-title`).value = '';
    cloneItem.querySelector(`.${selector}-amount`).value = '';

    event.target.before(cloneItem);

    // incomeItems = document.querySelectorAll(`.income-items`);

    // if (incomeItems.length === 3) {
    //   addIncomeButton.style.display = 'none';
    // }

    // expensesItems = document.querySelectorAll('.expenses-items');

    // if (expensesItems.length === 3) {
    //   addExpensesButton.style.display = 'none';
    // }

    items[selector] = document.querySelectorAll(`.${selector}-items`);

    if (items[selector].length === 3) {
      event.target.style.display = 'none';
    }


  }

  getExpInc() {

    const count = item => {
      const selectorStr = item.className.split('-')[0];
      const itemTitle = item.querySelector(`.${selectorStr}-title`).value;
      const cashAmount = +item.querySelector(`.${selectorStr}-amount`).value;

      if (itemTitle !== '' && cashAmount !== '') {
        this[selectorStr][itemTitle] = cashAmount;
      }
    };

    // expensesItems.forEach(count);
    // incomeItems.forEach(count);

    for (let key in items) {

      items[key].forEach(count);
    }

    for (let key in this.income) {
      this.incomeMonth += +this.income[key];
    }
  }

  // getAddExpenses() {
  //   const addExpenses = addExpensesInput.value.split(',');
  //   addExpenses.forEach(item => {
  //     const itemValue = item.trim();
  //     if (itemValue !== '') {
  //       this.addExpenses.push(itemValue);
  //     }
  //   });
  // }

  // getAddIncome() {
  //   addIncomeInput.forEach(item => {
  //     const itemValue = item.value.trim();
  //     if (itemValue !== '') {
  //       this.addIncome.push(itemValue);
  //     }
  //   });
  // }

  getAddExpInc() {
    let add = {
      expenses: addExpensesInput.value.split(','),
      income: []
    };

    addIncomeInput.forEach(item => {
      add.income.push(item.value);
    });

    for (let key in add) {
      add[key].forEach((item) => {
        const itemValue = item.trim();
        console.log(key);
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

  checkInputText(char) {

    if (/[а-я]/i.test(char) || char === ',' || char === ' ' || char === '.' || char === ';') {
      return true;
    } else {
      return false;
    }
  };

  isNumber(number) {
    return !isNaN(parseFloat(number)) && isFinite(number);
  }


  getExpensesMonth() {
    for (let key in this.expenses) {
      this.expensesMonth += this.expenses[key];
    }
  }

  getBudget() {
    this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
    this.budgetDay = this.budgetMonth / 30;
  }

  getTargetMonth() {
    if (targetInput.value / this.budgetMonth >= 0) {
      return Math.ceil(targetInput.value / this.budgetMonth);
    } else {
      return 'Цель недостижима!';
    }
  }

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

  getInfoDeposit() {
    if (this.deposit) {
      this.percentDeposit = prompt('Какой годовой процент?', 10);
      this.moneyDeposit = prompt('Какая сумма заложена', 10000);
    }
  }

  calcSavedMoney() {
    return this.budgetMonth * periodInput.value;
  }

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

  changePeriodValue() {
    periodAmount.textContent = periodInput.value;
  };

  blockInput() {
    document.querySelector('.data').querySelectorAll('input[type="text"]').forEach(item => {
      item.toggleAttribute('disabled');
    });
  }

  showReset() {
    calcButton.style.display = 'none';
    resetButton.style.display = 'block';
  }

  reset() {
    this.clearFields();
    this.blockInput();
    this.blockReset();
  }

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

  blockReset() {
    calcButton.style.display = 'block';
    resetButton.style.display = 'none';
  }

  eventsListeners() {
    var start = this.start.bind(this),
      reset = this.reset.bind(this),
      // addIncomeBlock = this.addIncomeBlock.bind(this),
      // addExpensesBlock = this.addExpensesBlock.bind(this),
      addExpIncBlock = this.addExpIncBlock.bind(addExpIncBlock),
      changePeriodValue = this.changePeriodValue.bind(this);

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

    calcButton.setAttribute('disabled', 'disabled');
    calcButton.removeEventListener('click', start);

    moneyInput.addEventListener('input', () => {
      if (moneyInput.value !== '') {
        calcButton.removeAttribute('disabled');
        calcButton.addEventListener('click', start);
      } else {
        calcButton.setAttribute('disabled', 'disabled');
        calcButton.removeEventListener('click', start);
      }
    });

    resetButton.addEventListener('click', reset);

    addIncomeButton.addEventListener('click', addExpIncBlock);
    addExpensesButton.addEventListener('click', addExpIncBlock);

    periodInput.addEventListener('input', changePeriodValue);
  }
}

const appData = new AppData();