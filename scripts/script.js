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
  const input_array = [];
  let input_index = 0;

  buttonsContainerElement.addEventListener(
    "mousedown",
    onCalculatorButtonClick
  );

  function onCalculatorButtonClick(event) {
    ScreenErrorDisplayElement.innerText = "";

    let button_innerText = event.target.innerText;
    let validOperators = "+-*/%";
    let validNumbers = "1234567890.";

    //Handle inputted numbers-operators-specialCharacters
    let lastArrayItem = input_array[input_array.length - 1];
    let lastArrayInput;
    if (lastArrayItem) lastArrayInput = lastArrayItem[lastArrayItem.length - 1];
    if (validNumbers.includes(button_innerText)) {
      pushNumberToInputArray(button_innerText);
    } else if (validOperators.includes(button_innerText)) {
      //Allow input for first negative numbers
      if (button_innerText == "-") {
        if (input_array.length == 0) pushNumberToInputArray(button_innerText);
      }

      if (validNumbers.includes(lastArrayInput))
        pushOperatorToInputArray(button_innerText);
    } else {
      switch (button_innerText) {
        case "=":
          while (input_array.length > 1) performCalculation();
          break;
        case "C":
          performClear();
          break;
        case "B":
          performBackSpace();
          break;
        default:
          performClear();
          break;
      }
    }
    editScreenTextDisplay(input_array);
  }

  function performCalculation() {
    let first_number;
    let second_number;
    let operator;

    let multiply_operator_index = input_array.indexOf("*");
    let divide_operator_index = input_array.indexOf("/");
    let modulo_operator_index = input_array.indexOf("%");
    let add_operator_index = input_array.indexOf("+");
    let substract_operator_index = input_array.indexOf("-");
    const less_priority_operators = [
      add_operator_index,
      substract_operator_index,
    ];
    const priority_operators = [
      multiply_operator_index,
      divide_operator_index,
      modulo_operator_index,
    ];

    let operator_index;
    //Handle multipication, divide, modulo operators first
    if (
      multiply_operator_index != -1 ||
      divide_operator_index != -1 ||
      modulo_operator_index != -1
    ) {
      let existant_operators = priority_operators.filter((item) => item >= 0);
      let first_operator = existant_operators.reduce((minOperator, item) => {
        minOperator = item < minOperator ? item : minOperator;
        return minOperator;
      });
      operator_index = first_operator;
    }
    //Handle add and substract operators second
    else if (add_operator_index != -1 || substract_operator_index != -1) {
      //If they both exist in the calculation, get the first one
      let existant_operators = less_priority_operators.filter(
        (item) => item >= 0
      );
      let first_operator = existant_operators.reduce((minOperator, item) => {
        minOperator = item < minOperator ? item : minOperator;
        return minOperator;
      });
      operator_index = first_operator;
    } else {
      displayCalculationError();
      return;
    }
    operator = input_array[operator_index];

    //get numbers on left and right of operator
    let first_number_Index = operator_index - 1;
    first_number = input_array[first_number_Index];

    let second_number_index = operator_index + 1;
    second_number = input_array[second_number_index];

    if (first_number == "" || second_number == "") {
      displayCalculationError();
      //Delete Operator, To align with the result of using "=" on a single number and an operator
      performBackSpace();

      return;
    } else {
      let result = operate(first_number, second_number, operator);
      replaceEquationWithResult(result);
    }

    function replaceEquationWithResult(result) {
      input_array.splice(second_number_index, 1);
      input_array.splice(operator_index, 1);
      input_array.splice(first_number_Index, 1, result);
      input_index -= 2;
    }
  }

  function pushNumberToInputArray(numberAsString) {
    if (input_array[input_index] == undefined)
      input_array[input_index] = numberAsString;
    else input_array[input_index] += numberAsString;
  }
  function pushOperatorToInputArray(operatorAsString) {
    input_array.push(operatorAsString);
    input_index += 2;
  }
  function performBackSpace() {
    //Either delete item and operator if item is empty, or delete from the item if it's not
    if (
      input_array[input_index] == undefined ||
      input_array[input_index] == ""
    ) {
      if (input_array.length >= 2) {
        input_index -= 2;
        input_array.splice(input_index + 1);
      }
    } else {
      let lastUnemptyIndex = input_array.length - 1;
      let lastInputtedItem = input_array[lastUnemptyIndex];

      lastInputtedItem = lastInputtedItem.slice(0, -1);

      input_array.splice(lastUnemptyIndex, 1, lastInputtedItem);
    }
  }

  function performClear() {
    input_array.splice(0);
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

function modulate(a, b) {
  a = +a;
  b = +b;

  return a % b;
}

function operate(a, b, operator) {
  if (!validateCalculation(a, b, operator)) {
    ScreenErrorDisplayElement.innerText = "Invalid Calculation";
    //If operating on a single number, return it
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
    case "%":
      result = modulate(a, b);
      break;
    default:
      alert("Invalid Operator");
      return "";
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

//Utility Funcitons
function reverseString(str) {
  return str.split("").reverse().join("");
}

function displayCalculationError() {
  ScreenErrorDisplayElement.innerText = "Invalid Calculation";
}

function editScreenTextDisplay(input_array) {
  ScreenTextDisplayElement.innerText = input_array.join("");
}
