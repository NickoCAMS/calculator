const calc = {
  add: function (a, b) { return a + b; },
  subtract: function (a, b) { return a - b; },
  multiply: function (a, b) { return a * b; },
  divide: function (a, b) {
    if (b === 0) return "ERROR_DIV_ZERO"; 
    return a / b;
  },
  operate: function (a, b, op) {
    a = Number(a);
    b = Number(b);
    switch (op) {
      case '+': return this.add(a, b);
      case '-': return this.subtract(a, b);
      case '*': return this.multiply(a, b);
      case '/': return this.divide(a, b);
      default: return null;
    }
  }
};

let firstNum = '';
let operator = '';
let resetDisplay = false;

const display = document.getElementById('display');
const wrapper = document.querySelector('.buttons-wrapper');

function roundResult(num) {
  return Math.round(num * 100000000) / 100000000;
}

function handleInput(val) {
  if (val === 'AC') {
    firstNum = '';
    operator = '';
    display.textContent = '0';
    resetDisplay = false;
    return;
  }

  if (!isNaN(val)) {
    if (display.textContent === '0' || resetDisplay) {
      display.textContent = val;
      resetDisplay = false;
    } else {
      display.textContent += val;
    }
    return;
  }

  if (val === '.') {
    if (resetDisplay) {
      display.textContent = '0';
      resetDisplay = false;
    }
    if (!display.textContent.includes('.')) {
      display.textContent += '.';
    }
    return;
  }

  if (val === '=') {
    if (operator === '' || resetDisplay) return; 
    
    const secondNum = display.textContent;
    const res = calc.operate(firstNum, secondNum, operator);
    
    if (res === "ERROR_DIV_ZERO") {
      display.textContent = "Boom! ಠ_ಠ"; 
      firstNum = '';
      operator = '';
    } else {
      display.textContent = roundResult(res);
      firstNum = display.textContent; 
      operator = '';
    }
    resetDisplay = true;
    return;
  }

  if (['+', '-', '*', '/'].includes(val)) {
    if (operator !== '' && resetDisplay) {
      operator = val;
      return;
    }
    
    if (operator !== '' && firstNum !== '') {
      const secondNum = display.textContent;
      const res = calc.operate(firstNum, secondNum, operator);
      
      if (res === "ERROR_DIV_ZERO") {
        display.textContent = "Boom! ಠ_ಠ";
        firstNum = '';
        operator = '';
        resetDisplay = true;
        return;
      }
      
      display.textContent = roundResult(res);
      firstNum = display.textContent;
    } else {
      firstNum = display.textContent;
    }
    
    operator = val;
    resetDisplay = true;
    return;
  }
}

wrapper.addEventListener('click', (e) => {
  if (e.target.tagName !== 'BUTTON') return;
  handleInput(e.target.dataset.value);
});

window.addEventListener('keydown', (e) => {
  let key = e.key;
  
  if (key === 'Enter') key = '=';
  if (key === 'Escape') key = 'AC';
  if (key === ',') key = '.';

  if (key === 'Backspace') {
    if (!resetDisplay) {
      display.textContent = display.textContent.slice(0, -1);
      if (display.textContent === '') {
        display.textContent = '0';
      }
    }
    return;
  }

  const validInputs = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '=', '+', '-', '*', '/', 'AC'];
  
  if (validInputs.includes(key)) {
    e.preventDefault(); 
    handleInput(key);
  }
});
