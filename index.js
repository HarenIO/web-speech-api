const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const SpeechGrammarList =
  window.SpeechGrammarList || window.webkitSpeechGrammarList;
const SpeechRecognitionEvent =
  window.SpeechRecognitionEvent || window.webkitSpeechRecognitionEvent;

const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();

recognition.lang = 'en-US';

recognition.onaudiostart = () => {
  console.log('Audio capturing started');
};

recognition.onresult = (event) => {
  console.log('Result received: ', event.results);
};

recognition.onerror = (event) => {
  console.error('Speech recognition error:', event.error);
  if (event.error === 'language-not-supported') {
    console.error('The selected language is not supported.');
  }
};

recognition.onend = () => {
  console.log('Speech recognition disconnected');
};

recognition.onaudioend = () => {
  console.log('Audio capturing ended');
};

recognition.onnomatch = () => {
  console.log('No speech was recognized');
};

recognition.start();
