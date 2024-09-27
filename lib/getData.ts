import clientPromise from "./mongodb";

export default async function getData(
  _db: string,
  _collection: string,
  perPage: number,
  page = 1
) {
  try {
    //DB connect
    // const client = await connectToDatabase();
    const client = await clientPromise;
    const db = client.db(_db);
    const collection = db.collection(_collection);
    //DB query
    const data = await collection
      .find({})
      .sort({ date: -1, id: -1 })
      .skip(perPage * (page - 1))
      .limit(perPage)
      .toArray();
    const processedData = data.map((item) => ({
      ...item,
      _id: item._id.toString(), // Преобразование ObjectId в строку
    }));

    const itemsCount = await db.collection(_collection).countDocuments({});
    return { processedData, itemsCount };
  } catch (err) {
    throw new Error("failed to fetch data. please try again later");
  }
}
