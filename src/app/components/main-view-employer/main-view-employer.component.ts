import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ApplicantDataDbService } from '../../services/applicant-data-db.service';

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


  constructor(private applicantDataDbService: ApplicantDataDbService){};
  

  ngOnInit(): void {
    this.retrivingEmployerNameFromLS();
    this.checkIfApplicantsExist();
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
      this.spanEmployerNameText = storedEmployerName?.trim() || '';
    }
  }

  retrievingEmployerImageFromLS(): void{

    const storedEmployerImage = localStorage.getItem('employer-profile-picture-src');
    const employerImage = this.employerImageElementRef.nativeElement;

    if(storedEmployerImage){
      employerImage.src = storedEmployerImage;
    }
  }

}
