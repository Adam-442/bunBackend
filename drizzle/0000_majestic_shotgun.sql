CREATE TABLE `AccountPermissions` (
	`AccountID` integer NOT NULL,
	`PermissionID` integer NOT NULL,
	PRIMARY KEY(`AccountID`, `PermissionID`),
	FOREIGN KEY (`AccountID`) REFERENCES `NewAccountRequests`(`AccountID`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`PermissionID`) REFERENCES `Permissions`(`PermissionID`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `Activities` (
	`ActivityID` integer PRIMARY KEY NOT NULL,
	`ActivityName` text
);
--> statement-breakpoint
CREATE TABLE `AddActivityRequests` (
	`AddActivityID` integer PRIMARY KEY NOT NULL,
	`RequestID` integer NOT NULL,
	`LicenceID` text NOT NULL,
	FOREIGN KEY (`RequestID`) REFERENCES `Requests`(`RequestID`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `CompanyActivities` (
	`ActivityRequestID` integer NOT NULL,
	`ActivityID` integer NOT NULL,
	PRIMARY KEY(`ActivityID`, `ActivityRequestID`),
	FOREIGN KEY (`ActivityRequestID`) REFERENCES `AddActivityRequests`(`AddActivityID`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`ActivityID`) REFERENCES `Activities`(`ActivityID`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `InspectionRequests` (
	`InspectionID` integer PRIMARY KEY NOT NULL,
	`RequestID` integer NOT NULL,
	`InspectionTime` text NOT NULL,
	`InspectionType` text NOT NULL,
	FOREIGN KEY (`RequestID`) REFERENCES `Requests`(`RequestID`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `NewAccountRequests` (
	`AccountID` integer PRIMARY KEY NOT NULL,
	`RequestID` integer NOT NULL,
	`RequesterName` text NOT NULL,
	`ApplicantName` text NOT NULL,
	`Username` text NOT NULL,
	`ContactEmail` text NOT NULL,
	FOREIGN KEY (`RequestID`) REFERENCES `Requests`(`RequestID`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `NewLicenceRequests` (
	`LicenceID` integer PRIMARY KEY NOT NULL,
	`RequestID` integer NOT NULL,
	`LicenceType` text,
	`IsOffice` integer,
	`OfficeName` text,
	`OfficeServiceNumber` text,
	`RequestDate` text NOT NULL,
	`Activities` text,
	FOREIGN KEY (`RequestID`) REFERENCES `Requests`(`RequestID`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `Permissions` (
	`PermissionID` integer PRIMARY KEY NOT NULL,
	`PermissionName` text
);
--> statement-breakpoint
CREATE TABLE `Requests` (
	`RequestID` integer PRIMARY KEY NOT NULL,
	`RequestType` integer NOT NULL,
	`RequestStatus` integer NOT NULL,
	`CompanyName` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `StampLicenceRequests` (
	`StampLicenceID` integer PRIMARY KEY NOT NULL,
	`RequestID` integer NOT NULL,
	`RequestDate` text NOT NULL,
	`LicenceID` text NOT NULL,
	FOREIGN KEY (`RequestID`) REFERENCES `Requests`(`RequestID`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `Activities_ActivityName_unique` ON `Activities` (`ActivityName`);--> statement-breakpoint
CREATE UNIQUE INDEX `Permissions_PermissionName_unique` ON `Permissions` (`PermissionName`);