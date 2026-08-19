// ---- Grab everything we need from the page ----
const display = document.getElementById("display");
const keys = document.querySelectorAll("button");

// ---- State: the calculator's "memory" of what's going on right now ----
let currentValue = "0";     // the number currently being typed
let previousValue = "";     // the number typed before an operator
let operator = null;        // which math operator is active

// A list of characters we treat as operators, used to check "is this an operator?"
const OPERATORS = ["+", "-", "*", "/"];

// ---- Redraw the screen from our state variables ----
function updateDisplay() {
  display.textContent = currentValue;
}

// ---- Add a digit or a decimal point to the number being typed ----
function inputDigit(digit) {
  if (digit === "." && currentValue.includes(".")) return; // no double decimals

  if (currentValue === "0" && digit !== ".") {
    currentValue = digit;          // replace the placeholder "0"
  } else {
    currentValue += digit;         // append to what's already there
  }
}

// ---- Handle pressing +, −, ×, or ÷ ----
function inputOperator(nextOperator) {
  if (operator && previousValue !== "") {
    // an operation is already waiting - solve it before starting a new one
    currentValue = calculate();
  }

  previousValue = currentValue;
  operator = nextOperator;
  currentValue = "0";
}

// ---- Run the actual math and return the result as a string ----
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

// ---- The "=" button: finish the calculation and reset for the next one ----
function inputEquals() {
  if (operator === null) return; // nothing to calculate yet

  currentValue = calculate();
  operator = null;
  previousValue = "";
}

// ---- Reset everything back to a blank calculator ----
function clearAll() {
  currentValue = "0";
  previousValue = "";
  operator = null;
}

// ---- Turn the current number into a percentage (kept in case you add a % button later) ----
function inputPercent() {
  currentValue = (parseFloat(currentValue) / 100).toString();
}

// ---- One click listener for every button, routed by what data-value holds ----
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