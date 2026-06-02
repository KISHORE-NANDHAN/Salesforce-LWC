import { LightningElement } from 'lwc';
import SearchAccountRecord from '@salesforce/apex/LwcSupportClass.searchAccountRecords';

export default class AccSearchImperative extends LightningElement {

    accName;
    AccRecords;

    columnStructure = [
        { label: 'Account Id', fieldName: 'Id' },
        { label: 'Account Name', fieldName: 'Name' },
        { label: 'Account Rating', fieldName: 'Rating' },
        { label: 'Account Industry', fieldName: 'Industry' }
    ]

    handleAccName(event){
        this.accName = event.target.value;
    }
    searchRecords() {

        // logic to search records
        SearchAccountRecord({accName: this.accName})
        .then(result => {
            // handle result
            this.AccRecords = result;
            console.log(JSON.stringify(this.AccRecords));
        })
        .catch(error => {
            // handle error
            console.error(error);
        });

    }

}