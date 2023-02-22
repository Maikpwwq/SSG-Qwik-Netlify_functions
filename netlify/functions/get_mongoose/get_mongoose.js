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

const MONGO_HOST = `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority`;

const schema = new mongoose.Schema({ name: "string", access: "string" });

console.log("MONGOOSE_HOST", MONGO_HOST);
const clientPromise = mongoose.createConnection(MONGO_HOST, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});
// const clientPromise = mongoose.connect(MONGO_HOST);

const Contactos = clientPromise.model(MONGODB_COLLECTION, schema);
console.log("Contactos", Contactos);

const handler = async () => {
  console.log("hi");
  try {
    //await
    //mongoClient.connect( async (err) => {
    Contactos.find({}, function (err, docs) {
      // docs.forEach
      console.log("docs", docs);
      const results = docs
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
