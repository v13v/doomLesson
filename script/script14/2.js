'use strict';

const start = document.getElementById('start');
const btnPluses = document.getElementsByTagName('button');
const btnPlusIncome = btnPluses[0];
const btnPlusExpenses = btnPluses[1];
const depositCheck = document.querySelector('#deposit-check');
const additionalIncomeItem = document.querySelectorAll('.additional_income-item');
const budgetMonthValue = document.querySelector('.budget_month-value');
const budgetDayValue = document.querySelector('.budget_day-value');
const expensesMonthValue = document.querySelector('.expenses_month-value');
const additionalIncomeValue = document.querySelector('.additional_income-value');
const additionalExpensesValue = document.querySelector('.additional_expenses-value');
let additionalExpensesItem =document.querySelector('.additional_expenses-item');
const incomePeriodValue = document.querySelector('.income_period-value');
const targetMonthValue = document.querySelector('.target_month-value');
const inputSalarAymount = document.querySelector('.salary-amount');
const inputIncomeTitle = document.querySelector('input.income-title');
const inputExpensesTitle = document.querySelector('.expenses-title');
let  expensesItems = document.querySelectorAll('.expenses-items');//
let incomeItems = document.querySelectorAll('.income-items');
const inputAdditionalIncomeItem = document.querySelector('.additional_income-item');
const inputAdditionalIncomeAmount = document.querySelector('.additional_income-amount');
const inputAdditionalExpensesItem = document.querySelector('.additional_expenses-item');
const inputDepositCheck = document.querySelector('#deposit-check');
const inputDepositAmount = document.querySelector('.deposit-amount');
const inputDepositPercent = document.querySelector('.deposit-percent');
const inputTargetAmount = document.querySelector('.target-amount');
const PeriodSelect = document.querySelector('.period-select');
 let periodAmount = document.querySelector('.period-amount');
let inpAll =  document.querySelectorAll('input[type=text]');
let cancel =document.querySelector('#cancel');


const isText = function(data){
  const pattern = new RegExp('[а-яё]','gi');
    return pattern.test(data);
};

let isNumber = function(n){
    return !isNaN(parseFloat(n)) && isFinite(n);
};
/*
start.setAttribute("disabled", "true");
//start.removeAttribute("disabled") https://developer.mozilla.org/en-US/docs/Web/API/HTMLSelectElement/disabled

inputSalarAymount.addEventListener("input", function(event) {
    if (event.target.value) {
      start.disabled = false;
    } else {
      start.disabled = true;
    }
      
  }, false);
  */
const AppData = function(){
    this.budget = 0;
    this.budgetDay = 0;
    this.budgetMonth = 0 
    this.income = {};
    this.incomeMonth = 0;
    this.addIncome = [];
    this.expenses = [];
    this.addExpenses = []
    this.expensesMonth = 0;
    this.deposit = false;
    this.percentDeposit = 0;
    this.moneyDeposit = 0;
};

AppData.prototype.check = function(){
    if(inputSalarAymount.value === ''){
        start.removeAttribute('disabled');
    };
};
AppData.prototype.start = function(){
    this.budget = +inputSalarAymount.value;
    this.getExppenses();    
    this.getExpensesMonth();
    this.getIncome();
    this.getAddExpenses();
    this.getAddIncome();
    
    this.getBudget();

    this.showResult();
//  Блокировать все input[type=text] с левой стороны после нажатия кнопки рассчитать         
    inpAll.forEach((item)=>{
        item.disabled = true; 
    });          
//после этого кнопка Рассчитать пропадает
     start.style.display = 'none';
//появляется кнопка Сбросить
    cancel.style.display = 'block';
};
AppData.prototype.reset = function(){
    cancel.style.display = 'none';
    start.style.display = 'block';
    this.budget = 0;
    this.budgetDay= 0;
    this.budgetMonth=0; 
    this.income = {};
    this.incomeMonth = 0;
    this.addIncome = [];
    this.expenses = [];
    this.addExpenses = [];
    this.expensesMonth = 0;
    this.deposit = false;
    this.percentDeposit = 0;
    this.moneyDeposit = 0;
    inpAll.forEach((item)=>{
        item.value = '';
        item.disabled = false;
    });
    incomeItems.forEach((item,i)=>{
        if(i > 0){
            item.remove();
            btnPlusIncome.style.display = 'block';
        }
        console.log('i : '+i);
        console.log('item : '+item);
    });
    expensesItems.forEach((item,i)=>{
        if(i > 0){
            item.remove();
            btnPlusExpenses.style.display = 'block';
        }
        
    })
};

