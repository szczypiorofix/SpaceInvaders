import * as mongoose from "mongoose";

/**
 * News schema
 */
const newsSchema = new mongoose.Schema({
  date: Number,
  text: String,
});

export const News = mongoose.model("News", newsSchema);
