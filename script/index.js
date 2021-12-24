function add(a, b) {
    return (a + b);
}
function subtract(a, b) {
    return (a - b);
}
function multiply(a, b) {
    return +(a * b).toFixed(6);
}
function divide(a, b) {
    if (b === 0) {
        return "u shud noe betta";
    }
    return +(a / b).toFixed(6);
}

function operate(num1, num2, operator) {
    const oper = operator;
    switch (oper) {
        case '+':
            return add(+num1, +num2);
        case '-':
            return subtract(+num1, +num2);
        case '/':
            return divide(+num1, +num2);
        case '*':
            return multiply(+num1, +num2);
    }
}


let results = document.querySelector(".result");
let backspace = document.querySelector(".operator-backspace");
const buttons = document.querySelectorAll('button');
//DISABLED BUTTONS
document.querySelector(".operator-signed").disabled = true;

let scrapArr = [];
let number1 = '';
let number2 = '';
let operator = '';
let prevButtonisOperator = false;
let finalVal = '';
let previousButtonPressed = '';

const operatorsSymbol = ['=', '+', '-', '/', '*', 'Enter'];
const allAllowedKeys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '+', '-', '/', '*', 'Backspace', 'Enter'];


function acceptNumber(key) {
    scrapArr.push(key);
    results.textContent = scrapArr.join('');
    prevButtonisOperator = false;
    previousButtonPressed = ''; //reset the previous button since user pressed a number.
}

function clearEntry(Arrlength, prevButton) {
    if (Arrlength > 0 && prevButton == false) {
        scrapArr.pop();
        results.textContent = scrapArr.join('');
    }
    else if (Arrlength == 0 && prevButton == true) {
        operator = '';
        results.textContent = results.textContent.substring(0, results.textContent.length - 1);
        prevButtonisOperator = false;
    }
    else if (Arrlength == 0 && prevButton == false) {
        return; //do nothing
    }
}

function acceptOperator(key) {
    if (number1.length == 0) { //will only happen first time
        number1 = scrapArr.join('');
    } else { //will happen always except first time
        number2 = scrapArr.join('');
    }

    scrapArr = [];

    if (number1.length !== 0 && number2.length !== 0 && operator !== '') {
        finalVal = operate(number1, number2, operator);
        results.textContent = finalVal; //printing to UI
        number1 = finalVal;
        number2 = '';
    }

    //update the operator
    if (key === "=" || key === "Enter") {
        operator = '';
        previousButtonPressed = "="; //assign previous button as =
    }
    else {
        operator = key;
        results.textContent += operator; //print operator to the UI
        prevButtonisOperator = true;
        previousButtonPressed = ''; //reset the previous button since user pressed a true operator.
    }
}

function clearScreen() {
    results.textContent = '';
    number1 = '';
    number2 = '';
    operator = '';
    scrapArr = []
    prevButtonisOperator = false;
    previousButtonPressed = '';
}


//Begin keypress selector
window.addEventListener('keydown', (e) => {
    if (!allAllowedKeys.includes(e.key)) { return; } //if the key pressed isn't in the calculator, do nothing

    //Process numbers
    if (!operatorsSymbol.includes(e.key) && e.key != 'Backspace') {
        if (e.key == "." && scrapArr.includes(".")) { return; }
        //user shouldn't enter a number following =. They can either clear screen or continue calculation entering a operator
        if (previousButtonPressed == "=") { return; }
        else { acceptNumber(e.key); }
    }

    //clear previous entry
    if (e.key == 'Backspace') {
        clearEntry(scrapArr.length, prevButtonisOperator);
    }

    //Process Operators
    if (operatorsSymbol.includes(e.key) && prevButtonisOperator == false) {
        acceptOperator(e.key);
    }
}); //end keypress selector

//BEGIN MOUSE CLICK LISTENER FUNCTION
buttons.forEach(button => button.addEventListener('click', (e) => {
    //ALL CLEAR
    if (e.target.outerText === 'AC') {
        clearScreen();
        return;
    }

    //CLEAR PREVIOUS ENTRY
    if (e.target.outerText === 'C') {
        clearEntry(scrapArr.length, prevButtonisOperator);
    }

    //Process operators
    else {
        if (operatorsSymbol.includes(e.target.outerText) && prevButtonisOperator == false) {
            acceptOperator(e.target.outerText);
        }

        //Process numbers
        else if (!operatorsSymbol.includes(e.target.outerText)) {
            if (e.target.outerText == "." && scrapArr.includes(".")) { return; }
            //user shouldn't enter a number following =. They can either clear screen or continue calculation with operator
            if (previousButtonPressed == "=") { return; }
            else { acceptNumber(e.target.outerText) };
        }
    }
})); //END MOUSE CLICK LISTENER FUNCTION