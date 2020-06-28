
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
const additionalExpensesItem =document.querySelector('.additional_expenses-item');
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
const periodAmount = document.querySelector('.period-amount');
const inpAll =  document.querySelectorAll('input[type=text]');
const cancel =document.querySelector('#cancel');
const depositCheckmark = document.querySelector('#deposit-check');

const isText = (data)=>{
  const pattern = new RegExp('[а-яё]','gi');
    return pattern.test(data);
};

const isNumber = (n)=>{
    return !isNaN(parseFloat(n)) && isFinite(n);
};

class AppData {
    constructor(){
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
    }
    


check (){
    if(inputSalarAymount.value === ''){
        start.removeAttribute('disabled');
    };
}
start (){
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
}
reset (){
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
    });
    expensesItems.forEach((item,i)=>{
        if(i > 0){
            item.remove();
            btnPlusExpenses.style.display = 'block';
        }
        
    })
    depositCheckmark.checked = false;
        periodAmount.textContent = 1;
        PeriodSelect.value = 1;
}

showResult(){
    budgetMonthValue.value = this.budgetMonth;
    budgetDayValue.value = Math.ceil(this.budgetDay);
    expensesMonthValue.value = this.expensesMonth;
    additionalExpensesValue.value = this.addExpenses.join(', ');
    additionalIncomeValue.value = this.addIncome.join(', ');
    targetMonthValue.value = Math.ceil(this.getTargetMonth());
    incomePeriodValue.value = this.calcSavedMoney();
   
    PeriodSelect.addEventListener('input', ()=>{
        incomePeriodValue.value = this.calcSavedMoney();
    });
}
         
addIncomeBlock (){
    const clonIncomeItems = incomeItems[0].cloneNode(true);
    incomeItems[0].parentNode.insertBefore(clonIncomeItems,btnPlusIncome);
    incomeItems = document.querySelectorAll('.income-items');
    if(incomeItems.length === 3){
        btnPlusIncome.style.display = 'none';
    }
}
 
getIncome (){
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
}

addExpensesBlock (){
    const clonExpensesItems = expensesItems[0].cloneNode(true);
    expensesItems[0].parentNode.insertBefore(clonExpensesItems,btnPlusExpenses);
    expensesItems = document.querySelectorAll('.expenses-items');
    if(expensesItems.length === 3){
        btnPlusExpenses.style.display = 'none';
    } 
}
getExppenses (){
    expensesItems.forEach((item)=>{

        const itemExpanses = item.querySelector('.expenses-title').value;
        const cachExpanses = item.querySelector('.expenses-amount').value;
        if(itemExpanses !== '' && cachExpanses !== ''){
            this.expenses[itemExpanses] = cachExpanses;/////////
        }
    });
}

getAddExpenses (){
    const addExpenses = additionalExpensesItem.value.split(',');
    addExpenses.forEach((item)=>{
        item = item.trim();
        if(item !== ''){
            this.addExpenses.push(item);
        }
    });
}

getAddIncome (){
    additionalIncomeItem.forEach((item)=>{
        const itemValue = item.value.trim();
        if(itemValue !== ''){
            this.addIncome.push(itemValue);
        }
    });
}

getExpensesMonth (){
    for(const key in this.expenses){
        this.expensesMonth += +this.expenses[key];         
       } 
}

getBudget (){
    this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;

    this.budgetDay = Math.floor(this.budgetMonth/30);

}

getTargetMonth (){
    return inputTargetAmount.value/this.budgetMonth;   
}
getStatusIncome (){
    if(this.budgetDay > 800){
        return('У вас высокий уровень дохода!');
    }else if( this.budgetDay > 300){
        return('У вас средний уровень дохода');  
    }else if(this.budgetDay > 0 ){
        return('У вас низкий уровень дохода');  
    }else {
        return('Что то пошло не так');    
    }
}

getInfoDeposit (){
    if(this.deposit){
        do{
          this.percentDeposit = prompt('Какой годовой процент?',10);   
        }while(!isNumber(this.percentDeposit));
         do{
          this.moneyDeposit = prompt('Какая сумма заложена в банк?',10000);
         }while(!isNumber(this.moneyDeposit));
      }
}

calcSavedMoney (){
    return this.budgetMonth * PeriodSelect.value;
}

showChengeRange (){
    periodAmount.textContent = event.target.value;
}

eventsListeners () {
    start.addEventListener('click',this.start.bind(this));
    cancel.addEventListener('click', this.reset.bind(this));   
    btnPlusExpenses.addEventListener('click', this.addExpensesBlock);
    btnPlusIncome.addEventListener('click',this.addIncomeBlock);
    PeriodSelect.addEventListener('input',this.showChengeRange);
    
  }                            
}
const newData = new AppData()
  newData.eventsListeners()

 //appData.getInfoDeposit();
 