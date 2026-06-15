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

  if (operator && previousInput) {
    display.textContent =
      previousInput + " " + operator + (currentInput ? " " + currentInput : "");
  } else {
    display.textContent = currentInput || previousInput || "0";
  }
});

document.addEventListener("keydown", (e) => {
  const map = {
    0: "0",
    1: "1",
    2: "2",
    3: "3",
    4: "4",
    5: "5",
    6: "6",
    7: "7",
    8: "8",
    9: "9",
    "+": "+",
    "-": "-",
    "*": "*",
    "/": "/",
    ".": ".",
    Enter: "=",
    Backspace: "del",
    Escape: "C",
  };
  const mapped = map[e.key];
  if (!mapped) return;
  document.querySelector(`[data-value="${mapped}"]`).click();
});
