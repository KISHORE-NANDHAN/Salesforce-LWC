import { LightningElement, api } from 'lwc';

export default class LwcPracticeChild2 extends LightningElement {
   // value;
    @api user;

    @api submitted;

    @api displayAlert;

    @api greetUser(value){
       console.log(value);
    }
}