import { GoogleGenAI, Type } from "@google/genai";
import { AnalysisResult } from "../types";
import { priceData } from "../data/priceData";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.warn("Gemini API key not found. AI features will not work.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });
const model = 'gemini-2.5-flash';

// Helper function to handle JSON parsing safely
const parseJsonResponse = async <T>(responsePromise: Promise<any>, defaultValue: T): Promise<T> => {
    if (!API_KEY) return defaultValue;
    try {
        const response = await responsePromise;
        const text = response.text.trim();
        // Remove potential markdown backticks for JSON
        const cleanJson = text.replace(/^```json\s*|```\s*$/g, '');
        return JSON.parse(cleanJson) as T;
    } catch (error) {
        console.error("Error parsing Gemini JSON response:", error);
        return defaultValue;
    }
};

export const getAiAssistantResponse = async (prompt: string, context?: string): Promise<string> => {
  if (!API_KEY) {
    return "AI service is currently unavailable. Please configure the API key.";
  }
  
  const fullPrompt = `You are a helpful AI assistant for an anti-corruption platform called "Eradicator". Your role is to help users understand corruption analysis, RAB (Rencana Anggaran Biaya), and related topics. Be concise, clear, and helpful. Format your response using simple markdown (bold text, bullet points).
  ${context ? `\n\nHere is the context for the user's question:\n${context}` : ''}
  \n\nUser prompt: "${prompt}"`;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: fullPrompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error getting response from Gemini API:", error);
    return "Sorry, I encountered an error while processing your request.";
  }
};

export const getCorruptionAnalysis = async (fileContent: string): Promise<AnalysisResult> => {
    // Convert price data to a more compact format for the prompt
    const priceDatabaseString = JSON.stringify(priceData.map(p => ({
        name: p.productName,
        region: p.regionName,
        max_price: p.maxPrice
    })));

    const prompt = `You are a meticulous financial auditor AI for the "Eradicator" anti-corruption platform. Your task is to analyze a user-submitted document (like a budget plan or procurement list) and cross-reference it with our internal price database to detect potential corruption risks, specifically price markups.

**Internal Price Reference Database:**
This database contains the maximum reasonable prices for various items across different regions in Indonesia.
\`\`\`json
${priceDatabaseString}
\`\`\`

**User's Document Content:**
The following is the content of the user's uploaded file. It may be in various text formats (CSV, plain text lists, etc.).
\`\`\`
${fileContent}
\`\`\`

**Your Instructions:**
1.  **Parse Document:** Carefully parse the user's document to identify each item and its listed price. The document might have headers or be a simple list.
2.  **Match & Compare:** For each item found, search the internal price reference database for a matching or very similar product. Be flexible with naming variations (e.g., "Laptop Core i5" matches ""Laptop (Core i5, RAM 8GB, SSD 256GB, 14"")"). Compare the price in the user's document (\`found_price\`) with the 'max_price' from the database (\`reference_max_price\`).
3.  **Identify Markups:** ONLY consider items where \`found_price\` is GREATER THAN \`reference_max_price\`. These are potential markups. Ignore items priced at or below the reference.
4.  **Calculate Markup Percentage:** For each potential markup, calculate the exact markup percentage using this strict formula: \`Markup % = ((found_price - reference_max_price) / reference_max_price) * 100\`. Round the result to two decimal places.
5.  **Determine Risk Level:** Based on the findings, determine an overall risk level using these specific rules:
    - **'High'**: If any single item has a markup of 25% or more, OR if there are three or more items with any markup.
    - **'Medium'**: If any single item has a markup between 10% and 24.99%, OR if there are two items with any markup.
    - **'Low'**: If there is only one item with a markup and it is less than 10%.
    - If no markups are found, the risk level is **'Low'**.
6.  **Generate Summary:** Provide a concise summary of your findings. If markups are found, state how many items were flagged. If no markups are found, state that all prices are within a reasonable range according to the database.
7.  **Detail Insights:** In the 'insights' array, list ONLY the items you identified as potential markups. For each, create a string in this exact format: "Item: [Item Name] | Found Price: Rp[Price] | Ref. Max Price: Rp[Max Price] | Markup: [Calculated]%"

**Example Insight String:** "Item: Laptop ABC | Found Price: Rp17,000,000 | Ref. Max Price: Rp15,000,000 | Markup: 13.33%"

Return your analysis ONLY in the specified JSON format. Do not add any commentary or explanations outside of the JSON structure.`;

    const responsePromise = ai.models.generateContent({
        model,
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: {
                type: Type.OBJECT,
                properties: {
                    riskLevel: { type: Type.STRING, enum: ['Low', 'Medium', 'High'], description: "The calculated risk level." },
                    summary: { type: Type.STRING, description: "A brief summary of the findings, mentioning the number of overpriced items." },
                    insights: { type: Type.ARRAY, items: { type: Type.STRING }, description: "A list of key insights, detailing each overpriced item, its price, reference price, and markup percentage." }
                },
                required: ['riskLevel', 'summary', 'insights']
            }
        }
    });
    return parseJsonResponse(responsePromise, { riskLevel: 'Low', summary: 'Error generating analysis.', insights: [] });
};


