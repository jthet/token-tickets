const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema({
  tokenId: { type: String, required: true },
  supplyKey: { type: String, required: true },
  tokenName: { type: String, required: true },
  tokenSymbol: { type: String, required: true },
  tokenMemo: { type: String },
  maxSupply: { type: Number, required: true },
  transactionStatus: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  serialNumbers: { type: [Number], default: [] },
  organizerAccountId: { type: String, required: true },
});

module.exports = mongoose.model("events", EventSchema);
