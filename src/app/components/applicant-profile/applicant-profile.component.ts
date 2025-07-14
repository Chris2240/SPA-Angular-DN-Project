import { Component, ElementRef, OnInit, ViewChild, AfterViewInit} from '@angular/core';

@Component({
  selector: 'app-applicant-profile',
  templateUrl: './applicant-profile.component.html',
  styleUrl: './applicant-profile.component.css'
})
export class ApplicantProfileComponent implements OnInit, AfterViewInit{

  applicantProfileInputName: string = '';
  spanWelcomeName: string = '';  // for display in the welcome span
  applicantPhone: string = '';  // [(ngModel)]="applicantPhone" - two-way binding (very handy for keeping input and component property in sync)
  applicantEmail: string = '';
  cvAnchorText: string = '';

  // use @ViewChild() to get a reference to that <img> element 
  @ViewChild('imageReload') imageReloadRef!: ElementRef<HTMLImageElement>;
  @ViewChild('cvAnchorLink') cvAnchorLinkRef!: ElementRef<HTMLAnchorElement>;
  @ViewChild('cvInput') cvInputRef!: ElementRef<HTMLInputElement>;
  

  ngOnInit(): void {  // - updating after reloading or come backing to this current page - this is for all properties, variables, services
    
    const savedName = localStorage.getItem('applicant-profile-name') || "Applicant Name (Entered)";
    if(savedName){      
      this.spanWelcomeName = savedName;
    }

    this.alreadySavedCv();
    
  }


  // updating after reloading all references from "@ViewChild", "imageReloadRef" etc
  ngAfterViewInit(): void {
    this.reloadImageFromLocalSorage();
    this.restoreCvFromLocalStorage();
  }


  // All methods  ------------------------------------------------------------------------------



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

  // reload the image from localStorage for ngAfterViewInit(), to keep image appear after reloading
  reloadImageFromLocalSorage():void{
    const ImageDataUrl = localStorage.getItem('applicant-profile-photo-src');

    if(ImageDataUrl){
      this.imageReloadRef.nativeElement.src = ImageDataUrl;
    }
  }

  // saving CV and restore from localStorage
  saveCvAtLocalStorageAndRestore(): void{

    const inputEl = this.cvInputRef.nativeElement;
    const files = inputEl.files;

    if(!files || files.length === 0){
    return; // exit if no piture provided
    }

    // get the selected file and converting into data url
    const file = files[0];
    const cvFileReader = new FileReader();

    // checking file type
    const cvFileType = file.type;

    // set up file reading based on file type
    if(cvFileType === "text/plain"){

      // for text files
      cvFileReader.readAsText(file);
    }
    else if(cvFileType === "application/pdf" ||
      cvFileType === "application/rtf" ||
      cvFileType === "application/msword" ||    // for .doc
      cvFileType === "application/vnd.openxmlformats-officedocument.wordprocessingml.document")  // for .docx
    {
      // start reading the CV file as data URL
      cvFileReader.readAsDataURL(file);
    }

    // store the file content when the file is loaded 
    cvFileReader.addEventListener('load', () => {
      const CvDataUrl = cvFileReader.result as string; // ensure is a string

      // save cv into lcalStorage
      localStorage.setItem('applicant-profile-cv', CvDataUrl);

      // restore cv
      this.restoreCvFromLocalStorage();
        
    })

  }

  // restore cv from localStorage - this logic provide in seperate method because is reusable in ngAfterViewInit()
  restoreCvFromLocalStorage(): void{

    const cvDownloadLink = this.cvAnchorLinkRef.nativeElement;
    
    const storedCv = localStorage.getItem('applicant-profile-cv');

      if(storedCv && cvDownloadLink){
        cvDownloadLink.href = storedCv;
        cvDownloadLink.setAttribute('download', `${this.spanWelcomeName} CV`);
        this.cvAnchorText = 'Download CV';
      }
  }

  // already seved cv - preventing exception from default cv anchor text "No CV Available (Additional Button)" after reloading page
  alreadySavedCv(): void{
    
    const savedCv = localStorage.getItem('applicant-profile-cv');
    if (savedCv) {
      this.cvAnchorText = 'Download CV';
    } else {
      this.cvAnchorText = 'No CV Available (Additional Button)';
    }
  }

}
