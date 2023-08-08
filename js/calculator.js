// JS to execute calculator function

let currentResult = '';  // New variable to store the current result
let previousResult = ''; // New variable to store the previous result

function appendToResult(value) {
    document.getElementById('result').value += value;
}

function clearResult() {
    document.getElementById('result').value = '';
}

function calculate() {
    previousResult = currentResult; // Store the current result before calculation
    const expression = document.getElementById('result').value;
    try {
        currentResult = eval(expression); // Calculate the current result
        document.getElementById('result').value = currentResult;
    } catch (error) {
        document.getElementById('result').value = 'Error';
    }
}

function showPreviousResult() {
    document.getElementById('result').value = previousResult;
}
