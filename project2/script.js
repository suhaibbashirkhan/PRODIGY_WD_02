let startTime;
let elapsedTime = 0;
let timerInterval;
let isRunning = false;

const display = document.getElementById('display');
const startStopBtn = document.getElementById('start-stop-btn');
const resetBtn = document.getElementById('reset-btn');
const lapBtn = document.getElementById('lap-btn');
const lapsList = document.getElementById('laps');

function updateDisplay(time) {
    const milliseconds = parseInt((time % 1000), 10);
    const seconds = parseInt((time / 1000) % 60, 10);
    const minutes = parseInt((time / (1000 * 60)) % 60, 10);
    const hours = parseInt((time / (1000 * 60 * 60)) % 24, 10);

    display.innerHTML = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}.${String(milliseconds).padStart(3, '0')}`;
}

function startStopwatch() {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(() => {
        elapsedTime = Date.now() - startTime;
        updateDisplay(elapsedTime);
    }, 10);
    startStopBtn.textContent = 'Stop';
    resetBtn.disabled = false;
    lapBtn.disabled = false;
    isRunning = true;
}

function stopStopwatch() {
    clearInterval(timerInterval);
    startStopBtn.textContent = 'Start';
    isRunning = false;
}

function resetStopwatch() {
    clearInterval(timerInterval);
    elapsedTime = 0;
    updateDisplay(0);
    startStopBtn.textContent = 'Start';
    resetBtn.disabled = true;
    lapBtn.disabled = true;
    lapsList.innerHTML = '';
    isRunning = false;
}

function recordLap() {
    const lapTime = elapsedTime;
    const lapItem = document.createElement('li');
    lapItem.textContent = display.textContent;
    lapsList.appendChild(lapItem);
}

startStopBtn.addEventListener('click', () => {
    if (isRunning) {
        stopStopwatch();
    } else {
        startStopwatch();
    }
});

resetBtn.addEventListener('click', resetStopwatch);
lapBtn.addEventListener('click', recordLap);

updateDisplay(0);
