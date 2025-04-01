const buttonsContainerElement = document.querySelector(
  ".calculator__frame__buttons"
);

const ScreenTextDisplayElement = document.querySelector(
  ".calculator__frame__screen__text-display"
);

const ScreenErrorDisplayElement = document.querySelector(
  ".calculator__frame__screen__error-display"
);

//Prevent default element(buttons) dragging

preventDefaultDragBehaviour();
handleUserInput();

function handleUserInput() {
  let first_number = null;
  let second_number = null;
  let operator = null;

  buttonsContainerElement.addEventListener(
    "mousedown",
    onCalculatorButtonClick
  );

  function onCalculatorButtonClick(event) {
    ScreenErrorDisplayElement.innerText = "";

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
      //If not a number nor an operator:
    } else {
      switch (button_innerText) {
        case "=":
          perforCalculation(first_number, second_number, operator);
          break;
        case "C":
          performReset();
          break;
        case "B":
          performBackSpace();
          break;
        default:
          performReset();
          break;
      }
    }
    editScreenTextDisplay(first_number, second_number, operator);
  }

  function perforCalculation(first, second, op) {
    first_number = operate(first, second, op);
    second_number = null;
    operator = null;
  }
  function performBackSpace() {
    if (second_number != null) {
      if (second_number.length <= 1) second_number = null;
      else second_number = second_number.slice(0, -1);
    } else if (operator != null) operator = null;
    else if (first_number != null) {
      if (first_number.length <= 1) first_number = null;
      else {
        console.log(typeof first_number);
        first_number = first_number.slice(0, -1);
      }
    } else {
      performReset();
    }
  }

  function performReset() {
    first_number = null;
    second_number = null;
    operator = null;
  }

  function editScreenTextDisplay(first_number, second_number, operator) {
    first_number = first_number == null ? "" : first_number;
    second_number = second_number == null ? "" : second_number;
    operator = operator == null ? "" : operator;

    ScreenTextDisplayElement.innerText =
      first_number + operator + second_number;
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
  //If operating on a single number, return it

  if (!validateCalculation(a, b, operator)) {
    ScreenErrorDisplayElement.innerText = "Invalid Calculation";
    if (a != null) return a;
    else return "";
  }
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
  //We expect a string to deal with, not a number
  return String(result);

  function validateCalculation(first_number, second_number, operator) {
    if (first_number == null || second_number == null || operator == null) {
      return false;
    }
    return true;
  }
}

function preventDefaultDragBehaviour() {
  document.addEventListener("drag", (e) => e.preventDefault());
}
