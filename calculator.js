document.getElementsByTagName("button").forEach(element => {
  element.setAttribute("onclick", buttonClick(this))
})

function buttonClick(element) {
  if (element.className === "number") {
    addToDisplay(element.innerHTML)
  }
}

function addToDisplay(digit) {
  currentInput = document.getElementById("display").innerHTML
  document.getElementById("display").innerHTML = currentInput.concat(digit)
}