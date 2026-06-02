import { LightningElement, track } from 'lwc';

export default class StudentCmp extends LightningElement {

    @track student = {
        name: '',
        phoneNum : '',
        email : '',
        address : '',
    }

    handleStudentInfo(event){
        let field = event.target.name;
        if(field === 'sName'){
            this.student.name = event.target.value;
        }else if(field === 'sPhone'){
            this.student.phoneNum = event.target.value
        }else if(field === 'sEmail'){
            this.student.email = event.target.value
        }else if(field === 'sAddress'){
            this.student.address = event.target.value
        }

        console.log(JSON.stringify(this.student));
    }

}