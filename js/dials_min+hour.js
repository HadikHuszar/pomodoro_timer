// select elements
const minutesDisplay = document.querySelector(".rolling-timer__minutes");
const secondsDisplay = document.querySelector(".rolling-timer__seconds");

// set initial values
let minutes = 0;
let seconds = 0;
updateDisplay(minutesDisplay, minutes);
updateDisplay(secondsDisplay, seconds);

// add event listeners to minutes and seconds displays
minutesDisplay.addEventListener("wheel", (event) => {
  event.preventDefault(); // prevent default scrolling behavior
  minutes += event.deltaY > 0 ? -1 : 1;
  minutes = minutes < 0 ? 0 : minutes;
  updateDisplay(minutesDisplay, minutes);
});

secondsDisplay.addEventListener("wheel", (event) => {
  event.preventDefault(); // prevent default scrolling behavior
  seconds += event.deltaY > 0 ? -1 : 1;
  if (seconds < 0) {
    seconds = 59;
    minutes--;
  } else if (seconds > 59) {
    seconds = 0;
    minutes++;
  }
  minutes = minutes < 0 ? 0 : minutes; // don't allow negative minutes
  updateDisplay(minutesDisplay, minutes);
  updateDisplay(secondsDisplay, seconds);
});

// update display with formatted time
function updateDisplay(display, value) {
  display.textContent = padNumber(value, 2);
}

// pad number with leading zeros
function padNumber(num, size) {
  let str = num.toString();
  while (str.length < size) {
    str = "0" + str;
  }
  return str;
}
