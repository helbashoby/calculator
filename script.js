let firstNumber = "";
let secondNumber = "";
let operator = "";
let shouldResetDisplay = false;

const display = document.querySelector(".display");
const numberButtons = document.querySelectorAll(".number");
const operatorButtons = document.querySelectorAll(".operator");
const equalsButton = document.querySelector(".equals");
const clearButton = document.querySelector(".clear");

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    if (b === 0) {
        return "Nice try 😄";
    }
    return a / b;
}

function operate(operator, a, b) {
    a = Number(a);
    b = Number(b);

    if (operator === "+") return add(a, b);
    if (operator === "−") return subtract(a, b);
    if (operator === "×") return multiply(a, b);
    if (operator === "÷") return divide(a, b);
}

function updateDisplay(value) {
    display.textContent = value;
}

numberButtons.forEach(button => {
    button.addEventListener("click", () => {
        const number = button.textContent;

        if (shouldResetDisplay) {
            updateDisplay(number);
            shouldResetDisplay = false;
        } else if (display.textContent === "0") {
            updateDisplay(number);
        } else {
            updateDisplay(display.textContent + number);
        }

        if (operator === "") {
            firstNumber = display.textContent;
        } else {
            secondNumber = display.textContent;
        }
    });
});

operatorButtons.forEach(button => {
    button.addEventListener("click", () => {
        const selectedOperator = button.textContent;

        if (firstNumber === "" && display.textContent !== "0") {
            firstNumber = display.textContent;
        }

        if (operator !== "" && secondNumber !== "") {
            const result = operate(operator, firstNumber, secondNumber);
            updateDisplay(result);

            firstNumber = result;
            secondNumber = "";
        }

        operator = selectedOperator;
        shouldResetDisplay = true;
    });
});

equalsButton.addEventListener("click", () => {
    if (firstNumber === "" || operator === "" || secondNumber === "") {
        return;
    }

    const result = operate(operator, firstNumber, secondNumber);

    updateDisplay(result);

    firstNumber = result;
    secondNumber = "";
    operator = "";
    shouldResetDisplay = true;
});

clearButton.addEventListener("click", () => {
    firstNumber = "";
    secondNumber = "";
    operator = "";
    shouldResetDisplay = false;
    updateDisplay("0");
});