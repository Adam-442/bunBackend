import { eq } from "drizzle-orm";
import { db } from "./db";
import * as schema from "./schema";

export async function getRequest(requestID: number) {
    return await db.select().from(schema.RequestsTable).where(eq(schema.RequestsTable.RequestID, requestID));
}

export async function getNewLicenceRequest(LicenceID: number) {
    return await db.select().from(schema.NewLicenceRequestsTable).where(eq(schema.NewLicenceRequestsTable.LicenceID, LicenceID));
}

export async function getNewAccountRequest(AccountID: number) {
    return await db.select().from(schema.NewAccountRequestsTable).where(eq(schema.NewAccountRequestsTable.AccountID, AccountID));
}

export async function getInspectionRequest(InspectionID: number) {
    return await db.select().from(schema.InspectionRequestsTable).where(eq(schema.InspectionRequestsTable.InspectionID, InspectionID));
}

export async function getAddActivityRequest(AddActivityID: number) {
    return await db.select().from(schema.AddActivityRequestsTable).where(eq(schema.AddActivityRequestsTable.AddActivityID, AddActivityID));
}

export async function getStampLicenceRequest(StampLicenceID: number) {
    return await db.select().from(schema.StampLicenceRequestsTable).where(eq(schema.StampLicenceRequestsTable.StampLicenceID, StampLicenceID));
}

export async function getPermission(from?: {id?: number, name?: string}) {
    if (from?.id)
        return await db.select().from(schema.PermissionsTable).where(eq(schema.PermissionsTable.PermissionID, from.id));
    else if (from?.name)
        return await db.select().from(schema.PermissionsTable).where(eq(schema.PermissionsTable.PermissionName, from.name));

    return await db.select().from(schema.PermissionsTable);
}

export async function getAccountPermissions(AccountID: number) {
    let permissionNames: string[] = [];
    const accountPermissions = await db.select().from(schema.AccountPermissionsTable).where(eq(schema.AccountPermissionsTable.AccountID, AccountID));
    accountPermissions.forEach(async (permission) => {
        const permissionData = await getPermission({id: permission.PermissionID});
        if (permissionData[0].PermissionName) permissionNames.push(permissionData[0].PermissionName);
    });
}

export async function getActivity(from?: {id?: number, name?: string}) {
    if (from?.id)
        return await db.select().from(schema.ActivitiesTable).where(eq(schema.ActivitiesTable.ActivityID, from.id));
    else if (from?.name)
        return await db.select().from(schema.ActivitiesTable).where(eq(schema.ActivitiesTable.ActivityName, from.name));

    return await db.select().from(schema.ActivitiesTable);
}

export async function getCompanyActivities(ActivityRequestID: number) {
    let activityNames: string[] = [];
    const companyActivities = await db.select().from(schema.CompanyActivitiesTable).where(eq(schema.CompanyActivitiesTable.ActivityRequestID, ActivityRequestID));
    companyActivities.forEach(async (activity) => {
        const activityData = await getActivity({id :activity.ActivityID});
        if (activityData[0].ActivityName) activityNames.push(activityData[0].ActivityName);
    });
    return activityNames;
}