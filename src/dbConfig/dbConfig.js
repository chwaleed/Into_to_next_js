import mongoose from "mongoose";

export async function connect() {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    const connection = mongoose.connection;
    connection.on("connected", () => {
      console.log("Mongo Db connected successfully.");
    });
    connection.on("error", (err) => {
      console.log("MongoDb connection error", err);
      process.exit();
    });
  } catch (error) {
    console.log("Something Went Wrong!");
    console.log(error);
  }
}
