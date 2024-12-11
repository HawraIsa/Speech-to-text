// webkitSpeechRecognition: used to access and utilize speech recognition functionalities
// in Browsers like Chrome
//but may require a different implementation in non-WebKit browsers.

// Check if the browser supports the Web Speech API
if (!('webkitSpeechRecognition' in window)) {
    alert('Your browser does not support Speech Recognition. Please use a compatitable browser like Google Chrome.');
} else {
    // Initialize the SpeechRecognition object
    const speachRecognition = new webkitSpeechRecognition();

    // Set recognition properties
    speachRecognition.continuous = false; // capture a single word at a time
    //speachRecognition.interimResults = false; // return only final results
    speachRecognition.interimResults = true;
    speachRecognition.lang = 'en-US'; // default language is English

    // HTML elements for user interface
    const startButton = document.getElementById('start-button');
    const stopButton = document.getElementById('stop-button');
    const resultOutput = document.getElementById('result-output');
    const languageSelector = document.getElementById('language-selector');
    const statusIndicator = document.getElementById('status-indicator');

    // start recognition when user clicks the start button
    startButton.addEventListener('click', () => {
        // set language based on user selection
        const selectedLanguage = languageSelector.value;
        speachRecognition.lang = selectedLanguage;

        // start speech recognition
        speachRecognition.start();
        console.log('Speech recognition started with language:', selectedLanguage);

        // update status indicator
        statusIndicator.textContent = 'Listening...';
        statusIndicator.style.color = 'green';
    });

    // stop recognition when the user clicks the stop button
    stopButton.addEventListener('click', () => {
        speachRecognition.stop();
        console.log('Speech recognition stopped.');
    });

    // handle the result of speech recognition
    speachRecognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript; // get the first recognized result
        resultOutput.textContent = transcript; // display the transcript
        console.log('Recognized speech:', transcript);
    };

    // handle recognition errors
    speachRecognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        alert('an error occurred during speech recognition: ' + event.error);

        // update status indicator
        statusIndicator.textContent = 'recongnition Error';
        statusIndicator.style.color = 'red';
    };

    // handle recognition end event
    speachRecognition.onend = () => {
        console.log('Speech recognition has ended.');

        // Update status indicator
        statusIndicator.textContent = '';
    };
}

