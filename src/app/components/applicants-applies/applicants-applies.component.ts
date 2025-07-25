import { Component, OnInit } from '@angular/core';
import { ApplicantDataDbService } from '../../services/applicant-data-db.service';
import { IapplicantProfileAndJobDisplayView } from '../../models/iapplicant-profile-and-job-display-view.model';

@Component({
  selector: 'app-applicants-applies',
  templateUrl: './applicants-applies.component.html',
  styleUrl: './applicants-applies.component.css'
})
export class ApplicantsAppliesComponent implements OnInit {

  // holds all applicant data loaded from IndexedDB, used for iteration in the HTML table
  iApplicantProfileAndJobDisplayView: IapplicantProfileAndJobDisplayView[] = [];

  constructor(private applicantDataDBService: ApplicantDataDbService){};


  ngOnInit(): void {
    this.loadApplicantProfileAndJobDisplayViewDataIDBAndDisplayInTable();
  }

  // loading all applicant data to the applicant applies view table
  async loadApplicantProfileAndJobDisplayViewDataIDBAndDisplayInTable(){

    return this.applicantDataDBService.initApplicantProfileAndJobDisplayView().then((db: IDBDatabase) => {

      const trans = db.transaction(['ApplicantProfileAndJobDisplayView_os'], "readonly");
      const storeObj = trans.objectStore('ApplicantProfileAndJobDisplayView_os');
      const requestDbData = storeObj.getAll();

      requestDbData.addEventListener("success", (ev: Event) => {
        const request = ev.target as IDBRequest<IapplicantProfileAndJobDisplayView[]>;   // properly type the result as an array of IapplicantProfileAndJobDisplayView
        const dataIDB = request.result;
        
        this.iApplicantProfileAndJobDisplayView = dataIDB.map(item => {
          
          // THE PICTURE IMAGE AND CV IMPLEMENTATIONS ARE HANDLED AT THE HTML COMPONENT

          return item;
        });

       console.log("The 'CVS' data is imported from \"ApplicantProfileAndJobDisplayView\" and loaded into 'ApplicantsAppliesComponent' table successfully");
      })

      requestDbData.addEventListener("error", () => {
        console.error("Error loading data from IDB");
      })

    });
  }

  // funtion for deleting applicant from Applicant(s) Applies View page table using "cursor" - IDB feature
  deleteApplicantApply(phoneToDelete: number): void{
    this.applicantDataDBService.initApplicantProfileAndJobDisplayView().then((db: IDBDatabase) => {
        const trans = db.transaction(['ApplicantProfileAndJobDisplayView_os'], "readwrite");
        const objStore = trans.objectStore('ApplicantProfileAndJobDisplayView_os');

        const requestCursor = objStore.openCursor();

         requestCursor.addEventListener("success", (ev: Event) =>{
            const target = ev.target as IDBRequest<IDBCursorWithValue | null>;
            const cursor = target.result;
            
            if(cursor){
                
                // match if applicant phone matches the one you want to delete
                if(cursor.value["Applicant Phone Number"] === phoneToDelete){

                    // use the cursor's key to delete particular applicant
                    cursor.delete();

                    // location.reload(); // instead of use the "location.reload()" web API function

                    // remove deleted applicant from array to update the UI
                    this.iApplicantProfileAndJobDisplayView = this.iApplicantProfileAndJobDisplayView.filter(
                      item => item['Applicant Phone Number'] !== phoneToDelete);

                    console.log("Applicant has been deleted");
                }
                else{
                    
                    // if not matching go to the next applicant if available
                    cursor.continue();
                }
            }
            else {
                console.log("No more applicants to process");
            }
         });

         // handle errors in the transaction 
         trans.onerror = (ev: Event) =>{
            console.error("Transaction failed", ev);
         }
    }).catch(error => {
        console.error("Error openning IndexedDB: ", error);
    });
  }

}
