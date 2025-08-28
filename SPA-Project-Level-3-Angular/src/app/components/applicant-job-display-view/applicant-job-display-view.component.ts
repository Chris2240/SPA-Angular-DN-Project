import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CsvDbService } from '../../services/csvDb.service';
import { IcsvDataForPopulate } from '../../models/icsv-data-for-populate.model';
import { ActivatedRoute } from '@angular/router';
import { ApplicantDataDbService } from '../../services/applicant-data-db.service';

@Component({
  selector: 'app-applicant-job-display-view',
  templateUrl: './applicant-job-display-view.component.html',
  styleUrl: './applicant-job-display-view.component.css'
})
export class ApplicantJobDisplayViewComponent implements OnInit, AfterViewInit{

  icsvDataPopulate: IcsvDataForPopulate = {
  'Role Category': '',
  'Role': '',
  'Location': '',
  'Industry': '',
  'Function': '',
  'Job Title': '',
  'Experience': '',
  'Salary': '',
  };
  
  constructor(private CsvDbService: CsvDbService, private route: ActivatedRoute, private applicantDataDbService: ApplicantDataDbService){};

  @ViewChild('applicantPprofileBtn') applicantPprofileBtnRef!: ElementRef<HTMLElement>;   // @ViewChild + templateRef(#applicantPprofileBtn) - using when we need to manipulate the element directtly, like pressing button
  @ViewChild('messageBtn') messageBtnRef!: ElementRef<HTMLElement>;

  // grabing native DOM elements this component using "@ViewChild" for collecting the values and passing them into "ApplicantDataDbService" service
  @ViewChild('applicantJobDisplayRoleCategoryDropDown') applicantJobDisplayRoleCategoryDropDownRef!: ElementRef<HTMLSelectElement>;
  @ViewChild('applicantJobDisplayRole') applicantJobDisplayRoleRef!: ElementRef<HTMLInputElement>;
  @ViewChild('applicantJobDisplayLocationComboBox') applicantJobDisplayLocationComboBoxRef!: ElementRef<HTMLSelectElement>;
  @ViewChild('applicantJobDisplayIndustry') applicantJobDisplayIndustryRef!: ElementRef<HTMLInputElement>;
  @ViewChild('applicantJobDisplayFunction') applicantJobDisplayFunctionRef!: ElementRef<HTMLInputElement>;
  @ViewChild('applicantJobDisplayJobTitle') applicantJobDisplayJobTitleRef!: ElementRef<HTMLInputElement>;
  @ViewChild('applicantJobDisplayExperience') applicantJobDisplayExperienceRef!: ElementRef<HTMLInputElement>;
  @ViewChild('applicantJobDisplaySalary') applicantJobDisplaySalaryRef!: ElementRef<HTMLInputElement>;

  // prevent user typing anything in inputs by binding [disabled] to this "readOnlyMode: boolean = true" (flag) in the HTML template
  readOnlyMode: boolean = true;
  

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const role = params['role'];

