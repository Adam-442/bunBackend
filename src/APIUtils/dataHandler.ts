import * as ins from "src/database/inserts";
import { RequestsType } from "./csvDataTypes";

export function uploadData(requests: RequestsType[]) {
    requests.forEach(request => {
        console.log(request);
        
        switch (request.RequestType) {
            case 1:
                ins.addNewLicenceRequest(request);
                break;
            case 2:
                ins.addNewAccountRequest(request);
                break;
            case 3:
                ins.addInspectionRequest(request);
                break;
            case 4:
                ins.addAddActivityRequest(request);
                break;
            case 5:
                ins.addStampLicenceRequest(request);
                break;
            default:
                throw new Error('Invalid request type');
        }
    });

    return 'Done';
}