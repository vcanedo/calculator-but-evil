// JS to execute theme toggle
document.addEventListener('DOMContentLoaded', function() {
  const themeButton = document.getElementById('toggle-theme');
  const calculatorStyle = document.getElementById('calculator-style');

  themeButton.addEventListener('click', () => {
      if (calculatorStyle.getAttribute('href') === 'css/calculator.css') {
          calculatorStyle.setAttribute('href', 'css/calculator-dark.css');
      } else {
          calculatorStyle.setAttribute('href', 'css/calculator.css');
      }
  });
});
