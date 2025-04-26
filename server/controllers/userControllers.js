const User = require('../models/userModel');
const Convertation = require('../models/conversationModel');
require('dotenv').config();

const returnUserProfileInfo = async (req, res) => {
    try {
        const userId = req.user.id;
        const existingUser = await User.findById(userId).lean();
        
        if (!existingUser) {
            return res.status(404).json({ error: "Email does not exist" });
        }

        res.status(200).json({
            email: existingUser.email,
            username: existingUser.username,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const returnUserConversations = async (req, res) => {
    try {
        const userId = req.user.id;
        const existingUser = await User.findById(userId);
    
        if (!existingUser) {
            return res.status(409).json({ error: "Email does not exist" });
        }

        const allConversations = await Convertation.find({ userId }).sort({ createdAt: -1 }).lean();
      
        res.status(200).json({
            conversations: allConversations,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    returnUserProfileInfo,
    returnUserConversations,
};
