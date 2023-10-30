import { AddActivityRequestsType, InspectionRequestsType, NewAccountRequestsType, NewLicenceRequestsType, RequestsType, StampLicenceRequestsType } from "src/APIUtils/csvDataTypes";
import { db } from "./db";
import * as schema from "./schema";
import { getActivity, getPermission, getRequest } from "./selects";
import { sql } from "drizzle-orm";

async function addRequest(request: RequestsType) {
    if (!request.RequestID || (await getRequest({RequestID: request.RequestID})).length != 0) {
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
        console.count('NewLicenceRequest already added or invalid')
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

        data.Permissions.forEach(async (permissionName) => {
            const permission = await getPermission({name: permissionName});
            permission.length > 0 ?
            await addAccountPermission(account[0].AccountID, permission[0].PermissionID): null;
        })

        return account;
    } catch (e) {
        console.count('NewAccountRequest already added or invalid')
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
        console.count('InspectionRequest already added or invalid')
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

        data.Activities.forEach(async (activityName) => {
            const activityData = await getActivity({ name: activityName });
            activityData.length > 0 ?
            await addCompanyActivity(activityRequest[0].AddActivityID, activityData[0].ActivityID): null;
        });

        return activityRequest;
    } catch (e) {
        console.count('ActivityRequest already added or invalid')
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
        console.count('StampLicenceRequest already added or invalid')
    }
}

export async function addPermission(PermissionName: string) {
    return await db.insert(schema.PermissionsTable).values({
        PermissionName: PermissionName,
    }).returning();
}

export async function addAccountPermission(AccountID: number, PermissionID: number) {
    return await db.insert(schema.AccountPermissionsTable).values({
        AccountID: AccountID,
        PermissionID: PermissionID,
    }).returning();
}

export async function addActivity(activityName: string) {
    return await db.insert(schema.ActivitiesTable).values({
        ActivityName: activityName,
    }).returning();
}

export async function addCompanyActivity(ActivityRequestID: number, ActivityID: number) {
    return await db.insert(schema.CompanyActivitiesTable).values({
        ActivityRequestID: ActivityRequestID,
        ActivityID: ActivityID,
    }).returning();
}