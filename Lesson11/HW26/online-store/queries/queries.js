const { MongoClient, ObjectId } = require("mongodb");

// Рядок підключення з правильною базою автентифікації
const uri = "mongodb://admin:secret@localhost:27017/store?authSource=admin";

async function runQueries() {
  const client = new MongoClient(uri, { useUnifiedTopology: true });

  try {
    // Перевірка підключення
    await client.connect();
    console.log("Successfully connected to MongoDB");
    const db = client.db("store");

    // 1. Знайти всі продукти в категорії “Smartphones”
    const smartphones = await db
      .collection("products")
      .aggregate([
        {
          $lookup: {
            from: "categories",
            localField: "categoryId",
            foreignField: "_id",
            as: "category",
          },
        },
        {
          $match: { "category.name": "Smartphones" },
        },
        {
          $project: { name: 1, price: 1, stock: 1 },
        },
      ])
      .toArray();
    console.log("Smartphones:", smartphones);

    // 2. Порахувати загальний прибуток із усіх замовлень
    const totalProfit = await db
      .collection("orders")
      .aggregate([
        {
          $group: {
            _id: null,
            total: { $sum: "$total" },
          },
        },
      ])
      .toArray();
    console.log("Total Profit:", totalProfit[0]?.total || 0);

    // 3. Оновити кількість товару на складі після замовлення
    const orderItems = [
      { productId: ObjectId("507f191e810c19729de860ea"), quantity: 2 },
    ];
    for (const item of orderItems) {
      await db
        .collection("products")
        .updateOne(
          { _id: item.productId },
          { $inc: { stock: -item.quantity } }
        );
    }
    console.log("Stock updated");

    // 4. Отримати топ-3 товари за кількістю продажів
    const topProducts = await db
      .collection("orders")
      .aggregate([
        { $unwind: "$items" },
        {
          $group: {
            _id: "$items.productId",
            totalSold: { $sum: "$items.quantity" },
          },
        },
        {
          $lookup: {
            from: "products",
            localField: "_id",
            foreignField: "_id",
            as: "product",
          },
        },
        { $unwind: "$product" },
        {
          $project: {
            name: "$product.name",
            totalSold: 1,
          },
        },
        { $sort: { totalSold: -1 } },
        { $limit: 3 },
      ])
      .toArray();
    console.log("Top 3 Products:", topProducts);
  } catch (error) {
    console.error("Error executing queries:", error);
  } finally {
    await client.close();
    console.log("MongoDB connection closed");
  }
}

runQueries();
