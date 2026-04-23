function addNumbers(num1, num2) {
    return num1 + num2;
}

function subtractNumbers(num1, num2) {
    return num1 - num2;
}

function multiplyNumbers(num1, num2) {
    return num1 * num2;
}

function divideNumbers(num1, num2) {
    return (num2 === 0)? "Error. Division by 0 is not valid": num1 / num2;
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
const historyDisplay = document.getElementById("history");

const display = document.getElementById("display");

function updateDisplayValue(value) {
    display.textContent = value;
}

function appendNumber(number) {
    if(display.textContent === "0" || shouldResetDisplay) {
        updateDisplayValue(number);
        shouldResetDisplay = false;
    } else {
        updateDisplayValue(display.textContent + number);
    }
}

function setOperator(operator) {
    if(operatorSelected !== null) {
        evaluate();
    }

    firstNumber = display.textContent;
    operatorSelected = operator;
    historyDisplay.textContent = `${firstNumber} ${operator}`;
    shouldResetDisplay = true;
}

function evaluate() {
    if(operatorSelected === null || shouldResetDisplay) {
        return;
    }
    secondNumber = display.textContent;

    let result = operate(operatorSelected, firstNumber, secondNumber);

    if (typeof result === "string") {
        updateDisplay(result);
        operator = null;
        return;
    }

    // // round long decimals
    // result = Math.round(result * 1000) / 1000;

    historyDisplay.textContent = `${firstNumber} ${operatorSelected} ${secondNumber} =`;
    updateDisplayValue(result);
    firstNumber = result;
    operatorSelected = null;
}

function clearDisplay() {
    updateDisplayValue("0");
    historyDisplay.textContent = "";
    firstNumber = "";
    secondNumber = "";
    operatorSelected = null;
    shouldResetDisplay = false;
}

function backspace() {
    if (shouldResetDisplay) return;
    let currentValue = display.textContent;
    currentValue.length === 1 ? updateDisplayValue("0") : updateDisplayValue(currentValue.slice(0, -1));
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

window.addEventListener("keydown", (e) => {
    if (!isNaN(e.key)) appendNumber(e.key);
    if (e.key === ".") addDecimal();
    if (["+", "-", "*", "/"].includes(e.key)) setOperator(e.key);
    if (e.key === "Enter") evaluate();
    if (e.key === "Backspace") backspace();
    if (e.key === "Escape") clearDisplay();
});