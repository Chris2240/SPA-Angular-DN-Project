import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DbService } from '../../services/db.service';
import { IcsvDataForApplicantJobDisplayView } from '../../models/icsv-data-for-applicant-job-display-view.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-applicant-job-display-view',
  templateUrl: './applicant-job-display-view.component.html',
  styleUrl: './applicant-job-display-view.component.css'
})
export class ApplicantJobDisplayViewComponent implements OnInit, AfterViewInit{

  csvData: IcsvDataForApplicantJobDisplayView = {
  'Role Category': '',
  'Role': '',
  'Location': '',
  'Industry': '',
  'Function': '',
  'Job Title': '',
  'Experience': '',
  'Salary': '',
  };
  
  constructor(private dbService: DbService, private route: ActivatedRoute){};

  @ViewChild('applicantPprofileBtn') applicantPprofileBtnRef!: ElementRef<HTMLElement>;   // @ViewChild + templateRef(#applicantPprofileBtn) - using when we need to manipulate the element directtly, like pressing button
  @ViewChild('messageBtn') messageBtnRef!: ElementRef<HTMLElement>;
  

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const role = params['role'];

      if(role){
        this.populateIntoApplicantJobDisplayView(role);
      }
    });
  }

  
  ngAfterViewInit(): void {
    this.hideMessageBtn();
  }

  
  // all methods
  async applyMessageBtn(): Promise<void>{

    alert("Thank you for your application.");
    
    try{

        // later async logic
        
      }catch(er){
          console.error(er);
        }
        
        // later async logic
  }


  populateIntoApplicantJobDisplayView(role: string): Promise<void>{

    return this.dbService.initCSVIndexedDB().then((db: IDBDatabase) => {
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
                        this.csvData = {
                          'Role Category': data['Role Category'] || '',
                          'Role': data['Role'] || '',                          
                          'Location': data['Location'] || '',
                          'Industry': data['Industry'] || '',
                          'Function': data['Function'] || '',
                          'Job Title': data['Job Title'] || '',
                          'Experience': data['Experience'] || '',
                          'Salary': data['Salary'] || '',
                        }
                    };                    
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

            // checking if "Applicant Profile" page contain name, phone and email. Whatever exist or not, show or hide the following buttons in "Applicant Job Display View"
            // also this method need to invoking here rather then at "UpdatePageContent" method (where all pages contents invokes in if statements blocks), just for in case if the page "Applicant Job Display View" it will reload for some reason, then the values are will disappear and applicant would not able to apply any more (even if name, phone, and email are present at localStorage)
            // applicantProfileInputsCheckAndDisplayBtnsAtAJDV();
        });
    });

  }

  
  hideMessageBtn(): void{
    const applicantPprofileBtn = this.applicantPprofileBtnRef.nativeElement;
    const messageBtn = this.messageBtnRef.nativeElement;

    if(applicantPprofileBtn && messageBtn){
      applicantPprofileBtn.style.display = "block";
      messageBtn.style.display = "none";
    }
  }
}
