// select element
const display = document.querySelector(".rolling-number-picker__display");

// set initial value
let value = 1;
display.textContent = value;

// add event listener to document
document.addEventListener("keydown", (event) => {
  if (event.keyCode === 38) {
    // up arrow
    value = value === 9 ? 1 : value + 1;
  } else if (event.keyCode === 40) {
    // down arrow
    value = value === 1 ? 9 : value - 1;
  }
  display.textContent = value;
});

// add event listener to document for mouse wheel
document.addEventListener("wheel", (event) => {
  event.preventDefault(); // prevent default scrolling behavior
  value += event.deltaY > 0 ? -1 : 1;
  value = value < 1 ? 9 : value > 9 ? 1 : value; // roll over if necessary
  display.textContent = value;
});
