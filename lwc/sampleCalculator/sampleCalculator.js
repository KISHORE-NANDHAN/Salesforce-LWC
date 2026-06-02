import { LightningElement } from 'lwc';

export default class SampleCalculator extends LightningElement {

    firstNum = 0;
    secondNum = 0;

    result;

    handleFirstValue(event){
        this.firstNum = event.target.value;
    }

    handleSecondValue(event){
        this.secondNum = event.target.value;
    }

    calculate(event){
        let operation = event.target.name;
        if(operation === 'sum'){
            this.result = parseFloat(this.firstNum) + parseFloat(this.secondNum);
        }else if(operation === 'sub'){
            this.result = parseFloat(this.firstNum) - parseFloat(this.secondNum);
        }else if(operation === 'mul'){
            this.result = parseFloat(this.firstNum) * parseFloat(this.secondNum);
        }else if(operation === 'div'){
            this.result = parseFloat(this.firstNum) / parseFloat(this.secondNum);
        }
    }
}