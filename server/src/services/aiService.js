const ai = require("../config/gemini");
// const {AppError}  = require("../middlewares/errorHandler");

const analyzeTask = async(title,description = "")=>{
    //promt so we can tell gemini should return with correct format

    const prompt = `
    You are an expert project manager and software architect.
    Analyze the following task and return a json object. 


    Task title: "${title}"
    Task Description: "${description}"

    Return ONLY a valid JSON object with no explanation,no markdown,
    no code blocks. Just raw JSON in this exact format:

    {
        "difficulty": <number from 1 to 5>,
        "tags": [<3 relevant strings tags>],
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
        const result =  await ai.models.generateContent(
            {
                model:"gemini-2.5-flash",
                contents:prompt,
            }    
        );
        const text = result.text.trim();

        //we need to clean the response to remove all kind markdown because sometime gemini

        const cleaned = text
            .replace(/```json/g, "")
            .replace(/```/g, "")
            .trim();
        
        //we need parse because its normal json string so we need to convert to JSON object
        const parsed = JSON.parse(cleaned);

        //validate the shape before returning
        if(
            typeof parsed.difficulty !== "number" ||
            !Array.isArray(parsed.tags) ||
            !Array.isArray(parsed.subTasks) ||
            typeof parsed.estimatedHours !== "number"
        ){
            throw new Error("Invalid AI response shape");
        }

        return parsed;

    }catch(err){
        console.error("Gemini error",err.message);
        //Return safe defaults so the task still saves even if AI fails
        return{
            difficulty:null,
            tags:[],
            subTasks:[],
            estimatedHours:null,
        }; 
    }

};

module.exports = {analyzeTask};
