/* eslint-disable @typescript-eslint/no-var-requires */
// import type { Handler } from "@netlify/functions"; // , HandlerEvent, HandlerContext
import mongoClient from "mongoose"; // ,
import * as dotenv from "dotenv";
dotenv.config();

// Variables de entorno
const DB_USER = `${process.env.VITE_DB_USER}`;
const DB_PASSWORD = `${process.env.VITE_DB_PASSWORD}`;
const DB_HOST = `${process.env.VITE_DB_HOST}`;
const DB_NAME = `${process.env.VITE_DB_NAME}`;
const MONGODB_COLLECTION = `${process.env.VITE_MONGODB_COLLECTION}`;

const MONGO_HOST = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}?retryWrites=true&w=majority`;

console.log("MONGOOSE_HOST", MONGO_HOST);
const clientPromise = mongoClient.connect(MONGO_HOST);

const handler = async () => {
  console.log("hi");
  try {
    //await
    //mongoClient.connect( async (err) => {
    const database = await clientPromise;
    console.log("[db] Mongoose Conection", database);
    const collection = database.db(DB_NAME).collection(MONGODB_COLLECTION);
    console.log("[db] Conectada con éxito", collection, MONGODB_COLLECTION);
    const results = await collection.find().toArray();
    if (results.length > 0) {
      console.log("mongoClient", results);
      return {
        statusCode: 200,
        body: JSON.stringify(results),
      };
    }
  } catch (err) {
    console.error("[db] Error", MONGO_HOST, err);
    return { statusCode: 500, body: err.toString() };
  }
  //   finally {
  //     // Ensures that the client will close when you finish/error
  //     await mongoClient.close();
  //   }
};

export { mongoClient, handler };
