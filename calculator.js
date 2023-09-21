Array.from(document.getElementsByTagName("button")).forEach(element => {
  element.setAttribute("onclick", "buttonClick(this)")
})

function buttonClick(element) {
  switch (element.className) {
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
      document.getElementById("display").innerHTML = calculate(currentInput())
  }
}

function currentInput() {
  return document.getElementById("display").innerHTML
}

function addToDisplay(digit) {
  document.getElementById("display").innerHTML = currentInput().concat(digit)
}
