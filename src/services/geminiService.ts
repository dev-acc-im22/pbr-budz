import { GoogleGenAI, Type } from "@google/genai";

const getAi = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.warn("GEMINI_API_KEY is not set. Using mock data.");
    return null;
  }
  return new GoogleGenAI({ apiKey });
};

export const generateYouTubeIdeas = async (topic: string) => {
  const ai = getAi();
  if (!ai) {
    // Return mock data if no API key
    return [
      { title: `I Tried the '2-Hour Workday' for 30 Days (${topic})`, views: "1.2M", avg: "150K", hook: "Curiosity + Challenge" },
      { title: `Why 99% of ${topic} Apps are Useless`, views: "850K", avg: "90K", hook: "Contrarian + Negative" },
    ];
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Generate 4 highly clickable, viral-style YouTube video ideas about "${topic}". For each idea, provide a catchy title, estimated outlier views (e.g., "1.2M"), average channel views (e.g., "150K"), and the psychological hook used (e.g., "Curiosity + Challenge").`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              views: { type: Type.STRING },
              avg: { type: Type.STRING },
              hook: { type: Type.STRING },
            },
            required: ["title", "views", "avg", "hook"],
          },
        },
      },
    });
    
    const text = response.text;
    if (text) {
      return JSON.parse(text);
    }
    return [];
  } catch (error) {
    console.error("Error generating ideas:", error);
    throw error;
  }
};

export const generateYouTubeScript = async (title: string, hook: string) => {
  const ai = getAi();
  if (!ai) {
    return `[HOOK]\n(0:00-0:15)\n"This is a mock script for ${title} using the ${hook} hook..."`;
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Write a YouTube video script for a video titled "${title}". The video uses a "${hook}" hook. Include a [HOOK] section, an [INTRO] section, and a [BODY] section. Keep it engaging and fast-paced.`,
    });
    return response.text || "";
  } catch (error) {
    console.error("Error generating script:", error);
    throw error;
  }
};

export const modifyYouTubeScript = async (script: string, instruction: string) => {
  const ai = getAi();
  if (!ai) {
    return `[MOCK MODIFIED SCRIPT]\n\n${script}`;
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Here is a YouTube script:\n\n${script}\n\nPlease modify this script based on the following instruction: ${instruction}. Return ONLY the modified script.`,
    });
    return response.text || script;
  } catch (error) {
    console.error("Error modifying script:", error);
    throw error;
  }
};

export const analyzeCompetitor = async (url: string) => {
  const ai = getAi();
  if (!ai) {
    return { name: `Channel ${url.substring(0, 10)}`, subs: "1M", recentOutlier: "Mock Outlier Video", outlierViews: "5M", status: "Tracking" };
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Analyze the YouTube channel URL: "${url}". Since you don't have live access, invent a realistic competitor profile for this channel or a generic channel if the URL is invalid. Provide the channel name, subscriber count (e.g., "5.2M"), a recent outlier video title, and its views (e.g., "2.4M").`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            name: { type: Type.STRING },
            subs: { type: Type.STRING },
            recentOutlier: { type: Type.STRING },
            outlierViews: { type: Type.STRING },
          },
          required: ["name", "subs", "recentOutlier", "outlierViews"],
        },
      },
    });
    
    const text = response.text;
    if (text) {
      const data = JSON.parse(text);
      return { ...data, status: "Tracking" };
    }
    return null;
  } catch (error) {
    console.error("Error analyzing competitor:", error);
    throw error;
  }
};

export const generateThumbnailsAndTitles = async (topic: string) => {
  const ai = getAi();
  if (!ai) {
    return {
      titles: ["Mock Title 1", "Mock Title 2"],
      thumbnails: [{ concept: "Mock Concept", desc: "Mock Description" }]
    };
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Generate 5 highly clickable YouTube title variations and 3 visual thumbnail concepts for a video about "${topic}".`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            titles: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            thumbnails: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  concept: { type: Type.STRING },
                  desc: { type: Type.STRING },
                },
                required: ["concept", "desc"]
              }
            }
          },
          required: ["titles", "thumbnails"]
        },
      },
    });
    
    const text = response.text;
    if (text) {
      return JSON.parse(text);
    }
    return { titles: [], thumbnails: [] };
  } catch (error) {
    console.error("Error generating thumbnails:", error);
    throw error;
  }
};
