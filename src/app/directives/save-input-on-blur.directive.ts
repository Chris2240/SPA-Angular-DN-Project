import { Directive, ElementRef, HostListener } from '@angular/core';
import { ApplicantProfileComponent } from '../components/applicant-profile/applicant-profile.component';

@Directive({
  selector: '[appSaveInputOnBlur]'
})
export class SaveInputOnBlurDirective {
  
  constructor( private el: ElementRef<HTMLInputElement>, private applicantProfileComponent: ApplicantProfileComponent) { }

  @HostListener('blur') onBlur(): void{
    const inputEl = this.el.nativeElement;

    const inputId = inputEl.id;
    const inputValue = inputEl.value.trim();

    if(!inputId || inputValue === ''){    // if no "id" or value is empty simply exit 
      return
    }

    // delegate validation to the host component if available
    // this preventing saving input data at local storage if validation faild
    switch (inputId){
      case "applicant-phone":
        const isValidApplicantPhone = this.applicantProfileComponent.applicantValidateMobileInput();

        if(!isValidApplicantPhone){
          inputEl.value = '';
          return;
        }
        break;

      case "applicant-email":
        const isValidApplicantEmail = this.applicantProfileComponent.applicantValidateEmailInput();

        if(!isValidApplicantEmail){
          inputEl.value = '';
          return
        }
        break;
    }

    // find the associated label
    const associatedLabel = document.querySelector(`label[for="${inputId}"]`);

    if(inputValue !== "" && associatedLabel){

      try{
        
        localStorage.setItem(inputId, inputValue);
        console.log(`The ${inputValue} is saved at ${inputId} local storage`)        
        
        inputEl.value = ''  // clearing input value
      
      }catch(er){
        console.error("Failed to save input value:", er);
      }
    }
  }

}
