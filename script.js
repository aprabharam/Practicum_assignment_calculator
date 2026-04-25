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
    return (num2 === 0)? "Error. Math is crying right now.": num1 / num2;
}

function operate(operator, num1, num2) {
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
const MAX_LENGTH = 10;
let result = 0;

const historyDisplay = document.getElementById("history");
const display = document.getElementById("display");

function updateDisplayValue(value) {
    display.textContent = value;
    if (typeof value === "string" && value.includes("Error")) {
        display.classList.add("error");
        historyDisplay.textContent = "";
    } else {
        display.classList.remove("error");
    }
}

function appendNumber(number) {
    if (display.textContent.includes("Error")) {
        clearDisplay();
    }
    if (display.textContent.length >= MAX_LENGTH && !shouldResetDisplay) {
        return;
    }
    if(display.textContent === "0" || shouldResetDisplay) {
        updateDisplayValue(number);
        shouldResetDisplay = false;
    } else {
        updateDisplayValue(display.textContent + number);
    }
}

function clearDisplay() {
    updateDisplayValue("0");
    historyDisplay.textContent = "";
    firstNumber = "";
    secondNumber = "";
    operatorSelected = null;
    shouldResetDisplay = false;
}


function setOperator(operator) {
    if (display.textContent.includes("Error")) return;
    if(operatorSelected !== null) {
        evaluate();
    }

    firstNumber = display.textContent;
    operatorSelected = operator;
    historyDisplay.textContent = `${firstNumber} ${operator}`;
    shouldResetDisplay = true;
}

function evaluate() {
    if (display.textContent.includes("Error")) return;
    if(operatorSelected === null || shouldResetDisplay || display.textContent === "") {
        return;
    }

    secondNumber = display.textContent;
    result = operate(operatorSelected, firstNumber, secondNumber);

    if (result === null) return;
    if (typeof result === "string") {
        updateDisplayValue(result);
        operatorSelected = null;
        return;
    }

    result = Math.round(result * 1000) / 1000;

    historyDisplay.textContent = `${firstNumber} ${operatorSelected} ${secondNumber} =`;
    updateDisplayValue(result);
    firstNumber = result;
    operatorSelected = null;
    shouldResetDisplay = true;
}



function backspace() {
    if (shouldResetDisplay) return;
    let currentValue = display.textContent;
    currentValue.length === 1 ? updateDisplayValue("0") : updateDisplayValue(currentValue.slice(0, -1));
}

function handleDecimal() {
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

window.addEventListener("keydown", (e) => {
    if (e.key === "Backspace") {
        e.preventDefault();
        backspace();
    }
    if (e.key === "c" || e.key === "C") {
        e.preventDefault();
        clearDisplay();
    }
    if (!isNaN(e.key)) appendNumber(e.key);
    if (e.key === ".") handleDecimal();
    if (["+", "-", "*", "/"].includes(e.key)) setOperator(e.key); 
    if (e.key === "Enter") {
        e.preventDefault();
        evaluate();
    }
});
