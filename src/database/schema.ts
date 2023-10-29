import { integer, primaryKey, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const RequestsTable = sqliteTable('Requests', {
    RequestID: integer('RequestID').primaryKey(),
    RequestType: integer('RequestType', {mode: 'number'}).notNull(),
    RequestStatus: integer('RequestStatus', {mode: 'number'}).notNull(),
    CompanyName: text('CompanyName').notNull(),
});

export const NewLicenceRequestsTable = sqliteTable('NewLicenceRequests', {
    LicenceID: integer('LicenceID').primaryKey(),
    RequestID: integer('RequestID').references(() => RequestsTable.RequestID).notNull(),
    LicenceType: text(`LicenceType`),
    IsOffice: integer('IsOffice', {mode: 'boolean'}),
    OfficeName: text('OfficeName'),
    OfficeServiceNumber: text('OfficeServiceNumber'),
    RequestDate: text('RequestDate').notNull(),
    Activities: text('Activities'),
});
  
export const NewAccountRequestsTable = sqliteTable('NewAccountRequests', {
    AccountID: integer('AccountID').primaryKey(),
    RequestID: integer('RequestID').references(() => RequestsTable.RequestID).notNull(),
    RequesterName: text('RequesterName').notNull(),
    ApplicantName: text('ApplicantName').notNull(),
    UserName: text('Username').notNull(),
    ContactEmail: text('ContactEmail').notNull(),
});

// const inspectionTypes = pgEnum('inspection_types', ['new', 'renew', 'check', 'update']);

export const InspectionRequestsTable = sqliteTable('InspectionRequests', {
    InspectionID: integer('InspectionID').primaryKey(),
    RequestID: integer('RequestID').references(() => RequestsTable.RequestID).notNull(),
    InspectionTime: text('InspectionTime').notNull(),
    InspectionType: text('InspectionType').notNull(),
});
  
export const AddActivityRequestsTable = sqliteTable('AddActivityRequests', {
    AddActivityID: integer('AddActivityID').primaryKey(),
    RequestID: integer('RequestID').references(() => RequestsTable.RequestID).notNull(),
    LicenceID: text('LicenceID').notNull(),
});
  
export const StampLicenceRequestsTable = sqliteTable('StampLicenceRequests', {
    StampLicenceID: integer('StampLicenceID').primaryKey(),
    RequestID: integer('RequestID').references(() => RequestsTable.RequestID).notNull(),
    RequestDate: text('RequestDate').notNull(),
    LicenceID: text('LicenceID').notNull(),
});

// const permissionTypes = pgEnum('permission_types', ['delete', 'update', 'add', 'view']);
  
export const PermissionsTable = sqliteTable('Permissions', {
    PermissionID: integer('PermissionID').primaryKey(),
    PermissionName: text('PermissionName').unique(),
});

// export const AccountPermissionsRelation =  relations('AccountPermissions', )
  
export const AccountPermissionsTable = sqliteTable('AccountPermissions', {
        AccountID: integer('AccountID').references(() => NewAccountRequestsTable.AccountID).notNull(),
        PermissionID: integer('PermissionID').references(() => PermissionsTable.PermissionID).notNull(),
    }, (t) => ({
        pk: primaryKey(t.AccountID, t.PermissionID),
    })
);
  
export const ActivitiesTable = sqliteTable('Activities', {
    ActivityID: integer('ActivityID').primaryKey(),
    ActivityName: text('ActivityName').unique(),
});
  
export const CompanyActivitiesTable = sqliteTable('CompanyActivities', {
        ActivityRequestID: integer('ActivityRequestID').references(() => AddActivityRequestsTable.AddActivityID).notNull(),
        ActivityID: integer('ActivityID').references(() => ActivitiesTable.ActivityID).notNull(),
    }, (t) => ({
        pk: primaryKey(t.ActivityID, t.ActivityRequestID),
    })
);