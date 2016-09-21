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

var stateInterestSums = {};

var stateInterest = dataset.filter(bankAccount => {
  return bankAccount.state !== 'WI' &&
  bankAccount.state !== 'IL' &&
  bankAccount.state !== 'WY' &&
  bankAccount.state !== 'OH' &&
  bankAccount.state !== 'GA' &&
  bankAccount.state !== 'DE'
}).map(bankAccount => {
  return {
    interest: Math.round(parseFloat(bankAccount.amount)*18.9)/100,
    state: bankAccount.state
  }
});

stateInterest.forEach(bankAccount => {
  if(!stateInterestSums.hasOwnProperty(bankAccount.state)) {
    stateInterestSums[bankAccount.state] = bankAccount.interest;
  } else {
    stateInterestSums[bankAccount.state] += bankAccount.interest;
  }
});

var interestArr = Object.keys(stateInterestSums).map(key => {
  return stateInterestSums[key];
});

var sumOfHighInterests = interestArr.filter(interestRates => { 
  return interestRates > 50000.00;
}).reduce((prev, curr) => {
  return prev + curr;
})


/*
  aggregate the sum of bankBalance amounts
  grouped by state
  set stateSums to be a hash table
    where the key is the two letter state abbreviation
    and the value is the sum of all amounts from that state
      the value must be rounded to the nearest cent
 */
var stateSums = null;

bankBalanceByStateArray = {}

dataset.forEach(bankAccount => {
  if(!bankBalanceByStateArray.hasOwnProperty(bankAccount.state)) {
    bankBalanceByStateArray[bankAccount.state] = parseFloat(bankAccount.amount);
  } else {
    bankBalanceByStateArray[bankAccount.state] = 
    Math.round((bankBalanceByStateArray[bankAccount.state] + Math.round(parseFloat(bankAccount.amount)*100)/100)*100)/100;
  }
});

stateSums = bankBalanceByStateArray

/*
  set lowerSumStates to an array containing
  only the two letter state abbreviation of each state 
  where the sum of amounts in the state is
    less than 1,000,000
 */
var lowerSumStates = null;

/*
  set higherStateSums to be the sum of 
    all amounts of every state
    where the sum of amounts in the state is
      greater than 1,000,000
 */
var higherStateSums = null;

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
