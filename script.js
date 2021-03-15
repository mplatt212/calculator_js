class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement){
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.clear();
    }
    clear(){
        this.previousOperand = '';
        this.currentOperand = '';
        this.operation = undefined;
    }

    delete(){
        this.currentOperand = this.currentOperand.toString().slice(0,-1);
    }

    appendNumber(number){
        if(this.currentOperand.includes('.') && number === '.'){
            return;
        }
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }

    chooseOperation(operation){
        if(this.currentOperand == ''){
            return;
        }
        if(this.previousOperand !== ''){
            this.compute();
        }

        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    }

    compute(){
        let computation;
        const prev = parseFloat(this.previousOperand);
        const curr = parseFloat(this.currentOperand);
        if (isNaN(prev) || isNaN(curr)){
            return;
        }

        switch(this.operation){
            case '-':
            computation = prev - curr;
            break;
            case '+':
            computation = prev + curr;
            break;
            case 'x':
            computation = prev * curr;
            break;
            case '/':
            computation = prev / curr;
            break;
            default:
            return;
        }
        this.previousOperand = '';
        this.currentOperand = computation;
        this.operation = undefined;
    }

    updateDisplay(){
        this.previousOperandTextElement.innerText = this.previousOperand;
        if (this.operation != null){
            this.previousOperandTextElement.innerText =
            `${this.previousOperand}${this.operation}`
        }
        this.currentOperandTextElement.innerText = this.currentOperand;
    }
}


const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const previousOperandTextElement = document.querySelector('[data-previous-operand]');
const currentOperandTextElement = document.querySelector('[data-current-operand]');

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);

numberButtons.forEach(btn => {
    btn.addEventListener('click', () => {
         calculator.appendNumber(btn.innerText);
         calculator.updateDisplay(); 
    })
});

operationButtons.forEach(btn => {
    btn.addEventListener('click', () => {
         calculator.chooseOperation(btn.innerText);
         calculator.updateDisplay(); 
    })
});

equalsButton.addEventListener('click', btn => {
    calculator.compute();
    calculator.updateDisplay();
});

allClearButton.addEventListener('click', btn => {
    calculator.clear();
    calculator.updateDisplay();
});

deleteButton.addEventListener('click', btn => {
    calculator.delete();
    calculator.updateDisplay();
});

