// All valid credit card numbers
const valid1 = [4, 5, 3, 9, 6, 7, 7, 9, 0, 8, 0, 1, 6, 8, 0, 8]
const valid2 = [5, 5, 3, 5, 7, 6, 6, 7, 6, 8, 7, 5, 1, 4, 3, 9]
const valid3 = [3, 7, 1, 6, 1, 2, 0, 1, 9, 9, 8, 5, 2, 3, 6]
const valid4 = [6, 0, 1, 1, 1, 4, 4, 3, 4, 0, 6, 8, 2, 9, 0, 5]
const valid5 = [4, 5, 3, 9, 4, 0, 4, 9, 6, 7, 8, 6, 9, 6, 6, 6]

// All invalid credit card numbers
const invalid1 = [4, 5, 3, 2, 7, 7, 8, 7, 7, 1, 0, 9, 1, 7, 9, 5]
const invalid2 = [5, 7, 9, 5, 5, 9, 3, 3, 9, 2, 1, 3, 4, 6, 4, 3]
const invalid3 = [3, 7, 5, 7, 9, 6, 0, 8, 4, 4, 5, 9, 9, 1, 4]
const invalid4 = [6, 0, 1, 1, 1, 2, 7, 9, 6, 1, 7, 7, 7, 9, 3, 5]
const invalid5 = [5, 3, 8, 2, 0, 1, 9, 7, 7, 2, 8, 8, 3, 8, 5, 4]

// Can be either valid or invalid
const mystery1 = [3, 4, 4, 8, 0, 1, 9, 6, 8, 3, 0, 5, 4, 1, 4]
const mystery2 = [5, 4, 6, 6, 1, 0, 0, 8, 6, 1, 6, 2, 0, 2, 3, 9]
const mystery3 = [6, 0, 1, 1, 3, 7, 7, 0, 2, 0, 9, 6, 2, 6, 5, 6, 2, 0, 3]
const mystery4 = [4, 9, 2, 9, 8, 7, 7, 1, 6, 9, 2, 1, 7, 0, 9, 3]
const mystery5 = [4, 9, 1, 3, 5, 4, 0, 4, 6, 3, 0, 7, 2, 5, 2, 3]

// An array of all the arrays above
const batch = [valid1, valid2, valid3, valid4, valid5, invalid1, invalid2, invalid3, invalid4, invalid5, mystery1, mystery2, mystery3, mystery4, mystery5]


// Add your functions below:

//function to validate whether card are valid or not
const validateCreditCard = (numToCheck) => {
    //reverse the array and store in reverseNum array
    let reverseNum=[];
    for (num of numToCheck) {
        reverseNum.unshift(num);
    };
    
    //checker is storing the total for the calculation
    let checker = 0;
    
    //cycle through the digits
    for (let i = 0; i < reverseNum.length; i= i+1) {
        let current = reverseNum[i];
        if (i % 2 > 0){ current *=2;  //every other digit X2
            if (current > 9) {current=current-9};    // if about 9 then subtract 9
        };
        checker= checker + current;  //add the new amount to the total
    };
    return (checker % 10 === 0) ?  true :  false; //check if multiple of 10. returns appropriate Boolean
   
}

// Test functions:
console.log(validateCreditCard(valid1)); // Should print true
console.log(validateCreditCard(invalid1)); // Should print false

//Takes an array of cardnumbers and returns only those that are not valid in an array
function findInvalidCards(cardArray) {
    let badCards = []  //creates an empty array to store badcardnumbers

    //cycle through taking one Credit card number at a time
    for (creditCard of cardArray) {

        if (!validateCreditCard(creditCard)) {
            badCards.push(creditCard)  //if not a valid card then add to array of bad cards
        }
    }
    //return the array of badcards back
    return badCards
}

// Test function
console.log(findInvalidCards([valid1, valid2, valid3, valid4, valid5]));// Shouldn't print anything
console.log(findInvalidCards([invalid1, invalid2, invalid3, invalid4, invalid5])); // Should print all of the numbers

console.log(findInvalidCards(batch)); // Test what the mystery numbers are

//checks which card companies have produced bad cards. Takes an array of bad cards and then returns an array of companies that issues them

function invalidCardComps(invalids) {
    //set flags for whether each company has had one or more invalid cards. Set as false.
    let visa = false
    let mcard = false
    let discover = false
    let amex = false
    let other = false

    //cycle through the cards provided and check the first digit of each one. Then set flag to true for the correct provider
    for (cardNums of invalids) {

        switch (cardNums[0]) {  //checking first digit to identify provider
            case 3:
                amex = true
                break
            case 4:
                visa = true
                break
            case 5:
                mcard = true
                break
            case 6:
                discover = true
                break
            default:
                other = true   //if not recognised provider
        };


    }
    //console.log(`amex:${amex} visa:${visa} Mastercard:${mcard} Discovery: ${discover} Other: ${other}`);
    
    

    //create an array to store list of bad companies
    let badComps = []

    //check flags and set to true with get added to the array
    if (amex) { badComps.push("American Express")} ;
    if (visa) { badComps.push("Visa")} ;
    if (mcard) { badComps.push("Mastercard")} ;
    if (discover) { badComps.push("Discover Card")} ;
    if (other) { badComps.push("Company not found")} ;

    //return the array containing bad companies
    return badComps

}

function makeArray(stringToCard) {
    let cardArray = Array.from(stringToCard);
    for (let i= 0; i < cardArray.length; i++) {
        cardArray[i]=parseInt(cardArray[i]);
    }
    return cardArray;
}





// run the findinvalid cards and then feed into check the companies
console.log(invalidCardComps([invalid1])); // Should print['visa']
console.log(invalidCardComps([invalid2])); // Should print ['mastercard']
console.log(invalidCardComps(findInvalidCards(batch)));

console.log(makeArray(("345611")))
console.log(validateCreditCard([makeArray("345612341234")])); // Should print[false]