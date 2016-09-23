var dataset = require('./dataset.json').bankBalances;

/*
  create an array with accounts from bankBalances that are
  greater than 100000.00
  assign the resulting array to `hundredThousandairs`
*/
var hundredThousandairs = null;
hundredThousandairs = dataset.filter((element,index,arry) => {
  return parseFloat(element.amount) > 100000.00;
});
/*
  set a new key for each object in bankBalances named `rounded`
  the value of this key will be the `amount` rounded to the nearest dollar
  example 
    {
      "amount": "134758.44",
      "state": "HI",
      "rounded": 134758
    }
  assign the resulting array to `roundedDollar`
*/
var roundedDollar = null;
roundedDollar = dataset.map((element,index,array) => {
  return {
    amount: element.amount,
    state: element.state,
    rounded: Math.round(element.amount)
  }
})
/*
  set a the `amount` value for each object in bankBalances
  to the value of `amount` rounded to the nearest 10 cents
  example 
    {
      "amount": 134758.4,
      "state": "HI"
    }
  assign the resulting array to `roundedDime`
*/
var roundedDime = null;
roundedDime = dataset.map((element,index,array) => {
  return {
    amount: Math.round(element.amount*10)/10,
    state: element.state
  }
})
// set sumOfBankBalances to the sum of all amounts in bankBalances
var sumOfBankBalances = null;
sumOfBankBalances = dataset.map((element,index,array) => {
  return Math.round(parseFloat(element.amount)*100)/100;
}).reduce((previous,current,index,array) => {
  return Math.round((previous + current)*100)/100;
})
/*
  set sumOfInterests to the sum of the 18.9% interest
  for all amounts in bankBalances
  in each of the following states
    Wisconsin
    Illinois
    Wyoming
    Ohio
    Georgia
    Delaware
  the result should be rounded to the nearest cent
 */
var sumOfInterests = null;
sumOfInterests = dataset.filter(bankAccount => {
  return bankAccount.state === 'WI' ||
  bankAccount.state === 'IL' ||
  bankAccount.state === 'WY' ||
  bankAccount.state === 'OH' ||
  bankAccount.state === 'GA' ||
  bankAccount.state === 'DE'
}).map(bankAccount => {
  return parseFloat(bankAccount.amount)*.189;
}).reduce((previous,current) => {
  return Math.round((previous + current)*100)/100;
});
/*
  set sumOfHighInterests to the sum of the 18.9% interest
  for all amounts in bankBalances
  where the amount of the sum of interests in that state is
    greater than 50,000
  in every state except
    Wisconsin
    Illinois
    Wyoming
    Ohio
    Georgia
    Delaware
  the result should be rounded to the nearest cent
 */
var sumOfHighInterests = null;

function roundToCent(unroundedAmount) {
  return Math.round(unroundedAmount*100)/100;
}

var stateInterestObj = dataset.filter(account => {
  return ['WI', 'IL', 'WY', 'OH', 'GA','DE'].indexOf(account.state) < 0;
}).map(account => {
  return {
    state: account.state,
    amount: parseFloat(account.amount)
  }
}).map(account => {
  return {
    state: account.state,
    interest: account.amount*.189
  }
}).reduce((stateInterestObj, account) => {
  if(stateInterestObj.hasOwnProperty(account.state)) {
    stateInterestObj[account.state] += account.interest;
  } else {
    stateInterestObj[account.state] = account.interest;
  }
  return stateInterestObj;
},{})

let stateInterestArray = [];
for (var key in stateInterestObj) {
  stateInterestArray.push(stateInterestObj[key]);
}

sumOfHighInterests = stateInterestArray.filter(interest => {
  return interest > 50000.00; //start from here
}).reduce((total,interest) => {
  return roundToCent(total + interest);
});


/*
  aggregate the sum of bankBalance amounts
  grouped by state
  set stateSums to be a hash table
    where the key is the two letter state abbreviation
    and the value is the sum of all amounts from that state
      the value must be rounded to the nearest cent
 */
var stateSums = {};


dataset.forEach(bankAccount => {
  if(!stateSums.hasOwnProperty(bankAccount.state)) {
    stateSums[bankAccount.state] = parseFloat(bankAccount.amount);
  } else {
    stateSums[bankAccount.state] = 
    Math.round((stateSums[bankAccount.state] + Math.round(parseFloat(bankAccount.amount)*100)/100)*100)/100;
  }
});


/*
  set lowerSumStates to an array containing
  only the two letter state abbreviation of each state 
  where the sum of amounts in the state is
    less than 1,000,000
 */
var lowerSumStates = null;

let stateTotalsObj = dataset.map(account => {
  return {
    state : account.state,
    amount : parseFloat(account.amount)
  };
}).reduce((stateAmountObj, account) => {
  if(stateAmountObj.hasOwnProperty(account.state)) {
    stateAmountObj[account.state] += account.amount;
  } else {
    stateAmountObj[account.state] = account.amount;
  }
  return stateAmountObj;
}, {});

console.log('lowerSumStates', lowerSumStates);
lowerSumStates = [];
for(var key in stateTotalsObj) {
  if(stateTotalsObj[key] < 1000000) {
    lowerSumStates.push(key);
  }
};

/*
  set higherStateSums to be the sum of 
    all amounts of every state
    where the sum of amounts in the state is
      greater than 1,000,000
 */
var higherStateSums = null;
higherStateSums = [];

for (var key in stateTotalsObj) {
  if (stateTotalsObj[key] > 1000000) {
    higherStateSums.push(stateTotalsObj[key]);
  }
}

higherStateSums = higherStateSums.reduce((total, current) => {
  return total + current;
});

/*
  set areStatesInHigherStateSum to be true if
    all of these states have a sum of account values
      greater than 2,550,000
    Wisconsin
    Illinois
    Wyoming
    Ohio
    Georgia
    Delaware
  false otherwise
 */
var areStatesInHigherStateSum = null;

/*
  Stretch Goal && Final Boss
  
  set anyStatesInHigherStateSum to be true if
    any of these states have a sum of account values
      greater than 2,550,000
    Wisconsin
    Illinois
    Wyoming
    Ohio
    Georgia
    Delaware
  false otherwise
 */
var anyStatesInHigherStateSum = null;


module.exports = {
  hundredThousandairs : hundredThousandairs,
  roundedDollar : roundedDollar,
  roundedDime : roundedDime,
  sumOfBankBalances : sumOfBankBalances,
  sumOfInterests : sumOfInterests,
  sumOfHighInterests : sumOfHighInterests,
  stateSums : stateSums,
  lowerSumStates : lowerSumStates,
  higherStateSums : higherStateSums,
  areStatesInHigherStateSum : areStatesInHigherStateSum,
  anyStatesInHigherStateSum : anyStatesInHigherStateSum
};
