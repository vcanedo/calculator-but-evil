// JS to execute calculator function
function appendToResult(value) {
  document.getElementById('result').value += value;
}

function clearResult() {
  document.getElementById('result').value = '';
}

function calculate() {
  const expression = document.getElementById('result').value;
  let result;
  try {
      result = eval(expression);
  } catch (error) {
      result = 'Error';
  }
  document.getElementById('result').value = result;
}
