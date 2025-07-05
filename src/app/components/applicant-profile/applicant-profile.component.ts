import { Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-applicant-profile',
  templateUrl: './applicant-profile.component.html',
  styleUrl: './applicant-profile.component.css'
})
export class ApplicantProfileComponent implements OnInit{

  applicantProfileInputName: string = '';
  spanWelcomeName: string = '';  // for display in the welcome span
  applicantPhone: string = '';  // [(ngModel)]="applicantPhone" - two-way binding (very handy for keeping input and component property in sync)
  applicantEmail: string = '';

  
  ngOnInit(): void {  // - updating after reloading or come backing to this current page
    
    const savedName = localStorage.getItem('applicant-profile-name') || "Applicant Name (Entered)";
    if(savedName){      
      this.spanWelcomeName = savedName;
    }
  }


  // All methods

  applicantProfileStoreWelcomeName(){ // easier achive the name from localstorage after save it and retriving locally like is in this exapmle
                                      // if I would do from my own directive "SaveInputOnBlurDirective" is more complicated (cross-component communication) plus modifying own directive code 
                                      // which this directive should be just for saving data in localStorage NOT retriving it
    
    if(this.applicantProfileInputName.trim()){

      this.spanWelcomeName = this.applicantProfileInputName.trim();
      localStorage.setItem("applicant-profile-name", this.spanWelcomeName);
      this.applicantProfileInputName = "";
    }
  }

  // validation for applicant mobile phone
  applicantValidateMobileInput(): boolean {

    const mobileValue = this.applicantPhone.trim();
    const mobileRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;    // Match a all phone numbers even including "0" precede or country code

    if (mobileValue === "") {
        return true;
    }
    else if (mobileRegex.test(mobileValue)) {        
        return true;    // Mobile valid
    }    
    else {
        alert("Invalid phone number or wrong format request. Please provide a valid phone number");
        return false;
    }
  }


  // validation for applicant email
  applicantValidateEmailInput(){
    
    const emailValue = this.applicantEmail.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (emailValue === "") {
        return true;    // Skip the validation if the field is empty
    }
    else if (emailRegex.test(emailValue)) {
        return true;    // Email is valid
    }    
    else {
        alert("Please enter a valid email address");
        return false;   // Prevent saving data if email is invalid
    }
  }
}
