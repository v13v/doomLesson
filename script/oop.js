
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

const isText = function(data){
  const pattern = new RegExp('[а-яё]','gi');
    return pattern.test(data);
};

let isNumber = function(n){
    return !isNaN(parseFloat(n)) && isFinite(n);
};

start.setAttribute("disabled", "true");
//start.removeAttribute("disabled") https://developer.mozilla.org/en-US/docs/Web/API/HTMLSelectElement/disabled
inputSalarAymount.addEventListener("input", function(event) {
    if (event.target.value) {
      start.disabled = false;
    } else {
      start.disabled = true;
    }
  }, false); 

                                     //Начало obj
let appData = {
    budget: 0,
    budgetDay: 0,
    budgetMonth: 0, 
    income: {},
    incomeMonth: 0,
    addIncome: [],
    expenses: [],
    addExpenses: [],
    expensesMonth: 0,
    deposit: false,
    percentDeposit: 0,
    moneyDeposit: 0,
    
            
    start (){
           
            appData.budget = +inputSalarAymount.value;
            appData.getExppenses();    
            appData.getExpensesMonth();
            appData.getIncome();
            appData.getAddExpenses();
            appData.getAddIncome();
            
            appData.getBudget();

            appData.showResult();
           
    }, 
    showResult(){
        budgetMonthValue.value = appData.budgetMonth;
        budgetDayValue.value = Math.ceil(appData.budgetDay);
        expensesMonthValue.value = appData.expensesMonth;
        additionalExpensesValue.value = appData.addExpenses.join(', ');
        additionalIncomeValue.value = appData.addIncome.join(', ');
        targetMonthValue.value = Math.ceil(appData.getTargetMonth());
        incomePeriodValue.value = (appData.calcSavedMoney())//* periodAmount.textContent;
        //console.log(appData.calcSavedMoney());
        
    },
    addIncomeBlock(){
        let clonIncomeItems = incomeItems[0.].cloneNode(true);
        incomeItems[0].parentNode.insertBefore(clonIncomeItems,btnPlusIncome);
        incomeItems = document.querySelectorAll('.income-items');
        if(incomeItems.length === 3){
            btnPlusIncome.style.display = 'none';
        }
    },
    getIncome(){
        incomeItems.forEach((item)=>{
            let itemIncome = item.querySelector('.income-title').value;
            let cachIncome = item.querySelector('.income-amount').value;
            if(itemIncome !== '' && cachIncome !== ''){
                appData.income[itemIncome] = cachIncome;
            }
        })
        for(let key in appData.income){
            appData.incomeMonth += + appData.income[key]
        }
        
    },
    addExpensesBlock(){

         let clonExpensesItems = expensesItems[0].cloneNode(true);
         expensesItems[0].parentNode.insertBefore(clonExpensesItems,btnPlusExpenses);
         expensesItems = document.querySelectorAll('.expenses-items');
         if(expensesItems.length === 3){
             btnPlusExpenses.style.display = 'none';
         }     
    },
    getExppenses(){
        expensesItems.forEach((item)=>{

            let itemExpanses = item.querySelector('.expenses-title').value;
            let cachExpanses = item.querySelector('.expenses-amount').value;
            if(itemExpanses !== '' && cachExpanses !== ''){
                appData.expenses[itemExpanses] = cachExpanses;
            }
        });
    },
    getAddExpenses(){
        let addExpenses = additionalExpensesItem.value.split(',');
        addExpenses.forEach((item)=>{
            item = item.trim();
            if(item !== ''){
                appData.addExpenses.push(item);
            }
        })
    },
    getAddIncome(){
        additionalIncomeItem.forEach((item)=>{
            let itemValue = item.value.trim();
            if(itemValue !== ''){
                appData.addIncome.push(itemValue);
            }
        })
    },
   

    getExpensesMonth() { 
       for(let key in appData.expenses){
        appData.expensesMonth += +appData.expenses[key];         
       } 

    },

    getBudget (){

        appData.budgetMonth = appData.budget + appData.incomeMonth - appData.expensesMonth;

        appData.budgetDay = Math.floor(appData.budgetMonth/30);

    },

    getTargetMonth (){
        return inputTargetAmount.value/appData.budgetMonth;   
    },

    getStatusIncome (){
        if(appData.budgetDay > 800){
            return('У вас высокий уровень дохода!');
        }else if( appData.budgetDay > 300){
            return('У вас средний уровень дохода');  
        }else if(appData.budgetDay > 0 ){
            return('У вас низкий уровень дохода');  
        }else {
            return('Что то пошло не так');    
        }
    },

    getInfoDeposit(){
        if(appData.deposit){
          do{
            appData.percentDeposit = prompt('Какой годовой процент?',10);   
          }while(!isNumber(appData.percentDeposit));
           do{
            appData.moneyDeposit = prompt('Какая сумма заложена в банк?',10000);
           }while(!isNumber(appData.moneyDeposit));
        }
    },

    calcSavedMoney(){
       return appData.budgetMonth * PeriodSelect.value;
    },
    showChengeRange(event){
        periodAmount.textContent = event.target.value;

    }
};
                                 //The end obj

start.addEventListener('click',appData.start);

btnPlusExpenses.addEventListener('click', appData.addExpensesBlock);
btnPlusIncome.addEventListener('click',appData.addIncomeBlock);
PeriodSelect.addEventListener('input',appData.showChengeRange);


 appData.getInfoDeposit(); 
