import { eq } from "drizzle-orm";
import { db } from "./db";
import * as schema from "./schema";

export async function getRequest(by?: {RequestID?: number}) {
    if (by?.RequestID)
        return await db.select().from(schema.RequestsTable).where(eq(schema.RequestsTable.RequestID, by.RequestID));
    return await db.select().from(schema.RequestsTable);
}

export async function getNewLicenceRequest(by?: {LicenceID?: number}) {
    if (by?.LicenceID)
        return await db.select().from(schema.NewLicenceRequestsTable).where(eq(schema.NewLicenceRequestsTable.LicenceID, by.LicenceID));
    return await db.select().from(schema.NewLicenceRequestsTable);
}

export async function getNewAccountRequest(by?: {AccountID?: number, RequestID?: number}) {
    if (by?.AccountID)
        return await db.select().from(schema.NewAccountRequestsTable).where(eq(schema.NewAccountRequestsTable.AccountID, by.AccountID));
    else if (by?.RequestID)
        return await db.select().from(schema.NewAccountRequestsTable).fullJoin(schema.RequestsTable, eq(schema.RequestsTable.RequestID, schema.NewAccountRequestsTable.RequestID)).where(eq(schema.NewAccountRequestsTable.RequestID, by.RequestID));
    
    return await db.select().from(schema.NewAccountRequestsTable);
}

export async function getInspectionRequest(by?: {InspectionID?: number}) {
    if (by?.InspectionID)
        return await db.select().from(schema.InspectionRequestsTable).where(eq(schema.InspectionRequestsTable.InspectionID, by.InspectionID));
    return await db.select().from(schema.InspectionRequestsTable);
}

export async function getAddActivityRequest(by?: {AddActivityID?: number, RequestID?: number}) {
    if (by?.AddActivityID)
        return await db.select().from(schema.AddActivityRequestsTable).where(eq(schema.AddActivityRequestsTable.AddActivityID, by.AddActivityID));
    else if (by?.RequestID)
        return await db.select().from(schema.AddActivityRequestsTable).fullJoin(schema.RequestsTable, eq(schema.RequestsTable.RequestID, schema.AddActivityRequestsTable.RequestID)).where(eq(schema.AddActivityRequestsTable.RequestID, by.RequestID));
    return await db.select().from(schema.AddActivityRequestsTable);
}

export async function getStampLicenceRequest(by?: {StampLicenceID?: number}) {
    if (by?.StampLicenceID)
        return await db.select().from(schema.StampLicenceRequestsTable).where(eq(schema.StampLicenceRequestsTable.StampLicenceID, by.StampLicenceID));
    return await db.select().from(schema.StampLicenceRequestsTable);
}

export async function getPermission(by?: {id?: number, name?: string}) {
    if (by?.id)
        return await db.select().from(schema.PermissionsTable).where(eq(schema.PermissionsTable.PermissionID, by.id));
    else if (by?.name)
        return await db.select().from(schema.PermissionsTable).where(eq(schema.PermissionsTable.PermissionName, by.name));

    return await db.select().from(schema.PermissionsTable);
}

export async function getAccountPermissions(AccountID: number) {
    const result = await db.select().from(schema.AccountPermissionsTable).where(eq(schema.AccountPermissionsTable.AccountID, AccountID));
    return await Promise.all (
        result.map(async (AccPerm) => (await getPermission({id: AccPerm.PermissionID}))[0].PermissionName)
    )
}

export async function getActivity(by?: {id?: number, name?: string}) {
    if (by?.id)
        return await db.select().from(schema.ActivitiesTable).where(eq(schema.ActivitiesTable.ActivityID, by.id));
    else if (by?.name)
        return await db.select().from(schema.ActivitiesTable).where(eq(schema.ActivitiesTable.ActivityName, by.name));

    return await db.select().from(schema.ActivitiesTable);
}

export async function getCompanyActivities(ActivityRequestID: number) {
    const result = await db.select().from(schema.CompanyActivitiesTable).where(eq(schema.CompanyActivitiesTable.ActivityRequestID, ActivityRequestID));
    return await Promise.all (
        result.map(async (ComAct) => (await getActivity({id: ComAct.ActivityID}))[0].ActivityName)
    )
}