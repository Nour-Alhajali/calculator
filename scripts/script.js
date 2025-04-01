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
  switch (operater) {
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
