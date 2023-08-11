class Calculator{
    constructor(resultInputElement, resultOutputElement){
        this.resultInputElement = resultInputElement;
        this.resultOutputElement = resultOutputElement;
        this.resultInput = '';
        this.resultOutput = '';
        this.currentOperand = '';
        this.prevOperand = '';
        this.clear();
        this.regex = /[\+*x÷/-]/;
    }

    clear(){
        // this.resultInputElement.textContent = '';
        // this.resultOutputElement.textContent = '';
        this.resultInput = '';
        this.resultOutput = '';
        this.operator = undefined;
        this.updateInput();
        this.updateOutput();
    }

    delete(){
        
        if(this.resultInput == this.resultOutput){
            this.resultInput = this.resultInput.toString().slice(0, -1);
            this.resultOutput = this.resultOutput.toString().slice(0, -1);
        } else{
            this.resultInput = this.resultInput.toString().slice(0, -1);
        }
    }

    appendNumber(number){
        if(number === '.'){
            if(this.regex.test(this.resultInput)){
                if(this.currentOperand.includes('.')) return;
            } else {
                if(this.resultInput.includes('.')) return;
            }
        } 
        if((parseInt(this.resultInput)) > Number.MAX_SAFE_INTEGER){
            console.log('Number is too large');
            return;
        } 
        if(this.resultInput && (this.resultInputElement.textContent === this.resultOutputElement.textContent)) return;
        if(this.regex.test(this.resultInput)){
            this.currentOperand = this.currentOperand + number.toString();
        } 
        this.resultInput =  this.resultInput.toString() + number.toString();
    }

    chooseOperator(operator){
        const inputString = this.resultInput.toString();
        let last = inputString[inputString.length - 1];
        if(last === '.') return;
        if(this.regex.test(this.resultInput) && (!(this.regex.test(last)))){
            return;
        } 
        if(this.resultInput){
            this.operator = operator;
            this.prevOperand = this.resultInput;
            this.resultInput = this.resultInput.toString() + operator;
            if(this.regex.test(last)){
                this.resultInput = this.resultInput.slice(0, -2);
                this.prevOperand =  this.resultInput;
                this.resultInput = this.resultInput + operator;
            }
            this.resultOutput = this.prevOperand;
            this.updateOutput();
        }
    }

    compute(){
        let computedResult;
        const prev = parseFloat(this.prevOperand);
        const current = parseFloat(this.currentOperand);
        if(isNaN(prev) || isNaN(current)) return;
        const x = new Big(prev);
        const y = new Big(current);
        
        switch(this.operator){
            case '+' :
                computedResult = x.plus(y);
                break;
            case '-' :
                computedResult = x.minus(y);
                break;
            case 'x' :
                computedResult = x.times(y);
                break;
            case '*' :
                computedResult = x.times(y);
                break;
            case '/' :
                computedResult = x.div(y);
                break;
            case '÷' :
                computedResult = x.div(y);
                break;
            default :
                console.log('Not Valid Operator');
                break;
        }

     
        computedResult = computedResult.round(5);
        if(parseInt(computedResult) > Number.MAX_SAFE_INTEGER){
            computedResult = 'Number is Too Large';
        }
        this.resultOutput = computedResult.toString();
        this.operator = undefined;
        this.resultInput = computedResult;
        this.prevOperand = '';
        this.currentOperand = '';
    }

    updateInput(){
        this.resultInputElement.textContent = this.resultInput;
    }

    updateOutput(){
        this.resultOutputElement.textContent = this.resultOutput;
    }
}
const resultInputElement = document.querySelector('.input');
const resultOutputElement = document.querySelector('.output');
const numbers = document.querySelectorAll('.numbers');
const operators = document.querySelectorAll('.operators');
const equalButton = document.querySelector('.equal');
const clearButton = document.querySelector('.clear');
const delButton = document.querySelector('.delete');

const myCalculator = new Calculator(resultInputElement, resultOutputElement);


numbers.forEach((button) => {
    button.addEventListener('click', () => {
    myCalculator.appendNumber(button.textContent);
    myCalculator.updateInput();
    })
});

operators.forEach((operator) => {
    operator.addEventListener('click', () => {
    myCalculator.chooseOperator(operator.textContent);
    myCalculator.updateInput();
    })
});

clearButton.addEventListener('click', () =>
    myCalculator.clear());

delButton.addEventListener('click', () => {
    myCalculator.delete();
    myCalculator.updateInput();
    myCalculator.updateOutput();
});

equalButton.addEventListener('click', () => {
    myCalculator.compute();
    myCalculator.updateInput();
    myCalculator.updateOutput();
})

document.addEventListener('keydown', (event) => {
    let numberPattern = /[0-9.]/;
    let operatorPattern = /[\+*/-]/;
    if(event.key.match(numberPattern)){
        event.preventDefault();
        myCalculator.appendNumber(event.key);
        myCalculator.updateInput();
    }
    
    if(event.key.match(operatorPattern)){
        event.preventDefault();
        myCalculator.chooseOperator(event.key);
        myCalculator.updateInput();
    }
    
    if(event.key === 'Delete'){
        event.preventDefault();
        myCalculator.clear()
    }

    if(event.key === 'Backspace'){
        event.preventDefault();
        myCalculator.delete();
        myCalculator.updateInput();
        myCalculator.updateOutput();
    }
    
    if(event.key === 'Enter' || event.key === '='){
        event.preventDefault();
        myCalculator.compute();
        myCalculator.updateInput();
        myCalculator.updateOutput();
    }
})


