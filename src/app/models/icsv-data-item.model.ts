// Interface for detailsBtn purposes
// Define the structure of CSV data and provide as Interface
export interface IcsvDataItem{
    [key: string]: string | undefined; // this allows access to any number of dynamic fields in csvData_os (all as strings) or undefined "|"
    __parsed_extra?: any;   // optional opertor - indicates that the property MAY or MAY NOT exist 
                            // explicitly add this to account for the deleted field
    Role?: string; // add specific known fields here
}