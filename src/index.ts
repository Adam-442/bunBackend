import { Elysia } from "elysia";
import { RequestsType } from "./APIUtils/csvDataTypes";
import { uploadData } from "./APIUtils/dataHandler";
import { getAccountPermissions, getNewAccountRequest, getPermission, getRequest } from "./database/selects";
import { addPermission } from "./database/inserts";

const app = new Elysia();

app.get("/", () => `This is the backend, Try posting to http://${app.server?.hostname}:${app.server?.port}/uploadData`);

app.post("/uploadData", ({ body }) => {
  try {
    const start = performance.now();
    const uploadStatus = uploadData(body as RequestsType[]);
    const end = performance.now();
    return new Response(`${uploadStatus} in ${end-start}ms`, { status: 200 });
  } catch (error) {
    return new Response("Error: " + error, { status: 400 });
  }
});

app.get("/getAllRequests", async () => {
  return new Response(`${JSON.stringify(await getRequest())}`, { status: 200 });  
});

app.get("/getRequest/:Requestid", async ({ params: { Requestid }}) => {
  const id = Number(Requestid);
  if (Number.isNaN(id)) return new Response("Error: Requestid must be a number", { status: 400 });
  return new Response(`${JSON.stringify(await getRequest({RequestID: id}))}`, { status: 200 });
});

app.get("/getAllAccounts", async () => {
  return new Response(`${JSON.stringify(await getNewAccountRequest())}`, { status: 200 });  
});

app.get("/getAccount/:Requestid", async ({ params: { Requestid }}) => {
  const id = Number(Requestid);
  if (Number.isNaN(id)) return new Response("Error: Requestid must be a number", { status: 400 });
  return new Response(`${JSON.stringify(await getNewAccountRequest({RequestID: id}))}`, { status: 200 });  
});

app.get("/getAccountPermissions/:accountID", async ({ params: { accountID }}) => {
  const id = Number(accountID);
  if (Number.isNaN(id)) return new Response("Error: Requestid must be a number", { status: 400 });
  return new Response(`${JSON.stringify(await getAccountPermissions(id))}`, { status: 200 });  
});

app.post("/addPermission/:name", async ({ params: { name }}) => {
  const result = await addPermission(name);
  return new Response(`Permission: "${result[0].PermissionName}" has been added with ID (${result[0].PermissionID})`, { status: 200 });  
});

app.get("/getAllPermissions", async () => {
  return new Response(`${JSON.stringify(await getPermission())}`, { status: 200 });
});

app.listen(3000);

console.log(
  `🦊 Elysia is running at http://${app.server?.hostname}:${app.server?.port}`
);
