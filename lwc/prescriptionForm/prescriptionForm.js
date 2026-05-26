import { LightningElement, track } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { CloseActionScreenEvent } from 'lightning/actions';
import createPrescriptionWithItems from '@salesforce/apex/PrescriptionController.createPrescriptionWithItems';

// ─── Constants ───────────────────────────────────────────────────────────────

/** Returns a blank prescription-item row with a unique id. */
const blankItem = (id) => ({
    id,
    Medicine__c: '',
    Quantity__c: '',
    Description__c: ''
});

/** Extract a scalar value from a lookup (array) or plain input event. */
const resolveValue = (event) => {
    // lightning-input  → event.target.value
    // lightning-input-field (lookup) → event.detail.value  (may be array)
    const raw =
        event.detail && event.detail.value !== undefined
            ? event.detail.value
            : event.target.value;

    // Lookup fields return an array of IDs; take the first element.
    return Array.isArray(raw) ? raw[0] ?? '' : raw ?? '';
};

// ─── Component ───────────────────────────────────────────────────────────────

export default class PrescriptionForm extends LightningElement {

    // ── Parent record fields ─────────────────────────────────────────────────
    patientId        = '';
    doctorId         = '';
    prescriptionDate = '';

    // ── Child item rows ──────────────────────────────────────────────────────
    @track prescriptionItems = [blankItem('row-1')];

    // ── UI state ─────────────────────────────────────────────────────────────
    isSaving     = false;
    _rowCounter  = 1;           // private; incremented only via handleAddRow

    // ── Derived getters ──────────────────────────────────────────────────────

    /** True when at least one item row exists (drives template if:true). */
    get hasItems() {
        return this.prescriptionItems.length > 0;
    }

    // ─────────────────────────────────────────────────────────────────────────
    // Event Handlers
    // ─────────────────────────────────────────────────────────────────────────

    /**
     * Prevent the lightning-record-edit-form from performing its own
     * platform DML on submit. All saves go through the Apex method.
     */
    handlePreventDefaultSubmit(event) {
        event.preventDefault();
    }

    // ── Parent fields ────────────────────────────────────────────────────────

    handleParentChange(event) {
        const fieldId = event.target.dataset.id;
        const value   = resolveValue(event);

        switch (fieldId) {
            case 'patient': this.patientId        = value; break;
            case 'doctor':  this.doctorId         = value; break;
            case 'date':    this.prescriptionDate = value; break;
            default:
                console.warn(`[PrescriptionForm] Unrecognised parent field: ${fieldId}`);
        }
    }

    // ── Item rows ────────────────────────────────────────────────────────────

    handleItemChange(event) {
        const rowId = event.target.dataset.rowid;
        const field = event.target.dataset.field;

        // Lookup fields (Medicine__c) return an array; resolve to scalar.
        const value = resolveValue(event);

        this.prescriptionItems = this.prescriptionItems.map(item =>
            item.id === rowId ? { ...item, [field]: value } : item
        );
    }

    handleAddRow() {
        this._rowCounter++;
        this.prescriptionItems = [
            ...this.prescriptionItems,
            blankItem(`row-${this._rowCounter}`)
        ];
    }

    handleDeleteRow(event) {
        const rowId = event.target.dataset.rowid;

        if (this.prescriptionItems.length <= 1) {
            this._showToast('Warning', 'At least one prescription item is required.', 'warning');
            return;
        }

        this.prescriptionItems = this.prescriptionItems.filter(
            item => item.id !== rowId
        );
    }

    // ── Form actions ─────────────────────────────────────────────────────────

    handleResetForm() {
        this._resetForm();
    }

    handleSave() {
        if (!this._validateForm()) return;

        this.isSaving = true;

        const prescriptionRecord = {
            Patient__c:    this.patientId,
            Doctor_Name__c: this.doctorId,
            Date__c:       this.prescriptionDate
        };

        const itemRecords = this.prescriptionItems.map(({ Medicine__c, Quantity__c, Description__c }) => ({
            Medicine__c,
            Quantity__c,
            Description__c
        }));

        createPrescriptionWithItems({ prescription: prescriptionRecord, items: itemRecords })
            .then(() => {
                this._showToast('Success', 'Prescription created successfully.', 'success');
                this._resetForm();
                this.dispatchEvent(new CloseActionScreenEvent());
            })
            .catch(error => {
                const msg = error?.body?.message || error?.message || 'An unexpected error occurred.';
                this._showToast('Error', msg, 'error');
            })
            .finally(() => {
                this.isSaving = false;
            });
    }

    // ─────────────────────────────────────────────────────────────────────────
    // Private helpers
    // ─────────────────────────────────────────────────────────────────────────

    /**
     * Validate parent fields and every item row.
     * Returns true if all validations pass; shows a toast and returns false otherwise.
     */
    _validateForm() {
        // ── Parent fields ──────────────────────────────────────────────────
        if (!this.patientId) {
            this._showToast('Error', 'Patient is required.', 'error');
            return false;
        }
        if (!this.doctorId) {
            this._showToast('Error', 'Doctor is required.', 'error');
            return false;
        }
        if (!this.prescriptionDate) {
            this._showToast('Error', 'Prescription date is required.', 'error');
            return false;
        }

        // ── Item rows ──────────────────────────────────────────────────────
        if (!this.prescriptionItems.length) {
            this._showToast('Error', 'Add at least one prescription item.', 'error');
            return false;
        }

        const invalidIndex = this.prescriptionItems.findIndex(
            item => !item.Medicine__c || !item.Quantity__c
        );
        if (invalidIndex !== -1) {
            this._showToast(
                'Error',
                `Row ${invalidIndex + 1}: Medicine and Quantity are required.`,
                'error'
            );
            return false;
        }

        return true;
    }

    /** Reset all state back to initial values. */
    _resetForm() {
        this.patientId        = '';
        this.doctorId         = '';
        this.prescriptionDate = '';
        this._rowCounter      = 1;
        this.prescriptionItems = [blankItem('row-1')];
    }

    /** Centralised ShowToastEvent dispatcher. */
    _showToast(title, message, variant) {
        this.dispatchEvent(new ShowToastEvent({ title, message, variant }));
    }
}