db = db.getSiblingDB("store");

db.createCollection("categories");
db.createCollection("products");
db.createCollection("orders");

db.categories.insertMany([
  {
    _id: ObjectId("507f1f77bcf86cd799439011"),
    name: "Smartphones",
    description: "Mobile devices",
  },
  {
    _id: ObjectId("507f1f77bcf86cd799439012"),
    name: "Laptops",
    description: "Portable computers",
  },
]);

db.products.insertMany([
  {
    _id: ObjectId("507f191e810c19729de860ea"),
    name: "iPhone 14",
    categoryId: ObjectId("507f1f77bcf86cd799439011"),
    price: 999,
    stock: 50,
    description: "Latest iPhone model",
  },
  {
    _id: ObjectId("507f191e810c19729de860eb"),
    name: "Samsung Galaxy S23",
    categoryId: ObjectId("507f1f77bcf86cd799439011"),
    price: 899,
    stock: 30,
    description: "Flagship Samsung phone",
  },
  {
    _id: ObjectId("507f191e810c19729de860ec"),
    name: "MacBook Pro",
    categoryId: ObjectId("507f1f77bcf86cd799439012"),
    price: 1999,
    stock: 20,
    description: "Powerful laptop",
  },
]);

db.orders.insertMany([
  {
    _id: ObjectId("507f191e810c19729de860e1"),
    userId: ObjectId("507f191e810c19729de860e2"),
    items: [
      {
        productId: ObjectId("507f191e810c19729de860ea"),
        quantity: 1,
        price: 999,
      },
      {
        productId: ObjectId("507f191e810c19729de860eb"),
        quantity: 2,
        price: 899,
      },
    ],
    total: 2797,
    status: "completed",
    createdAt: new Date(),
  },
]);
