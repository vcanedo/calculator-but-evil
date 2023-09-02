// JS to execute calculator functions

// //////////////////////////////////////////////////
// EVIL RESPONSES
// evilResponse function to generate a random response


const evilResponse = (result) => {

  if (result === 666) {
    return "You've summoned evil with a result of 666!";
  }

  if (result === 0) {
    return "Ah, I see you're trying to see how much you're worth...";
  }

  if (result < 0) {
    return "Negative result? How unsurprising.";
  }

  if (result % 7 === 0) {
    return "Your result is a multiple of 7. Lucky you!";
  }

  if (result % 69 === 0) {
    return "Your result is a multiple of 69. Nice.";
  }

  if (result === 69) {
    return "Ha! Nice.";
  }

  if (currentResult < 20 && currentResult >= 1) {
    return smallNumberResponse();
  }

  const evilResponses = [
      "Congratulations, you've unlocked the secret to your misery",
      "You must be truly proud of your mathematical prowess",
      "Oh, another one? Here's your pitiful answer:",
      "Pathetic attempt, behold the outcome:",
      "Mathematically challenged, here's your reward:",
      "Your answer is as dull as your math skills:",
      "Did you really think you'd get anything different?",
      "Witness the fruit of your labor:",
      "I hope your self-esteem can handle this:",
      "You're not very good at this, are you?",
      "You really had to ask me for this?"
    ];

    return evilResponses[Math.floor(Math.random() * evilResponses.length)];
}

const smallNumberResponse = () => {
  setTimeout(function () {
    // Wait for 5 seconds before clearing the calculator and displaying the next message
    document.getElementById('evil-response').textContent = "You've brought this upon yourself.";
    clearResult();
    const buttons = document.getElementsByTagName('button');
    const log = document.getElementById('history-log');
    const result = document.getElementById('result');
    const title = document.querySelector('h1');

    const allTags = [...buttons, log, result, title];

    // Iterate through the buttons and hide them
    for (let i = 0; i < allTags.length; i++) {
      allTags[i].style.display = 'none';
    }

    // After 3 seconds, display the final message
    setTimeout(function () {
      document.getElementById('evil-response').textContent = "Bye";

      // After 3 seconds, clear the message
      setTimeout(function () {
        document.getElementById('evil-response').textContent = "";
      }, 1000);
    }, 2000);
  }, 3000);

  // This is the initial message
  return "No shot you had to calculate that...";
}

// //////////////////////////////////////////////////
// Retrieve the result element

let currentResult = '';  // New variable to store the current result
let previousResult = ''; // New variable to store the previous result

// function to append the value to the result
const appendToResult = (value) => {
  console.log(value);
  const resultInput = document.getElementById('result');
  console.log(value);
  console.log(resultInput);
  resultInput.value += value;
  console.log(resultInput.value);
}

// function to clear the result
const clearResult = () => {
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
const playButtonClickSound = () => {
  buttonClickSound.currentTime = 0; // Reset sound to start
  buttonClickSound.play();
}

// Result sound
const playResultSound = () => {
  resultSound.currentTime = 0; // Reset sound to start
  resultSound.play();
  }

// Error sound
const playErrorSound = () => {
  errorSound.currentTime = 0; // Reset sound to start
  errorSound.play();
}

// Attach the sound functions to button clicks
document.querySelectorAll('button').forEach(button => {
  button.addEventListener('click', playButtonClickSound);
});

// Toggle sound
let isSoundEnabled = true;

const toggleSound = () => {
  isSoundEnabled = !isSoundEnabled;

  // Mute or unmute the audio elements based on the isSoundEnabled variable
  buttonClickSound.muted = !isSoundEnabled;
  resultSound.muted = !isSoundEnabled;
  errorSound.muted = !isSoundEnabled;

  // Update the button icon
  const toggleSoundButton = document.getElementById('toggle-sound');
  toggleSoundButton.innerHTML = isSoundEnabled ? '<i class="fas fa-volume-up"></i>' : '<i class="fas fa-volume-mute"></i>';
}
// //////////////////////////////////////////////////
// HISTORY LOG
// Retrieve the history list element
const historyList = document.getElementById('history-list');

const addToHistory = (expression, result) => {
    const historyItem = document.createElement('li');
    historyItem.textContent = `${expression} = ${result}`;
    historyList.appendChild(historyItem);
}

// //////////////////////////////////////////////////
// CALCULATOR FUNCTIONS
// function to calculate the result

const calculate = () => {
  previousResult = currentResult; // Store the current result before calculation
  const expression = document.getElementById('result').value; // Get the expression from the result field
  try {
        currentResult = eval(expression); // Calculate the current result
        document.getElementById('result').className = 'animated';
        document.getElementById('evil-response').textContent = evilResponse(currentResult);

        playResultSound(); // Play sound effect
        addToHistory(expression, currentResult); // Add the calculation to the history log
    } catch (error) {
        document.getElementById('result').value = '';
        document.getElementById('evil-response').textContent = 'You clearly have no idea what you\'re doing. Try again.';
        playErrorSound(); // Play sound effect
      }
    }

    // New function to show the previous result
    const showPreviousResult = () => {
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

  // Calculate the result when the = key is pressed
  if (key === '=' || key === 'Enter') {
    calculate();
  }

  // Backspace key
  if (key === 'Backspace' || key === 'Delete') {
    const resultInput = document.getElementById('result');
    resultInput.value = resultInput.value.slice(0, -1);
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
