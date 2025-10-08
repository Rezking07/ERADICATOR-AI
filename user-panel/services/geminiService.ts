// rezking07/eradicator-ai/ERADICATOR-AI-c97fdc3b5374f6cffe6641c8f996ff599a2f96b6/user-panel/services/geminiService.ts

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
        const cleanJson = text.replace(/^```json\s*|```\s*$/g, '');
        return JSON.parse(cleanJson) as T;
    } catch (error) {
        console.error("Error parsing Gemini JSON response:", error);
        return defaultValue;
    }
};

export const getCorruptionAnalysis = async (fileContent: string): Promise<AnalysisResult> => {
    const priceDatabaseString = JSON.stringify(priceData.map(p => ({
        kode_barang: p.productCode,
        nama_produk: p.productName,
        kode_wilayah: p.regionCode,
        satuan: p.unit,
        harga_minimum_acuan: p.minPrice,
        harga_maksimum_acuan: p.maxPrice
    })));

    const prompt = `
    Anda adalah seorang auditor AI investigatif super canggih untuk platform "Eradicator". Misi Anda adalah melakukan audit mendalam terhadap laporan pengadaan barang/jasa, mengidentifikasi anomali, dan menyajikan temuan secara jelas dan actionable.

    **Database Harga Acuan Internal (Sumber Kebenaran Absolut):**
    ${priceDatabaseString}

    **Konten Dokumen Laporan dari Pengguna (Format Bervariasi):**
    \`\`\`
    ${fileContent}
    \`\`\`

    **PROTOKOL AUDIT INVESTIGATIF:**

    **FASE 1: INTELIJEN & PEMAHAMAN KONTEKS (Wajib)**
    1.  **Identifikasi Wilayah:** Pindai dokumen untuk **mengidentifikasi kode wilayah ('kode_wilayah')**. Jika tidak ada, gunakan **harga rata-rata nasional** untuk setiap item sebagai acuan. Sebutkan dalam ringkasan bahwa analisis menggunakan harga rata-rata nasional.
    2.  **Ekstrak Data Kritis:** Dari setiap item, ekstrak: 'nama barang', 'kuantitas', 'harga_satuan', dan 'total_harga'. Jika hanya ada satu harga, asumsikan itu adalah harga satuan.
    3.  **Pencocokan Semantik Adaptif:** Hubungkan 'nama barang' dari laporan dengan 'nama_produk' di database. Jika tidak ada kecocokan 100%, cari item yang paling **serupa**. Jika item serupa digunakan, WAJIB sebutkan dalam 'details' insight. Contoh: "Item 'Meja Kantor' dibandingkan dengan acuan barang serupa: 'Meja Kerja (Partikel Board, 120x60 cm)'."

    **FASE 2: EKSEKUSI DETEKSI ANOMALI (Multi-Vektor)**
    - Lakukan semua analisis yang relevan untuk setiap item.

    **FASE 3: PEMBUATAN LAPORAN OUTPUT (Format JSON WAJIB)**
    - **riskLevel:** Tentukan level risiko keseluruhan ('High', 'Medium', 'Low').
    - **summary:** Buat ringkasan eksekutif yang informatif.
    - **insights:** Buat array of objects untuk setiap temuan. **Sangat Penting:** Urutkan array ini berdasarkan prioritas: 1. 'UNRECOGNIZED', 2. 'MARK_UP', 3. Lainnya.
    -   Setiap object insight WAJIB memiliki properti: 'type' ('MARK_UP', 'UNRECOGNIZED', dll), 'itemName', 'details', 'recommendation', dan 'potentialLoss'.

    Kembalikan HANYA dalam format JSON yang valid dan terurut.
    `;

    const responsePromise = ai.models.generateContent({
        model,
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: {
                type: Type.OBJECT,
                properties: {
                    riskLevel: { type: Type.STRING, enum: ['Low', 'Medium', 'High'] },
                    summary: { type: Type.STRING },
                    insights: {
                        type: Type.ARRAY,
                        items: {
                            type: Type.OBJECT,
                            properties: {
                                type: { type: Type.STRING, enum: ['MARK_UP', 'UNRECOGNIZED', 'UNIT_MISMATCH', 'QUALITY_ISSUE', 'CALCULATION_ERROR'] },
                                itemName: { type: Type.STRING },
                                details: { type: Type.STRING },
                                recommendation: { type: Type.STRING },
                                potentialLoss: { type: Type.NUMBER }
                            },
                            required: ['type', 'itemName', 'details', 'recommendation', 'potentialLoss']
                        }
                    }
                },
                required: ['riskLevel', 'summary', 'insights']
            }
        }
    });
    return parseJsonResponse(responsePromise, { riskLevel: 'Low', summary: 'Gagal menghasilkan analisis.', insights: [] });
};

