import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DbService {

  // constructor() { }

  // Open IDB(IndexedDB) and creating tables in new CSV database
  initCSVIndexedDB(): Promise<IDBDatabase> {

      let db: IDBDatabase;    // declare db with the appropriate(odpowiedni) type

      const initIDB = new Promise<IDBDatabase>((resolve, reject) => {

          // opening database
          const openRequestCSVdb = window.indexedDB.open('CSVDataIDB', 1);

          // creating tables of new opened databases
          openRequestCSVdb.addEventListener("upgradeneeded", (ev: IDBVersionChangeEvent) => {
              const request = ev.target as IDBOpenDBRequest;  // assert the type of ev.target            
              db = request.result;    // access the database instance

              if(!db.objectStoreNames.contains('csvData_os')){
                  db.createObjectStore('csvData_os', { keyPath: "Role" });    // "{ autoIncrement: true }" - every record stored in the csvData_os object store will be automatically assigned a unique numeric key, starting from 1, and incrementing with each new entry.
              }

          });

          // success handler
          openRequestCSVdb.addEventListener("success", (ev: Event) => {
              const request = ev.target as IDBOpenDBRequest;
              
              resolve(request.result);
              console.log("CSV database, opened successfully");
          });

          // error handler
          openRequestCSVdb.addEventListener("error", (ev: Event) => {
              const request = ev.target as IDBOpenDBRequest; 
              
              reject(request.error);
              console.log("CSV database failed to open");
          });
      });

      return initIDB;
  };

    // Add CSV JSON Data into IDB
  async storeCSVJSONDataInIDB(csvData: any): Promise<IDBDatabase> { // we use "<IDBDatabase>" and resolve(db) becouse this method is for STORING and UPDATING

      return this.initCSVIndexedDB().then((db: IDBDatabase) => {
          const storeCSVJSONDataInIDB = new Promise<IDBDatabase>((resolve, reject) => {

              // open a read/write db transaction, ready for adding the data
              const CSVTransaction = db.transaction(['csvData_os'], "readwrite");

              // create a "CSVObjectsStore" variable to enable operations such as: adding, retrieving(reading), updating, deleting records within this "object store" during the scope of transaction
              const CSVObjectsStore = CSVTransaction.objectStore('csvData_os');

              // check if the data is an array or a single object and convert to an array if needed (later implemented). We achieved this using "Array" class to convert anything into Array and checking that condition using "Ternary" operator
              const dataArray = Array.isArray(csvData) ? csvData : [csvData];         // this ensures that dataArray is always an array, whether the input is a single object or an array of objects.
                                                                                      // because at "Add / Edit Job Employer" we modify the job (if wanted to) ONLY if we pressing "Manage" anchor button at "Main View Employer" page

              dataArray.forEach(item => {      // before was "csvData.forEach()"
                  CSVObjectsStore.put(item);   // add - if we want add ONLY and for update we need to use "ClearCsvIDBStore" method in "Submit" button in try catch block
                                              // put - if updates a given record in a database, or inserts a new record if the given item does not already exist. NO "ClearCsvIDBStore" is needed any more
              });

              CSVTransaction.oncomplete = () => {
                      
                  resolve(db);    // Explicitly resolve with the IDBDatabase instance
                  console.log("Transaction completed successfully");
                  console.log("CSV file added to database table successfully");
              };
                                                  
              CSVTransaction.onerror = (ev: Event) => {
                  reject(CSVTransaction.error);   // Reject with the transaction error
                  console.error("CSV file is NOT added to database table");
                  console.error("Transaction failed");
              };

          });

          return storeCSVJSONDataInIDB;
      });
  };
}
