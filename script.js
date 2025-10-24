const display = document.querySelector('.display');
const buttons = document.querySelectorAll('button');

let currentInput = '';
let operator = '';
let previousInput = '';

buttons.forEach(button => {
  button.addEventListener('click', () => {
    const value = button.textContent;

    // reseting
    if (button.classList.contains('reset')) {
      currentInput = '';
      operator = '';
      previousInput = '';
      display.textContent = '0';
      return;
    }

    // delete
    if (button.classList.contains('delete')) {
      currentInput = currentInput.slice(0, -1);
      display.textContent = currentInput || '0';
      return;
    }

    // =
    if (button.classList.contains('equal')) {
      if (previousInput && operator && currentInput) {
        const result = calculate(previousInput, currentInput, operator);
        display.textContent = formatNumber(result);
        currentInput = result.toString();
        operator = '';
        previousInput = '';
      }
      return;
    }

    // operater
    if (['+', '-', 'x', '/'].includes(value)) {
      if (currentInput === '') return;
      if (previousInput) {
        const result = calculate(previousInput, currentInput, operator);
        currentInput = result.toString();
        display.textContent = formatNumber(result);
      }
      operator = value;
      previousInput = currentInput;
      currentInput = '';
      return;
    }

    // no and .
    if (value === '.' && currentInput.includes('.')) return;
    currentInput += value;
    display.textContent = formatNumber(currentInput);
  });
});

function calculate(a, b, op) {
  const num1 = parseFloat(a);
  const num2 = parseFloat(b);
  switch (op) {
    case '+': return num1 + num2;
    case '-': return num1 - num2;
    case 'x': return num1 * num2;
    case '/': return num2 !== 0 ? num1 / num2 : 'Error';
    default: return num2;
  }
}

function formatNumber(num) {
  if (num === 'Error') return 'Error';
  if (isNaN(num)) return '0';

  const str = num.toString();
  const [integerPart, decimalPart] = str.split('.');

  let result = '';
  let count = 0;
  for (let i = integerPart.length - 1; i >= 0; i--) {
    result = integerPart[i] + result;
    count++;
    if (count === 3 && i !== 0) {
      result = ',' + result;
      count = 0;
    }
  }
  return decimalPart ? result + '.' + decimalPart : result;
}
