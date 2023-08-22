// JS to execute theme toggle
document.addEventListener('DOMContentLoaded', function() {
  const themeButton = document.getElementById('toggle-theme');
  const calculatorStyle = document.getElementById('calculator-style');

  themeButton.addEventListener('click', () => {
    if (calculatorStyle.getAttribute('href') === 'style/calculator.css') {
      calculatorStyle.setAttribute('href', 'style/calculator-dark.css');
      themeButton.innerHTML = '<i class="fa-regular fa-lightbulb"></i>';
    } else {
      calculatorStyle.setAttribute('href', 'style/calculator.css');
      themeButton.innerHTML = '<i class="fa-solid fa-lightbulb"></i>';
    }
  });
});
