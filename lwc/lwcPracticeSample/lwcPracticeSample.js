import { LightningElement, track } from 'lwc';

export default class LwcPracticeSample extends LightningElement {

    // value = 10;
    // name = "kishore";
    // bool = true;
    // arr = [1,2,"a","b"];
    // obj = {
    //     name : "obj name",
    //     age : 20
    // }
    // defaultVal = "Salesforce is supreme"
    // changeVal = this.defaultVal;
    // handleChange(event){
    //     this.defaultVal = event.target.value;
    // }
    // handleClick(){
    //     this.changeVal = this.defaultVal;
    // }
    //--------------------------- Track properties in array and objects -------------------
    // @track address = {
    //     city : 'vijayawada',
    //     postcode : '520011',
    //     state : 'AP'
    // }
    // address = {
    //     city : 'vijayawada',
    //     postcode : '520011',
    //     state : 'AP'
    // }

    // handleChange(event){
    //     // this is for track thing : this.address.city = event.target.value
    //     // best practice is 
    //     this.address = { ...this.address, "city" : event.target.value}
    // }

    //----------------------- Getters in LWC --------------------------
    // val1 = 20;
    // val2 = 15;
    // get getSum(){
    //     return this.val1 * this.val2;
    // }

    //------------------------ conditional rendering --------------------------
    label = "Show Data";
    isVisible = false
    handleClick(){
        if(this.label === "Show Data"){
            this.label = "Hide Data";
            this.isVisible = true;
        }else{
            this.label = "Show Data";
            this.isVisible = false;
        }
    }

    // ------------------------ looping through for each -------------------
    
    emojiList = ["😊","😂","🤣","❤️","😍","😒","👌","😘","💕","😁","👍","🙌","🤦‍♀️","🤦‍♂️","🤷‍♀️","🤷‍♂️","✌️","🤞","😉","😎"]

}