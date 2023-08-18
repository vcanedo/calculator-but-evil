// JS to execute calculator functions

// //////////////////////////////////////////////////
// EVIL RESPONSES
// evilResponse function to generate a random response
function evilResponse() {
  const evilResponses = [
      "Congratulations, you've unlocked the secret to your misery: ",
      "You must be truly proud of your mathematical prowess: ",
      "Oh, another one? Here's your pitiful answer: ",
      "Pathetic attempt, behold the outcome: ",
      "Mathematically challenged, here's your reward: ",
      "Your answer is as dull as your math skills: ",
      "Did you really think you'd get anything different? ",
      "Witness the fruit of your labor: ",
      "I hope your self-esteem can handle this: "
    ];

    return evilResponses[Math.floor(Math.random() * evilResponses.length)];
}

// //////////////////////////////////////////////////
// Retrieve the result element

let currentResult = '';  // New variable to store the current result
let previousResult = ''; // New variable to store the previous result

// function to append the value to the result
function appendToResult(value) {
  console.log(value);
  const resultInput = document.getElementById('result');
  console.log(value);
  console.log(resultInput);
  resultInput.value += value;
  console.log(resultInput.value);
}

// function to clear the result
function clearResult() {
  document.getElementById('result').value = '';
}

// //////////////////////////////////////////////////
// SOUND EFFECTS
// Get the audio elements

const buttonClickSound = document.getElementById('click-sound');
const resultSound = document.getElementById('result-sound');
const errorSound = document.getElementById('error-sound');

// Define the sound functions
// Click sound
function playButtonClickSound() {
  buttonClickSound.currentTime = 0; // Reset sound to start
  buttonClickSound.play();
}

// Result sound
function playResultSound() {
  resultSound.currentTime = 0; // Reset sound to start
  resultSound.play();
  }

// Error sound
function playErrorSound() {
  errorSound.currentTime = 0; // Reset sound to start
  errorSound.play();
}

// Attach the sound functions to button clicks
document.querySelectorAll('button').forEach(button => {
  button.addEventListener('click', playButtonClickSound);
});

// Toggle sound
let isSoundEnabled = true;

function toggleSound() {
  isSoundEnabled = !isSoundEnabled;

  // Mute or unmute the audio elements based on the isSoundEnabled variable
  buttonClickSound.muted = !isSoundEnabled;
  resultSound.muted = !isSoundEnabled;
  errorSound.muted = !isSoundEnabled;

  // Update the button text
  const toggleSoundButton = document.getElementById('toggle-sound');
  toggleSoundButton.innerText = isSoundEnabled ? 'Mute' : 'Unmute';
}
// //////////////////////////////////////////////////
// HISTORY LOG
// Retrieve the history list element
const historyList = document.getElementById('history-list');

function addToHistory(expression, result) {
    const historyItem = document.createElement('li');
    historyItem.textContent = `${expression} = ${result}`;
    historyList.appendChild(historyItem);
}

// //////////////////////////////////////////////////
// CALCULATOR FUNCTIONS
// function to calculate the result

function calculate() {
  previousResult = currentResult; // Store the current result before calculation
  const expression = document.getElementById('result').value;
  try {
        currentResult = eval(expression); // Calculate the current result
        document.getElementById('result').className = 'animated';
        document.getElementById('evil-response').textContent = evilResponse();
        playResultSound(); // Play sound effect
        addToHistory(expression, currentResult); // Add the calculation to the history log
    } catch (error) {
        document.getElementById('result').value = 'Error';
        document.getElementById('evil-response').textContent = 'You clearly have no idea what you\'re doing. Try again.';
        playErrorSound(); // Play sound effect
      }
    }

    // New function to show the previous result
    function showPreviousResult() {
      document.getElementById('result').value = previousResult;
    }

    // //////////////////////////////////////////////////
    // KEYBOARD SUPPORT
    // Listen for keydown events on the document
    document.addEventListener('keydown', function(event) {
      const key = event.key;

      // If the key is a number, an operator, or Enter (=), append it to the result
    if (/^\d$|[\+\-\*/]|Enter/.test(key)) {
      event.preventDefault(); // Prevent the default action of the key press
      if (key === 'Enter') {
        calculate();
      } else {
        appendToResult(key);
      }
  }

  // Clear the result when the Escape key is pressed
  if (key === 'Escape') {
    clearResult();
  }

  // Toggle theme when the T key is pressed
  if (key === 't' || key === 'T') {
      const themeButton = document.getElementById('toggle-theme');
      themeButton.click();
  }

  // Show previous result when the P key is pressed
  if (key === 'p' || key === 'P') {
      showPreviousResult();
    }
});
