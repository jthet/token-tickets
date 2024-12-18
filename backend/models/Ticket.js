const mongoose = require("mongoose");

const TicketSchema = new mongoose.Schema({
  tokenId: { type: String, required: true },
  tokenName: { type: String, required: true },
  tokenSymbol: { type: String, required: true },
  serialNumber: { type: Number, required: true },
  price: { type: Number, required: true },
  ownerAccount: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

// Ensure serialNumber is unique for each tokenId
TicketSchema.index({ tokenId: 1, serialNumber: 1 }, { unique: true });

module.exports = mongoose.model("tickets", TicketSchema);
