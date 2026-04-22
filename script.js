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

operate('+', 56, 2);
operate('-', 56, 2);
operate('/', 56, 2);
operate('*', 56, 2);