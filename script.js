function addNumbers(num1, num2) {
    console.log("add", num1 + num2);
    return num1 + num2;
}

function subtractNumbers(num1, num2) {
    console.log("sub", num1 - num2);
    return num1 - num2;
}

function multiplyNumbers(num1, num2) {
    console.log("multiply", num1 * num2);
    return num1 * num2;
}

function divideNumbers(num1, num2) {
    console.log("divide", num1 / num2);
    return (num2 === 0)? "Invalid. Division by 0 is not valid": num1 / num2;
}

function operate(operator, num1, num2) {
    //todo- check number 
    num1 = Number(num1);
    num2 = Number(num2);

    switch(operator) {
        case '+':
            return addNumbers(num1, num2);
        case '-':
            return subtractNumbers(num1, num2);
        case '*':
            return multiplyNumbers(num1, num2);
        case '/':
            return divideNumbers(num1, num2);
        default:
            return null;
    }
}

let firstNumber = "";
let secondNumber = "";
let operatorSelected = null;
let shouldResetDisplay = false;

const display = document.getElementById("display");
// console.log("display", display.textContent);

function updateDisplayValue(value) {
    display.textContent = value;
}

function appendNumber(number) {
    if(display.textContent === "0" || shouldResetDisplay) {
        updateDisplayValue(number);
        shouldResetDisplay = false;
        console.log("display1", display.textContent);
    } else {
        updateDisplayValue(display.textContent + number);
        console.log("display2", display.textContent);
    }
}

function setOperator(operator) {
    if(operatorSelected !== null) {
        evaluate();
    }

    firstNumber = display.textContent;
    operatorSelected = operator;
    shouldResetDisplay = true;
    console.log("first number, op", display.textContent, operator);
}

function evaluate() {
    if(operatorSelected === null || shouldResetDisplay) {
        return;
    }
    secondNumber = display.textContent;
    console.log("second number", secondNumber);

    let result = operate(operatorSelected, firstNumber, secondNumber);
    console.log("result", result);

    //     // handle divide by zero message
    // if (typeof result === "string") {
    //     updateDisplay(result);
    //     operator = null;
    //     return;
    // }

    // // round long decimals
    // result = Math.round(result * 1000) / 1000;

    updateDisplayValue(result);
    firstNumber = result;
    operatorSelected = null;
}

function clearDisplay() {
    updateDisplayValue("0");
    firstNumber = "";
    secondNumber = "";
    operatorSelected = null;
    shouldResetDisplay = false;
}

function backspace() {
    if (shouldResetDisplay) return;
    let currentValue = display.textContent;
    console.log("in backspace", currentValue);
    currentValue.length === 1 ? updateDisplayValue("0") : updateDisplayValue(currentValue.slice(0, -1));

    // if (currentValue.length === 1) {
    //     updateDisplayValue("0");
    // } else {
    //     updateDisplayValue(currentValue.slice(0, -1));
    // }
}

document.querySelectorAll(".number").forEach(button => {
    button.addEventListener("click", () => appendNumber(button.textContent));
});

document.querySelectorAll(".operator").forEach(button => {
    button.addEventListener("click", () => setOperator(button.textContent));
});
document.getElementById("equals").addEventListener("click", evaluate);
document.querySelector(".clear").addEventListener("click", clearDisplay);
document.querySelector(".backspace").addEventListener("click", backspace);