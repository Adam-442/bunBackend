// Data coming from the front-end inside the CSV file follows this structure:

export type RequestsType = {
    RequestID?: number;
    RequestType: 1 | 2 | 3 | 4 | 5;
    RequestStatus: 1 | 2 | 3;
    RequestData: NewLicenceRequestsType | NewAccountRequestsType | InspectionRequestsType | AddActivityRequestsType | StampLicenceRequestsType;
}

export type NewLicenceRequestsType = {
  CompanyName: string;
  LicenceType: string;
  IsOffice: boolean;
  OfficeName: string;
  OfficeServiceNumber: string;
  RequestDate: string;
  Activities: string;
}

export type NewAccountRequestsType = {
  CompanyName: string;
  RequesterName: string;
  ApplicantName: string;
  UserName: string;
  ContactEmail: string;
  Permissions: string[];
}

export type InspectionRequestsType = {
  CompanyName: string;
  InspectionDate: string;
  InspectionTime: string;
  InspectionType: 'new' | 'renew' | 'check' | 'update';
}

export type AddActivityRequestsType = {
  CompanyName: string;
  LicenceID: string;
  Activities: string[];
}

export type StampLicenceRequestsType = {
  CompanyName: string;
  LicenceID: string;
  RequestDate: string;
}
