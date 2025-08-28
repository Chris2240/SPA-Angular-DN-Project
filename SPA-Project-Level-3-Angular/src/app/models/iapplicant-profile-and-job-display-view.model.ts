export interface IapplicantProfileAndJobDisplayView{
    
    [key: string]: string | number | undefined;
    
    // because of validation at Applicant Job display View page the applicant name, phone number and email are always provided and the "?"(undefined) mark is not needed
    "Applicant Name": string;
    "Applicant Phone Number": number;
    "Applicant Email": string;
    
    // those fields may be empty so the "?"(undefined) mark is needed
    "Applicant CV"?: string;
    "Applicant Profile Picture"?: string;
}