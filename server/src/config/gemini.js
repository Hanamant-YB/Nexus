const {GoogleGenAI} = require("@google/genai")

//initialise the gemini client with api key
const ai = new GoogleGenAI(
    {
      apiKey:process.env.GEMINI_API_KEY
    }
);


module.exports = ai;
