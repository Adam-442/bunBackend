import { AddActivityRequestsType, InspectionRequestsType, NewAccountRequestsType, NewLicenceRequestsType, RequestsType, StampLicenceRequestsType } from "src/APIUtils/csvDataTypes";
import { db } from "./db";
import * as schema from "./schema";
import { getActivity, getPermission, getRequest } from "./selects";

async function addRequest(request: RequestsType) {
    if (!request.RequestID || (await getRequest(request.RequestID)).length != 0) {
        throw Error('Invalid request ID');
    }

    if (request.RequestType < 1 || request.RequestType > 5) {
        throw Error('Invalid request type');
    }

    if (request.RequestStatus < 1 || request.RequestStatus > 3) {
        throw Error('Invalid request status');
    }

    return await db.insert(schema.RequestsTable).values({
        RequestID:  request.RequestID,
        RequestType: request.RequestType,
        RequestStatus: request.RequestStatus,
        CompanyName: request.RequestData.CompanyName,
    }).returning();
}

export async function addNewLicenceRequest(request: RequestsType) {
    try {
        const result = await addRequest(request);
        
        const data = request.RequestData as NewLicenceRequestsType;
        return await db.insert(schema.NewLicenceRequestsTable).values({
            RequestID: result[0].RequestID,
            LicenceType: data.LicenceType,
            IsOffice: data.IsOffice,
            OfficeName: data.OfficeName,
            OfficeServiceNumber: data.OfficeServiceNumber ? data.OfficeServiceNumber : undefined,
            RequestDate: data.RequestDate,
            Activities: data.Activities,
        }).returning();
    } catch (e) {
        console.count('error')
    }
}
    
export async function addNewAccountRequest(request: RequestsType) {
    try {
        const result = await addRequest(request);
        const data = request.RequestData as NewAccountRequestsType;

        const account = await db.insert(schema.NewAccountRequestsTable).values({
            RequestID: result[0].RequestID,
            RequesterName: data.RequesterName,
            ApplicantName: data.ApplicantName,
            UserName: data.UserName,
            ContactEmail: data.ContactEmail,
        }).returning();

        // data.Permissions.forEach(async (permissionName) => {
        //     const permissionData = await getPermission({ name: permissionName });

        //     let permissionID: number;
        //     if (permissionData.length === 0) {permissionID = (await addPermission(permissionName))[0].PermissionID;}
        //     else {permissionID = permissionData[0].PermissionID;}

        //     // await addAccountPermission(account[0].AccountID, permissionID);
        // });

        return account;
    } catch (e) {
        console.count('error')
    }
}

export async function addInspectionRequest(request: RequestsType) {
    try {
        const result = await addRequest(request);
        const data = request.RequestData as InspectionRequestsType;
        return await db.insert(schema.InspectionRequestsTable).values({
            RequestID: result[0].RequestID,
            InspectionTime: data.InspectionTime,
            InspectionType: data.InspectionType,
        }).returning();
    } catch (e) {
        console.count('error')
    }
}

export async function addAddActivityRequest(request: RequestsType) {
    try {
        const result = await addRequest(request);
        const data = request.RequestData as AddActivityRequestsType;

        const activityRequest = await db.insert(schema.AddActivityRequestsTable).values({
            RequestID: result[0].RequestID,
            LicenceID: data.LicenceID,
        }).returning();

        // data.Activities.forEach(async (activityName) => {
        //     const activityData = await getActivity({ name: activityName });

        //     let activityID: number;
        //     if (activityData.length === 0) {activityID = (await addActivity(activityName))[0].ActivityID;}
        //     else {activityID = activityData[0].ActivityID;}

        //     // await addCompanyActivity(activityRequest[0].AddActivityID, activityID);
        // });

        return activityRequest;
    } catch (e) {
        console.count('error')
    }
}

export async function addStampLicenceRequest(request: RequestsType) {
    try {
        const result = await addRequest(request);
        const data = request.RequestData as StampLicenceRequestsType;
        return await db.insert(schema.StampLicenceRequestsTable).values({
            RequestID: result[0].RequestID,
            LicenceID: data.LicenceID,
            RequestDate: data.RequestDate,
        }).returning();
    } catch (e) {
        console.count('error')
    }
}

async function addPermission(PermissionName: string) {
    return await db.insert(schema.PermissionsTable).values({
        PermissionName: PermissionName,
    }).returning();
}

async function addAccountPermission(AccountID: number, PermissionID: number) {
    return await db.insert(schema.AccountPermissionsTable).values({
        AccountID: AccountID,
        PermissionID: PermissionID,
    }).returning();
}

async function addActivity(activityName: string) {
    return await db.insert(schema.ActivitiesTable).values({
        ActivityName: activityName,
    }).returning();
}

async function addCompanyActivity(ActivityRequestID: number, ActivityID: number) {
    return await db.insert(schema.CompanyActivitiesTable).values({
        ActivityRequestID: ActivityRequestID,
        ActivityID: ActivityID,
    }).returning();
}