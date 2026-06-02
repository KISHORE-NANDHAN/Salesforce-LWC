import { LightningElement } from 'lwc';
import Name_Field from '@salesforce/schema/Account.Name';
import Rating_Field from '@salesforce/schema/Account.Rating';
import Industry_Field from '@salesforce/schema/Account.Industry';

export default class LightningDataService extends LightningElement {

    fieldNames = [ Name_Field, Rating_Field, Industry_Field ];
    
}