export const getPriceSuggestion = async (itemName: string, region: string): Promise<{ suggestedPrice: number }> => {
    const internalMatch = priceData.find(p => p.productName.toLowerCase().includes(itemName.toLowerCase()) && p.regionName === region);
    if (internalMatch && internalMatch.maxPrice > 0) {
        return { suggestedPrice: internalMatch.maxPrice };
    }
    const prompt = `Provide a reasonable market price estimate in IDR (as a single number, no commas or dots) for the item "${itemName}" in the region "${region}, Indonesia".`;
    const responsePromise = ai.models.generateContent({
        model, contents: prompt, config: { responseMimeType: "application/json", responseSchema: { type: Type.OBJECT, properties: { suggestedPrice: { type: Type.INTEGER } }, required: ['suggestedPrice'] } }
    });
    return parseJsonResponse(responsePromise, { suggestedPrice: 0 });
};

export const getAiAssistantResponse = async (prompt: string, context?: string): Promise<string> => {
    if (!API_KEY) {
        return "AI service is currently unavailable. Please configure the API key.";
    }
    const fullPrompt = `You are a helpful AI assistant for an anti-corruption platform called "Eradicator". Your role is to help users understand corruption analysis, RAB (Rencana Anggaran Biaya), and related topics. Be concise, clear, and helpful. Format your response using simple markdown (bold text, bullet points).
    ${context ? `\n\nHere is the context for the user's question:\n${context}` : ''}
    \n\nUser prompt: "${prompt}"`;
    try {
        const response = await ai.models.generateContent({ model, contents: fullPrompt, });
        return response.text;
    } catch (error) {
        console.error("Error getting response from Gemini API:", error);
        return "Sorry, I encountered an error while processing your request.";
    }
};

export const getRabSuggestion = async (description: string): Promise<{ unitPrice: number; unit: string }> => {
    const prompt = `Based on the item description "${description}", suggest a reasonable unit price (in IDR, without commas or dots) and a common unit (e.g., 'unit', 'buah', 'paket', 'lembar').`;
    const responsePromise = ai.models.generateContent({
        model, contents: prompt, config: { responseMimeType: "application/json", responseSchema: { type: Type.OBJECT, properties: { unitPrice: { type: Type.INTEGER }, unit: { type: Type.STRING } }, required: ['unitPrice', 'unit'] } }
    });
    return parseJsonResponse(responsePromise, { unitPrice: 0, unit: '' });
};

export const summarizeArticle = async (content: string): Promise<{ summary: string }> => {
    const prompt = `Summarize the key takeaways from the following article content into a few concise bullet points. Use markdown for the bullet points (e.g., "* Point 1").\n\nArticle:\n${content.substring(0, 2000)}`;
    const responsePromise = ai.models.generateContent({
        model, contents: prompt, config: { responseMimeType: "application/json", responseSchema: { type: Type.OBJECT, properties: { summary: { type: Type.STRING } }, required: ['summary'] } }
    });
    return parseJsonResponse(responsePromise, { summary: 'Could not generate summary.' });
};

export const getDashboardInsight = async (): Promise<{ insight: string }> => {
    const prompt = `Provide one short, interesting, and actionable daily insight or tip related to anti-corruption, transparency, or good governance in Indonesia. Keep it under 200 characters.`;
    const responsePromise = ai.models.generateContent({
        model, contents: prompt, config: { responseMimeType: "application/json", responseSchema: { type: Type.OBJECT, properties: { insight: { type: Type.STRING } }, required: ['insight'] } }
    });
    return parseJsonResponse(responsePromise, { insight: 'Always verify information from multiple sources to ensure transparency.' });
};