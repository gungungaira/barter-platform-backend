const MatchRequest = require("../models/FindMatch"); // adjust path
const Profile=require('../models/Profile')

const sendRequest = async (req, res) => {
  try {
    const senderId =req.user.userId;        // from your auth middleware
    const { receiverId } = req.body;      // the person you're sending to

    if (!receiverId) {
      return res.status(400).json({ message: "Receiver ID is required." });
    }

    if (senderId === receiverId) {
      return res.status(400).json({ message: "You cannot send a request to yourself." });
    }

    // check if a request already exists between these two
    const existing = await MatchRequest.findOne({
      sender: senderId,
      receiver: receiverId,
    });

    if (existing) {
      return res.status(400).json({ message: "Request already sent." });
    }

    const newRequest = await MatchRequest.create({
      sender: senderId,
      receiver: receiverId,
    });

    res.status(201).json(newRequest);
  } catch (error) {
    console.error("sendRequest error:", error);
    res.status(500).json({ message: "Something went wrong." });
  }
};
const getMyRequests = async (req, res) => {
  try {
    const userId =req.user.userId;

    const requests = await MatchRequest.find({
      receiver: userId,
      status: "pending",
    }).populate("sender", "name"); // pulls sender's name from User model

    res.json(requests);
  } catch (error) {
    console.error("getMyRequests error:", error);
    res.status(500).json({ message: "Something went wrong." });
  }
};

const acceptRequest = async (req, res) => {
  try {
    const { requestId } = req.params;
    const userId = req.user.userId;

    const request = await MatchRequest.findById(requestId);

    if (!request) {
      return res.status(404).json({ message: "Request not found." });
    }

    // security check: only the receiver can accept it
    if (request.receiver.toString() !== userId) {
      return res.status(403).json({ message: "Not authorized." });
    }

    request.status = "accepted";
    await request.save();

    res.json(request);
  } catch (error) {
    console.error("acceptRequest error:", error);
    res.status(500).json({ message: "Something went wrong." });
  }
};

const deleteRequest = async (req, res) => {
  try {
    const { requestId } = req.params;
    const userId = req.user.userId;

    const request = await MatchRequest.findById(requestId);

    if (!request) {
      return res.status(404).json({ message: "Request not found." });
    }

    // allow either sender or receiver to delete/cancel it
    if (
      request.sender.toString() !== userId &&
      request.receiver.toString() !== userId
    ) {
      return res.status(403).json({ message: "Not authorized." });
    }

    await request.deleteOne();

    res.json({ message: "Request deleted." });
  } catch (error) {
    console.error("deleteRequest error:", error);
    res.status(500).json({ message: "Something went wrong." });
  }
};
const findMatch = async (req, res) => {
  try {
    const myUserId = req.user.userId;

    // Get my own profile
    const myProfile = await Profile.findOne({ userId: myUserId });

    if (!myProfile) {
      return res.status(404).json({ message: "Please create your profile first." });
    }

    // Get everyone else's profile (exclude my own), and bring in their name
    const otherProfiles = await Profile.find({ userId: { $ne: myUserId } })
      .populate("userId", "name");

    // case-insensitive overlap check
    const findOverlap = (arrA = [], arrB = []) => {
      const lowerB = arrB.map((s) => s.toLowerCase());
      return arrA.filter((skill) => lowerB.includes(skill.toLowerCase()));
    };

    const matches = otherProfiles
      .map((profile) => {
        const matchedTeach = findOverlap(profile.teach, myProfile.learn);
        const matchedLearn = findOverlap(profile.learn, myProfile.teach);

        if (matchedTeach.length > 0 && matchedLearn.length > 0) {
          return {
            profile,
            matchedTeach,
            matchedLearn,
          };
        }
        return null;
      })
      .filter(Boolean);

    res.json(matches);
  } catch (error) {
    console.error("findMatch error:", error);
    res.status(500).json({ message: "Something went wrong." });
  }
};

const getFriends = async (req, res) => {
  try {
    const userId = req.user.userId;

    const accepted = await MatchRequest.find({
      status: "accepted",
      $or: [{ sender: userId }, { receiver: userId }],
    })
      .populate("sender", "name email")
      .populate("receiver", "name email");

    // For each accepted request, return the OTHER person (not myself)
    const friends = accepted.map((req) => {
      const isSender = req.sender._id.toString() === userId;
      const friend = isSender ? req.receiver : req.sender;
      return {
        requestId: req._id,
        friendId: friend._id,
        name: friend.name,
        email: friend.email,
      };
    });

    res.json(friends);
  } catch (error) {
    console.error("getFriends error:", error);
    res.status(500).json({ message: "Something went wrong." });
  }
};
module.exports = {
  sendRequest,
  getMyRequests,
  acceptRequest,
  deleteRequest,
  findMatch,
  getFriends
};