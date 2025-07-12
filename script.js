// Select elements
const display = document.getElementById('display');
const startBtn = document.getElementById('start');
const pauseBtn = document.getElementById('pause');
const resetBtn = document.getElementById('reset');
const lapBtn = document.getElementById('lap');
const lapsList = document.getElementById('laps');

// Stopwatch state
let startTime = 0;
let elapsedTime = 0;
let timerInterval = null;
let isRunning = false;

// Helper to format time
function formatTime(time) {
  const ms = Math.floor((time % 1000) / 10).toString().padStart(2, '0');
  const secs = Math.floor((time / 1000) % 60).toString().padStart(2, '0');
  const mins = Math.floor((time / 60000) % 60).toString().padStart(2, '0');
  const hrs = Math.floor(time / 3600000).toString().padStart(2, '0');
  return `${hrs}:${mins}:${secs}.${ms}`;
}

// Start
function startTimer() {
  if (isRunning) return;
  isRunning = true;
  startTime = Date.now() - elapsedTime;
  timerInterval = setInterval(() => {
    elapsedTime = Date.now() - startTime;
    display.textContent = formatTime(elapsedTime);
  }, 10);
}

// Pause
function pauseTimer() {
  if (!isRunning) return;
  isRunning = false;
  clearInterval(timerInterval);
}

// Reset
function resetTimer() {
  isRunning = false;
  clearInterval(timerInterval);
  elapsedTime = 0;
  display.textContent = "00:00:00.00";
  lapsList.innerHTML = "";
}

// Lap
function recordLap() {
  if (!isRunning) return;
  const li = document.createElement('li');
  li.textContent = formatTime(elapsedTime);
  lapsList.appendChild(li);
}

// Add event listeners
startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetTimer);
lapBtn.addEventListener('click', recordLap);
