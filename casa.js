class Calculator {
    constructor(screenElement) {
        this.screenElement = screenElement;
        this.clear();
    }

    clear() {
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = undefined;
    }

    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) return;
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }

    chooseOperation(operation) {
        if (this.currentOperand === '') return;
        if (this.previousOperand !== '') {
            this.compute();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    }

    compute() {
        let computation;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        if (isNaN(prev) || isNaN(current)) return;
        switch (this.operation) {
            case '+':
                computation = prev + current;
                break;
            case '-':
                computation = prev - current;
                break;
            case '*':
                computation = prev * current;
                break;
            case '/':
                computation = prev / current;
                break;
            default:
                return;
        }
        this.currentOperand = computation;
        this.operation = undefined;
        this.previousOperand = '';
    }

    updateDisplay() {
        this.screenElement.value = this.currentOperand;
    }
}

const calculator = new Calculator(document.querySelector('.calculator-screen'));

document.querySelector('.calculator-keys').addEventListener('click', event => {
    const { target } = event;
    const { value } = target;

    if (!target.matches('button')) return;

    switch (value) {
        case 'all-clear':
            calculator.clear();
            calculator.updateDisplay();
            break;
        case '=':
            calculator.compute();
            calculator.updateDisplay();
            break;
        case '+':
        case '-':
        case '*':
        case '/':
            calculator.chooseOperation(value);
            calculator.updateDisplay();
            break;
        default:
            calculator.appendNumber(value);
            calculator.updateDisplay();
            break;
    }
});
