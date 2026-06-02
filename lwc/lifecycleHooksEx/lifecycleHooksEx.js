import { LightningElement } from 'lwc';

export default class LifecycleHooksEx extends LightningElement {

    constructor(){
        super();
        console.log('Parent Constructor is called');
    }
    connectedCallback(){
        console.log('Parent connectedCallback is called');
    }
    renderedCallback(){
        console.log('Parent renderedCallback is called');
    }
}