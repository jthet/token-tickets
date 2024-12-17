const express = require("express");
const router = express.Router();
const Event = require("../models/Event");

// POST: Save an Event transaction to the database
router.post("/", async (req, res) => {
  try {
    const {
      tokenId,
      supplyKey,
      tokenName,
      tokenSymbol,
      tokenMemo,
      maxSupply,
      transactionStatus,
      serialNumbers,
      organizerAccountId,
    } = req.body;

    const newEvent = new Event({
      tokenId,
      supplyKey,
      tokenName,
      tokenSymbol,
      tokenMemo,
      maxSupply,
      transactionStatus,
      serialNumbers,
      organizerAccountId,
    });

    await newEvent.save();
    res.status(201).json({ message: "Event transaction saved successfully!" });
  } catch (err) {
    console.error("Error saving event transaction:", err);
    res.status(500).json({ error: "Failed to save event transaction." });
  }
});

// GET: Retrieve all events with tokenName and tokenId
router.get("/get-events", async (req, res) => {
  try {
    const events = await Event.find({}, "tokenName tokenId");
    if (!events || events.length === 0) {
      return res.status(404).json({ error: "No events found" });
    }
    res.status(200).json(events);
  } catch (err) {
    console.error("Error fetching events:", err);
    res.status(500).json({ error: "Failed to fetch events." });
  }
});

// GET: Retrieve an event by tokenId
router.get("/get-event/:tokenId", async (req, res) => {
  try {
    const { tokenId } = req.params;
    const event = await Event.findOne({ tokenId });
    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }
    res.status(200).json(event);
  } catch (err) {
    console.error("Error fetching event:", err);
    res.status(500).json({ error: "Failed to fetch event." });
  }
});

// POST: Update serial numbers for a specific token ID
router.post("/update-serials/:tokenId", async (req, res) => {
  try {
    const { tokenId } = req.params;
    const { serials } = req.body;

    if (!serials || !Array.isArray(serials)) {
      return res
        .status(400)
        .json({ error: "Serial numbers must be an array." });
    }

    const updatedEvent = await Event.findOneAndUpdate(
      { tokenId }, // Find by tokenId
      { $addToSet: { serialNumbers: { $each: serials } } }, // Add serials to array
      { new: true, upsert: false } // Return updated document, don't create a new one
    );

    if (!updatedEvent) {
      return res.status(404).json({ error: "Event not found." });
    }

    res.status(200).json({
      message: "Serial numbers updated successfully!",
      event: updatedEvent,
    });
  } catch (err) {
    console.error("Error updating serial numbers:", err);
    res.status(500).json({ error: "Failed to update serial numbers." });
  }
});

// GET: Retrieve events by organizerAccountId
router.get("/get-events-by-organizer/:organizerAccountId", async (req, res) => {
  try {
    const { organizerAccountId } = req.params;

    // Fetch all events matching the organizer's account ID
    const events = await Event.find(
      { organizerAccountId }, // Filter by organizer's account ID
      "tokenId tokenName tokenMemo supplyKey maxSupply" // Project specific fields
    );

    if (!events || events.length === 0) {
      return res
        .status(404)
        .json({ error: "No events found for this organizer." });
    }

    res.status(200).json(events);
  } catch (err) {
    console.error("Error fetching events by organizer:", err);
    res.status(500).json({ error: "Failed to fetch events." });
  }
});

router.get("/unique-events", async (req, res) => {
  try {
    const uniqueEvents = await Event.aggregate([
      {
        $group: {
          _id: "$tokenId", // Group by tokenId
          tokenName: { $first: "$tokenName" },
          tokenSymbol: { $first: "$tokenSymbol" },
          tokenMemo: { $first: "$tokenMemo" },
        },
      },
      {
        $project: {
          _id: 0, // Exclude the MongoDB-generated _id
          tokenId: "$_id",
          tokenName: 1,
          tokenSymbol: 1,
          tokenMemo: 1,
        },
      },
    ]);

    if (!uniqueEvents || uniqueEvents.length === 0) {
      return res.status(404).json({ error: "No unique events found." });
    }

    res.status(200).json(uniqueEvents);
  } catch (err) {
    console.error("Error fetching unique events:", err);
    res.status(500).json({ error: "Failed to fetch unique events." });
  }
});


module.exports = router;
