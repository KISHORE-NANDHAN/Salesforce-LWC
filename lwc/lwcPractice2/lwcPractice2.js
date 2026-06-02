import { LightningElement, track, api } from 'lwc';

export default class LwcPractice2 extends LightningElement {
    submitted = false;
    user = {
        name : 'Default',
        age : 0,
        marks : 0.0
    }  
    displayAlert(){
        alert('Alert is called form the parent');
    }
    handleChange(event){
        this.user[event.target.name] = event.target.value;
    }

    handleSubmit(event){
        event.preventDefault();
        this.submitted = this.submitted ? false : true;
    }

    fromChild(){
        const child = this.template.querySelector('c-lwc-practice-child2');
        child.greetUser(1000);
    }
}