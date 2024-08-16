const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.lang = 'en-US';
recognition.interimResults = true;
recognition.continuous = true;

const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');
const output = document.getElementById('output');
const errorDiv = document.getElementById('error');

recognition.onaudiostart = () => {
  output.innerText = 'Audio capturing started';
};

recognition.onresult = (event) => {
  let transcript = '';
  for (let i = event.resultIndex; i < event.results.length; i++) {
    transcript += event.results[i][0].transcript;
  }
  output.innerText = transcript;
};

recognition.onerror = (event) => {
  errorDiv.innerText = `Error: ${event.error}`;
  if (event.error === 'language-not-supported') {
    errorDiv.innerText = 'Browser is not supported. Try latest version of Chrome';
  }
};

recognition.onend = () => {
  if (startBtn.disabled) {
    recognition.start();
  } else {
    output.innerText += 'Speech recognition disconnected.';
    startBtn.disabled = false;
    stopBtn.disabled = true;
  }
};

recognition.onaudioend = () => {
  output.innerText += 'Audio capturing ended.';
};

recognition.onnomatch = () => {
  errorDiv.innerText = 'No speech was recognized.';
};

startBtn.addEventListener('click', () => {
  output.innerText = '';
  errorDiv.innerText = '';
  recognition.start();
  startBtn.disabled = true;
  stopBtn.disabled = false;
});

stopBtn.addEventListener('click', () => {
  recognition.stop();
  startBtn.disabled = false;
  stopBtn.disabled = true;
});
