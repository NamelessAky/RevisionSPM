var currentSpeech = null;

function readAloud(button) {
    var boxId = button.getAttribute("data-box");
    var contentBox = document.getElementById(boxId);
    var content = contentBox.textContent;

    // Check if there's a current speech and if the boxId is the same
    if (currentSpeech && currentSpeech.text === content) {
        window.speechSynthesis.cancel();  // Stop the current speech
        currentSpeech = null;
        contentBox.style.display = 'none';  // Hide the content box
    } else {
        // If there's a current speech, stop it
        if (currentSpeech) {
            window.speechSynthesis.cancel();
            var currentBoxId = currentSpeech.boxId;
            document.getElementById(currentBoxId).style.display = 'none';
        }

        // Create a new speech instance
        var speech = new SpeechSynthesisUtterance(content);
        speech.lang = 'zh-CN';
        speech.rate = 1.05;
        speech.boxId = boxId;

        // Show the new content box
        contentBox.style.display = 'block';

        // Set the onend event to hide the content box
        speech.onend = function() {
            contentBox.style.display = 'none';
            currentSpeech = null;
        };

        // Set the current speech and speak
        currentSpeech = speech;
        window.speechSynthesis.speak(speech);
    }
}