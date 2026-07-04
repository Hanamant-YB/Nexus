const geminiModel = require("../config/gemini");
const {AppError}  = require("../middlewares/errorHandler");

const analyzeTask = async(title,description = "")=>{
    //promt so we can tell gemini should return with correct format

    const promt = `
    You are an exper project manager and software architect.
    Analyze the following task and return a json object. 


    Task title: "${title}"
    Task Description: "${description}"

    Return ONLY a valid JSON object with no explaination,no markdown,
    no code blocks. Just raw JSON in this exact format:

    {
        "difficulty": <number from 1 to 5>,
        "tags": [<3 relevent strings tags>],
        "subTasks": [<5 to 7 clear actionable sub-task strings>],
        "estimatedHours": <realistic number of hours as integer>
    }
    
    Rules:
    - difficulty: 1 = trivial, 5 = very complex
    - tags: short relevant labels like "frontend","auth","database"
    - subTasks: start each with an action verb like "Create","Build","Write"
    - estimatedHours: realistic estimate for a mid-level developer
    `;

    try{
        const result =  await geminiModel.generateContent(prompt);
        const text = result.response.text().trim();

        //we need to clean the response to remove all kind markdown because sometime gemini

        const cleaned = text
            .replace(/```json/g, "")
            .replace(/```/g, "")
            .trim();

            
    }catch(err){

    }

};
