function add(a, b) {
    if (isNaN(a)) { return b; }
    return (a + b);
}
function subtract(a, b) {
    if (isNaN(a)) { return b; }
    return (a - b);
}
function multiply(a, b) {
    if (isNaN(a)) { return b; }
    return a * b;
}
function divide(a, b) {
    if (isNaN(a)) { return b; }
    if (b === 0) {
        return "u shud noe betta";
    }
    return a / b;
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
        default:
            return num2;
    }
}

let results = document.querySelector(".result");
let userentry = document.querySelector(".userentry");

let scrapArr = [];
let number1 = NaN;
let number2 = NaN;
let operator = '';

const operatorsSymbol = "+-/*";
const buttons = document.querySelectorAll('button');

document.querySelector(".operator-percent").disabled = true;
document.querySelector(".operator-signed").disabled = true;


buttons.forEach(button => button.addEventListener('click', (e) => {
    //CLEAR SCREEN
    if (e.target.outerText === 'AC') {
        userentry.textContent = '';
        results.textContent = '';
        number1 = NaN;
        number2 = NaN;
        operator = '';
        scrapArr = []
    }
    
    //PRINT RESULT
    else if (e.target.outerText === '=') {
        number2 = scrapArr.join('');
        finalVal = operate(number1, number2, operator);
        results.textContent = finalVal;
    }
    //TAKING INPUT and printing
    else {
        //NOT IN USE KEYS
        // if (e.target.outerText == '-+' || e.target.outerText == '%') {
        //     console.log('not in use');
        // }        
            userentry.textContent += e.target.outerText;
            if (operatorsSymbol.includes(e.target.outerText)) {
                //pressed an operator
                number2 = scrapArr.join('');
                scrapArr = [];
                finalVal = operate(number1, number2, operator);
                results.textContent = finalVal;
                number1 = finalVal;
                operator = e.target.outerText;
            }
            else {
                scrapArr.push(e.target.outerText);
            }
        }
}));
