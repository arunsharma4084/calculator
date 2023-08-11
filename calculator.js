const numbers = document.querySelectorAll('.numbers');
const resultWrapper = document.querySelector('.result');
const input = resultWrapper.querySelector('.input');
const output = resultWrapper.querySelector('.output');
const addButton = document.querySelector('.add');
const subtractButton = document.querySelector('.subtract');
const multiplyButton = document.querySelector('.multiply');
const divideButton = document.querySelector('.divide');
const equalButton = document.querySelector('.equal');
let operator = '';
let addInput = 0;
let addOutput = 0;
let secondNumber = 0;
let operatorToShow = '';
let outputToShow;
let inputToShow = 0;
let a;
let b;
input.textContent = inputToShow;

function showOperator(operator){
    let result;
    switch(operator){
        case 'add' :
            result = '+';
            break;
        case 'subtract' :
            result = '-';
            break;
        case 'multiply' :
            result = 'x';
            break;
        case 'divide' :
            result = '/';
            break;
        default:
            break;
    }
    return result;
}


function calculateResult(a, b, operator){
    let result;
    switch(operator){
        case 'add' :
            result = a + b;
            break;
        case 'subtract' :
            result = a - b;
            break;
        case 'multiply' :
            result = a * b;
            break;
        case 'divide' :
            result = a / b;
            break;
        default:
            break;
    }
    return result;
}

function handleClick(e){
    const classArray = Array.from(e.currentTarget.classList);

    if(classArray.includes('numbers') && (operator === '')){
        console.log('now running for a');
        a = new MyNumber(parseInt(e.currentTarget.textContent));
        console.log(a.clickedNumber);
        addInput = addInput * 10 + a.clickedNumber;
        inputToShow = addInput;
        outputToShow = inputToShow;
        input.textContent = inputToShow;
        output.textContent = outputToShow;
    }

    if(classArray.includes('operators')){
        operator = calculation(e); 
        operatorToShow = showOperator(operator);
        input.textContent = `${input.textContent}${operatorToShow}`;
        console.log('adding operator');
    }

    // if(classArray.includes('operators') && (b)){
    //    operator = calculation(e); 
    //    console.log('runing operator after b');
    //    console.log(outputToShow);
    //    addInput = outputToShow;
    //    console.log('now runnign for c');
    //    addOutput = parseInt(e.currentTarget.textContent);
    //    console.log(addOutput);
    //    outputToShow = calculateResult(addInput, addOutput, operator);
    //     output.textContent = outputToShow;
    // }

    if(classArray.includes('equal')){
       inputToShow = outputToShow;
       input.textContent = inputToShow; 
       b = outputToShow; 
    }

    if(classArray.includes('numbers') && (operator !== '')){
        
        console.log('now running for b');
        b = new MyNumber(parseInt(e.currentTarget.textContent));
        console.log(b.clickedNumber);
        addOutput = addOutput * 10 + b.clickedNumber;
        input.textContent = `${input.textContent}${b.clickedNumber}`;
        outputToShow = calculateResult(addInput, addOutput, operator);
        output.textContent = outputToShow;
    }    

}

function calculation(e){
    const classArray = Array.from(e.currentTarget.classList)
    if(classArray.includes('add')){
        return 'add';
    } else if(classArray.includes('subtract')){
        return 'subtract';
    } else if(classArray.includes('multiply')){
        return 'multiply';
    } else if(classArray.includes('divide')){
        return 'divide';
    } else{
        console.log('invalid');
    }
}

function MyNumber(clickedNumber){
    this.clickedNumber = clickedNumber;
    this.firstNumber = 0;

    if(this.firstNumber === 0){
        this.firstNumber = this.firstNumber + clickedNumber;
        return this.firstNumber;
    } else{
        this.firstNumber = this.firstNumber * 10 + clickedNumber;
        return this.firstNumber;
    }
}

// function myNumber2(e){
//     const clickedNumber = parseInt(e.currentTarget.textContent);
//     if(secondNumber === 0){
//         secondNumber = secondNumber + clickedNumber;
//         return secondNumber;
//     } else{
//         secondNumber = secondNumber * 10 + clickedNumber;
//         return secondNumber;
//     }
// }

addButton.addEventListener('click', handleClick);
subtractButton.addEventListener('click', handleClick);
multiplyButton.addEventListener('click', handleClick);
divideButton.addEventListener('click', handleClick);
equalButton.addEventListener('click', handleClick);
numbers.forEach(number => {
    number.addEventListener('click', handleClick);
});