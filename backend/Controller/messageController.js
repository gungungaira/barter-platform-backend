const Message = require("../models/Message");
const mongoose=require('mongoose')

const sendMessage = async (req, res) => {
  try {
    const senderId = req.user.userId;
    const { receiverId, text } = req.body;

    if (!receiverId || !text || !text.trim()) {
      return res.status(400).json({ message: "receiverId and text are required." });
    }

    const message = await Message.create({
      sender: senderId,
      receiver: receiverId,
      text: text.trim(),
    });

    res.status(201).json(message);
  } catch (error) {
    console.error("sendMessage error:", error);
    res.status(500).json({ message: "Something went wrong." });
  }
};

const getConversation = async (req, res) => {
  try {
    const myId = req.user.userId;
    const { friendId } = req.params;

    const messages = await Message.find({
      $or: [
        { sender: myId, receiver: friendId },
        { sender: friendId, receiver: myId },
      ],
    }).sort({ createdAt: 1 });

    res.json(messages);
  } catch (error) {
    console.error("getConversation error:", error);
    res.status(500).json({ message: "Something went wrong." });
  }
};

const getInbox = async (req, res) => {
  try {
    const myId = req.user.userId;
    const myObjectId = new mongoose.Types.ObjectId(myId);

    const conversations = await Message.aggregate([
      {
        $match: {
          $or: [{ sender: myObjectId }, { receiver: myObjectId }],
        },
      },
      { $sort: { createdAt: -1 } },
      {
        $group: {
          _id: {
            $cond: [{ $eq: ["$sender", myObjectId] }, "$receiver", "$sender"],
          },
          lastMessage: { $first: "$text" },
          lastMessageAt: { $first: "$createdAt" },
        },
      },
      {
        $lookup: {
          from: "users", // ⚠️ change to your actual users collection name — see note below
          localField: "_id",
          foreignField: "_id",
          as: "friend",
        },
      },
      { $unwind: "$friend" },
      {
        $project: {
          friendId: "$_id",
          name: "$friend.name",
          lastMessage: 1,
          lastMessageAt: 1,
        },
      },
      { $sort: { lastMessageAt: -1 } },
    ]);

    res.json(conversations);
  } catch (error) {
    console.error("getInbox error:", error);
    res.status(500).json({ message: "Something went wrong." });
  }
};

module.exports = { sendMessage, getConversation, getInbox };

