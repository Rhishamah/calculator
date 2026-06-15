let currentInput = "";
let previousInput = "";
let operator = "";

const display = document.getElementById("display");

document.getElementById("buttons").addEventListener("click", (e) => {
  const value = e.target.dataset.value;
  if (!value) return;

  if (value === "C") {
    currentInput = "";
    previousInput = "";
    operator = "";
  } else if (value === "del") {
    currentInput = currentInput.slice(0, -1);
  } else if (["+", "-", "*", "/"].includes(value)) {
    if (currentInput === "") return; // guard: no operator without a number first
    operator = value;
    previousInput = currentInput;
    currentInput = "";
  } else if (value === "=") {
    if (previousInput === "" || currentInput === "") return;
    const prev = parseFloat(previousInput);
    const curr = parseFloat(currentInput);

    let result;
    if (operator === "+") result = prev + curr;
    else if (operator === "-") result = prev - curr;
    else if (operator === "*") result = prev * curr;
    else if (operator === "/") {
      if (curr === 0) {
        display.textContent = "Error";
        currentInput = "";
        previousInput = "";
        operator = "";
        return;
      }
      result = prev / curr;
    }

    currentInput = String(result);
    previousInput = "";
    operator = "";
  } else {
    if (value === "." && currentInput.includes(".")) return;
    currentInput += value;
  }

  display.textContent = currentInput || previousInput || "0";
});
