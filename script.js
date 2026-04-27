const calc = {

  add: function add(num1, num2) {
    return num1 + num2;  
  }

  subtract: function subtract(num1, num2) {
    return num1 - num2;  
  }

  multiply: function multiply(num1, num2) {
    return num1 * num2; 
  }

  divide: function divide(num1, num2) {
    return num1 / num2;  
  }

  operate: function operate(num1, num2, op) {
    switch (op) {
      case '+':
        return this.add(num1, num2)
        break;

      case '-':
        return this.subtract(num1, num2)
        break;

      case '*':
        return this.multiply(num1, num2)
        break;

      case '/':
        return this.divide(num1, num2)
        break;
 
      default:
        return 'Input non corretto';
        break;
    }
  }
}
