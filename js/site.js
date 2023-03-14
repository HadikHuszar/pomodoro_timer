const progressBar = document.querySelector(".outerRing"),
  minElem = document.querySelector("#minutes"),
  secElem = document.querySelector("#seconds"),
  startStop = document.querySelector("#stsp"),
  setting = document.querySelector("#setting");

const minutesDisplay = document.querySelector(".rolling-timer__minutes");
const secondsDisplay = document.querySelector(".rolling-timer__seconds");

let progress = null;
let progressStart = 0;
let speed = 1000;
let toggleSettings = false;

const makeAudio = (path) => {
  const audioElement = new Audio(path);
  return audioElement;
};

const dingAudio = makeAudio("js/mixkit-airport-announcement-ding-1569.wav");
const backgroundAudio = makeAudio("js/7.mp3");
const bellAudio = makeAudio("js/mixkit-bike-magical-bell-591.wav");

function progressTrack(totalMinutes, totalSeconds) {
  const degTravel =
    360 / (parseInt(totalMinutes) * 60 + parseInt(totalSeconds));

  const progressEnd = parseInt(totalMinutes) * 60 + parseInt(totalSeconds);
  const secRemaining = Math.floor((progressEnd - progressStart) % 60);
  const minRemaining = Math.floor((progressEnd - progressStart) / 60);

  progressStart++;

  secElem.innerHTML = padNumber(secRemaining, 2);
  minElem.innerHTML = padNumber(minRemaining, 2);

  progressBar.style.background = `conic-gradient(
          #00aa51 ${progressStart * degTravel}deg,
          #17171a ${progressStart * degTravel}deg
          )`;

  if (progressStart == progressEnd) {
    progressBar.style.background = `conic-gradient(
                #9d0000 360deg,
                #9d0000 360deg
          )`;
    clearInterval(progress);
    startStop.innerHTML = "START";
    progress = null;
    progressStart = 0;
    bellAudio.play();

    window.setTimeout(function () {
      window.location.reload();
    }, 2000);
  }
}

function startStopProgress(minutes, seconds) {
  if (!progress) {
    progress = setInterval(() => progressTrack(minutes, seconds), speed);
  } else {
    clearInterval(progress);
    progress = null;
    progressStart = 0;
    progressBar.style.background = `conic-gradient(
                #17171a 360deg,
                #17171a 360deg
          )`;
    secElem.innerHTML = padNumber(20, 2);
    minElem.innerHTML = padNumber(0, 2);
  }
}

startStop.onclick = function (event) {
  if (startStop.innerHTML === "START") {
    let minutes = document.querySelector("#minutes").innerHTML;
    let seconds = document.querySelector("#seconds").innerHTML;
    if (!(parseInt(minutes) === 0 && parseInt(seconds) === 0)) {
      startStop.innerHTML = "RESET";
      dingAudio.play();
      backgroundAudio.play();
      startStopProgress(minutes, seconds);
    } else {
      alert("Enter the Time Value in your Timer!");
    }
  } else if (startStop.innerHTML === "RESET") {
    // reset and clear progress
    startStop.innerHTML = "START";
    startStopProgress(minutes, seconds);
    backgroundAudio.pause();
  }
};

setting.onclick = function () {
  if (!toggleSettings) {
    toggleSettings = true;
    minElem.contentEditable = true;
    minElem.style.borderBottom = `1px dashed #ffffff50`;
    secElem.contentEditable = true;
    secElem.style.borderBottom = `1px dashed #ffffff50`;
  }
};

//////////////// SCROLLING FUNCTIONALITY //////////////////

// add event listeners to minutes and seconds displays
minutesDisplay.addEventListener("wheel", (event) => {
  const stringMinutes = document.querySelector("#minutes").innerHTML;
  let minutes = parseInt(stringMinutes);

  event.preventDefault(); // prevent default scrolling behavior
  minutes += event.deltaY > 0 ? -1 : 1;
  minutes = minutes < 0 ? 0 : minutes;

  updateDisplay(minutesDisplay, minutes);
  // updateSpan(minutesDisplay, minutes); ////////////////// why doens't this work??????
});

secondsDisplay.addEventListener("wheel", (event) => {
  const stringMinutes = document.querySelector("#minutes").innerHTML;
  const stringSeconds = document.querySelector("#seconds").innerHTML;
  let seconds = parseInt(stringSeconds);
  let minutes = parseInt(stringMinutes);
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

minutesDisplay.addEventListener("keydown", (event) => {
  const stringMinutes = document.querySelector("#minutes").innerHTML;
  let minutes = parseInt(stringMinutes);
  if (event.key === "ArrowUp") {
    minutes++;
  } else if (event.key === "ArrowDown") {
    minutes--;
  }
  minutes = minutes < 0 ? 0 : minutes;
  updateDisplay(minutesDisplay, minutes);
});

secondsDisplay.addEventListener("keydown", (event) => {
  const stringMinutes = document.querySelector("#minutes").innerHTML;
  const stringSeconds = document.querySelector("#seconds").innerHTML;
  let seconds = parseInt(stringSeconds);
  let minutes = parseInt(stringMinutes);
  if (event.key === "ArrowUp") {
    seconds++;
    if (seconds > 59) {
      seconds = 0;
      minutes++;
    }
  } else if (event.key === "ArrowDown") {
    seconds--;
    if (seconds < 0) {
      seconds = 59;
      minutes--;
    }
  }
  minutes = minutes < 0 ? 0 : minutes;
  updateDisplay(minutesDisplay, minutes);
  updateDisplay(secondsDisplay, seconds);
});

// update display with formatted time
function updateDisplay(element, value) {
  element.textContent = padNumber(value, 2);
}

// pad number with leading zeros
function padNumber(num, size) {
  let str = num.toString();
  while (str.length < size) {
    str = "0" + str;
  }
  return str;
}
