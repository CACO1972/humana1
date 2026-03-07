import { GoogleGenAI } from "@google/genai";

export async function generatePresentationCover() {
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: {
      parts: [
        {
          text: "A high-end, futuristic presentation cover for a tech ecosystem called 'Humana'. The design is clean, modern, and minimal yet vibrant. Electric blue light trails and abstract geometric shapes suggest global connectivity and advanced neural networks. Metallic silver and pure white surfaces reflect light. A sense of discovery and innovation. Cinematic lighting, 4k resolution, professional graphic design style. No text in the image.",
        },
      ],
    },
  });

  for (const part of response.candidates[0].content.parts) {
    if (part.inlineData) {
      return `data:image/png;base64,${part.inlineData.data}`;
    }
  }
  return null;
}
