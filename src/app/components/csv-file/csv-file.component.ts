import { Component } from '@angular/core';
import Papa from 'papaparse';
import { DbService } from '../../services/csvDb.service';


@Component({
  selector: 'app-csv-file',
  templateUrl: './csv-file.component.html',
  styleUrl: './csv-file.component.css'
})
export class CsvFileComponent {

  constructor(private service: DbService) {}  // Angular will manage the lifecycle and dependency injection for me.

  // converting csv file into jason file using papaprse library
  private readCSVFileAndConvertToJSON(csvFile: File): Promise<any[]> {   // "File" is the standard type for file inputs in browser
    
    const readCSVFileAndConvertToJSON = new Promise<any[]>((resolve, reject) => {

        const fileReader = new FileReader();

        fileReader.addEventListener("load", ev => {
            const csv = ev.target?.result as string;    // since FileReader.result can also be ArrayBuffer or null. Adding "as string" ensures TypeScript understands the expected type

            Papa.parse(csv, {
                header: true,           // treat the first row as headers
                skipEmptyLines: true,   // skip empty lines
                dynamicTyping: true,    // this means every numbers or boolean values which are in string it will automatically converts to: numbers string into numbers and "true" or "false" strings into boolean true or false values
                                        // by default ("dynamicTyping: flase"), all fields remains string only
                complete: (result: Papa.ParseResult<any>) => {   // treat as when task is complete successful
                    resolve(result.data);
                    console.log(result.data); // displaying all database objects in console
                },
                error: (error: Error) => {
                    reject(error);
                }
            });
        });

        
        fileReader.addEventListener("error", () => {
            reject(fileReader.error);
        });

        fileReader.readAsText(csvFile);
    });

    return readCSVFileAndConvertToJSON;
  };


  // Submit button
  async submitButton(): Promise<void>{
    const csvInputFile = document.getElementById('input-file-file-load') as HTMLInputElement | null;

        if(!csvInputFile){
            console.error("The \"input-file-file-load\" element not found.");
            return;
        }

        const file = csvInputFile.files?.[0];

        if (file) {

            // The try-catch block contains the complex asynchronous operations
            try {
                const data = await this.readCSVFileAndConvertToJSON(file);

                // Clearing IDB store if we need to rewrite / update data
                // await ClearCsvIDBStore();

                // Restore IDB data
                await this.service.storeCSVJSONDataInIDB(data);
            }
            catch (error) {
                console.log(`Error: ${error}`);
            }
        } 
  }

}
