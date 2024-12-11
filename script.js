// webkitSpeechRecognition: used to access and utilize speech recognition functionalities
// in Browsers like Chrome
//but may require a different implementation in non-WebKit browsers.

document.addEventListener('DOMContentLoaded', () => {
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

    // update status indicator
    function updateStatusIndicator(visible) {
        if (visible) {
            statusIndicator.style.display = 'block';
        } else {
            statusIndicator.style.display = 'none';
        }  
    }

    // start recognition when user clicks the start button
    startButton.addEventListener('click', () => {
        // set language based on user selection
        const selectedLanguage = languageSelector.value;
        speachRecognition.lang = selectedLanguage;

        // start speech recognition
        speachRecognition.start();
        console.log('Speech recognition started with language:', selectedLanguage);

        updateStatusIndicator(true);
    });

    // stop recognition when the user clicks the stop button
    stopButton.addEventListener('click', () => {
        speachRecognition.stop();
        console.log('Speech recognition stopped.');

        updateStatusIndicator(false);
    });

    // handle the result of speech recognition
    speachRecognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript; // get the first recognized result
        resultOutput.textContent = transcript; // display the transcript
        console.log('Recognized speech:', transcript);

        updateStatusIndicator(true);
    };

    // handle recognition errors
    speachRecognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        alert('an error occurred during speech recognition: ' + event.error);

        updateStatusIndicator(true);
    };

    // handle recognition end event
    speachRecognition.onend = () => {
        console.log('Speech recognition has ended.');

        updateStatusIndicator(false);
    };
}
});
