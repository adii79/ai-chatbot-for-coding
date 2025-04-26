const prompts = require('../utils/prompts');
const { generateContentFromPrompt } = require('../utils/googleGeminiApi'); // Importing the new function
const { saveConversation } = require('./conversationControllers');

const processAIRequest = async (req, res) => {
  try {
    const { featureType, userInput, language } = req.body;

    if (!featureType || !userInput) {
      return res.status(400).json({ error: "Missing required inputs." });
    }


    const promptTemplate = prompts[featureType];

    if (!promptTemplate) {
      return res.status(400).json({ error: "Invalid feature selected." });
    }

    let fullPrompt = promptTemplate;

    if (featureType === "convertCode" && language?.trim()) {
      fullPrompt += `Convert following code into ${language} language. Code: `;
    }
    fullPrompt += userInput;

    const response = await generateContentFromPrompt(fullPrompt);

    if (req.user || req.user.id) {
      await saveConversation(req.user.id, featureType, userInput, response);
    }
    
    res.status(200).json({ success: true, data: response });

  }
  catch (error) {
    console.error("AI Error:", error);
    res.status(500).json({ error: "Internal Server Error. AI failed." });

  }
};

module.exports = { processAIRequest };