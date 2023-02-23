/* eslint-disable @typescript-eslint/no-var-requires */
// import type { Handler } from "@netlify/functions"; // , HandlerEvent, HandlerContext
import mongoose from "mongoose"; // ,
import * as dotenv from "dotenv";
dotenv.config();

// Variables de entorno
const DB_USER = `${process.env.VITE_DB_USER}`;
const DB_PASSWORD = `${process.env.VITE_DB_PASSWORD}`;
const DB_HOST = `${process.env.VITE_DB_HOST}`;
const DB_NAME = `${process.env.VITE_DB_NAME}`;
const MONGODB_COLLECTION = `${process.env.VITE_MONGODB_COLLECTION}`;

const MONGO_HOST = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/?retryWrites=true&w=majority`;

const schema = new mongoose.Schema({ name: "string", email: "string" });

console.log("MONGOOSE_HOST", MONGO_HOST);
const clientPromise = mongoose.createConnection(MONGO_HOST, {
  dbName: DB_NAME,
});
// const clientPromise = mongoose.connect(MONGO_HOST);

const Contactos = clientPromise.model(MONGODB_COLLECTION, schema);
const DB = new Contactos();
console.log("Contactos", DB);

const handler = async () => {
  console.log("hi mongoose");
  try {
    //await
    //mongoClient.connect( async (err) => {
    await Contactos.find({}, function (err, docs) {
      if (!err) console.log("Success!");
      // docs.forEach
      console.log("docs", docs);
      const results = docs;
      if (results.length > 0) {
        console.log("mongoClient", results);
        return {
          statusCode: 200,
          body: JSON.stringify(results),
        };
      }
    });
    // const database = await clientPromise;
    // console.log("[db] Mongoose Conection", database);
    // const collection = database.db(DB_NAME).collection(MONGODB_COLLECTION);
    // console.log("[db] Conectada con éxito", collection, MONGODB_COLLECTION);
    // const results = await collection.find().toArray();
    // if (results.length > 0) {
    //   console.log("mongoClient", results);
    //   return {
    //     statusCode: 200,
    //     body: JSON.stringify(results),
    //   };
    // }
  } catch (err) {
    console.error("[db] Error", MONGO_HOST, err);
    return { statusCode: 500, body: err.toString() };
  }
  //   finally {
  //     // Ensures that the client will close when you finish/error
  //     await mongoClient.close();
  //   }
};

export { clientPromise, handler };
