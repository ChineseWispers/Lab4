Array.from(document.getElementsByTagName("button")).forEach(element => {
  element.setAttribute("onclick", "buttonClick(this)")
}) // add onclick attribute to all buttons

function buttonClick(element) {
  switch (element.className) {
    case "operator":
      checkPreviousOperator(element.innerHTML)
      break
    case "input":
      addToDisplay(element.innerHTML)
      break
    case "clear":
      document.getElementById("display").innerHTML = ""
      break
    case "delete":
      document.getElementById("display").innerHTML = currentInput().slice(0, -1)
      break
    case "equals":
      document.getElementById("display").innerHTML = calculate()
  }
}

function currentInput() {
  return document.getElementById("display").innerHTML
}

function addToDisplay(digit) {
  document.getElementById("display").innerHTML = currentInput().concat(digit)
}

function add(x, y) {
  return +x + +y;
}

function subtract(x, y) {
  return x - y;
}

function multiply(x, y) {
  return x * y;
}

function divide(x, y) {
  return x / y;
}

/* Below are functions to calculate and process input.
They became more complicated as I wanted the calculator to be able to:
 1. process negative numbers 
 2. handle multiple operator input
 3. enable continuous calculations */

function checkPreviousOperator(newInput) {
  switch (indexOfOperator(currentInput())) { // operation depends on where the first math operator lies in string
    
    case currentInput().length - 1: // if math operator is at end of string
      if (newInput !== '-') { // if not negative number input
        document.getElementById("display").innerHTML = currentInput().slice(0, -1) // replace math operator
      }
    case -1: // if no math operator found
      addToDisplay(newInput);
      break;

    default: // otherwise, calculate result 

      // enable negative number input
      if (currentInput().slice(-1) === "-") { 
        document.getElementById("display").innerHTML = currentInput().slice(0, -1)
        checkPreviousOperator(newInput)

      } else { // otherwise, calculate result
        document.getElementById("display").innerHTML = calculate()
        addToDisplay(newInput);
      }
  }
}

function calculate() {
  let firstNum = currentInput().slice(0, indexOfOperator(currentInput()));
  let operator = currentInput().slice(indexOfOperator(currentInput()), indexOfOperator(currentInput()) + 1);
  let secondNum = currentInput().slice(indexOfOperator(currentInput()) + 1);
  switch (operator) {
    case "+":
      return add(firstNum, secondNum);
      break;
    case "-":
      return subtract(firstNum, secondNum);
      break;
    case "*":
      return multiply(firstNum, secondNum);
      break;
    case "/":
      return divide(firstNum, secondNum);
      break;
  }
}

function indexOfOperator(input) {
  index = input.search(/[^0-9.]/)
  if (input.slice(0, 1) === "-") { // enable negative number input by disregarding "-" in 1st position
    return input.slice(1).search(/[^0-9.]/) + 1
  } else {
    return index
  }
}
