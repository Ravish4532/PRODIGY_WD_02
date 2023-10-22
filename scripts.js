let startTime;
  let elapsedTime = 0;
  let timerInterval;
  let lapCount = 1;
  let isRunning = false;
  
  const timeElement = document.getElementById('time');
  const toggleButton = document.getElementById('toggle');
  const resetButton = document.getElementById('reset');
  const lapButton = document.getElementById('lap');
  const lapTimesElement = document.getElementById('lap-times');
  
  function updateTime() {
  const currentTime = Date.now();
  const diff = currentTime - startTime;
  const time = new Date(diff);
  
  const hours = time.getUTCHours().toString().padStart(2, '0');
  const minutes = time.getUTCMinutes().toString().padStart(2, '0');
  const seconds = time.getUTCSeconds().toString().padStart(2, '0');
  const milliseconds = Math.floor(time.getUTCMilliseconds() / 10).toString().padStart(2, '0');
  
  timeElement.textContent = `${hours}:${minutes}:${seconds}:${milliseconds}`;
  }
  
  function toggleTimer() {
  if (isRunning) {
  clearInterval(timerInterval);
  elapsedTime = Date.now() - startTime;
  toggleButton.textContent = 'Start';
 
  isRunning = false;
  } else {
  startTime = Date.now() - elapsedTime;
  timerInterval = setInterval(updateTime, 10);
  toggleButton.textContent = 'Stop';
  
  isRunning = true;
  }
  }
  
  function resetTimer() {
  clearInterval(timerInterval);
  elapsedTime = 0;
  timeElement.textContent = '00:00:00:00';
  lapCount = 1;
  lapTimesElement.innerHTML = '';
  toggleButton.textContent = 'Start';
 
  isRunning = false;
  }
  
  function recordLapTime() {
  const lapTime = timeElement.textContent;
  const lapItem = document.createElement('li');
 
  lapItem.textContent = `Lap ${lapCount}: ${lapTime}`;
  lapTimesElement.prepend(lapItem);
  lapCount++;
  }
  
  toggleButton.addEventListener('click', toggleTimer);
  resetButton.addEventListener('click', resetTimer);
  lapButton.addEventListener('click', recordLapTime);