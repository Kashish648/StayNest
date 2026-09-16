const { GoogleGenAI } = require("@google/genai");
const Listing = require("../models/listing");

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});


async function testModels() {
    const models = await ai.models.list();

    for await (const model of models) {
        console.log(model.name, model.supportedActions);
    }
}

testModels().catch(console.error);

module.exports.recommend = async (req, res) => {
    try {
        const { query } = req.body;

        if (!query || !query.trim()) {
            return res.status(400).json({
                success: false,
                message: "Please describe what you are looking for."
            });
        }

        // Ask Gemini to extract search requirements
        const response = await ai.models.generateContent({
            model: "gemini-3.5-flash",
            contents: `
You are a property-search assistant.

Extract ONLY these details from the user's request:

location: string or null
maxPrice: number or null

Return ONLY valid JSON in exactly this format:

{
  "location": null,
  "maxPrice": null
}

Do not invent information.

User request:
${query}
            `,
            config: {
                temperature: 0
            }
        });

        const text = response.text.trim();

        console.log("Gemini response:", text);

        // Remove markdown code fences if Gemini adds them
        const cleanText = text
            .replace(/```json/g, "")
            .replace(/```/g, "")
            .trim();

        const requirements = JSON.parse(cleanText);

        // Build MongoDB filter
        const filter = {};

        if (requirements.location) {
            filter.location = {
                $regex: requirements.location,
                $options: "i"
            };
        }

        if (requirements.maxPrice) {
            filter.price = {
                $lte: requirements.maxPrice
            };
        }

        // Search listings
        const listings = await Listing.find(filter).limit(12);

        res.json({
            success: true,
            requirements,
            listings
        });

    } catch (error) {

        console.error("Gemini Recommendation Error:", error);

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};