import { Injectable } from '@angular/core';
import { catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApplicantDataDbService {

  constructor() { }

  // initialize database
  initApplicantProfileAndJobDisplayView(): Promise<IDBDatabase>{

    let db: IDBDatabase;

    return new Promise<IDBDatabase>((resolve, reject) =>{

      // opening new database
      const openReguestApplicantAndJobDisplayView = window.indexedDB.open('ApplicantProfileAndJobDisplayView', 1);

      // creating table of new opened datatabase
      openReguestApplicantAndJobDisplayView.addEventListener('upgradeneeded', (ev: IDBVersionChangeEvent) => {
        const request = ev.target as IDBOpenDBRequest;
        db = request.result;

        // creating object store tables
        db.createObjectStore('ApplicantProfileAndJobDisplayView_os', {autoIncrement: true});        
      });

        // handling succesful database oppening
      openReguestApplicantAndJobDisplayView.addEventListener('success', (ev: Event) => {
        const request = ev.target as IDBOpenDBRequest;
        resolve(request.result);
        console.log("Applicant Profile and Job Display View database is opened successfully");
      })

      // handling errors when opening the database
      openReguestApplicantAndJobDisplayView.addEventListener('error', (ev: Event) => {
        const request = ev.target as IDBOpenDBRequest;
        reject(request.error);
        console.log("Applicant Profile and Job Display View database is fail to open:", request);
      })
    })
  }

  // storing all inputs and select options of Applicant Profile and Applicant Job Display View page
  async storeApplicantProfileAndJobDisplayView(data: any): Promise<void>{

    return this.initApplicantProfileAndJobDisplayView().then((db: IDBDatabase) => {
      return new Promise<void>((resolve, reject) => {

        const trans = db.transaction(['ApplicantProfileAndJobDisplayView_os'], 'readwrite');
        const objStore = trans.objectStore('ApplicantProfileAndJobDisplayView_os');
        const request = objStore.add(data);

        request.addEventListener("success", () => {
          console.log("The Applicant Profile and Applicant Job Display View data is added successfully to table database");
          resolve();
        })

        request.addEventListener("error", () => {
          console.error("The Applicant Profile and Job Display View data in NOT added to database table: ", request.error);
          reject(request.error);
        })

      })
    }).catch(err => {
      console.error("Error opening \"ApplicantDataDbService\": ", err);
    })
  }
}
