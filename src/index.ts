import { Elysia } from "elysia";
import { RequestsType } from "./APIUtils/csvDataTypes";
import { uploadData } from "./APIUtils/dataHandler";

const app = new Elysia();

app.get("/", () => `This is the backend, Try http://${app.server?.hostname}:${app.server?.port}/uploadData`);

app.post("/uploadData", ({ body }) => {
  try {
    const start = performance.now();
    const uploadStatus = uploadData(body as RequestsType[]);
    const end = performance.now();
    return new Response(`${uploadStatus} in ${end-start}ms`, { status: 200 });
  } catch (error) {
    console.log("Error: " + error)
    return new Response("Error: " + error, { status: 400 });
  }
});

app.listen(3000);

console.log(
  `🦊 Elysia is running at http://${app.server?.hostname}:${app.server?.port}`
);
