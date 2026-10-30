//calculate operation inside the screen and display it
function calculate() {
  const screen = document.querySelector("#calc-screen");
  stringToCalculate = screen.textContent;

  const stack = [];
  let currentNum = 0;
  let operation = "+";

  for (let i = 0; i <= stringToCalculate.length; i++) {
    const char = stringToCalculate[i];

    if (char >= "0" && char <= "9") {
      currentNum = currentNum * 10 + Number(char);
    }

    if (
      i === stringToCalculate.length ||
      char === "+" ||
      char === "-" ||
      char === "x" ||
      char === "/"
    ) {
      if (operation === "+") {
        stack.push(currentNum);
      } else if (operation === "-") {
        stack.push(-currentNum);
      } else if (operation === "x") {
        stack.push(stack.pop() * currentNum);
      } else if (operation === "/") {
        stack.push(stack.pop() / currentNum);
      }

      operation = char;
      currentNum = 0;
    }
  }

  const res = stack.reduce((total, number) => total + number, 0);

  screen.textContent = res;
  return res;
}

//clear screen
function clear() {
  const screen = document.querySelector("#calc-screen");
  screen.textContent = "";
}

//adds operation to screen
function addOperationToScreen(operation) {
  if (operation === "=") {
    calculate();
  } else {
    const screen = document.querySelector("#calc-screen");
    screen.textContent += operation;
  }
}

//adds number to screen
function addNumToScreen(num) {
  const screen = document.querySelector("#calc-screen");
  screen.textContent += num;
}

const clearButton = document.querySelector("#clear");
clearButton.addEventListener("click", (event) => {
  clear();
});

const numButtons = document.querySelectorAll(".numbers");

numButtons.forEach((numButton) => {
  numButton.addEventListener("click", (event) => {
    addNumToScreen(event.target.textContent);
  });
});

const operationButtons = document.querySelectorAll(".operations");

operationButtons.forEach((operationButton) => {
  operationButton.addEventListener("click", (event) => {
    addOperationToScreen(event.target.textContent);
  });
});
