import { MongoClient } from "mongodb";

const MONGODB_URI = process.env.NEXT_PUBLIC_MONGODB_URI;

let client: any = null;
export async function connectToDatabase() {
  if (client) return client;
  try {
    client = await MongoClient.connect(MONGODB_URI ?? ""); // Connect to the MongoDB cluster
    console.log("Connected  to MongoDB successfully");
    return client;
  } catch (err) {
    console.error(err);
  }
}
