const {GoogleGenerativeAI} = require("@google/generative-ai")

//initialise the gemini client with api key
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const geminiModel = genAI.getGenerativeModel({
    model:"gemini-1.5-flash",
});

module.exports = geminiModel;
