'use strict';

// Simply Bank App

const account1 = {
  userName: 'Cecil Ireland',
  transactions: [500, 250, -300, 5000, -850, -110, -170, 1100],
  interest: 1.5,
  pin: 1111,
  transactionsDates: [
    '2020-10-02T14:43:31.074Z',
    '2020-10-29T11:24:19.761Z',
    '2020-11-15T10:45:23.907Z',
    '2021-01-22T12:17:46.255Z',
    '2021-02-12T15:14:06.486Z',
    '2021-03-09T11:42:26.371Z',
    '2021-05-21T07:43:59.331Z',
    '2021-06-22T15:21:20.814Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const account2 = {
  userName: 'Amani Salt',
  transactions: [2000, 6400, -1350, -70, -210, -2000, 5500, -30],
  interest: 1.3,
  pin: 2222,
  transactionsDates: [
    '2020-10-02T14:43:31.074Z',
    '2020-10-29T11:24:19.761Z',
    '2020-11-15T10:45:23.907Z',
    '2021-01-22T12:17:46.255Z',
    '2021-02-12T15:14:06.486Z',
    '2021-03-09T11:42:26.371Z',
    '2021-05-21T07:43:59.331Z',
    '2021-06-22T15:21:20.814Z',
  ],
  currency: 'UAH',
  locale: 'uk-UA',
};

const account3 = {
  userName: 'Corey Martinez',
  transactions: [900, -200, 280, 300, -200, 150, 1400, -400],
  interest: 0.8,
  pin: 3333,
  transactionsDates: [
    '2020-10-02T14:43:31.074Z',
    '2020-10-29T11:24:19.761Z',
    '2020-11-15T10:45:23.907Z',
    '2021-01-22T12:17:46.255Z',
    '2021-02-12T15:14:06.486Z',
    '2021-03-09T11:42:26.371Z',
    '2021-05-21T07:43:59.331Z',
    '2021-06-22T15:21:20.814Z',
  ],
  currency: 'RUB',
  locale: 'ru-RU',
};

const account4 = {
  userName: 'Kamile Searle',
  transactions: [530, 1300, 500, 40, 190],
  interest: 1,
  pin: 4444,
  transactionsDates: [
    '2020-10-02T14:43:31.074Z',
    '2020-10-29T11:24:19.761Z',
    '2020-11-15T10:45:23.907Z',
    '2021-01-22T12:17:46.255Z',
    '2021-02-12T15:14:06.486Z',
    '2021-03-09T11:42:26.371Z',
    '2021-05-21T07:43:59.331Z',
    '2021-06-22T15:21:20.814Z',
  ],
  currency: 'EUR',
  locale: 'fr-CA',
};

const account5 = {
  userName: 'Oliver Avila',
  transactions: [630, 800, 300, 50, 120],
  interest: 1.1,
  pin: 5555,
  transactionsDates: [
    '2020-10-02T14:43:31.074Z',
    '2020-10-29T11:24:19.761Z',
    '2020-11-15T10:45:23.907Z',
    '2021-01-22T12:17:46.255Z',
    '2021-02-12T15:14:06.486Z',
    '2021-03-09T11:42:26.371Z',
    '2021-05-21T07:43:59.331Z',
    '2021-06-22T15:21:20.814Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2, account3, account4, account5];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.total__value--in');
const labelSumOut = document.querySelector('.total__value--out');
const labelSumInterest = document.querySelector('.total__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerTransactions = document.querySelector('.transactions');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const displayTransactions = function (transactions, sort = false) {
  containerTransactions.innerHTML = '';

  const trans = sort ? transactions.slice().sort((x, y) => x - y) : transactions;

  trans.forEach(function (trans, index) {
    const transType = trans > 0 ? 'deposit' : 'withdrawal';

    const transactionRow = `
    <div class="transactions__row">
      <div class="transactions__type transactions__type--${transType}">
      ${index + 1} ${transType}
      </div>
      <div class="transactions__value">${trans.toFixed(2)}$</div>
    </div>
    `;
    containerTransactions.insertAdjacentHTML('afterbegin', transactionRow);
  });
};

const createNickNames = function (accs) {
  accs.forEach(function (acc) {
    acc.nickName = acc.userName
      .toLocaleLowerCase()
      .split(' ')
      .map((word) => word[0])
      .join('');
  });
};

createNickNames(accounts);

const displayBalans = function (account) {
  const balance = account.transactions.reduce((acc, trans) => acc + trans, 0);
  account.balance = balance;
  labelBalance.textContent = `${balance.toFixed(2)}$`;
};

const displayTotal = function (trans, inter) {
  const depositesTotal = trans
    .filter((tr) => tr > 0)
    .reduce((acc, tr) => acc + tr, 0);
  labelSumIn.textContent = `${depositesTotal.toFixed(2)}$`;

  const withdrawalTotal = trans
    .filter((tr) => tr < 0)
    .reduce((acc, tr) => acc + tr, 0);
  labelSumOut.textContent = `${withdrawalTotal.toFixed(2)}$`;

  const interestTotal = trans
    .filter((tr) => tr > 0)
    .map((val) => (val * inter) / 100)
    .filter((int) => int >= 5)
    .reduce((acc, interest) => acc + interest, 0);
  labelSumInterest.textContent = `${interestTotal.toFixed(2)}$`;
};

const updateUI = function (accaunt) {
  //   Display transactions
  displayTransactions(accaunt.transactions);

  //   Display balance
  displayBalans(accaunt);

  //   Display total
  displayTotal(accaunt.transactions, accaunt.interest);
};

let currentAcc;

//   Event Handlers

btnLogin.addEventListener('click', function (e) {
  e.preventDefault();

  currentAcc = accounts.find(
    (acc) => acc.nickName === inputLoginUsername.value.toLocaleLowerCase()
  );

  if (currentAcc?.pin === +(inputLoginPin.value)) {
    //   Display UI and welcome message
    containerApp.style.opacity = 100;

    labelWelcome.textContent = `Welcome back, ${
      currentAcc.userName.split(' ')[0]
    }!`;

    //   Clear inputs
    inputLoginUsername.value = '';
    inputLoginPin.value = '';
    inputLoginPin.blur();

    updateUI(currentAcc);
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();

  const transferAmount = +(inputTransferAmount.value);
  const recipientNickname = inputTransferTo.value;
  const recipientAccount = accounts.find(
    (account) =>
      account.nickName === recipientNickname ||
      account.userName === recipientNickname
  );
  inputTransferTo.value = '';
  inputTransferAmount.value = '';

  if (
    transferAmount > 0 &&
    currentAcc.balance >= transferAmount &&
    recipientAccount &&
    currentAcc.nickName !== recipientAccount?.nickName &&
    currentAcc.userName !== recipientAccount?.userName
  ) {
    currentAcc.transactions.push(-transferAmount);
    recipientAccount.transactions.push(transferAmount);
    updateUI(currentAcc);
  }
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (inputCloseUsername.value === currentAcc.nickName && +(inputClosePin.value) === currentAcc.pin) {
    const currentAccIndex = accounts.findIndex(account => account.nickname === currentAcc.nickName);
    accounts.splice(currentAccIndex + 1, 1);
    containerApp.style.opacity = 0;
    labelWelcome.textContent = 'Login to your account';
  }
  else {
    console.log('wrong data')
  }

  inputCloseUsername.value = '';
  inputClosePin.value = '';

})

btnLoan.addEventListener('click', function(e) {
  e.preventDefault();

  const loanAmount = Math.floor(inputLoanAmount.value);

  if (loanAmount > 0 && currentAcc.transactions.some(tr => tr >= loanAmount / 10)) {
    currentAcc.transactions.push(loanAmount);
    updateUI(currentAcc)
  }
  inputLoanAmount.value = '';
})

//   SORT FEATURE

let transSort = false;

btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayTransactions(currentAcc.transactions, !transSort);
  transSort = !transSort;
})

/* Painting ROW

const logoImg = document.querySelector('.logo');
logoImg.addEventListener('click', function () {
  [...document.querySelectorAll('.transactions__row')].forEach(function(row, i){
    if (i % 4 === 0) {
      row.style.backgroundColor = 'grey';
    }
  });
});
*/