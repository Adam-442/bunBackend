# Welcome To BunBackend

This is the backend for the the challenge.
Check out the front-end [**Here**](https://github.com/Adam-442/front-bun-next).

## Terminal

To install dependencies:

    bun install

To run app, (http://localhost:5500):

    bun run dev

To migrate database (if you decide to delete "sqlite.db"):

    bun run ./src/database/migrate.ts 

## Routes

Currently Implemented Routes Include:

**Requests-Releated:**
|Route| Parameter | Body | Functionality |
|--|--|--|--|
|/uploadData||JSON: request[] |inserts data into DB. returns time taken.|
|/getAllRequests|||returns all requests in DB.|
|/getRequest/:Requestid|RequestID||returns request with specified RequestID.|
|/getAllAccounts|||returns all accountRequests in DB.|
|/getAccount/:Requestid|RequestID||returns accountRequest with specified RequestID.|
|/getAllActivityRequests|||returns all activityRequests in DB.|
|/getActivityRequest/:Requestid|RequestID||returns activityRequest with specified RequestID.|

**Permissions-Releated:**
|Route| Parameter | Body | Functionality |
|--|--|--|--|
|/getAccountPermissions/:accountID|AccountID||returns specified account permissions as string[].|
|/addPermission/:name | Name||inserts permission with specified name.|
|/getAllPermissions |||returns all permissions in DB.|


**Activities-Releated:**
|Route| Parameter | Body | Functionality |
|--|--|--|--|
|/getCompanyActivities/:id|ActivityRequestID||returns specified company activities as string[].|
|/addActivity/:name| Name||inserts activity with specified name.|
|/getAllActivities |||returns all activities in DB.|


## Validation

There are many rules to inserting data into the database, **some** include:

 1. *Request ID* already exists in database.
 2. *Request Type* not in range [1-5].
 3. *Request Status* not in range [1-3].
 4. Row data does not match any request type *data structure*.
 5. Adding *Account* with permission not in database (have to add it first).
 6. Adding *CompanyActivity* with activity not in database (have to add it first).
 7. Adding *Permission* using a name that already exists (Permission names are unique).
 8. Adding *Activity* using a name that already exists (Activity names are unique).

Violating any of the rules will result in omitting the row trying to insert. and **no response** will be provided to the front-end, the code will continue to add the following rows as long as they match the rules.

## SQLite Schema

![Schema](https://github.com/Adam-442/bunBackend/assets/98691783/0c9b6e90-09a2-414c-9154-f7eea17fb328)<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="2040.1224202403018" height="637.2521021213407">

## Packages, Libraries and frameworks

 - **[BunJS](https://bun.sh/):** JavaScript Runtime, faster than NodeJS.
 - **[ElysiaJS](https://elysiajs.com):** BunJS web framework for API routes and routing.
 - [**Sqlite**](https://www.sqlite.org/index.html) and [**Drizzle ORM**](https://orm.drizzle.team/docs/quick-sqlite/bun)**:** Sqlite Database with Drizzle Object–relational mapping built to work best with [**TypeScript**](https://www.typescriptlang.org/) types support for maximum type safety.
