import { LightningElement, api, track, wire } from 'lwc';
import getPrescriptionDetails from '@salesforce/apex/PrescriptionDetailController.getPrescriptionDetails';

export default class PrescriptionDetail extends LightningElement {

    /** Provided automatically when placed on a Prescription__c record page */
    @api recordId;

    @track prescription = null;
    @track isLoading    = true;
    @track hasError     = false;
    @track errorMessage = '';

    // ── Wire: fires whenever recordId is available ────────────────────────
    @wire(getPrescriptionDetails, { recordId: '$recordId' })
    wiredPrescription({ error, data }) {
        this.isLoading = false;

        if (data) {
            this.prescription = data;
            this.hasError     = false;
        } else if (error) {
            this.hasError     = true;
            this.errorMessage = error.body?.message || 'Unknown error occurred.';
        }
    }

    // ── Computed ──────────────────────────────────────────────────────────

    /** True only when data is present and error-free */
    get hasData() {
        return !this.isLoading && !this.hasError && this.prescription != null;
    }

    /** Human-readable date, e.g. "May 25, 2026" */
    get formattedDate() {
        if (!this.prescription?.prescriptionDate) return '—';
        const d = new Date(this.prescription.prescriptionDate);
        return d.toLocaleDateString('en-US', {
            year: 'numeric', month: 'long', day: 'numeric'
        });
    }

    // ── Actions ───────────────────────────────────────────────────────────
    handlePrint() {
        window.print();
    }
}