      if(role){
        this.populateIntoApplicantJobDisplayView(role);
      }
    });
  }

  
  ngAfterViewInit(): void {
    this.applicantProfileInputsCheckAndDisplayBtnsAtAJDV();
  }

  
  // all methods ------------------------------------------------
  
  async applyMessageBtn(): Promise<void>{

    alert("Thank you for your application.");
    
    try{      
        
        await this.storeToApplicantDataDbService();
        
      }catch(er){
          console.error(er);
        }
        
      // if error appearing in try catch block the "clearApplicantProfileLocalStorageDataKeys" it will clear localStorage anyway
      await this.clearApplicantProfileLocalStorageDataKeys();
  }


  populateIntoApplicantJobDisplayView(role: string): Promise<void>{

    return this.CsvDbService.initCSVIndexedDB().then((db: IDBDatabase) => {
        return new Promise((resolve, reject) => {

            const transactionRetrieve = db.transaction(['csvData_os'], "readonly");
            const objectStoreRetrieve = transactionRetrieve.objectStore('csvData_os');
            
            // Request the objet using the "Role" as the keyPath
            const requestRetrieveRole = objectStoreRetrieve.get(role);
    
            requestRetrieveRole.addEventListener("success", (ev: Event) => {
                const request = ev.target as IDBRequest;
                const data = request.result;
    
                if(data){

                    // delete "__parsed_extra" to prevent null value and also is unnecessary field
                    if(data.__parsed_extra){
                        // console.log("befoe deleting: ", data.__parsed_extra);  // checking if filed exist
                        delete data.__parsed_extra;
                        // console.log("after deleting: ", data.__parsed_extra);

                        // Populate fields with fetched data
                        this.icsvDataPopulate = {
                          'Role Category': data['Role Category'] || '',
                          'Role': data['Role'] || '',                          
                          'Location': data['Location'] || '',
                          'Industry': data['Industry'] || '',
                          'Function': data['Function'] || '',
                          'Job Title': data['Job Title'] || '',
                          'Experience': data['Experience'] || '',
                          'Salary': data['Salary'] || '',
                        }
                    }
                    else{   // if no "data.__parsed_extra" - do as follows
                                            
                        // Populate fields with fetched data
                        this.icsvDataPopulate = {
                          'Role Category': data['Role Category'] || '',
                          'Role': data['Role'] || '',                          
                          'Location': data['Location'] || '',
                          'Industry': data['Industry'] || '',
                          'Function': data['Function'] || '',
                          'Job Title': data['Job Title'] || '',
                          'Experience': data['Experience'] || '',
                          'Salary': data['Salary'] || '',
                        }
                    }
                }
                else{
                    console.log("No data found for 'Role'");
                }
                resolve();
                console.log("Data from \"Main View\" populated successfully");
            });

            requestRetrieveRole.addEventListener("error", (ev: Event) => {
                reject((ev.target as IDBRequest).error);    // "requestRetrieveRole" might not exist directly when handling errors so that why is "(ev.target as IDBRequest). ...."
                console.log("The 'Role' is faild to retrieve.");
            });

            // applicantProfileInputsCheckAndDisplayBtnsAtAJDV();
        });
    });

  }

  // checking if "Applicant Profile" page contain name, phone and email (at localStorage). Whatever exist or not, show or hide the following buttons in "Applicant Job Display View"
  applicantProfileInputsCheckAndDisplayBtnsAtAJDV():void{   // ...AJDV - Applicant Job Display View
    
    // taking references of DOM elements using "@ViewChlid" property decorator
    const applicantProfileLinkBtn = this.applicantPprofileBtnRef.nativeElement;
    const messageBtn = this.messageBtnRef.nativeElement;

    const lsApplicantProfileName = localStorage.getItem('applicant-profile-name');
    const lsApplicantProfilePhone = localStorage.getItem('applicant-phone');
    const lsApplicantProfileEmail = localStorage.getItem('applicant-email');

    if(lsApplicantProfileName && lsApplicantProfilePhone && lsApplicantProfileEmail){

      applicantProfileLinkBtn.style.display = 'none';
      messageBtn.style.display = 'block';
    }
    else{
      applicantProfileLinkBtn.style.display = 'block';
      messageBtn.style.display = 'none';
    }

  }

  // function which storing all necessary object fileds in new IDB
  async storeToApplicantDataDbService(): Promise<void>{
    const data = {
      "Role Category": this.applicantJobDisplayRoleCategoryDropDownRef.nativeElement.value,
      Role: this.applicantJobDisplayRoleRef.nativeElement.value,
      Location: this.applicantJobDisplayLocationComboBoxRef.nativeElement.value,
      Industry: this.applicantJobDisplayIndustryRef.nativeElement.value,
      Function: this.applicantJobDisplayFunctionRef.nativeElement.value,
      "Job Title": this.applicantJobDisplayJobTitleRef.nativeElement.value,
      Experience: this.applicantJobDisplayExperienceRef.nativeElement.value,
      Salary: this.applicantJobDisplaySalaryRef.nativeElement.value,

      // retriving data from LocalStorage
      "Applicant Name": localStorage.getItem('applicant-profile-name'),
      "Applicant Phone Number": localStorage.getItem('applicant-phone'),
      "Applicant Email": localStorage.getItem('applicant-email'),
      "Applicant Profile Picture": localStorage.getItem('applicant-profile-photo-src'),
      "Applicant CV": localStorage.getItem('applicant-profile-cv')
    }

    this.applicantDataDbService.storeApplicantProfileAndJobDisplayView(data);
  }

  async clearApplicantProfileLocalStorageDataKeys(): Promise<void>{

    // providing localStorage applicant profile fields to remove
    const lsFieldsToClear: string [] = [ 'applicant-profile-name', 'applicant-phone', 'applicant-email', 'applicant-profile-photo-src', 'applicant-profile-cv'];

    lsFieldsToClear.forEach(key =>{      
      localStorage.removeItem(key); // removing keys from array

      // updating UI in apllicant job display view buttons instead of using default web API methods as "location.reload();"
      this.messageBtnRef.nativeElement.style.display = 'none';
      this.applicantPprofileBtnRef.nativeElement.style.display = 'block';

      // clearing all inputs elemnets at "Applicant Profile" page after teransfering them into "ApplicantDataDbService" while after pressed "Apply" button
      this.applicantJobDisplayRoleCategoryDropDownRef.nativeElement.value = "";
      this.applicantJobDisplayRoleRef.nativeElement.value = "";
      this.applicantJobDisplayLocationComboBoxRef.nativeElement.value = "";
      this.applicantJobDisplayIndustryRef.nativeElement.value = "";
      this.applicantJobDisplayFunctionRef.nativeElement.value = "";
      this.applicantJobDisplayJobTitleRef.nativeElement.value = "";
      this.applicantJobDisplayExperienceRef.nativeElement.value = "";
      this.applicantJobDisplaySalaryRef.nativeElement.value = "";
    })

    console.log('Applicant Profile localStorage fileds are cleared for new applicant');
  }
}
