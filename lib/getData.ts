import clientPromise from "./mongodb";

export default async function getData(
  _collection: string,
  perPage: number,
  page: number
) {
  try {
    //DB connect
    // const client = await connectToDatabase();
    const client = await clientPromise;
    const db = client.db("media");
    const collection = db.collection(_collection);
    //DB query
    const data = await collection
      .find({})
      .sort({ date: -1 })
      .skip(perPage * (page - 1))
      .limit(perPage)
      .toArray();
    const processedData = data.map((item: any) => ({
      ...item,
      _id: item._id.toString(), // Преобразование ObjectId в строку
    }));

    const itemsCount = await db.collection("news").countDocuments({});
    return { processedData, itemsCount };
  } catch (err) {
    throw new Error("failed to fetch data. please try again later");
  }
}