AppData.prototype.showResult = function(){
    budgetMonthValue.value = this.budgetMonth;
    budgetDayValue.value = Math.ceil(this.budgetDay);
    expensesMonthValue.value = this.expensesMonth;
    additionalExpensesValue.value = this.addExpenses.join(', ');
    additionalIncomeValue.value = this.addIncome.join(', ');
    targetMonthValue.value = Math.ceil(this.getTargetMonth());
    //incomePeriodValue.value = appData.calcSavedMoney();
   
    PeriodSelect.addEventListener('input', ()=>{
        incomePeriodValue.value = this.calcSavedMoney();
    });
};
         
AppData.prototype.addIncomeBlock = function(){
    let clonIncomeItems = incomeItems[0].cloneNode(true);
    incomeItems[0].parentNode.insertBefore(clonIncomeItems,btnPlusIncome);
    incomeItems = document.querySelectorAll('.income-items');
    if(incomeItems.length === 3){
        btnPlusIncome.style.display = 'none';
    }
};
 
AppData.prototype.getIncome = function(){
    incomeItems.forEach((item)=>{
        let itemIncome = item.querySelector('.income-title').value;
        let cachIncome = item.querySelector('.income-amount').value;
        if(itemIncome !== '' && cachIncome !== ''){
            this.income[itemIncome] = cachIncome;
        }
    });
    for(let key in this.income){
        this.incomeMonth += + this.income[key];
    }
};

AppData.prototype.addExpensesBlock = function(){
    let clonExpensesItems = expensesItems[0].cloneNode(true);
    expensesItems[0].parentNode.insertBefore(clonExpensesItems,btnPlusExpenses);
    expensesItems = document.querySelectorAll('.expenses-items');
    if(expensesItems.length === 3){
        btnPlusExpenses.style.display = 'none';
    } 
};

AppData.prototype.getExppenses = function(){
    expensesItems.forEach((item)=>{

        let itemExpanses = item.querySelector('.expenses-title').value;
        let cachExpanses = item.querySelector('.expenses-amount').value;
        if(itemExpanses !== '' && cachExpanses !== ''){
            this.expenses[itemExpanses] = cachExpanses;/////////
        }
    });
};

AppData.prototype.getAddExpenses = function(){
    let addExpenses = additionalExpensesItem.value.split(',');
    addExpenses.forEach((item)=>{
        item = item.trim();
        if(item !== ''){
            this.addExpenses.push(item);
        }
    });
};

AppData.prototype.getAddIncome = function(){
    additionalIncomeItem.forEach((item)=>{
        let itemValue = item.value.trim();
        if(itemValue !== ''){
            this.addIncome.push(itemValue);
        }
    });
};

AppData.prototype.getExpensesMonth = function(){
    for(let key in this.expenses){
        this.expensesMonth += +this.expenses[key];         
       } 
},

AppData.prototype.getBudget = function(){
    this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;

    this.budgetDay = Math.floor(this.budgetMonth/30);

};

AppData.prototype.getTargetMonth = function(){
    return inputTargetAmount.value/this.budgetMonth;   
};
AppData.prototype.getStatusIncome = function(){
    if(this.budgetDay > 800){
        return('У вас высокий уровень дохода!');
    }else if( this.budgetDay > 300){
        return('У вас средний уровень дохода');  
    }else if(this.budgetDay > 0 ){
        return('У вас низкий уровень дохода');  
    }else {
        return('Что то пошло не так');    
    }
};

AppData.prototype.getInfoDeposit = function(){
    if(this.deposit){
        do{
          this.percentDeposit = prompt('Какой годовой процент?',10);   
        }while(!isNumber(this.percentDeposit));
         do{
          this.moneyDeposit = prompt('Какая сумма заложена в банк?',10000);
         }while(!isNumber(this.moneyDeposit));
      }
};

AppData.prototype.calcSavedMoney = function(){
    return this.budgetMonth * PeriodSelect.value;
};

AppData.prototype.showChengeRange = function(){
    periodAmount.textContent = event.target.value;
};

const appData = new AppData()

  console.log(appData);
                                 //The end obj
  // 1) Привязать контекст вызова функции start к appData                               

start.addEventListener('click',appData.start.bind(appData));
//навешиваем событие и выполнение метода reset
cancel.addEventListener('click', appData.reset.bind(appData));

btnPlusExpenses.addEventListener('click', appData.addExpensesBlock);
btnPlusIncome.addEventListener('click',appData.addIncomeBlock);
PeriodSelect.addEventListener('input',appData.showChengeRange);


 appData.getInfoDeposit();
 