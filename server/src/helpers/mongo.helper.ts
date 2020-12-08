import mongoose, { Connection } from "mongoose";

export class MongoHelper {
  public static connection: Connection;

  public static connect() {
    const mongodbname: string = process.env.MONGO_DB ? process.env.MONGO_DB : "";

    return new Promise((resolve, reject) => {
      mongoose
        .connect(mongodbname, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
          useFindAndModify: false,
        })
        .then(() => {
          resolve(mongoose.connection);
        })
        .catch(err => console.error(err));
      mongoose.connection.on("error", err => {
        reject(err);
      });
    });
  }
}
