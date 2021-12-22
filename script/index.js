function add(a, b) {
    return (a + b);
}
function subtract(a, b) {
    return (a - b);
}
function multiply(a, b) {
    return a * b;
}
function divide(a, b) {
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
    }
}

let results = document.querySelector(".result");
let backspace = document.querySelector(".operator-backspace");

let scrapArr = [];
let number1 = '';
let number2 = '';
let operator = '';
let prevButtonisOperator = false;
let finalVal = '';

let previousButtonPressed = '';


const operatorsSymbol = "+-/*="; //operator symbols to check
const buttons = document.querySelectorAll('button');


//DISABLED BUTTONS
document.querySelector(".operator-signed").disabled = true;

//MAIN LISTENER FUNCTION
buttons.forEach(button => button.addEventListener('click', (e) => {
    //CLEAR SCREEN
    if (e.target.outerText === 'AC') {
        results.textContent = '';
        number1 = '';
        number2 = '';
        operator = '';
        scrapArr = []
        prevButtonisOperator = false;
        return;
    }

    //clear previous entry
    if (e.target.outerText === 'C' && scrapArr.length > 0 && prevButtonisOperator == false) {
        scrapArr.pop();
        results.textContent = scrapArr.join('');
    }
    else if (e.target.outerText === 'C' && scrapArr.length == 0 && prevButtonisOperator == false) {
        return; //do nothing
    }

    else if (e.target.outerText === 'C' && prevButtonisOperator == true) {
        operator = '';
        results.textContent = results.textContent.substring(0, results.textContent.length - 1);
        console.log("delete operator", `operator: ${results.textContent}`);
        prevButtonisOperator = false;
        return;
    }


    else {
        //operator entered +-/*=
        if (operatorsSymbol.includes(e.target.outerText) && prevButtonisOperator == false) {
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
            if (e.target.outerText === "=") {
                operator = '';
            }
            else {
                operator = e.target.outerText;
                results.textContent += operator; //print operator to the UI
                prevButtonisOperator = true;
            }

            // console.log("inside operator", finalVal, number1, number2, operator);
        }

        else if (!operatorsSymbol.includes(e.target.outerText)) {
            scrapArr.push(e.target.outerText);
            results.textContent = scrapArr.join('');
            prevButtonisOperator = false;
            // console.log("outside operator", finalVal, number1, number2, operator);
        }
    }
}));
