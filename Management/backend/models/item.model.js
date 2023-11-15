import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
  itemId: {
    type: String,
    required: true,
  },
  itemName: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  minimumStock: {
    type: Number,
    required: true,
  },
  costPrice: {
    type: Number,
    required: true,
  },
  dealerName: {
    type: String,
    required: true,
  },
});

export default itemSchema;
export const Item = new mongoose.model("Item", itemSchema);
