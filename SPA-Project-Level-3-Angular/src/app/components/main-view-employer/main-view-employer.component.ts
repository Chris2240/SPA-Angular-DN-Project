import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ApplicantDataDbService } from '../../services/applicant-data-db.service';
import { CsvDbService } from '../../services/csvDb.service';
import { IcsvDataItem } from '../../models/icsv-data-item.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-view-employer',
  templateUrl: './main-view-employer.component.html',
  styleUrl: './main-view-employer.component.css'
})
export class MainViewEmployerComponent implements AfterViewInit, OnInit {

  // binding HTML elements
  applicantsAppliesAnchorText: string = 'Applicant(s) Applies (Additional Page)';
  hasApplicants: boolean = false;
  isEmployerName: boolean = false;
  spanEmployerNameText: string = '';

  @ViewChild('companyLogoImageElement') companyLogoImageElementRef!: ElementRef<HTMLImageElement>
  @ViewChild('employerImageElement') employerImageElementRef!: ElementRef<HTMLImageElement>


  csvData: IcsvDataItem[] = []; // array of objects typed with IcsvDataItem interface, used in "*ngFor" directive in the html template
  constructor(private applicantDataDbService: ApplicantDataDbService, private csvDbService: CsvDbService, private router: Router){};
  

  ngOnInit(): void {
    this.retrivingEmployerNameFromLS();
    this.checkIfApplicantsExist();

    this.loadCSVdataIDBatMainViewEmployerTable();
  }

  ngAfterViewInit(): void {
    this.retrievingCompanyLogoFromLS();
    this.retrievingEmployerImageFromLS()
  }

  // methods --------------------------------------------------------

  async checkIfApplicantsExist(): Promise<void>{
    
    return this.applicantDataDbService.initApplicantProfileAndJobDisplayView().then((db: IDBDatabase) => {

      // start transaction and open the object store
      const trans = db.transaction(['ApplicantProfileAndJobDisplayView_os'], 'readonly');
      const objStore = trans.objectStore('ApplicantProfileAndJobDisplayView_os');

      // use count method to check if there are any records in the object store
      const countRequest = objStore.count();

      countRequest.addEventListener('success', () => {
        const count = countRequest.result;
        this.hasApplicants  = count > 0;

        if(!this.hasApplicants){
          this.applicantsAppliesAnchorText = ' NO Applicant(s) Applies (Additional Page)';
        }
      });

      countRequest.addEventListener("error", () => {
            console.error("Error counting records in IDB: ", countRequest.error);
        });
    }).catch(error =>{
        console.error("Error opening IndexedDB or starting transaction: ", error);
    });
  }

  // showing alert if no applicants exists
  noApplicantAlert(): void{

    alert('There is NO applicants applied so far');
  }

  retrievingCompanyLogoFromLS(): void{

    const storedLogo = localStorage.getItem('employer-profile-company-logo');
    const companyLogo = this.companyLogoImageElementRef.nativeElement;

    if(storedLogo){
      companyLogo.src = storedLogo;
    }
  }

  retrivingEmployerNameFromLS(): void{

    const storedEmployerName = localStorage.getItem('employer-profile-employer-name');
    
    if(this.isEmployerName){
      this.spanEmployerNameText = 'Employer Name';
    }
    else{
      this.spanEmployerNameText = storedEmployerName?.trim() || 'Employer Name';
    }
  }

  retrievingEmployerImageFromLS(): void{

    const storedEmployerImage = localStorage.getItem('employer-profile-picture-src');
    const employerImage = this.employerImageElementRef.nativeElement;

    if(storedEmployerImage){
      employerImage.src = storedEmployerImage;
    }
  }

  
  async loadCSVdataIDBatMainViewEmployerTable(): Promise<void> {    // CHECK IF THIS METHOD CAN BE IMPLEMENT ATHER WAY.. MORE ANGULAR WAY

    return this.csvDbService.initCSVIndexedDB().then((db: IDBDatabase) => {

        const trans = db.transaction(['csvData_os'], "readonly");
        const storeObj = trans.objectStore('csvData_os');
        const requestCSVData = storeObj.getAll();

        requestCSVData.addEventListener("success", (ev: Event) => {
            const request = ev.target as IDBRequest<IcsvDataItem[]>;   // properly type the result as an array of IcsvDataItem
            const csvData = request.result;

            // Clean up extra PapaParse "__parsed_extra" field
            this.csvData = csvData.map(item => {
              // console.log("before delete:", item);   // for checking purpouses
              delete item.__parsed_extra;
              // console.log("showing deleted item: ", item.__parsed_extra) // for checking purpouses
              return item;
            });
            
            console.log("The 'CVS' data is imported from \"CSVDataIDB\" and loaded into 'MainViewComponent' table successfully");
        });

        requestCSVData.addEventListener("error", () => {
          console.error("Error loading data from IDB");
        });
    }).catch(error => {
      console.error("Error opening IndexedDB or starting transaction: ", error);
    });

  }

  deleteBtn(roleKey: string): void{
    this.csvDbService.initCSVIndexedDB().then((db: IDBDatabase) => {

      const trans = db.transaction(['csvData_os'], 'readwrite');
      const objStore = trans.objectStore('csvData_os');
      const deleteRequest = objStore.delete(roleKey);

      deleteRequest.addEventListener('success', () => {
        
        console.log("The job is deleted: ", roleKey);
        this.csvData = this.csvData.filter(item => item.Role !== roleKey);  // update view
      })

      deleteRequest.addEventListener('error', () => {
        
        console.error("Error job deleting: ", roleKey);
      })
    }).catch(error => {
      console.error("Error opening IndexedDB or starting transaction: ", error);
    })
  }

  // this anchor btn navigating into "Add / Edit Job Employer" page and taking reference "role" key from CsvDbService service using "Router" class and "queryParams" feature
  manageAnchorBtn(role: string): void{

    // pass the role as a route parameter or query param
    this.router.navigate(['/add-edit-job-employer-page'], {
      queryParams: {role}
    });
  }
}
