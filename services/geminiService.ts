
import { GoogleGenAI, Type } from "@google/genai";
import type { Recipe } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable is not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const recipeSchema = {
    type: Type.OBJECT,
    properties: {
        recipeName: { type: Type.STRING, description: 'The name of the recipe.' },
        description: { type: Type.STRING, description: 'A short, enticing description of the dish.' },
        servings: { type: Type.STRING, description: 'Number of servings the recipe makes.' },
        prepTime: { type: Type.STRING, description: 'Preparation time, e.g., "15 minutes".' },
        cookTime: { type: Type.STRING, description: 'Cooking time, e.g., "30 minutes".' },
        totalTime: { type: Type.STRING, description: 'Total time to make the recipe.' },
        ingredients: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: 'A list of all ingredients required, with quantities.'
        },
        instructions: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: 'Step-by-step instructions for preparing the dish.'
        },
    },
    required: ['recipeName', 'description', 'servings', 'prepTime', 'cookTime', 'totalTime', 'ingredients', 'instructions']
};

export const generateRecipe = async (ingredients: string, mealType: string, dietaryRestrictions: string): Promise<Recipe> => {
    let prompt = `Act as a creative chef. Create a delicious recipe using the following ingredients: ${ingredients}.`;

    if (mealType && mealType !== 'any') {
        prompt += ` The recipe should be for ${mealType}.`;
    }

    if (dietaryRestrictions && dietaryRestrictions !== 'none') {
        prompt += ` It must adhere to the following dietary restrictions: ${dietaryRestrictions}.`;
    }

    prompt += " Please provide a detailed recipe including prep time, cook time, total time, servings, and clear instructions.";
    
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: recipeSchema,
                temperature: 0.7,
                topP: 0.9,
            },
        });

        const jsonText = response.text.trim();
        const recipeData = JSON.parse(jsonText);
        return recipeData as Recipe;
    } catch (error) {
        console.error("Error generating recipe with Gemini:", error);
        throw new Error("Failed to parse recipe from Gemini response.");
    }
};