export const getRabSuggestion = async (description: string): Promise<{ unitPrice: number; unit: string }> => {
    const prompt = `Based on the item description "${description}", suggest a reasonable unit price (in IDR, without commas or dots) and a common unit (e.g., 'unit', 'buah', 'paket', 'lembar').`;
    const responsePromise = ai.models.generateContent({
        model,
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: {
                type: Type.OBJECT,
                properties: {
                    unitPrice: { type: Type.INTEGER, description: "Suggested price per unit as a number." },
                    unit: { type: Type.STRING, description: "Suggested unit for the item." }
                },
                required: ['unitPrice', 'unit']
            }
        }
    });
    return parseJsonResponse(responsePromise, { unitPrice: 0, unit: '' });
};

export const summarizeArticle = async (content: string): Promise<{ summary: string }> => {
    const prompt = `Summarize the key takeaways from the following article content into a few concise bullet points. Use markdown for the bullet points (e.g., "* Point 1").\n\nArticle:\n${content.substring(0, 2000)}`;
    const responsePromise = ai.models.generateContent({
        model,
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: {
                type: Type.OBJECT,
                properties: {
                    summary: { type: Type.STRING, description: "The summarized key takeaways in markdown bullet points." }
                },
                required: ['summary']
            }
        }
    });
    return parseJsonResponse(responsePromise, { summary: 'Could not generate summary.' });
};

export const getPriceSuggestion = async (itemName: string, region: string): Promise<{ suggestedPrice: number }> => {
    const prompt = `Provide a reasonable market price estimate in IDR (as a single number, no commas or dots) for the item "${itemName}" in the region "${region}, Indonesia".`;
    const responsePromise = ai.models.generateContent({
        model,
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: {
                type: Type.OBJECT,
                properties: {
                    suggestedPrice: { type: Type.INTEGER, description: "The estimated market price." }
                },
                required: ['suggestedPrice']
            }
        }
    });
    return parseJsonResponse(responsePromise, { suggestedPrice: 0 });
};

export const getDashboardInsight = async (): Promise<{ insight: string }> => {
    const prompt = `Provide one short, interesting, and actionable daily insight or tip related to anti-corruption, transparency, or good governance in Indonesia. Keep it under 200 characters.`;
    const responsePromise = ai.models.generateContent({
        model,
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: {
                type: Type.OBJECT,
                properties: {
                    insight: { type: Type.STRING, description: "A single, short insight for the day." }
                },
                required: ['insight']
            }
        }
    });
    return parseJsonResponse(responsePromise, { insight: 'Always verify information from multiple sources to ensure transparency.' });
};
