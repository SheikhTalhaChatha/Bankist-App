'use strict';



const account1 = {
    owner: 'Sheikh Talha chatha',
    movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
    interestRate: 1.2, // %
    pin: 1111,
    movementsDates: [
      '2019-10-18T21:31:17.178Z',
      '2019-11-21T07:37:02.383Z',
      '2020-01-22T10:25:36.790Z',
      '2020-01-01T23:32:37.929Z',
      '2022-02-17T17:01:37.194Z',
      '2022-04-30T14:17:49.604Z',
      '2023-08-04T09:15:04.904Z',
      '2023-10-05T10:19:21.185Z',
    ],
  };
  const account2 = {
    owner: 'Khalilurehman chatha',
    movements: [200, 450, -400, 3000, -650, -130, 70, 13300],
    interestRate: 1.2, // %
    pin: 2222,
    movementsDates: [
      '2019-10-18T21:31:17.178Z',
      '2019-11-21T07:37:02.383Z',
      '2020-01-22T10:25:36.790Z',
      '2020-01-01T23:32:37.929Z',
      '2022-02-17T17:01:37.194Z',
      '2022-04-30T14:17:49.604Z',
      '2023-08-04T09:15:04.904Z',
      '2023-10-05T10:19:21.185Z',
    ],
  };

  const account3 = {
    owner: 'Abdurrehman Sheikh',
    movements: [200, 450, -400, 3000, -650, -130, 70, 12200],
    interestRate: 1.2, // %
    pin: 3333,
    movementsDates: [
      '2020-10-18T21:31:17.178Z',
      '2020-11-21T07:37:02.383Z',
      '2021-01-22T10:25:36.790Z',
      '2021-01-01T23:32:37.929Z',
      '2022-02-17T17:01:37.194Z',
      '2022-03-30T14:17:49.604Z',
      '2023-08-04T09:15:04.904Z',
      '2023-10-05T10:19:21.185Z',
    ],
    
  };
  const movements = [200, 450, -400, 3000, -650, -130, 70, 1300]; 


  let account = [account1, account2, account3];

  function updateLocalStorage() {
    if (JSON.parse(localStorage.getItem('account'))) {
      account = JSON.parse(localStorage.getItem('account'));
    }
  }
  updateLocalStorage();



  const lableWelcome = document.querySelector('.wellcome');
const inputLoginUsername = document.querySelector('.login__input--user')
const inputLoginPin = document.querySelector('.login__input--pin')
   const lableDate  = document.querySelector('.date');
   const inputTarnsferTo = document.querySelector('.form_input--to')
  const lableBalance = document.querySelector('.balance_value');
  const lableSumin = document.querySelector('.summary__value--in');
  const lableSumout = document.querySelector('.summary__value--out');
  const lablesumIntrest = document.querySelector('.summary__value--interest');
  const lableTimer = document.querySelector('.timer');
  const btnLogin =document.querySelector('.login_btn');
  const containerApp = document.querySelector('.app');
  const containerMovement = document.querySelector('.movements');
  const btnSort = document.querySelector('.btn--sort');
  const nav = document.querySelector('nav');
  const loanBtn = document.querySelector('.form_btn---loan');
  const formLogin=document.querySelector('.login') ;
  const inputClosePin = document.querySelector('.form_input--pin');
  const inputCloseUser = document.querySelector('.form_input--user');
  const  formTransfer = document.querySelector('.form--transfer');
  const moveDate = document.querySelector('.movements_date')
const btnTarnsfer = document.querySelector('.form_btn---transfer')
  const formClose = document.querySelector('.form--close');
  const formLoan = document.querySelector('.form--loan');
  const formLoanInput=document.querySelector('.form_lable--loan');
  const inputtransferAmount = document.querySelector('.form_input--amount');
  const locale = navigator.language;


const formetMoveDate = function(date, locale){
  const clacdayPassed = (day1 ,day2) =>
 Math.round(Math.abs( day1 - day2) / (1000 * 60 * 60 * 24))
const dayPassed = clacdayPassed(new Date(), date)
if(dayPassed === 0) return 'Today'
if(dayPassed === 1) return 'yersetday'
if(dayPassed <= 7) return `${dayPassed} day ago`
// else{
// const day = `${date.getDay()}`.padStart(2,0);
//   const month= `${date.getMonth()}`.padStart(2,0);
//   const year = date.getFullYear();
//   return `${day}/${month}/${year}`;
// }

return new Intl.DateTimeFormat(locale).format(date)

}
const numberFormat = (value, local = locale, currency = 'PKR') => {
  return new Intl.NumberFormat(local, {
    style: 'currency',
    currency: currency,
  }).format(value);
};






const displayMovements = function (acc, sort = false){
  containerMovement.innerHTML = '';
  const movs = sort
  ? acc.movements.slice().sort((a, b)=> a - b)
  : acc.movements; 
  movs.forEach(function(mov, i){
    const type = mov > 0 ?'deposist':'withdrawal';


  const date = new Date(acc.movementsDates[i]);
   const displayDate = formetMoveDate(date, acc.locale);
   const numberFormated = numberFormat(movements);
    const html = `
    <div class="movements-row">
      <div class="movements_type movement_types--${type}">
      ${i+1 }
      ${type}</div>
      <div class="movements_date">${displayDate}</div>

      <div class="movement_value">${mov.toFixed(2)}</div>
    </div>`
    containerMovement.insertAdjacentHTML('afterbegin',html)
  });
};
  
