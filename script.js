const display = document.getElementById('display');
let expression = '';

function updateDisplay() {
  display.value = expression
    .replace(/\*/g, '×')
    .replace(/\//g, '÷')
    .replace(/\-/g, '−');
}

function appendToDisplay(value) {
  if (value === '×') value = '*';
  if (value === '÷') value = '/';
  if (value === '−') value = '-';
  if (value === '%') {
    expression += '/100';
  } else {
    expression += value;
  }
  updateDisplay();
}

function clearDisplay() {
  expression = '';
  updateDisplay();
}

function deleteLast() {
  expression = expression.slice(0, -1);
  updateDisplay();
}

function calculate() {
  try {
    const result = eval(expression);
    expression = result.toString();
    updateDisplay();
  } catch {
    display.value = 'Error';
    setTimeout(clearDisplay, 1000);
  }
}

document.addEventListener('keydown', (event) => {
  const key = event.key;
  if (/[0-9]/.test(key)) appendToDisplay(key);
  if (key === '+') appendToDisplay('+');
  if (key === '-') appendToDisplay('−');
  if (key === '*') appendToDisplay('×');
  if (key === '/') appendToDisplay('÷');
  if (key === '.') appendToDisplay('.');
  if (key === 'Enter' || key === '=') calculate();
  if (key === 'Backspace') deleteLast();
  if (key.toLowerCase() === 'c') clearDisplay();
});
