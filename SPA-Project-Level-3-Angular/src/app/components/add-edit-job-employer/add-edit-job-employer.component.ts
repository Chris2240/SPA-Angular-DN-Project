import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CsvDbService } from '../../services/csvDb.service';
import { IcsvDataForPopulate } from '../../models/icsv-data-for-populate.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-edit-job-employer',
  templateUrl: './add-edit-job-employer.component.html',
  styleUrl: './add-edit-job-employer.component.css'
})
export class AddEditJobEmployerComponent implements OnInit, AfterViewInit {

  // providing interface for populate csv data into this page
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
  
  // binding elements using properties and "@ViewChild" decorator properties
  spanEmployerName = '';
  
  @ViewChild('imgElement') imgElementRef! : ElementRef<HTMLImageElement>;
  @ViewChild('saveButtonElelement') saveButtonElelementRef!: ElementRef<HTMLButtonElement>;

  // grabing native DOM elements this component using "@ViewChild" for collecting the values and passing them into "CsvDbService" service
  @ViewChild('addEditRoleCategoryDropDown') addEditRoleCategoryDropDownRef!: ElementRef<HTMLSelectElement | null>;
  @ViewChild('addEditJobEmployerRole') addEditJobEmployerRoleRef!: ElementRef<HTMLInputElement | null>;
  @ViewChild('addEditLocationComboBox') addEditLocationComboBoxRef!: ElementRef<HTMLSelectElement | null>;
  @ViewChild('addEditJobEmployerIndustry') addEditJobEmployerIndustryRef!: ElementRef<HTMLInputElement | null>;
  @ViewChild('addEditJobEemployerFunction') addEditJobEemployerFunctionRef!: ElementRef<HTMLInputElement | null>;
  @ViewChild('addEditJobEmployerJobTitle') addEditJobEmployerJobTitleRef!: ElementRef<HTMLInputElement | null>;
  @ViewChild('addEditJobEmployerExperience') addEditJobEmployerExperienceRef!: ElementRef<HTMLInputElement | null>;
  @ViewChild('addEditJobEmployerSalary') addEditJobEmployerSalaryRef!: ElementRef<HTMLInputElement | null>;
  
  
  constructor(private csvDbService: CsvDbService, private route: ActivatedRoute, private router: Router){};

  
  ngOnInit(): void {
    
    this.getEmployerNameFromLS();
    this.getPassRoleAfterSave();
    
  }

  ngAfterViewInit(): void {
    
    this.getEmployerPictureFromLS();
  }

  
  // all methods: --------------------------------

  getEmployerNameFromLS(): void{
    const savedEmployerName = localStorage.getItem('employer-profile-employer-name') || 'Employer Name';

    if (savedEmployerName){      
      this.spanEmployerName = savedEmployerName.trim();
    }
  }

  getEmployerPictureFromLS(): void{
    const savedImage = localStorage.getItem('employer-profile-picture-src');
    const imgElement = this.imgElementRef.nativeElement;

    if(savedImage){
      imgElement.src = savedImage;
    }
  }

  async populateDataIntoAddeditJobEmployer(role: string): Promise<void>{

    return this.csvDbService.initCSVIndexedDB().then((db: IDBDatabase) => {
        return new Promise((resolve, reject) => {

            const trans = db.transaction(['csvData_os'], 'readonly');
            const objStore = trans.objectStore('csvData_os');
            
            // Request the objet using the "Role" as the keyPath
            const requestRetrieveRole = objStore.get(role);
    
            requestRetrieveRole.addEventListener("success", (ev: Event) => {
                const request = ev.target as IDBRequest;
                const data = request.result;
    
                if(data){

                    // delete "__parsed_extra" to prevent null value and also is unnecessary field
                    if(data.__parsed_extra){
                        
                        delete data.__parsed_extra;

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
                    else{     // if no "data.__parsed_extra" - do as follows
                      
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
                console.log("Data from \"Main View Employer\" populated successfully");
            });

            requestRetrieveRole.addEventListener("error", (ev: Event) => {
                reject((ev.target as IDBRequest).error);    // "requestRetrieveRole" might not exist directly when handling errors so that why is "(ev.target as IDBRequest). ...."
                console.log("The 'Role' is faild to retrieve.");
            });
        });
    });
  }

  async getPassRoleAfterSave(): Promise<void>{
    
    this.route.queryParams.subscribe(async params => {
      const role = params['role'];

      if(role){
                
        try {
         
          await this.populateDataIntoAddeditJobEmployer(role);
        
        } catch (error) {
          console.error("Failed to populate data:", error);
        }        
      }
    });
  }

  async saveAddEditBtn(): Promise<void>{

    // now we need to update fields / add new values into fields from "Add / Edit Job Employer" and importing again into "CsvDbService" and display them at Main View Employer and Main View page.
    const updateData = {

      "Role Category": this.addEditRoleCategoryDropDownRef.nativeElement?.value,
      Role: this.addEditJobEmployerRoleRef.nativeElement?.value,
      Location: this.addEditLocationComboBoxRef.nativeElement?.value,
      Industry: this.addEditJobEmployerIndustryRef.nativeElement?.value,
      Function: this.addEditJobEemployerFunctionRef.nativeElement?.value,
      "Job Title": this.addEditJobEmployerJobTitleRef.nativeElement?.value,
      Experience: this.addEditJobEmployerExperienceRef.nativeElement?.value,
      Salary: this.addEditJobEmployerSalaryRef.nativeElement?.value
      }
      
      try {

        await this.csvDbService.storeCSVJSONDataInIDB(updateData);
        console.log("Data saved in: 'i.e. array / indexDB / API'");
        
        this.router.navigate(['/main-view-employer-page']);

      } catch (error) {
        console.error('Error saving data', error);
      }


    // IMPORTAND: this implementation is if we would not dealing with native DOM elements using "@ViewChild" for collecting the values and passing them into "CsvDbService" service
    // also in this case the "#addEditRoleCategoryDropDown" or any from @ViewChild DOM native elements not needed to providing inside input elements at ALL in HTML component !! ;)

    // try {
    //   await this.csvDbService.storeCSVJSONDataInIDB(this.icsvDataPopulate);
    //   console.log('Data saved successfully');
    //   this.router.navigate(['/main-view-employer-page']);
    // } catch (error) {
    //   console.error('Error saving data', error);
    // }
  }
}