//display balance;

  const clacDisplayBalance = function(acc){
    acc.balance = acc.movements.reduce((acc,mov) => acc + mov
    , 0);

    lableBalance.textContent=`PKR${acc.balance}:Rs`;
  };

  

  //end display blance

  //start display blance

  const clacDisplaySummry = function(acc){
  const incomes = acc.movements
  .filter(mov => mov > 0) 
  .reduce((acc , mov) =>  acc + mov, 0); 
  lableSumin.textContent = `${incomes}rs`;



const out = movements
.filter(mov => mov < 0)
.reduce((acc ,mov ) => acc + mov , 0);
lableSumout.textContent=`${Math.abs(out)}rs`;

const interest= movements
.filter(mov => mov > 0).map(deposit => (deposit*1.2)/100).
filter((int, i , arr)=>{
  
  return int >= 1
})
.reduce((acc , mov) =>  acc + mov, 0); 

 lablesumIntrest.textContent = `${(interest)}rs`; 
}
  

 

const createUsernames = function(acc){
acc.forEach(function(acc){
  acc.username=acc.owner.toLowerCase().split(' ').map(name => name [0]).join(' ')
});
};

createUsernames(account);
//updateui displamovements
const updateUI = function(acc)  {
  displayMovements(acc);
  clacDisplayBalance(acc);
  clacDisplaySummry(acc)
}
//end
let currentAccount, timer;
// currentAccount = account1;
// updateUI(currentAccount);
//  containerApp.style.opacity = 100;
//time bar
const startLogoutTimer = function(){
let time = 5*60;
const timeForTimer = ()=>{
const min = String(Math.trunc( time / 60)).padStart(2, 0);
 const sec = String(time % 60).padStart(2, 0);

lableTimer.textContent = `${min}:${sec}`



if(time === 0){

clearInterval(timer);
lableWelcome.textContent = 'log in get started';
containerApp.style.opacity = '0';
// nav.classList.add('.loged')



}time--;


};
const  timer = setInterval(timeForTimer,1000)
return timer;
};
 



formLogin.addEventListener('click', function(e){
  e.preventDefault();
currentAccount = account.find(
  acc => acc.username === inputLoginUsername.value
);
console.log(currentAccount)

if (currentAccount?.pin === Number( inputLoginPin.value)){
 lableWelcome.textContent = `Wellcome back, ${currentAccount.owner.split(' ')[0]

}`
containerApp.style.opacity = 100;
const now = new Date();
 const oppstion = {
  hour: 'numeric',
  minute :'numeric',
  day :'numeric',
  month : 'long',
  year : 'numeric',
  weekday:'long'

 };
 const locale = navigator.language;

 lableDate.textContent = new Intl.DateTimeFormat(locale,oppstion).format(now)


inputLoginUsername.value = inputLoginPin.value = '';
inputLoginPin.blur();



updateUI(currentAccount);
if(timer) clearInterval(timer);
  timer = startLogoutTimer();



}



});

// loan deposit

formLoan.addEventListener('submit', e => {
  e.preventDefault();
  const loan = +e.srcElement[0].value;
  const loanAcceptance = currentAccount.movements.some(
    value => value >= loan / 10
);
  if (loanAcceptance) {
currentAccount.movements.push(loan)
currentAccount.movementsDates.push(new Date().toISOString());

updateUI(currentAccount)

clearInterval(timer);
        timer = startLogoutTimer();

  }
  })


formTransfer.addEventListener('click',function(e){
  e.preventDefault();
 
  const amount = Number(inputtransferAmount.value);
  const reciverAcc = account.find(acc => acc.username === inputTarnsferTo.value);

  console.log(amount,reciverAcc)

    if(amount > 0 && 
      reciverAcc && 
      currentAccount.balance >= amount && reciverAcc?.username !== 
      currentAccount.username
      ){
        
        currentAccount.movements.push(-amount);
        reciverAcc.movements.push(amount)




        currentAccount.movementsDates.push(new Date().toISOString());
        reciverAcc.movementsDates.push(new Date().toISOString());
       
        updateUI(currentAccount);
        clearInterval(timer);
        timer = startLogoutTimer();

      }
})
//acount closer
formClose.addEventListener('click', function(e){
  e.preventDefault();
 // console.log('close')

 if(
  inputCloseUser.value === currentAccount.username && Number(inputClosePin.value) === 
  currentAccount.pin
 ){
  const index = account.findIndex(acc => acc.username === currentAccount.username);
  console.log(index)

 account.splice(index, 1);


  containerApp.style.opacity = 0;

 }


});
let sorted = false;
btnSort.addEventListener('click', function(e){
  e.preventDefault();
  displayMovements(currentAccount, !sorted  )
    sorted = !sorted;
})



// formTransfer.addEventListener('submit', function(e){
//   e.preventDefault();
//   const amount = Number(inputtransferAmount.value);
//   const reciverAcc = account.find(
//     acc => acc.username === inputTarnsferTo.value
//   );
//   console.log(amount, reciverAcc);
//   if(amount > 0 && 
//     reciverAcc && 
//     currentAccount.balance >= amount && 
//     reciverAcc?.username !== currentAccount.username){


//     currentAccount.movements.push(-amount)
//     reciverAcc.movements.push(amount)
    
//   }
 
// })



// createUsernames(account);
// console.log(account);
// const balance = movements.reduce(function(acc,cur,i , arr){
//   // console.log(`Ineration ${i}:${acc}`)
//   return acc + cur



// },100);





// console.log(balance) 



// let balance2 = 0

// for(const mov of movements ) balance2 += mov;

// console.log(balance2)



// const max = movements.reduce((acc,mov)=>{
//   if( acc > mov ) return acc;
//   else return mov ;
// }, movements[0]);
// console.log(max)


const clacdayPassed = (day1 ,day2) =>
 Math.abs(day1 - day2) / (1000 * 60 * 60 * 24)