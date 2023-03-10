/* eslint-disable @typescript-eslint/no-var-requires */
// import type { Handler } from "@netlify/functions"; // , HandlerEvent, HandlerContext
import { config } from "https://deno.land/x/dotenv/mod.ts";
// import "https://deno.land/x/dotenv/load.ts";
import { MongoClient } from "https://deno.land/x/mongo@v0.31.1/mod.ts"; // , ServerApiVersion
// "https://deno.land/x/atlas_sdk@v1.1.0/mod.ts";
// https://deno.land/x/mongo@v0.31.1/mod.ts;
// import { Config } from "https://edge.netlify.com"

const configData = await config();

const {
  VITE_DB_USER,
  VITE_DB_PASSWORD,
  VITE_DB_HOST,
  VITE_DB_NAME,
  VITE_MONGODB_COLLECTION,
} = configData;

// console.log(
//   "Deno",
//   VITE_DB_USER,
//   VITE_DB_PASSWORD,
//   VITE_DB_HOST,
//   VITE_DB_NAME,
//   VITE_MONGODB_COLLECTION
// );

// Variables de entorno
const DB_USER = `${VITE_DB_USER}`;
const DB_PASSWORD = `${VITE_DB_PASSWORD}`;
const DB_HOST = `${VITE_DB_HOST}`;
const DB_NAME = `${VITE_DB_NAME}`;
const MONGODB_COLLECTION = `${VITE_MONGODB_COLLECTION}`;

const MONGO_HOST = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}?authMechanism=SCRAM-SHA-1`;

console.log("MONGO_HOST", MONGO_HOST); // Funciona

const mongoClient = new MongoClient();

const clientPromise = mongoClient.connect(MONGO_HOST); // , {}

// export const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
const handler = async (request, context) => {
  console.log("ho");
  try {
    const database = await clientPromise; // (await clientPromise).db(DB_NAME);
    console.log("[db] Conectada con éxito", database);
    const collection = database.collection(MONGODB_COLLECTION);
    const results = await collection.find().toArray();
    if (results.length > 0) {
      console.log("mongoClient", results);
      // Response.json
      return new Response(JSON.stringify(results), {
        status: 200,
        // headers: { "content-type": "text/html" },
      });
    }
  } catch (err) {
    console.error("[db] Error", MONGO_HOST, err);
    return new Response(err.toString(), { status: 500 }); //
  }
  //   finally {
  //     // Ensures that the client will close when you finish/error
  //     await mongoClient.close();
  //   }
};

export default handler;
