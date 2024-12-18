const express = require("express");
const router = express.Router();
const Ticket = require("../models/Ticket");

// POST: Create a new ticket
router.post("/", async (req, res) => {
  try {
    const {
      tokenId,
      tokenName,
      tokenSymbol,
      serialNumber,
      price,
      ownerAccount,
      // Presigned transaction will be signed by the seller
    } = req.body;

    const newTicket = new Ticket({
      tokenId,
      tokenName,
      tokenSymbol,
      serialNumber,
      price,
      ownerAccount,
      // Presigned transaction will be signed by the seller
    });

    await newTicket.save();
    res.status(201).json({ message: "Ticket created successfully!" });
  } catch (err) {
    console.error("Error creating ticket:", err);
    res.status(500).json({ error: "Failed to create ticket." });
  }
});

// GET: Retrieve all tickets for a specific tokenId
router.get("/get-tickets/:tokenId", async (req, res) => {
  try {
    const { tokenId } = req.params;
    const tickets = await Ticket.find({ tokenId });
    if (!tickets || tickets.length === 0) {
      return res
        .status(404)
        .json({ error: "No tickets found for this tokenId." });
    }
    res.status(200).json(tickets);
  } catch (err) {
    console.error("Error fetching tickets:", err);
    res.status(500).json({ error: "Failed to fetch tickets." });
  }
});

// GET: Retrieve a specific ticket by tokenId and serialNumber
router.get("/get-ticket/:tokenId/:serialNumber", async (req, res) => {
  try {
    const { tokenId, serialNumber } = req.params;
    const ticket = await Ticket.findOne({ tokenId, serialNumber });
    if (!ticket) {
      return res.status(404).json({ error: "Ticket not found." });
    }
    res.status(200).json(ticket);
  } catch (err) {
    console.error("Error fetching ticket:", err);
    res.status(500).json({ error: "Failed to fetch ticket." });
  }
});

// POST: Update the owner of a ticket
router.post("/update-owner/:tokenId/:serialNumber", async (req, res) => {
  try {
    const { tokenId, serialNumber } = req.params;
    const { ownerAccount } = req.body;

    const updatedTicket = await Ticket.findOneAndUpdate(
      { tokenId, serialNumber },
      { ownerAccount },
      { new: true }
    );

    if (!updatedTicket) {
      return res.status(404).json({ error: "Ticket not found." });
    }

    res.status(200).json({
      message: "Ticket owner updated successfully!",
      ticket: updatedTicket,
    });
  } catch (err) {
    console.error("Error updating ticket owner:", err);
    res.status(500).json({ error: "Failed to update ticket owner." });
  }
});

// GET: Retrieve all tickets owned by a specific account
router.get("/get-tickets-by-owner/:ownerAccount", async (req, res) => {
  try {
    const { ownerAccount } = req.params;

    const tickets = await Ticket.find({ ownerAccount });
    if (!tickets || tickets.length === 0) {
      return res
        .status(404)
        .json({ error: "No tickets found for this owner." });
    }

    res.status(200).json(tickets);
  } catch (err) {
    console.error("Error fetching tickets by owner:", err);
    res.status(500).json({ error: "Failed to fetch tickets." });
  }
});

// DELETE: Delete a ticket by tokenId and serialNumber
router.delete("/delete-ticket/:tokenId/:serialNumber", async (req, res) => {
  try {
    const { tokenId, serialNumber } = req.params;

    const deletedTicket = await Ticket.findOneAndDelete({
      tokenId,
      serialNumber,
    });
    if (!deletedTicket) {
      return res.status(404).json({ error: "Ticket not found." });
    }

    res.status(200).json({ message: "Ticket deleted successfully!" });
  } catch (err) {
    console.error("Error deleting ticket:", err);
    res.status(500).json({ error: "Failed to delete ticket." });
  }
});

module.exports = router;
