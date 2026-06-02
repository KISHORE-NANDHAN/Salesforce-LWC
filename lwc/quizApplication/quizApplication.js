import { LightningElement } from 'lwc';

export default class QuizApplication extends LightningElement {

    myQuestions = [
        {
            id : 1,
            question : "Which Salesforce feature should you use to automatically route a support case to a specific queue based on the case origin?",
            answers : {
                a : "Workflow Rules",
                b : "Assignment Rules",
                c : "Validation Rules",
                d : "Escalation Rules",
            },
            correct_answer : "b"
        },
        {
            id : 2,
            question : "What is the primary purpose of a Junction Object in Salesforce?",
            answers : {
                a : "To create a many-to-many relationship between two objects",
                b : "To connect Salesforce with external databases",
                c : "To merge duplicate lead records automatically",
                d : "To bypass validation rules for system administrators",
            },
            correct_answer : "a"
        },
        {
            id : 3,
            question : "Which of the following automation tools can be used to pause an execution until a specific date or time criteria is met?",
            answers : {
                a : "Validation Rule",
                b : "Formula Field",
                c : "Salesforce Flow",
                d : "Quick Action",
            },
            correct_answer : "c"
        },
        {
            id : 4,
            question : "A user is complaining that they cannot see a custom object tab in the navigation bar. Which two settings should an administrator check? (Assume standard navigation)",
            answers : {
                a : "Organization-Wide Defaults (OWD) and Sharing Rules",
                b : "Profile Tab Settings and App Navigation Settings",
                c : "Page Layouts and Field-Level Security",
                d : "Permission Set Licenses and Role Hierarchy",
            },
            correct_answer : "b"
        },
        {
            id : 5,
            question : "What happens to child records in a Master-Detail relationship if the parent record is deleted?",
            answers : {
                a : "The child records are converted into standalone records.",
                b : "The child records remain, but the master field becomes blank.",
                c : "The child records are automatically deleted.",
                d : "The system prevents the deletion of the parent record entirely.",
            },
            correct_answer : "c"
        }
    ]
    selected={} // for storing answers
    correctAnswers = 0 //to show the number of correct answers
    isSubmitted = false // use to show the result
    get allNotSelected(){
        return !(Object.keys(this.selected).length === this.myQuestions.length)
    }

    // for applying dynamic styling to our result
    get isScoredFull(){
        return `slds-text-heading_large ${this.myQuestions.length === this.correctAnswers?
            'slds-text-color_success':'slds-text-color_error'}`
    }
    // changeHandler get's called on every click on the options
    changeHandler(event){
        const {name, value} = event.target 
        this.selected={...this.selected, [name]:value}
    }
    //form submit handler
    submitHandler(event){
        event.preventDefault()
        let correct = this.myQuestions.filter(item=>this.selected[item.id] === item.correct_answer)
        this.correctAnswers = correct.length
        this.isSubmitted = true
    }
    //form reset handler
    resetHandler(){
        this.selected ={}
        this.correctAnswers=0
        this.isSubmitted = false
    }
}