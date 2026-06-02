import { LightningElement, track } from 'lwc';
import saveAccountWithOptionalContact from '@salesforce/apex/AccountContactController.saveAccountWithOptionalContact';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class AccountContactForm extends LightningElement {

    // Account fields
    @track accName = '';
    @track accEmail = '';
    @track accIndustry = '';
    @track accWebsite = '';

    // Contact fields
    @track showContact = false;
    @track conFirstName = '';
    @track conLastName = '';
    @track conEmail = '';
    @track conPhone = '';

    // Handle checkbox
    handleCheckbox(event) {
        this.showContact = event.target.checked;
    }

    // Handle account input
    handleAccChange(event) {
        const label = event.target.label;

        if (label === 'Account Name') this.accName = event.target.value;
        if (label === 'Email') this.accEmail = event.target.value;
        if (label === 'Industry') this.accIndustry = event.target.value;
        if (label === 'Website') this.accWebsite = event.target.value;
    }

    // Handle contact input
    handleConChange(event) {
        const label = event.target.label;

        if (label === 'First Name') this.conFirstName = event.target.value;
        if (label === 'Last Name') this.conLastName = event.target.value;
        if (label === 'Email') this.conEmail = event.target.value;
        if (label === 'Phone') this.conPhone = event.target.value;
    }

    // Save function
    handleSave() {
        saveAccountWithOptionalContact({
            accName: this.accName,
            accEmail: this.accEmail,
            accIndustry: this.accIndustry,
            accWebsite: this.accWebsite,
            createContact: this.showContact,
            conFirstName: this.conFirstName,
            conLastName: this.conLastName,
            conEmail: this.conEmail,
            conPhone: this.conPhone
        })
        .then(() => {
            this.showToast('Success', 'Records created successfully', 'success');
            this.resetForm();
        })
        .catch(error => {
            this.showToast('Error', error.body.message, 'error');
        });
    }

    showToast(title, message, variant) {
        this.dispatchEvent(new ShowToastEvent({
            title,
            message,
            variant
        }));
    }

    resetForm() {
        this.accName = '';
        this.accEmail = '';
        this.accIndustry = '';
        this.accWebsite = '';
        this.conFirstName = '';
        this.conLastName = '';
        this.conEmail = '';
        this.conPhone = '';
        this.showContact = false;
    }
}