import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error("MONGODB_URI is not defined");
}

const globalForMongo = globalThis as unknown as {
  mongoClient: MongoClient | undefined;
};

export const mongoClient =
  globalForMongo.mongoClient ??
  new MongoClient(uri);

if (process.env.NODE_ENV !== "production") {
  globalForMongo.mongoClient = mongoClient;
}

export const db = mongoClient.db("bazardor");