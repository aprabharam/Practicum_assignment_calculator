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
    // if (num1 === "" || num2 === "") return null;
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
// let justEvaluated = false;
const MAX_LENGTH = 10;

const historyDisplay = document.getElementById("history");
const display = document.getElementById("display");

function updateDisplayValue(value) {
    display.textContent = value;
}

function appendNumber(number) {
    if (display.textContent.length >= MAX_LENGTH && !shouldResetDisplay) {
        return;
    }
    if(display.textContent === "0" || shouldResetDisplay) {
        updateDisplayValue(number);
        shouldResetDisplay = false;
        // if (justEvaluated) {
        //     // historyDisplay.textContent = "";
        //     justEvaluated = false;
        // }
        // historyDisplay.textContent = "";
    } else {
        updateDisplayValue(display.textContent + number);
    }
}

function setOperator(operator) {
    if(operatorSelected !== null) {
        evaluate();
    }
    if (display.textContent === "Error") return;

    firstNumber = display.textContent;
    operatorSelected = operator;
    historyDisplay.textContent = `${firstNumber} ${operator}`;
    shouldResetDisplay = true;
    // justEvaluated = false;
}

function evaluate() {
    console.log("evalue");
    console.log("ope", operatorSelected);
    console.log("should reset", shouldResetDisplay);
    console.log("display content in evaluate", display.textContent);
    if(operatorSelected === null || shouldResetDisplay || display.textContent === "") {
        return;
    }
    secondNumber = display.textContent;
    console.log("Second num", secondNumber);
    console.log("first num", firstNumber);

    let result = operate(operatorSelected, firstNumber, secondNumber);
    console.log("result", result);

    if (result === null) return;
    if (typeof result === "string") {
        console.log("type of is string");
        updateDisplay(result);
        operator = null;
        return;
    }

    // // round long decimals
    result = Math.round(result * 1000) / 1000;
    console.log("rounded number", result)

    historyDisplay.textContent = `${firstNumber} ${operatorSelected} ${secondNumber} =`;
    updateDisplayValue(result);
    firstNumber = result;
    operatorSelected = null;
    shouldResetDisplay = true;
    // justEvaluated = true;
    // historyDisplay.textContent = "";
}

function clearDisplay() {
    console.log("clear display");
    updateDisplayValue("0");
    historyDisplay.textContent = "";
    firstNumber = "";
    secondNumber = "";
    operatorSelected = null;
    shouldResetDisplay = false;
    // justEvaluated = false;
}

function backspace() {
    console.log("backspace ccall");
    if (shouldResetDisplay) return;
    let currentValue = display.textContent;
    currentValue.length === 1 ? updateDisplayValue("0") : updateDisplayValue(currentValue.slice(0, -1));
}

function handleDecimal() {
    console.log("inside add decimal")
    if (shouldResetDisplay) {
        updateDisplayValue("0.");
        shouldResetDisplay = false;
        return;
    }

    if (!display.textContent.includes(".")) {
        updateDisplayValue(display.textContent + ".");
    }
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
document.getElementById("decimal").addEventListener("click", handleDecimal);

// window.addEventListener("keydown", (e) => {
//     if (!isNaN(e.key)) appendNumber(e.key);
//     // if (e.key === ".") handleDecimal();
//     if (["+", "-", "*", "/"].includes(e.key)) setOperator(e.key);
//     if (e.key === "Enter") evaluate();
//     if (e.key === "Backspace") backspace();
//     if (e.key === "Escape") clearDisplay();
// });