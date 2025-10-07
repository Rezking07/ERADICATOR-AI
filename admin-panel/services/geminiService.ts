import { GoogleGenAI } from "@google/genai";
import { DetectionResult, ExternalArticle } from '../types';

// IMPORTANT: This key is read from environment variables. 
// Do not hardcode API keys in the code.
const apiKey = process.env.API_KEY;
if (!apiKey) {
  console.warn("API_KEY environment variable not set. Gemini features will be disabled.");
}
const ai = new GoogleGenAI({ apiKey: apiKey || " " });

export const generateSummary = async (reportName: string, detections: DetectionResult[]): Promise<string> => {
  if (!apiKey) {
    return "Error: Kunci API Gemini tidak dikonfigurasi. Silakan hubungi administrator.";
  }

  const detectionDetails = detections.map(d => 
    `- Anomali: ${d.anomalyType} (Tingkat: ${d.severityLevel})\n  Deskripsi: ${d.description}\n  Data Terkait: ${JSON.stringify(d.offendingData)}`
  ).join('\n\n');

  const prompt = `
    Anda adalah seorang auditor ahli yang bertugas meringkas temuan anomali dalam sebuah laporan keuangan untuk seorang manajer senior.
    Tugas Anda adalah memberikan ringkasan yang jelas, ringkas, dan to-the-point mengenai potensi risiko korupsi berdasarkan data yang diberikan.
    
    Nama Laporan: ${reportName}
    
    Berikut adalah detail temuan anomali yang dideteksi oleh sistem AI:
    ${detectionDetails}
    
    Instruksi:
    1. Mulailah dengan kesimpulan umum mengenai tingkat risiko laporan ini.
    2. Jelaskan secara singkat temuan-temuan paling signifikan (terutama yang tingkatnya Kritis atau Tinggi).
    3. Berikan rekomendasi langkah selanjutnya yang harus diambil.
    4. Gunakan bahasa yang profesional dan mudah dipahami.
    5. Jawab dalam format Markdown.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return "Gagal menghasilkan ringkasan. Terjadi kesalahan saat berkomunikasi dengan AI. Silakan coba lagi nanti.";
  }
};

export const searchArticles = async (query: string): Promise<ExternalArticle[]> => {
    if (!apiKey) {
        throw new Error("Kunci API Gemini tidak dikonfigurasi. Silakan hubungi administrator.");
    }
    
    const prompt = `
        Anda adalah asisten riset yang bertugas mencari artikel berita atau materi edukasi terkait korupsi, gratifikasi, atau topik sejenisnya berdasarkan kueri pengguna.
        Cari di internet menggunakan Google Search untuk menemukan artikel yang paling relevan dengan kueri berikut: "${query}".
        
        Untuk setiap artikel yang Anda temukan, berikan informasi berikut:
        - Judul artikel (title)
        - Ringkasan singkat dari isi artikel (summary)
        - Nama sumber atau situs web (source)
        - URL lengkap ke artikel asli (url)
        
        Kembalikan hasilnya HANYA dalam format array JSON yang valid (dimulai dengan '[' dan diakhiri dengan ']'). Jangan sertakan teks atau markdown lain di luar array JSON.
    `;
    
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                tools: [{ googleSearch: {} }],
            }
        });
        
        // Parsing JSON yang lebih kuat untuk menangani variasi dalam respons teks mentah AI
        let jsonText = response.text.trim();
        
        // Menangani format markdown code fences (misalnya, ```json ... ```)
        if (jsonText.startsWith('```json')) {
            jsonText = jsonText.substring(7, jsonText.length - 3).trim();
        } else if (jsonText.startsWith('```')) {
             jsonText = jsonText.substring(3, jsonText.length - 3).trim();
        }
        
        const startIndex = jsonText.indexOf('[');
        const endIndex = jsonText.lastIndexOf(']');
        
        if (startIndex === -1 || endIndex === -1 || endIndex <= startIndex) {
             throw new Error("Respons AI tidak mengandung format JSON array yang valid.");
        }

        jsonText = jsonText.substring(startIndex, endIndex + 1);

        try {
            const articles = JSON.parse(jsonText) as ExternalArticle[];
            return articles;
        } catch (parseError) {
             console.error("Gagal mem-parsing JSON dari respons AI:", parseError, "Teks mentah:", jsonText);
             throw new Error("Gagal mem-parsing respons JSON dari AI.");
        }

    } catch (error) {
        console.error("Error calling Gemini API for article search:", error);
         if (error instanceof Error && (error.message.includes("JSON") || error.message.includes("parsing"))) {
             throw error;
        }
        throw new Error("Gagal mencari artikel. Terjadi kesalahan saat berkomunikasi dengan AI.");
    }
};