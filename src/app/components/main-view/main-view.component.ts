import { Component, OnInit } from '@angular/core';
import { DbService } from '../../services/db.service';
import { IcsvDataItem } from '../../models/icsv-data-item.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrl: './main-view.component.css'
})
export class MainViewComponent implements OnInit {

  csvData: IcsvDataItem[] = []; // array of objects typed with IcsvDataItem interface, used in "*ngFor" directive in the html template
  constructor(private dbService: DbService, private router: Router) {} // services are injected through the constructor
  

  // ngOnInit
  ngOnInit(): void {
    this.loadCSVDatafromIDBandDisplayInTable();
  }

  //functions
  loadCSVDatafromIDBandDisplayInTable(): Promise<void> { // Declaring Promise<void> indicates that the function is asynchronous and resolves once the task (loading and displaying data) is complete
                                                          // Function is not to return data but to load it from IndexedDB and populate the table directly(updating the DOM - side effect)

    return this.dbService.initCSVIndexedDB().then((db: IDBDatabase) => {

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

}
