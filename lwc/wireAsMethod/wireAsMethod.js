import { LightningElement, wire } from 'lwc';
import getAccounts from '@salesforce/apex/AccountFetch.getAccounts';

export default class WireAsMethod extends LightningElement {

    accounts;
    error;
    accName = '';
    columns = [
        { label: 'Account Id', fieldName: 'Id' },
        { label: 'Account Name', fieldName: 'Name' }
    ];

    handleChange(event){ 
        console.log('reached handleChange');
        this.accName= event.target.value ;
    }

    // @wire(getAccounts, { accName : '$accName' })
    // wiredAccounts({error, data}){
    //     if(data){
    //         this.accounts = data;
    //         this.error = undefined;
    //         console.log('Data from wire method', JSON.stringify(data));
    //     } else if(error){
    //         console.log('Error from wire method', JSON.stringify(error));
    //         this.error = error;
    //         this.accounts = undefined;
    //     }
    // }

    // @wire(getAccounts, { accName : '$accName' }) recordHandler;

    // get accountData() {
    //     console.log('Wire Data:', this.recordHandler);
    //     return this.recordHandler?.data;
    // }
    handleSubmit(){
        console.log("reached handleSubmit()");
        getAccounts( { accName : this.accName } )
        .then(result=>{
            console.log('inside result');
            this.accounts = result;
            console.log(JSON.stringify(this.accounts));
        }).catch(error=>{
            console.log(error);
        });
    }

}