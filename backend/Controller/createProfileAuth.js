const Profile = require("../models/Profile");

const myProfile = async (req, res) => {
  try {
    const { photo,address, language, experience, availability, teach, learn } = req.body;

    const existingProfile = await Profile.findOne({ userId: req.user.userId });
    if (existingProfile) {
      return res.status(400).json({ message: "profile already exists for this user" });
    }

    const createProfile = await Profile.create({
      userId: req.user.userId,
      photo,
      address,
      language,
      experience,
      availability,
      teach,
      learn,
    });

    res.status(200).json(createProfile);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getMyProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne({ userId: req.user.userId }).populate('userId', 'name email');

    if (!profile) {
      return res.status(404).json({ message: "profile not found" });
    }

    res.status(200).json(profile);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
const getProfileById = async (req, res) => {
  try {
    const { id } = req.params;

    const profile = await Profile.findOne({ userId: id }).populate('userId', 'name email');

    if (!profile) {
      return res.status(404).json({ message: "profile not found" });
    }

    res.status(200).json(profile);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { myProfile, getMyProfile, getProfileById };
