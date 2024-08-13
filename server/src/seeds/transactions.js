import mongoose from "mongoose";
import axios from "axios";
import { Transaction } from "../models/transaction.model.js";

const mongoURL = "mongodb://localhost:27017/roxiler";

mongoose
  .connect(mongoURL)
  .then(() => {
    console.log("MongoDB connected...");
  })
  .catch((err) => {
    console.error("Connection error", err.message);
  });

const populateDB = async () => {
  try {
    const response = await axios.get(
      "https://s3.amazonaws.com/roxiler.com/product_transaction.json"
    );
    const transactions = response.data;

    await Transaction.deleteMany({});

    for (const transactionData of transactions) {
      const transaction = new Transaction(transactionData);
      await transaction.save();
    }

    console.log("Data populated successfully");
    mongoose.connection.close();
  } catch (error) {
    console.error("Error fetching or saving data:", error);
  }
};

populateDB();
