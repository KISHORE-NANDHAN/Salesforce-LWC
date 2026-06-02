import { LightningElement, track } from 'lwc';
import signup from '@salesforce/apex/LoginSignupController.signup';
import login from '@salesforce/apex/LoginSignupController.login';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class LoginSignup extends LightningElement {

    @track isLogin = true;
    @track isSignup = false;
    @track isSuccess = false;

    // Login fields
    loginUsername = '';
    loginPassword = '';

    // Signup fields
    fullName = '';
    email = '';
    username = '';
    password = '';

    // Toggle forms
    showSignup() {
        this.isLogin = false;
        this.isSignup = true;
        this.isSuccess = false;
    }

    showLogin() {
        this.isLogin = true;
        this.isSignup = false;
        this.isSuccess = false;
    }

    handleLogout() {
        this.showLogin();
        this.loginUsername = '';
        this.loginPassword = '';
    }

    // Handle Login Input
    handleLoginChange(event) {
        const label = event.target.label;
        if (label === 'Username') this.loginUsername = event.target.value;
        if (label === 'Password') this.loginPassword = event.target.value;
    }

    // Handle Signup Input
    handleSignupChange(event) {
        const label = event.target.label;

        if (label === 'Full Name') this.fullName = event.target.value;
        if (label === 'Email') this.email = event.target.value;
        if (label === 'Username') this.username = event.target.value;
        if (label === 'Password') this.password = event.target.value;
    }

    // ✅ LOGIN LOGIC UPDATED
    handleLogin() {
        login({
            username: this.loginUsername,
            password: this.loginPassword
        })
        .then(result => {
            if (result === 'LOGIN_SUCCESS') {
                // ✅ Switch to success UI
                this.isLogin = false;
                this.isSignup = false;
                this.isSuccess = true;
            } else {
                this.showToast('Error', 'Invalid Username or Password ❌', 'error');
            }
        })
        .catch(error => {
            this.showToast('Error', error.body.message, 'error');
        });
    }

    // SIGNUP FUNCTION
    handleSignup() {
        signup({
            fullName: this.fullName,
            email: this.email,
            username: this.username,
            password: this.password
        })
        .then(result => {
            if (result === 'EMAIL_EXISTS') {
                this.showToast('Error', 'Email already exists ❌', 'error');
            } else {
                this.showToast('Success', 'Signup Successful ✅', 'success');
                this.showLogin();
            }
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
}