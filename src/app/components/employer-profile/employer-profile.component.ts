import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-employer-profile',
  templateUrl: './employer-profile.component.html',
  styleUrl: './employer-profile.component.css'
})
export class EmployerProfileComponent implements OnInit, AfterViewInit{

  // binding properties with elements on HTML component
  spanWelcomeName: string = '';
  employerNameInput: string = '';
  employerPhoneNrInput: string = '';
  employerEmailInput: string = '';

  @ViewChild('imageElement') imageElmenetRef!: ElementRef<HTMLImageElement>
  
  
  // Angular lifecycle hook: called once when the component is initialized.
  // use this to restore data or perform logic before the view is rendered.
  ngOnInit(): void {

    this.getEmployerWelcomeNameStored();  // loading employer name from localStorage
  }
  

  // Angular lifecycle hook: called after the view and child views have been fully initialized.
  // use this for logic that depends on the rendered DOM elements.
  ngAfterViewInit(): void {
    
    this.reloadImageFromLocalStorage();
  }
  
  // methods -------------------------------------------------------------

  // get welcome name from LS after reloading or returning into this page
  getEmployerWelcomeNameStored(): void{

    const savedName = localStorage.getItem('employer-profile-employer-name') || 'Employer Name';
    
    if(savedName){
      this.spanWelcomeName = savedName;
    }
  }

  // saving and clearing the input after blur
  getEmployerProfileWelcomeName(): void{

    if(this.employerNameInput.trim()){

      this.spanWelcomeName = this.employerNameInput.trim();
      localStorage.setItem('employer-profile-employer-name', this.spanWelcomeName);
      
      this.employerNameInput = '';
    }
  }

  // the image saving at localStorage is handled via "appSaveAndDisplayPicture" directive. This method is only for retriving the image from localStorage when the webpage is reolading.
  reloadImageFromLocalStorage(): void{
    const savedImageURL = localStorage.getItem('employer-profile-picture-src');

    if(savedImageURL){
      this.imageElmenetRef.nativeElement.src = savedImageURL;
    }
  }

  // validations methods for phone and email which are connected with the "Optional input properties - @Input phoneValidator?: () => boolean and @Input() emailValidator?: () => boolean;" at "SaveInputOnBlurDirective"
  // these @Input properties are triggered inside the directive and receive their corresponding validation methods from the host component via bindings in the HTML template.
  employerProfilePhoneValidation(): boolean{

    const mobileInput = this.employerPhoneNrInput.trim();
    const mobileRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;    // Match a all phone numbers even including "0" precede or country code

    if(mobileInput === ''){

      return true; // if no value skip the method
    }
    else if(mobileRegex.test(mobileInput)){
      return true; // number valid
    }
    else{
      alert("Invalid phone number or wrong format request. Please provide a valid phone number");
      return false;
    }
  }

  employeProfileEmailValidation(): boolean{
    
    const emailInput = this.employerEmailInput.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(emailInput === ''){

      return true;  // if no value skip the method
    }
    else if(emailRegex.test(emailInput)){
      
      return true;  // if correct email than pass validation
    }
    else{
      
      alert("Invalid email or wrong format request. Please provide a valid email");
      return false;
    }
  }


}
