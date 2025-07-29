import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CsvDbService } from '../../services/csvDb.service';
import { IcsvDataItem } from '../../models/icsv-data-item.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrl: './main-view.component.css'
})
export class MainViewComponent implements OnInit, AfterViewInit {

  // getting the references of DOM elements using @ViewChild() property decorator
  @ViewChild('applicantProfileLink') applicantProfileLinkRef!: ElementRef<HTMLAnchorElement>;
  @ViewChild('employerProfileLink') employerProfileLinkRef!: ElementRef<HTMLAnchorElement>;

  csvData: IcsvDataItem[] = []; // array of objects typed with IcsvDataItem interface, used in "*ngFor" directive in the html template
  constructor(private CsvDbService: CsvDbService, private router: Router) {} // services are injected ALWAYS through the constructor
  

  // ngOnInit
  ngOnInit(): void {
    this.loadCSVDatafromIDBandDisplayInTable();
  }

  // ngAfterViewInit 
  ngAfterViewInit(): void {
    this.hideApplicantProfileBtnsAtMainView();  // - because I have used the reference from @ViewChild property decorator which is inside this method and methodwill only works in this "ngAfterViewInit()"
    this.hideEmployerProfileBtnAtMainView();
  }

  //functions
  loadCSVDatafromIDBandDisplayInTable(): Promise<void> { // Declaring Promise<void> indicates that the function is asynchronous and resolves once the task (loading and displaying data) is complete
                                                          // Function is not to return data but to load it from IndexedDB and populate the table directly(updating the DOM - side effect)

    return this.CsvDbService.initCSVIndexedDB().then((db: IDBDatabase) => {

        const loadCSVTransaction = db.transaction(['csvData_os'], "readonly");
        const loadCSVStoreObject = loadCSVTransaction.objectStore('csvData_os');
        const loadRequestCSVData = loadCSVStoreObject.getAll();

        loadRequestCSVData.addEventListener("success", (ev: Event) => {
            const request = ev.target as IDBRequest<IcsvDataItem[]>;   // properly type the result as an array of IcsvDataItem
            const csvDataLoad = request.result;

            // Clean up extra PapaParse "__parsed_extra" field
            this.csvData = csvDataLoad.map(item => {
              // console.log("before delete:", item);   // for checking purpouses
              delete item.__parsed_extra;
              // console.log("showing deleted item: ", item.__parsed_extra) // for checking purpouses
              return item;
            });
            
            console.log("The 'CVS' data is imported from \"CSVDataIDB\" and loaded into 'MainViewComponent' table successfully");
        });

        loadRequestCSVData.addEventListener("error", () => {
          console.error("Error loading data from IDB");
        })
    });
  };


  detailsBtn(role :string): void{     // ev: MouseEvent - if we will use "anchor" instead "button" selector
    // ev.preventDefault();           // can be commented the prevent default because the button does not trigger a page refresh or scroll by default.

    // pass the role as a route parameter or query param
    this.router.navigate(['/applicant-job-display-view-page'], {
      queryParams: {role}
    });
  }


  // hide "Applicant Profile" anchor button in Main View page if "Applicant Profile" page contains name, phone, and email
  hideApplicantProfileBtnsAtMainView():void{

    // accessing the native HTML anchor element from the @ViewChild reference
    const applicantProfileBtn = this.applicantProfileLinkRef.nativeElement;

    const applicantProfileName = localStorage.getItem('applicant-profile-name');
    const applicantProfilePhone = localStorage.getItem('applicant-phone');
    const applicantProfileEmail = localStorage.getItem('applicant-email');

    if(applicantProfileName && applicantProfilePhone && applicantProfileEmail){

      applicantProfileBtn.style.display = 'none'
    }
  }

  // hide "Employer Profile" anchor button in Main View page if "Employer Profile" page contains company name, website, company logo, employer name, phone, email and profile picture
  hideEmployerProfileBtnAtMainView(): void{

    // accessing the native HTML anchor element from the @ViewChild reference
    const employerProfileBtn = this.employerProfileLinkRef.nativeElement;

    // retrieving employer data from localStorage if exist, if so - hide this navigate anochor button at Main View page
    const employerProfileCompanyName = localStorage.getItem('employer-profile-company-name');
    const employerProfileCompanyWebsiete = localStorage.getItem('employer-profile-company-website');
    const employerProfileCompanyLogo = localStorage.getItem('employer-profile-company-logo');
    const employerProfileName = localStorage.getItem('employer-profile-employer-name');
    const employerProfilePhone = localStorage.getItem('employer-profile-phone');
    const employerProfileEmail = localStorage.getItem('employer-profile-email');
    const employerProfilePicture = localStorage.getItem('employer-profile-picture-src');

    if(employerProfileCompanyName && employerProfileCompanyWebsiete && employerProfileCompanyLogo &&
       employerProfileName && employerProfilePhone && employerProfileEmail && employerProfilePicture){

        employerProfileBtn.style.display = 'none';
    }

  }

}
