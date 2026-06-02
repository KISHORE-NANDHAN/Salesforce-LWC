import { LightningElement, wire } from 'lwc';
import searchContact from '@salesforce/apex/searchContactRecords.searchContactByName';
import CompanyName from '@salesforce/schema/User.CompanyName';
export default class ContactSearch extends LightningElement {

    searchKey = '';
    
    //conList;

    columnStructure = [
        { label : 'Contact id', fieldName: 'Id' },
        { label: 'First Name', fieldName: 'FirstName' },
        { label: 'Last Name', fieldName: 'LastName' },
        { label: 'Email Contact', fieldName: 'Email' }

    ]
    handleInput(event){
        this.searchKey = event.target.value;
    }

    // Wire as a method
    // @wire(searchContact, { conName : '$searchKey'})
    // searchRec(data, error){
    //     if(data){
    //         this.conList = data;
    //         console.log(JSON.stringify(this.conList));
    //     }else if(error){
    //         console.error(error);
    //     }
    // }

    //wire as  a property
    @wire(searchContact, { conName : '$searchKey'}) recList;
}