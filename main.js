class Calculator {
  constructor(previousOperandTextElement, currentOperandTextElement) {
    this.previousOperandTextElement = previousOperandTextElement;
    this.currentOperandTextElement = currentOperandTextElement;
    this.clearAll();
  }

  // clear all display
  clearAll() {
    this.currentOperand = '';
    this.previousOperand = '';
    this.operation = undefined;
  }

  // delete number
  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
  }

  // append number
  appendNumber(number) {
    if(number === '.' && this.currentOperand.includes('.')) return
    this.currentOperand = this.currentOperand.toString() + number.toString();
  }

  chooseOperation(operation) {
    if(this.currentOperand === '') return
    if(this.previousOperand !== '') {
      this.compute();
    }
    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = '';
  }

  // computation
  compute() {
    let computation;
    const prev = parseFloat(this.previousOperand);
    const curr = parseFloat(this.currentOperand);
    if(isNaN(prev) || isNaN(curr)) return

    switch(this.operation) {
      case '+':
        computation = prev + curr;
        break;
      case '-':
        computation = prev - curr;
        break;
      case '×':
        computation = prev * curr;
        break;
      case '÷':
        computation = prev / curr;
        break
      default:
        return
    }

    this.currentOperand = computation;
    this.operation = undefined
    this.previousOperand = ''
  }

  // adding decimal digits to number
  getDisplayNumber(number) {
    const stringNumber = number.toString();
    const integerDigits = parseFloat(stringNumber.split('.')[0])
    const decimalDigits = stringNumber.split('.')[1];

    let integerDisplay;
    if(isNaN(integerDigits)) {
      integerDisplay = '';
    } else {
      integerDisplay = integerDigits.toLocaleString('en', {
        maximumFractionDigits: 0
      })
    }

    if(decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`;
    } else {
      return integerDisplay;
    }
  }
  
  // update display in the output
  updateDisplay() {
    this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand);
    if(this.operation != null) {
      this.previousOperandTextElement.innerText = `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
    } else {
      this.previousOperandTextElement.innerText = '';
    }
  }
}

const numberBtn = document.querySelectorAll('[data-number]');
const operationBtn = document.querySelectorAll('[data-operation]');
const allClearBtn = document.querySelector('[data-all-clear]');
const deleteBtn = document.querySelector('[data-delete]');
const euqalsBtn = document.querySelector('[data-equals]');
const previousOperandTextElement = document.querySelector('[data-previous-operand]');
const currentOperandTextElement = document.querySelector('[data-current-operand]');

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);

numberBtn.forEach(button => {
  button.addEventListener("click", ()=> {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  })
})

operationBtn.forEach(button => {
  button.addEventListener("click", ()=> {
    calculator.chooseOperation(button.innerText);
    calculator.updateDisplay();
  })
})

euqalsBtn.addEventListener("click", () => {
  calculator.compute();
  calculator.updateDisplay();
})

allClearBtn.addEventListener("click", () => {
  calculator.clearAll();
  calculator.updateDisplay();
})

deleteBtn.addEventListener("click", () => {
  calculator.delete();
  calculator.updateDisplay();
})