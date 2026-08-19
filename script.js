
const display = document.getElementById("display");
const keys = document.querySelectorAll("button");

let currentValue = "0";  
let previousValue = ""; 
let operator = null;        

const OPERATORS = ["+", "-", "*", "/"];

function updateDisplay() {
  display.textContent = currentValue;
}

function inputDigit(digit) {
  if (digit === "." && currentValue.includes(".")) return; 
  if (currentValue === "0" && digit !== ".") {
    currentValue = digit;   
    currentValue += digit;       
  }
}


function inputOperator(nextOperator) {
  if (operator && previousValue !== "") {
    currentValue = calculate();
  }

  previousValue = currentValue;
  operator = nextOperator;
  currentValue = "0";
}

function calculate() {
  const a = parseFloat(previousValue);
  const b = parseFloat(currentValue);
  let result;

  if (operator === "+") result = a + b;
  if (operator === "-") result = a - b;
  if (operator === "*") result = a * b;
  if (operator === "/") result = b === 0 ? "Error" : a / b;

  return result.toString();
}

function inputEquals() {
  if (operator === null) return; 

  currentValue = calculate();
  operator = null;
  previousValue = "";
}

function clearAll() {
  currentValue = "0";
  previousValue = "";
  operator = null;
}

function inputPercent() {
  currentValue = (parseFloat(currentValue) / 100).toString();
}

keys.forEach((key) => {
  key.addEventListener("click", () => {
    const value = key.dataset.value;

    if (!isNaN(value) || value === ".") {
      inputDigit(value);
    } else if (OPERATORS.includes(value)) {
      inputOperator(value);
    } else if (value === "=") {
      inputEquals();
    } else if (value === "clear") {
      clearAll();
    } else if (value === "percent") {
      inputPercent();
    }

    updateDisplay();
  });
});