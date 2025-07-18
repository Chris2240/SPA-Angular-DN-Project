import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appSaveInputOnBlur]'
})
export class SaveInputOnBlurDirective {
  
  // Optional input properties used to pass validation methods from the host component.
  // These functions should return a boolean indicating whether the phone or email input is valid.
  // Used by the directive to validate input before saving to localStorage.
  @Input() phoneValidator?: () => boolean;
  @Input() emailValidator?: () => boolean;
  
  constructor( private el: ElementRef<HTMLInputElement>) { }

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

        if(this.phoneValidator && !this.phoneValidator()){      // If the validator exists, and it returns false: treat it as invalid
                                                                // this.phoneValidator — checks if the function exists / !this.phoneValidator() — calls the function and negates its result.
          inputEl.value = '';
          return;
        }
        break;

      case "applicant-email":

        if(this.emailValidator && !this.emailValidator()){
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
