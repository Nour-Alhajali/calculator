const buttonsContainerElement = document.querySelector(
  ".calculator__frame__buttons"
);
handleUserInput();
function handleUserInput() {
  let first_number = null;
  let second_number = null;
  let operator = null;

  buttonsContainerElement.addEventListener("click", onCalculatorButtonClick);

  function onCalculatorButtonClick(event) {
    let button_innerText = event.target.innerText;
    let validOperators = "+-*/";
    let validNumbers = "1234567890.";

    //null is loosely equal to undefined, kept for readablity
    if (validNumbers.includes(button_innerText)) {
      if (operator == undefined) {
        first_number =
          first_number == undefined
            ? button_innerText
            : first_number + button_innerText;
      } else {
        second_number =
          second_number == undefined
            ? button_innerText
            : second_number + button_innerText;
      }
    } else if (validOperators.includes(button_innerText)) {
      operator = button_innerText;
    } else {
      switch (button_innerText) {
        case "=":
          alert(operate(first_number, second_number, operator));
          break;
        case "c":
          resetCalculator();
          break;
        default:
          alert("invalid calculation");
          resetCalculator();
          break;
      }
    }
    console.log(first_number);
    console.log(second_number);
    console.log(operator);
  }

  function resetCalculator() {
    first_number = null;
    second_number = null;
    operator = null;
  }
}
function add(a, b) {
  a = +a;
  b = +b;

  return a + b;
}

function substract(a, b) {
  a = +a;
  b = +b;

  return a - b;
}

function multiply(a, b) {
  a = +a;
  b = +b;

  return a * b;
}

function divide(a, b) {
  a = +a;
  b = +b;

  return Math.round((a / b) * 1000) / 1000;
}

function operate(a, b, operator) {
  let result;
  switch (operator) {
    case "+":
      result = add(a, b);
      break;
    case "-":
      result = substract(a, b);
      break;
    case "*":
      result = multiply(a, b);
      break;
    case "/":
      result = divide(a, b);
      break;
    default:
      result = "Invalid Operator";
  }
  return result;
}
