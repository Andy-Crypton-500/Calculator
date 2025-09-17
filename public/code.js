function updateDisplay(value) {
  const space = document.getElementById("number");
  space.innerText += value; // Append clicked value to display
}

function clearDisplay() {
  const space = document.getElementById("number");
  space.innerText = ""; // Clear the display
}

function calculate() {
  const space = document.getElementById("number");
  let expression = space.innerText;

  // Replace displayed operators with JS operators
  expression = expression.replace(/×/g, "*").replace(/÷/g, "/");

  // Match exactly: number, operator, number (e.g. 12+3)
  const match = expression.match(
    /^(-?\d+(?:\.\d+)?)([+\-*/%])(-?\d+(?:\.\d+)?)$/
  );

  if (!match) {
    space.innerText = "Error";
    return;
  }

  const num1 = parseFloat(match[1]);
  const operator = match[2];
  const num2 = parseFloat(match[3]);
  let result;

  switch (operator) {
    case "+":
      result = num1 + num2;
      break;
    case "-":
      result = num1 - num2;
      break;
    case "*":
      result = num1 * num2;
      break;
    case "/":
      result = num2 === 0 ? "Error" : num1 / num2;
      break;
    case "%":
      result = num2 === 0 ? "Error" : num1 % num2;
      break;
    default:
      result = "Error";
  }

  space.innerText = result;
}
document.addEventListener("keydown", function (event) {
  const key = event.key;
  const space = document.getElementById("number"); // Add this near the top

  const value = space.innerText.trim();

  if (key === "+" && value !== "") {
    space.innerText += "+";
  } else if (key === "+" && value === "") {
    alert("Please enter a number first");
  } else if (key === "-" && value !== "") {
    space.innerText += "-";
  } else if (key === "-" && value === "") {
    alert("Please enter a number first");
  } else if (key === "*" && value !== "") {
    space.innerText += "×";
  } else if (key === "*" && value === "") {
    alert("Please enter a number first");
  } else if (key === "/" && value !== "") {
    space.innerText += "÷";
  } else if (key === "/" && value === "") {
    alert("Please enter a number first");
  } else if (key === "^" && value !== "") {
    power(); // call your power function here
  } else if (key === "^" && value === "") {
    alert("Please enter a number first");
  } else if (key === "%" && value !== "") {
    space.innerText += "%";
  } else if (key === "%" && value === "") {
    alert("Please enter a number first");
  } else if (key === "Backspace") {
    space.innerText = space.innerText.slice(0, space.innerText.length - 1);
  } else if (key === "Enter") {
    calculate(); // call your calculate function here
  } else if (event.key === "1") {
    space.innerText += "1";
  } else if (event.key === "2") {
    space.innerText += "2";
  } else if (event.key === "3") {
    space.innerText += "3";
  } else if (event.key === "4") {
    space.innerText += "4";
  } else if (event.key === "5") {
    space.innerText += "5";
  } else if (event.key === "6") {
    space.innerText += "6";
  } else if (event.key === "7") {
    space.innerText += "7";
  } else if (event.key === "8") {
    space.innerText += "8";
  } else if (event.key === "9") {
    space.innerText += "9";
  } else if (event.key === "0") {
    space.innerText += "0";
  }
});

function graph() {
  window.open("graph.html");
}

// Add event listener to equal button after DOM loaded
document.addEventListener("DOMContentLoaded", () => {
  const equalButton = document.getElementsByClassName("equal")[0];
  if (equalButton) {
    equalButton.addEventListener("click", calculate);
  } else {
    console.error("Equal button not found");
  }
});

document.getElementsByClassName("power", function () {
  const value = space.innerText.trim();
  if (value === "") {
    alert("Please enter a number first");
  }
});

function power() {
  const newDiv = document.createElement("div");
  newDiv.style.display = "inline-block"; // inline-block keeps it inline but box-like
  newDiv.style.width = "25px"; // fixed width for box shape
  newDiv.style.height = "25px"; // fixed height for box shape
  newDiv.style.lineHeight = "25px"; // center text vertically
  newDiv.style.textAlign = "center"; // center text horizontally
  newDiv.style.border = "2px solid black"; // visible border
  newDiv.style.backgroundColor = "#ccc"; // light background so box stands out
  newDiv.style.color = "black"; // text color
  newDiv.style.borderRadius = "5px"; // rounded corners (optional)
  newDiv.style.marginLeft = "10px";
  newDiv.style.marginRight = "5px";
  newDiv.style.marginBottom = "40px";
  newDiv.style.fontWeight = "bold";
  newDiv.style.fontFamily = "monospace";
  newDiv.style.cursor = "pointer";

  const numberDisplay = document.getElementById("number");
  numberDisplay.appendChild(newDiv);

  let flickerInterval;
  newDiv.addEventListener("click", function () {
    let flickerOn = false;
    const flickerInterval = setInterval(() => {
      newDiv.style.backgroundColor = flickerOn
        ? "#808080"
        : "rgb(226, 219, 219)";
      flickerOn = !flickerOn;
    }, 300);
  });
  const keyListener = function (event) {
    if (event.key >= "0" && event.key <= "9") {
      clearInterval(flickerInterval);
      newDiv.innerText = event.key;
      document.removeEventListener("keydown", keyListener); // cleanup
    }
  };

  document.addEventListener("keydown", keyListener);
}
